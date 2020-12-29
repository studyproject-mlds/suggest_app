export const getGenres = async ({api}) => {
	const {data} = await api.get('genre/');
	console.log(data);
	return data;
};
