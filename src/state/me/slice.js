import {getMe, setDefaultWorld, getSuggestions, setSuggestion} from './actions';
import {getters as movieGetters} from '@/state/movies';

export const me = () => ({
    initialState: {
        data: {
            default_world_name: null,
            suggestions_id: {},
        },
    },
    getters: {
        getMe: ({state}) => {
            return state?.data ?? {};
        },
        getDefaultWorld: ({state, getters}) => {
            return getters.getMe({state})?.default_world_name;
        },
        getSuggestionsId: ({state, getters, args}) =>
            getters.getMe({state})?.suggestions_id?.[args?.world] ?? null,
    },
    selectors: {
        getSuggestions: ({getters, args}) => {
            if (args?.world !== 'movie') return;
            return (getters?.getSuggestionsId(args) ?? []).map((id) =>
                movieGetters.getMovie({id}),
            );
        },
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
