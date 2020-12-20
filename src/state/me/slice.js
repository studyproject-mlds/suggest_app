import {getMe} from './actions';

export const me = () => ({
    // noPrefix: false,
    selectors: {
        // getMe: 'me.data.me[0]', // prevent undefined path -> permit to choice default value here
        getMe: (state) => state?.me?.data?.me?.[0] ?? {},
        getDefaultWorld: (state, selectors) =>
            selectors.getMe(state)?.default_world ?? null,
    },
    initialState: {
        data: {
            me: {},
        },
    },
    // user: {
    [getMe.name]: (state, {payload}) => {
        state.data.me = payload;
    },
    // },
});
