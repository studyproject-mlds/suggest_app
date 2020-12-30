// import {setMovies} from './actions';

export const movies = () => ({
    initialState: {
        data: {
            // id : {
            //     id: 130,
            //     genres: [22, 62],
            //     reals: [[107, 'Jorge Ulloa']],
            //     actors: [
            //         [2712, 'Ra\u00fal Santana'],
            //         [2713, 'Nataly Valencia'],
            //         [2714, 'Carlos Alcantara'],
            //         [2715, 'Biassini Segura'],
            //         [2716, 'Mariana Trevi\u00f1o'],
            //         [2717, 'Eugenio Derbez'],
            //         [2718, 'Orlando Herrera'],
            //         [2719, 'Alfredo Espinosa'],
            //         [2720, 'Werevertumorro'],
            //         [2721, 'Alina Lozano'],
            //         [2722, 'Lorna Cepeda'],
            //         [2723, 'Jorge Enrique Abello'],
            //         [2724, 'Yoss Hoffman'],
            //         [2726, 'Horacio Tavera'],
            //     ],
            //     title: 'Dedicada a mi ex',
            //     date: '2019-11-01',
            //     image:
            //         'https://image.tmdb.org/t/p/w600_and_h900_bestv2/riAooJrFvVhotyaOgoI0WR7okSe.jpg',
            //     trailer: '',
            //     synopsis: '',
            //     duration: 94,
            //     note_tmdb: 8,
            //     id_tmdb: 644479,
            // },
        },
    },
    getters: {
        getMovies: ({state}) => state?.data ?? {},
        getMovie: ({state, getters, args}) =>
            getters.getMovies({state})?.[args?.id],
    },
    selectors: {},
    reducers: {
        // eslint-disable-next-line no-shadow
        setMovies(state, {payload: {movies}}) {
            movies.forEach((movie) => {
                if (movie.id in state.data) return;
                state.data[movie.id] = {...movie};
            });
        },
    },
});

//TODO: thincking about accessor (get)
// const draftSafeSelector = createDraftSafeSelector(
//   selectSelf,
//   state => state.value
// )
