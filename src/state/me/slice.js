import {getMe, setDefaultWorld, getSuggestions, setSuggestion} from './actions';

export const me = () => ({
    initialState: {
        data: {
            default_world_name: null,
            suggestions_id: {},
        },
    },
    selectors: {
        //     // getMe: 'me.data.me[0]', // prevent undefined path -> permit to choice default value here
        getMe: (state) => state?.data ?? {},
        getDefaultWorld: (state, selectors) =>
            selectors.getMe(state)?.default_world_name ?? null,
    },
    [getMe.name]: (state, {payload}) => {
        state.data = {...state.data, ...(payload?.[0] ?? {})};
    },
    [setDefaultWorld.name]: (state, {payload}) => {
        state.data.default_world_name = payload;
    },
    [getSuggestions.name]: (
        state,
        {payload: {suggestions_id, world} = {suggestions_id}},
    ) => {
        // console.log('idi', suggestions_id);
        state.data.suggestions_id[world] = [...(suggestions_id ?? [])];
    },
    [setSuggestion.name]: (state, {payload}) => {
        console.log('setSuggestion ok');
    },
});

//TODO: thincking about accessor (get)
// const draftSafeSelector = createDraftSafeSelector(
//   selectSelf,
//   state => state.value
// )
