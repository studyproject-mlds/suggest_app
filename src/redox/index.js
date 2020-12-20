import React from 'react';
import * as Redux from 'redux';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import {Provider as ProviderRedux, useDispatch, useSelector} from 'react-redux';
import defaultStorage from 'redux-persist/lib/storage';

const {combineReducers: combineReducersRedux} = Redux;

import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    PersistConfig,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

import {PersistGate as PersistGateRedux} from 'redux-persist/integration/react';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import * as z from 'zod';

const isFunction = (functionToCheck) => {
    return (
        functionToCheck &&
        {}.toString.call(functionToCheck) === '[object Function]'
    );
};

const isObject = (variable) => {
    return Object.prototype.toString.call(variable) === '[object Object]';
};

const isString = (variable) =>
    typeof variable === 'string' || variable instanceof String;

var getByPath = function (obj, path, def) {
    /**
     * If the path is a string, convert it to an array
     * @param  {String|Array} path The path
     * @return {Array}             The path array
     */
    var stringToPath = function (path) {
        // If the path isn't a string, return it
        if (typeof path !== 'string') return path;

        // Create new array
        var output = [];

        // Split to an array with dot notation
        path.split('.').forEach(function (item, index) {
            // Split to an array with bracket notation
            item.split(/\[([^}]+)\]/g).forEach(function (key) {
                // Push to the new array
                if (key.length > 0) {
                    output.push(key);
                }
            });
        });

        return output;
    };

    // Get the path as an array
    path = stringToPath(path);

    // Cache the current object
    var current = obj;

    // For each item in the path, dig into the object
    for (var i = 0; i < path.length; i++) {
        // If the item isn't found, return the default (or null)
        if (!current[path[i]]) return def;

        // Otherwise, update the current  value
        current = current[path[i]];
    }

    return current;
};
const fakeFunc = () => undefined;

const reducerFunc = z.function(z.tuple([z.unknown(), z.unknown()]), z.void());

const sliceFunc = (slice) => z.function(z.tuple([]), slice);

const reducerObj = z.object({
    f: reducerFunc,
    fulfilled: reducerFunc,

    p: reducerFunc,
    pending: reducerFunc,

    r: reducerFunc,
    reject: reducerFunc,
});

const reducerZod = z.union([
    reducerFunc,
    reducerObj
        .partial()
        .refine((val) => val.f !== undefined || val.fulfilled !== undefined),
]);

// const reducerZodType = reducerZod.optional();

const Slice = z.record(reducerZod);

const isSlice = z.instanceof(Slice);

const Reducer = z.record(reducerFunc);

const isReducer = z.instanceof(Reducer);

const processReducerType = z
    .object({
        slice: Slice,
        prefix: z.string(),
        defaultCases: reducerObj.partial(),
    })
    .partial();

const isProcessReducerType = z.instanceof(processReducerType);

const processReducer = ({
    reducers = {},
    prefix,
    defaultCases = {},
    onlyPrefix = false,
} = {}) => {
    const newReducers = Object.entries(reducers).map(([name, reducer]) => {
        const nameReduced = prefix ? `${prefix}/${name}` : name;
        if (onlyPrefix) return {[name]: nameReduced};
        if (isFunction(reducer)) {
            return {
                [`${nameReduced}/fulfilled`]: (arg1, arg2) => {
                    (defaultCases.fulfilled ?? defaultCases.f ?? fakeFunc)(
                        arg1,
                        arg2,
                    );
                    return reducer(arg1, arg2);
                },
            };
        } else {
            return {
                [`${nameReduced}/fulfilled`]: (arg1, arg2) => {
                    (defaultCases.fulfilled ?? defaultCases.f ?? fakeFunc)(
                        arg1,
                        arg2,
                    );
                    return (reducer.fulfilled ?? reducer.f ?? fakeFunc)(
                        arg1,
                        arg2,
                    );
                },
                [`${nameReduced}/pending`]: (arg1, arg2) => {
                    (defaultCases.pending ?? defaultCases.p ?? fakeFunc)(
                        arg1,
                        arg2,
                    );
                    return (reducer.pending ?? reducer.p ?? fakeFunc)(
                        arg1,
                        arg2,
                    );
                },
                [`${nameReduced}/reject`]: (arg1, arg2) => {
                    (defaultCases.reject ?? defaultCases.r ?? fakeFunc)(
                        arg1,
                        arg2,
                    );
                    return (reducer.reject ?? reducer.r ?? fakeFunc)(
                        arg1,
                        arg2,
                    );
                },
            };
        }
    });
    const c = Object.assign({}, ...newReducers);
    console.log(c);
    return c;
};

