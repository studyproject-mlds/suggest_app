export const getMe = async ({api}) => {
  const res = await api.get('me/');
  return res.data;
};
