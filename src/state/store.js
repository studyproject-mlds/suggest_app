import {createStore} from '@/redox';

import AsyncStorage from '@react-native-community/async-storage';

// import reducer from './reducers';

import {auth_reducer, auth_reducer_name} from '@/auth';

import {me} from './me/slice';

// export default {
//  initialState: {
//      data: {},
//  },
//  reducers: {
//      me,
//  },
//  pureReducers: {
//      [auth_reducer_name]: auth_reducer,
//  },
// };

// import {auth_reducer_name} from '@/auth'; // no_whitelist for redux-persist

// const {Provider, store} = createStore({
//     slices: {
//         me,
//     },
// });

// const {Provider, store} = createStore({
//     slices: [
//         {
//             defaultCases: {},
//             defaultInitialState: {},
//             initialState: {
//                 data: {},
//             },
//             me,
//         },
//     ],
//     persist: {storage: AsyncStorage},
//     reducers: {[auth_reducer_name]: auth_reducer},
// });
// export {Provider, store};

const {Provider, store, clearState} = createStore({
    slices: [
        {
            // defaultCases: {},
            // defaultInitialState: {},
            initialState: {
                data: {},
            },
            me,
        },
    ],
    persist: {storage: AsyncStorage},
    reducers: {[auth_reducer_name]: auth_reducer},
});

export {Provider, store, clearState};