const without = (object, keys) =>
    keys.reduce((o, k) => {
        const {[k]: _, ...p} = o;
        return p;
    }, object);

const filtered = (object, keys) =>
    Object.keys(object)
        .filter((key) => keys.includes(key))
        .reduce((obj, key) => {
            obj[key] = object[key];
            return obj;
        }, {});

const getErrorKeys = (err) => Object.keys(err.error.flatten().fieldErrors);

const recupGoodSliceExtraReducers = (extraReducers) => {
    const testSafe = Slice.safeParse(extraReducers);
    if (testSafe.success) {
        return Object.keys(testSafe.data);
    }
    const sliceErrors = getErrorKeys(testSafe);
    const sliceTestWithoutError = without(extraReducers, sliceErrors);
    if (Object.keys(sliceTestWithoutError).length === 0) {
        return [];
    }

    const testSafe2 = Slice.safeParse(sliceTestWithoutError);
    if (testSafe2.success) {
        return Object.keys(testSafe2.data);
    }
    return [];
};

// const processReducerReducers = ({reducers, prefix, defaultCases} = {}) => {
//     const slices = Object.entries(reducers).map(([name, reducer]) => {
//         // const nameReduced = prefix ? `${prefix}/${name}` : name;
//     });
//     return slices;
// };

function createSliceFromExtraReducers({
    name,
    initialState = {},
    // reducers,
    extraReducers,
    noPrefix,
    defaultCases,
    onlyPrefix = false,
}) {
    return !onlyPrefix
        ? {
              [name]: createSlice({
                  name,
                  initialState,
                  // reducers,
                  extraReducers: processReducer({
                      reducers: extraReducers,
                      prefix: noPrefix ? undefined : name,
                      defaultCases,
                  }),
              }).reducer,
          }
        : processReducer({
              reducers: extraReducers,
              prefix: noPrefix ? undefined : name,
              onlyPrefix,
          });
}

function createSliceFromExtraReducersOrNameSpace({
    name,
    initialState = {},
    // reducers,
    extraReducers,
    noPrefix,
    defaultCases,
    failIfBad = false,
    onlyPrefix = false,
}) {
    const goodSliceExtraReducers = recupGoodSliceExtraReducers(extraReducers);
    const plainSliceExtraReducers = createSliceFromExtraReducers({
        name,
        initialState,
        // reducers,
        extraReducers: filtered(extraReducers, goodSliceExtraReducers),
        noPrefix,
        defaultCases,
        onlyPrefix,
    });
    const newReducers = without(extraReducers, goodSliceExtraReducers);

    if (Object.keys(newReducers).length > 0) {
        if (failIfBad) {
            return {};
        }
        const repu = Object.entries(newReducers).map(([k, v]) => {
            const {
                initialState: initialState2 = {},
                noPrefix: noPrefix2 = false,
                // reducers: reducers2 = {},
                ...extraReducers2
            } = v;
            return createSliceFromExtraReducersOrNameSpace({
                name: noPrefix ? k : `${name}/${k}`,
                initialState: {...initialState, ...initialState2},
                noPrefix: noPrefix2,
                // reducers: reducers2,
                extraReducers: extraReducers2,
                defaultCases,
                failIfBad: true,
                onlyPrefix,
            });
        });
        return flatArrayOfObject(plainSliceExtraReducers, repu);
    }
    // console.log(plainSliceExtraReducers);
    return plainSliceExtraReducers;
}

