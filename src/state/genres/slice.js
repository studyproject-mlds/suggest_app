import {getGenres} from './actions';

export const genres = () => ({
    initialState: {
        data: {
            genres: {},
        },
    },
    getters: {
        getGenres: ({state}) => state?.data?.genres ?? {},
        getGenre: ({state, getters, args}) =>
            getters.getGenres({state})?.[args?.id],
    },
    selectors: {},
    [getGenres.name]: (state, {payload}) => {
        console.log('payload', payload);
        payload?.forEach((genre) => {
            state.data.genres[genre.id] = genre;
        });
    },
});
