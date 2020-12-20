import React from 'react';
import * as Redux from 'redux';
import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import {
  Provider as ProviderRedux,
  useDispatch,
  useSelector,
} from 'react-redux';
import defaultStorage from 'redux-persist/lib/storage';

const { combineReducers: combineReducersRedux } = Redux;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import { PersistGate as PersistGateRedux } from 'redux-persist/integration/react';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

function isInstance<T extends Type>(obj: unknown, key: string): obj is T {
  return (obj as T).type !== undefined && (obj as T).type === key;
}
interface Type {
  type: string;
}

type RecordX<X> = Record<string | number | symbol, X>;
type FN = (...args: unknown[]) => undefined | void;

type RecordObj = RecordX<FN>;

type RecordAny = RecordX<unknown>;

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}
type ActionWithName = {
  name: string;
} & KeyValuePair<string, FN>;

type Actions = RecordObj | RecordX<ActionWithName>;

interface OptionsCreateActions {
  actions?: Actions;
  slice?: Slice;
  name?: string;
}

interface FuFn {
  f?: FN;
  fulfilled?: FN;
  r?: FN;
  reject: FN;
  p?: FN;
  pending?: FN;
}

interface TypeFu extends Type {
  type: 'FU';
}
type Fu = FuFn & TypeFu;

const isInstanceFu = (obj: unknown) => isInstance<Fu>(obj, 'Fu');

////

type SliceOnlyFulfiled = RecordX<FN>;

type SliceAll = RecordX<Fu>;

//

interface TypeAllAndOnlyFulfilled extends Type {
  type: 'TypeAllAndOnlyFulfilled';
}

type SliceAllAndOnlyFulfilled = SliceOnlyFulfiled | SliceAll; // & TypeAllAndOnlyFulfilled;
// const isInstanceSliceAllAndOnlyFulfilled = (obj: unknown) =>
// isInstance<SliceAllAndOnlyFulfilled>(obj, 'SliceAllAndOnlyFulfilled');

///
interface TypeNamespace extends Type {
  type: 'Namespace';
}
type SliceNamespace = RecordX<SliceAllAndOnlyFulfilled>; //& TypeNamespace;
///

type SliceOpts = {
  initialState?: RecordX<unknown>;
  noPrefix?: boolean;
  prefix?: string;
};

type Slice = SliceOpts & (SliceAllAndOnlyFulfilled | SliceNamespace);

const isFunction = (variableToCheck: unknown) =>
  variableToCheck instanceof Function;

const processReducer = (reducer, prefix, defaultCases) => {
  const slices = Object.entries(reducer).map(([name, reducerI]) => {
    const nameReduced = prefix ? `${prefix}/${name}` : name;
    if (isFunction(reducerI)) {
      return {
        [`${nameReduced}/fulfilled`]: (...allArgs) => {
          (defaultCases.fulfilled ?? defaultCases.f ?? (() => {}))(...allArgs);
          return reducerI(...allArgs);
        },
      };
    } else {
      return {
        [`${nameReduced}/fulfilled`]: (...allArgs) => {
          (defaultCases.fulfilled ?? defaultCases.f ?? (() => {}))(...allArgs);
          return (reducerI.fulfilled ?? reducerI.f ?? (() => {}))(...allArgs);
        },
        [`${nameReduced}/pending`]: (...allArgs) => {
          (defaultCases.pending ?? defaultCases.p ?? (() => {}))(...allArgs);
          return (reducerI.pending ?? reducerI.p ?? (() => {}))(...allArgs);
        },
        [`${nameReduced}/reject`]: (...allArgs) => {
          (defaultCases.reject ?? defaultCases.r ?? (() => {}))(...allArgs);
          return (reducerI.reject ?? reducerI.r ?? (() => {}))(...allArgs);
        },
      };
    }
  });
  return Object.assign({}, ...slices);
};

type FN_RTK<S, A> = (state: S, action: A) => unknown | void;

// const processReducerSlices = (reducer, prefix, defaultCases) => {};

type DefaultCasesTypeZ<S> = {
   pending: 
};
export const DEFAULT_CASES: DefaultCasesTypeZ<S> = {
  pending: (state: S) => {
    // pending or p
    state.status = 'loading';
  },
  reject: (state: S, action: A) => {
    // reject or r
    state.status = 'failed';
    state.error = action.error.message;
  },
  fulfilled: (state: S) => {
    //fulfilled or f
    state.status = 'succeeded';
  },
};