const SlicesType = z.object({slices: Slice}).partial();

// const SlicesNamespaceType = z.record(Slices);

// const getSlicesFromExtraReducersType = z.union([
//     z
//         .object({
//             defaultCases: reducerObj,
//             defaultInitialState: z.record(z.unknown()),
//             initialState: z.record(z.unknown()),
//         })
//         .partial(),
//     SlicesType,
// ]);

// const ExtraReducersTypeProps = z
//     .object({
//         initialState: z.record(z.unknown()),
//         noPrefix: z.boolean(),
//         reducers: z.record(z.unknown()),
//     })
//     .partial()
//     .refine((arg) => {
//         return Object.keys(arg).length > 0;
//     });

// const ExtraReducersTypePlain = ExtraReducersTypeProps.merge(Slice);
// const ExtraReducersTypeNameSpace = ExtraReducersTypeProps.merge(
//     z.record(ExtraReducersTypePlain),
// );

// const isGetSlicesFromExtraReducers = z.instanceof(getSlicesFromExtraReducers);

function getSlicesFromExtraReducers({
    extraReducers = {},
    defaultCases = DEFAULT_CASES,
    defaultInitialState = INITIAL_STATE,
    initialState = {},
    name = '',
    onlyPrefix = false,
}) {
    const reducerInitialState = extraReducers.initialState ?? {};
    const noPrefix = extraReducers.noPrefix ?? false;
    const reducersRTK = extraReducers.reducers ?? {};
    delete extraReducers.initialState;
    delete extraReducers.noPrefix;
    delete extraReducers.reducers;
    delete extraReducers.selectors;

    return createSliceFromExtraReducersOrNameSpace({
        name,
        initialState: {
            ...defaultInitialState,
            ...initialState,
            ...reducerInitialState,
        },
        reducers: reducersRTK,
        extraReducers,
        noPrefix,
        defaultCases,
        onlyPrefix,
    });
}
export const INITIAL_STATE = {
    status: 'idle',
    error: null,
};

export const DEFAULT_CASES = {
    pending: (state) => {
        // pending or p
        state.status = 'loading';
    },
    reject: (state, action) => {
        // reject or r
        state.status = 'failed';
        state.error = action.error.message;
    },
    fulfilled: (state) => {
        //fulfilled or f
        state.status = 'succeeded';
    },
};

const getSlicesType = z
    .object({
        defaultCases: reducerObj,
        defaultInitialState: z.record(z.unknown()),
        initialState: z.record(z.unknown()),
    })
    .partial()
    .merge(SlicesType);

const isGetSlices = z.instanceof(getSlicesType);

const getSlicesObj = ({slice}) => {
    return isFunction(slice) ? slice() : slice;
};

/* slices's Group */
function getSlices({
    slices = {},
    defaultCases = DEFAULT_CASES,
    defaultInitialState = INITIAL_STATE,
    initialState = {},
    onlyPrefix = false,
}) {
    const newSlices = Object.entries(slices).map(([name, extraReducers_]) => {
        const extraReducers = getSlicesObj({slice: extraReducers_});

        return getSlicesFromExtraReducers({
            extraReducers,
            defaultCases,
            defaultInitialState,
            initialState,
            name,
            onlyPrefix,
        });
    });
    return newSlices;
}

function flatArrayOfObject(arrayOfObject, ...objects) {
    // console.log(arrayOfObject);
    // console.log(others);
    // const ef = objects.map((obj) => !Array.isArray(obj) && [obj]);
    // console.log(objects.flat());
    const r = Object.assign(
        {},
        Array.isArray(arrayOfObject) ? arrayOfObject.flat() : arrayOfObject,
        ...objects.flat(),
    );
    return r;
}

function combineReducersFromSlicesReducers({slices, reducers}) {
    const gg = flatArrayOfObject(slices, reducers);
    // console.log(gg);
    return combineReducersRedux(gg);
}

