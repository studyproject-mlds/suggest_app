import React from 'react';
import {useAuth, useAxiosInterceptor} from '@/auth';
// import {useDispatch, useSelector} from '@/redox';
import {useSelector, useDispatch} from 'react-redux';

// import {useDispatch, useSelector} from 'react-redux';
import useApi from '@/api';

export const useApp = ({retry_max = 3} = {}) => {
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
            let retry_nb = 0;
            try {
                const req = async () => {
                    retry_nb += 1;
                    const accessToken = await getAccessTokenSilently();
                    if (accessToken) {
                        return dispatchRedux(
                            dispatchAction({
                                api: axiosInterceptor(API(accessToken)),
                                ...actionPayload,
                            }),
                        );
                    }
                };
                req();
            } catch (error) {
                if (error?.message === 'AUTH: RETRY') {
                    if (retry_nb < retry_max) {
                        req();
                    }
                }
                throw error;
                // toastError(error.message);
            }
        },
        [dispatchRedux, getAccessTokenSilently, axiosInterceptor, API],
    );
    const execute = React.useCallback(
        async function (dispatchAction, actionPayload = {}) {
            try {
                return dispatchRedux(
                    dispatchAction({
                        ...actionPayload,
                    }),
                );
            } catch (error) {
                throw error;
                // toastError(error.message);
            }
        },
        [dispatchRedux],
    );
    return {
        api: {dispatch, execute},
        auth: {isAuthenticated, isLoading, logout, loginWithBackend},
        redux: {useSelector, dispatchRedux},
    };
};
