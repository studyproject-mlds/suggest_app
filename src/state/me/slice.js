import {getMe, setDefaultWorld} from './actions';

export const me = () => ({
    initialState: {
        data: {
            default_world_name: null,
        },
    },
    selectors: {
        //     // getMe: 'me.data.me[0]', // prevent undefined path -> permit to choice default value here
        getMe: (state) => state?.data ?? {},
        getDefaultWorld: (state, selectors) =>
            selectors.getMe(state)?.default_world_name ?? null,
    },
    // getter : {
    //     getDefaultWorld(me){

    //     }
    // },
    [getMe.name]: (state, {payload}) => {
        state.data = payload?.[0] ?? {};
    },
    [setDefaultWorld.name]: (state, {payload}) => {
        state.data.default_world_name = payload;
    },
});

//TODO: thincking about accessor (get)
// const draftSafeSelector = createDraftSafeSelector(
//   selectSelf,
//   state => state.value
// )