const combineReducersType = z.union([
    getSlicesType,
    z.object({reducers: z.record(Reducer).optional()}),
]);

const isCombineReducersType = z.instanceof(combineReducersType);

function combineReducers({
    defaultCases = DEFAULT_CASES,
    defaultInitialState = INITIAL_STATE,
    initialState = {},
    slices = {},
    reducers = {},
}) {
    const newSlices = getSlices({
        defaultCases,
        defaultInitialState,
        initialState,
        slices,
    });
    return combineReducersFromSlicesReducers({
        slices: newSlices,
        reducers,
    });
}

const combineReducersListOrObjectsType = z.union([
    z.union([getSlicesType, z.array(getSlicesType)]),
    z.object({reducers: z.record(Reducer).optional()}),
]);

const isCombineReducersListOrObject = z.instanceof(combineReducersListOrObject);

/*
slices: {Slice} => if one group of slices, [{Slice}] if multiple
    Slice:
        initialState: {}, noPrefix = false, prefix:string
reducers: [k: string] : func
*/

function combineReducersListOrObject({
    slices: slices_ = {},
    reducers = {},
    ...props
} = {}) {
    const {clearStateActionType = 'redox/resetState'} = props;
    if (!isObject(slices_) && !Array.isArray(slices_)) {
        throw new Error(
            '[combineReducersListOrObject] slices not obj or array',
        );
    }
    const getProps = (slices) => {
        const {
            defaultCases = {},
            defaultInitialState = {},
            initialState = {},
            // reducers: innerReducers = {},
            ...innerSlices
        } = slices;
        return {
            slices: innerSlices,
            defaultCases,
            defaultInitialState,
            initialState,
            // reducers: reducers ?? innerReducers,
            // innerReducers,
        };
    };
    let reducer = {};
    if (isObject(slices_)) {
        const {
            defaultCases,
            defaultInitialState,
            initialState,
            // reducers,
            slices,
        } = getProps(slices_);
        reducer = combineReducers({
            slices,
            defaultCases,
            defaultInitialState,
            initialState,
            reducers,
        });
    } else {
        if (Array.isArray(slices_)) {
            const allSlices =
                slices_.map((slice) => {
                    const {
                        defaultCases,
                        defaultInitialState,
                        initialState,
                        slices,
                    } = getProps(slice);
                    return flatArrayOfObject(
                        {},
                        getSlices({
                            slices,
                            defaultCases,
                            defaultInitialState,
                            initialState,
                        }),
                    );
                }) ?? [];
            // const allInnerReducers =
            //     slices_.map((slice) => {
            //         const { innerReducers } = getProps(slice);
            //         return innerReducers;
            //     }) ?? [];
            const allSlicesFlat = flatArrayOfObject({}, allSlices);
            const allInnerReducersFlat = reducers; // flatArrayOfObject(allInnerReducers);
            reducer = combineReducersFromSlicesReducers({
                slices: allSlicesFlat,
                reducers: allInnerReducersFlat,
            });
        }
    }
    const reducerWithResetState = (state, action) => {
        if (action.type === clearStateActionType) {
            state = {};
        }
        return reducer(state, action);
    };

    return {
        reducer: reducerWithResetState,
        clearState: {type: clearStateActionType},
    };
}

export const createSelectors = (slice) => {
    const sliceObj = getSlicesObj({slice});
    const {selectors = {}} = sliceObj;
    return flatArrayOfObject(
        // TODO: REWORK selectors send to function
        {},
        Object.entries(selectors).map(([k, v]) => {
            if (isFunction(v)) {
                return {[k]: (state) => v(state, selectors)};
            }
            if (isString(v)) {
                return {
                    [k]: (state) => {
                        return getByPath(state, v, undefined);
                    },
                };
            }
        }),
    );
};

