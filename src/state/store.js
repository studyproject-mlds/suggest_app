import {createStore, configure} from '@/redox';

import AsyncStorage from '@react-native-community/async-storage';

// import reducer from './reducers';

import {auth_reducer, auth_reducer_name} from '@/auth';

import {me} from './me';
import {world} from './world';
import {movies} from './movies';
import {genres} from './genres';

const {Provider, store, clearState} = createStore({
    slices: [
        {
            initialState: {
                data: {},
            },
            me,
            world,
            movies,
            genres,
        },
    ],
    persist: {storage: AsyncStorage},
    reducers: {[auth_reducer_name]: auth_reducer},
});

export {Provider, store, clearState};
