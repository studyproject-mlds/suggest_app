import {getGenres} from './actions';

export const genres = () => ({
    initialState: {
        data: {
            genres: {},
        },
    },
    selectors: {
        getGenres: ({state}) => state?.data?.genres ?? {},
        getGenre: ({state, selectors, args}) =>
            selectors.getGenres({state})?.[args?.id],
    },
    [getGenres.name]: (state, {payload}) => {
        console.log('payload', payload);
        payload?.forEach((genre) => {
            state.data.genres[genre.id] = genre;
        });
    },
});
