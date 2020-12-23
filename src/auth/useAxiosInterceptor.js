import {useCallback} from 'react';

import {useDispatch} from 'react-redux';
import {deleteAccessToken} from './auth-state.js';

import useAuth from './useAuth';
const useAxiosInterceptor = () => {
    const dispatch = useDispatch();
    const {getAccessTokenSilently} = useAuth();

    const axiosInterceptor = useCallback(
        (axios_instance_original) => {
            if (axios_instance_original) {
                axios_instance_original.interceptors.response.use(
                    async (response) => {
                        if ([400, 401].includes(response?.status)) {
                            if (
                                response?.status === 400 &&
                                response?.data?.error !== 'invalid_grant'
                            ) {
                                return response;
                            }
                            await dispatch(deleteAccessToken());
                            await getAccessTokenSilently();
                        }
                        return response;
                    },
                    async (error) => {
                        const {response, request} = error;

                        if ([400, 401].includes(response?.status)) {
                            if (
                                response?.status === 400 &&
                                response?.data?.error !== 'invalid_grant'
                            ) {
                                throw error;
                                // return;
                            }
                            try {
                                await dispatch(deleteAccessToken());
                                await getAccessTokenSilently({
                                    authState: {accessToken: null},
                                });
                                throw new Error('AUTH: RETRY');
                            } catch (err) {
                                throw err;
                            }
                        }
                        throw error;
                    },
                );
                // Intercept all request
                axios_instance_original.interceptors.request.use(
                    (config) => {
                        // console.log('cc', config.data);
                        config.data = config.data !== undefined && {
                            ...axios_instance_original.defaults.data,
                            ...config.data,
                        };

                        return config;
                    },
                    (error) => Promise.reject(error),
                );
            }
            return axios_instance_original;
        },
        [dispatch, getAccessTokenSilently],
    );
    return axiosInterceptor;
};

export default useAxiosInterceptor;