/*
  actions: function | {},
  slice?: Slice,
*/
const createActions = ({actions = {}, slice} = {}) => {
    // const prefix_ = slice?.prefix ?? slice?.name ?? prefix ?? '';
    const kkk = flatArrayOfObject(
        {},
        getSlices({slices: {[slice.name]: slice}, onlyPrefix: true}),
    );

    // console.log(kkk);

    // const noPrefix = slice.noPrefix ?? prefix_ === ''; // ?? false
    const newActions = {};
    Object.entries(actions).forEach(([actionName_, action]) => {
        const newAction = isFunction(action) ? action : action[actionName_];
        const actionName = isFunction(action) ? actionName_ : action.name;
        newActions[actionName_] = createAsyncThunk(kkk[actionName], newAction);
    });
    return newActions;
};

export const createActionsSelectors = ({actions = {}, slice} = {}) => {
    return {
        actions: createActions({actions, slice}),
        selectors: createSelectors(slice),
    };
};
/*
slices: {Slice} => if one group of slices, [{Slice}] if multiple
    Slice:
        initialState: {}, noPrefix = false, prefix:string

*/
function createStorePersist({
    slices,
    reducers,
    //
    configureStoreOpts = {},
    combineReducersOpts = {},
    // persist opts
    whitelist = [],
    blacklist = [],
    stateReconciler = autoMergeLevel2,
    storage = defaultStorage,
    key = 'root',
    persistConfigOpts = {},
    middlewareOpts = {},
    persistStoreOpts = [],
    loading = null,
}) {
    const {reducer, clearState} = combineReducersListOrObject({
        slices,
        reducers,
        ...combineReducersOpts,
    });
    const persistConfig = {
        key,
        storage,
        whitelist: whitelist.length === 0 ? undefined : whitelist,
        blacklist: blacklist.length === 0 ? undefined : blacklist,
        stateReconciler,
        ...persistConfigOpts,
    };

    const persistedReducer = persistReducer(persistConfig, reducer);

    const store = configureStore({
        reducer: persistedReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
            ...middlewareOpts,
        }),
        ...configureStoreOpts,
    });

    const persistor = persistStore(store, ...persistStoreOpts);

    const Provider = ({children}) => {
        return (
            <ProviderRedux store={store}>
                <PersistGateRedux loading={loading} persistor={persistor}>
                    {children}
                </PersistGateRedux>
            </ProviderRedux>
        );
    };
    return {
        store,
        Provider,
        persistor,
        rootReducer: reducer,
        clearState,
    };
}

/*
slices: {Slice} => if one group of slices, [{Slice}] if multiple
    Slice:
        initialState: {}, noPrefix = false, prefix:string

*/
const createStoreWithoutPersist = ({
    slices = {},
    configureStoreOpts = {},
    reducers = {},
    combineReducersOpts = {},
} = {}) => {
    const {reducer, clearState} = combineReducersListOrObject({
        slices,
        reducers,
        ...combineReducersOpts,
    });
    const store = configureStore({
        reducer,
        ...configureStoreOpts,
    });

    const Provider = ({children}) => {
        return <ProviderRedux store={store}> {children} </ProviderRedux>;
    };

    return {
        store,
        Provider,
        rootReducer: reducer,
        clearState,
    };
};

/*
slices: {Slice} => if one group of slices, [{Slice}] if multiple
    Slice:
        initialState: {}, noPrefix = false, prefix:string
configureStoreOpts: {}
persist: {}
reducers: {} -> normal reducers
*/
const createStore = ({
    slices,
    configureStoreOpts = {},
    persist = {},
    reducers = {},
    combineReducersOpts = {},
} = {}) => {
    if (persist && !defaultStorage) {
        console.warn('redux-persist not installed');
        return;
    }
    // console.log(slices);
    const storeObj = persist
        ? createStorePersist({
              slices,
              configureStoreOpts,
              ...persist,
              reducers,
              ...combineReducersOpts,
          })
        : createStoreWithoutPersist({
              slices,
              configureStoreOpts,
              reducers,
              ...combineReducersOpts,
          });

    return storeObj;
};

export {createStore, useDispatch, useSelector, createActions};