export const INITIAL_STATE = {
  status: 'idle',
  error: null,
};

type TypeDefaultCases = {
  type: 'DefaultCasesType';
};

type TypeDefaultInitialState = {
  type: 'DefaultInitialStateType';
};

type TypeInitialState = {
  type: 'InitialStateType';
};

type DefaultCasesType = FuFn;

type DefaultInitialStateType = RecordAny;

type InitialStateType = RecordAny;

type CombineReducersType = {
  defaultCases?: DefaultCasesType;
  defaultInitialState?: DefaultInitialStateType;
  initialState?: InitialStateType;
  reducers?: Slice;
  pureReducers?: RecordAny;
};

export const combineReducers = ({
  defaultCases = DEFAULT_CASES,
  defaultInitialState = INITIAL_STATE,
  initialState = {},
  reducers = {},
  pureReducers = {},
}: CombineReducersType = {}) => {
  const slices = Object.entries(reducers).map(([name, reducer_]) => {
    const reducer = isFunction(reducer_) ? reducer_() : reducer_;
    const reducerInitialState = reducer.initialState ?? {};
    const noPrefix = reducer.noPrefix ?? false;
    const reducersRTK = reducer.reducers ?? {};
    delete reducer.initialState;
    delete reducer.noPrefix;
    delete reducer.reducers;

    return {
      [name]: createSlice({
        name,
        initialState: {
          ...defaultInitialState,
          ...initialState,
          ...reducerInitialState,
        },
        reducers: reducersRTK,
        extraReducers: processReducer(
          reducer,
          noPrefix ? undefined : name,
          defaultCases,
        ),
      }).reducer,
    };
  });
  return combineReducersRedux(Object.assign({}, ...slices, pureReducers));
};

const createStorePersist = ({
  reducer,
  whitelist = [],
  blacklist = [],
  stateReconciler = autoMergeLevel2,
  storage = defaultStorage,
  key = 'root',
  persistConfigOpts = {},
  middlewareOpts = {},
  configureStoreOpts = {},
  persistStoreOpts = [],
  loading = null,
} = {}) => {
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
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      ...middlewareOpts,
    }),
    ...configureStoreOpts,
  });

  let persistor = persistStore(store, ...persistStoreOpts);

  const Provider = ({ children }) => {
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
  };
};

const createStoreWithoutPersist = ({ reducer, configureStoreOpts } = {}) => {
  const store = configureStore({
    reducer,
    ...configureStoreOpts,
  });

  const Provider = ({ children }) => {
    return <ProviderRedux store={store}>{children}</ProviderRedux>;
  };

  return {
    store,
    Provider,
  };
};

const createStore = ({
  reducer,
  configureStoreOpts = {},
  persist = {},
} = {}) => {
  if (persist && !defaultStorage) {
    console.warn('redux-persist not installed');
    return;
  }
  const storeObj = persist
    ? createStorePersist({ reducer, configureStoreOpts, ...persist })
    : createStoreWithoutPersist({ reducer, configureStoreOpts });

  return storeObj;
};
// Type '{}' is missing the following properties from type
// '{ actions: Record<string, (...args: any[]) => unknown>; name?: string | undefined; slice: Slice; }': actions, slice

// var name: string | undefined;
/*
  slice: function | {},
  name: str,
  others: {}
*/
// : { actions: Action; name?: string; slice?: Slice, ...others: unknown[]}
const createActions = ({
  actions = {},
  slice = undefined,
  name = undefined,
}: OptionsCreateActions = {}) => {
  const prefix = slice?.prefix ?? slice?.name ?? name ?? '';

  const noPrefix = slice?.noPrefix ?? prefix === ''; // ?? false
  const newActions: RecordX<unknown> = {};
  Object.entries(actions).forEach(([actionName_, action]) => {
    let newAction = isFunction(action) ? action : action[actionName_];
    const actionName = isFunction(action) ? actionName_ : action.name;
    newActions[actionName_] = createAsyncThunk(
      noPrefix ? actionName : `${prefix}/${actionName}`,
      newAction,
    );
  });
  return newActions;
};

export { createStore, useDispatch, useSelector, createActions };
