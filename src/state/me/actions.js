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
