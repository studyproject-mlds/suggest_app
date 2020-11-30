import {
  loginRequest,
  getLoginClient,
  getBackend,
  setBackend,
  setAccessToken,
  setRefreshToken,
} from '@/axios';

import {LoginManager} from 'react-native-fbsdk';

export const getBearerTokenFromAccessToken = async (backend, token) => {
  if (!token || !backend) return;
  const rep = await loginRequest.post('/convert-token/', {
    ...loginRequest.data,
    backend,
    token,
    grant_type: 'convert_token',
  });
  return rep;
};

export const setUpApiFromAccessToken = async (backend, token) => {
  if (!token || !backend) return;
  const rep = await getBearerTokenFromAccessToken(backend, token);

  setUpApi(rep.data.access_token, rep.data.refresh_token, backend);
};

export const setUpApi = async (access_token, refresh_token, backend) => {
  if (access_token) {
    setAccessToken(access_token);
  }
  if (refresh_token) {
    setRefreshToken(refresh_token);
  }

  if (backend) {
    setBackend(backend);
  }
};

export const getBearerTokenFromRefreshToken = async (refresh_token) => {
  if (!refresh_token) return;
  const rep = await loginRequest.post('/token', {
    refresh_token,
    grant_type: 'refresh_token',
  });
  return rep;
};

export const setUpApiFromRefreshToken = async (token) => {
  if (!token) return;
  const rep = await getBearerTokenFromRefreshToken(token);
  setUpApi(rep.access_token, rep.refresh_token);
};
export const revokeToken = async (token) => {
  if (!token) return;
  const rep = await loginRequest.post('/revoke-token', {
    token,
  });
  return rep;
};

export const revokeAllTokens = async (token) => {
  if (!token) return;
  const rep = await loginRequest.post('/invalidate-sessions', {
    token,
  });
  return rep;
};

//////

export const getApi = async (backend) => {
  return await getLoginClient(); //backend ?? (await getBackend()));
};

////

export const logout = async (backend) => {
  const myBackend = backend ?? (await getBackend());
  if (myBackend === 'facebook') {
    LoginManager.logOut();
  }
};
