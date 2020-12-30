import {actions as moviesActions} from '@/state/movies';
export const getMe = async ({api}) => {
    const res = await api.get('me/');

    return res.data;
};

export const setDefaultWorld = async ({api, world}) => {
    try {
        await api.patch('me/set_default_world/', {world});
    } catch (err) {
        const {response = {}} = err;
        if (
            response?.status === 400 &&
            (response?.data?.error ?? '').includes('bad world name')
        ) {
            err.message = 'World Name invalid';
        } else {
            err.message = 'pb pour set le world';
        }

        throw err;
    }
    return world;
};

export const getSuggestions = async ({api, world}, {dispatch}) => {
    const suggestions = (
        await api.get('me/get_suggestions/', {params: {world}})
    ).data;
    // console.log(suggestions);
    await dispatch(moviesActions.setMovies({movies: suggestions}));

    return {
        suggestions_id: suggestions.map((suggestion) => suggestion.id),
        world,
    };
};

export const setSuggestion = async (
    {api, world, id, action, rate},
    {rejectWithValue},
) => {
    if (!['IGNORED', 'ADDED', 'RATED'].includes(action))
        rejectWithValue({message: `${action} not authorized`});
    if (action === 'RATED' && !rate)
        rejectWithValue({message: "action 'RATED' with no rate"});
    await api.post('me/set_suggestions_action/', {world, action, id, rate});
};
