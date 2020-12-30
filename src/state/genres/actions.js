export const getGenres = async ({api}) => {
	const {data} = await api.get('genre/');
	return data;
};
