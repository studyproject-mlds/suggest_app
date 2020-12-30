export const world = () => ({
    // noPrefix: false,
    initialState: {
        data: {
            defaultWorldInProgress: null,
        },
    },
    getters: {
        //     // getMe: 'me.data.me[0]', // prevent undefined path -> permit to choice default value here
        getWorld: ({state}) => state?.data ?? {},
        getDefaultWorldInProgress: ({state, getters}) =>
            getters.getWorld({state})?.defaultWorldInProgress ?? null,
    },
    selectors: {},

    defaultWorld: {
        // TODO: subslicing thincking
        reducers: {
            setDefaultWorldInProgress(state, {payload: {world}}) {
                state.data.defaultWorldInProgress = world;
            },
        },
    },
});
