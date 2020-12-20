import React from 'react';
import {useAuth, useAxiosInterceptor} from '@/auth';
// import {useDispatch, useSelector} from '@/redox';
import {useSelector, useDispatch} from 'react-redux';

// import {useDispatch, useSelector} from 'react-redux';
import useApi from '@/api';

export const useApp = () => {
    const dispatchRedux = useDispatch();
    const {
        loginWithBackend,
        getAccessTokenSilently,
        isAuthenticated,
        isLoading,
        logout,
    } = useAuth();
    const {API} = useApi();
    const axiosInterceptor = useAxiosInterceptor();
    const dispatch = React.useCallback(
        async function (dispatchAction, actionPayload = {}) {
            try {
                const accessToken = await getAccessTokenSilently();
                if (accessToken) {
                    return dispatchRedux(
                        dispatchAction({
                            api: axiosInterceptor(API(accessToken)),
                            ...actionPayload,
                        }),
                    );
                }
            } catch (error) {
                throw error;
                // toastError(error.message);
            }
        },
        [dispatchRedux, getAccessTokenSilently, axiosInterceptor, API],
    );
    return {
        api: {dispatch},
        auth: {isAuthenticated, isLoading, logout, loginWithBackend},
        redux: {useSelector, dispatchRedux},
    };
};
