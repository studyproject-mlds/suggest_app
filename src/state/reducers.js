// import {combineReducers} from '@/redox';

import {auth_reducer, auth_reducer_name} from '@/auth';

import {me} from './me/slice';

// export default combineReducers(
//     {
//         initialState: {
//             data: {},
//         },
//         reducers: {
//             me,
//         },
//     },
//     {[auth_reducer_name]: auth_reducer},
// );

export default {
    initialState: {
        data: {},
    },
    reducers: {
        me,
    },
    pureReducers: {
        [auth_reducer_name]: auth_reducer,
    },
};
