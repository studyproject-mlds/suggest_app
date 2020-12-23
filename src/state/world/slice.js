export const world = () => ({
    // noPrefix: false,
    initialState: {
        data: {
            defaultWorldInProgress: null,
        },
    },
    selectors: {
        //     // getMe: 'me.data.me[0]', // prevent undefined path -> permit to choice default value here
        getWorld: (state) => state?.data ?? {},
        getDefaultWorldInProgress: (state, selectors) =>
            selectors.getWorld(state)?.defaultWorldInProgress ?? null,
    },

    defaultWorld: {
        // TODO: subslicing thincking
        reducers: {
            setDefaultWorldInProgress(state, {payload: {world}}) {
                state.data.defaultWorldInProgress = world;
            },
        },
    },
});
