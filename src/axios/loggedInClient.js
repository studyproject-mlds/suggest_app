import axios from 'axios';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {apiConfig} from './apiConfig';
import {setUpApiFromRefreshToken} from '@/axios';

const TOKEN_DATA = 'tokenData';
const REFRESH_TOKEN_DATA = 'refreshTokenData';
const BACKEND_DATA = 'backendData';

export const setAccessToken = (token) => {
  AsyncStorage.setItem(TOKEN_DATA, JSON.stringify({token}));
};

export const setRefreshToken = (token) => {
  AsyncStorage.setItem(REFRESH_TOKEN_DATA, JSON.stringify({token}));
};

export const setBackend = (backend) => {
  AsyncStorage.setItem(BACKEND_DATA, JSON.stringify({backend}));
};
export const getBackend = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem(BACKEND_DATA);
    if (retrievedItem !== null) {
      const item = JSON.parse(retrievedItem);
      // const authorization = `Bearer ${backend ? backend + ' ' : ''}${
      //   item.token
      // }`;
      // We have data!!
      return item.backend;
    }
    return null;
  } catch (error) {
    // Error retrieving data
  }
};

export const getRefreshToken = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem(REFRESH_TOKEN_DATA);
    if (retrievedItem !== null) {
      const item = JSON.parse(retrievedItem);
      // const authorization = `Bearer ${backend ? backend + ' ' : ''}${
      //   item.token
      // }`;
      // We have data!!
      return item.token;
    }
    return null;
  } catch (error) {
    // Error retrieving data
  }
};

const getAccessToken = async (backend = '') => {
  try {
    const retrievedItem = await AsyncStorage.getItem(TOKEN_DATA);
    if (retrievedItem !== null) {
      const item = JSON.parse(retrievedItem);
      const authorization = `Bearer ${backend ? backend + ' ' : ''}${
        item.token
      }`;
      // We have data!!
      return authorization;
    }
    return null;
  } catch (error) {
    // Error retrieving data
  }
};
const loginClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    Accept: 'application/json',
  },
});
const getLoginClient = async (backend = '') => {
  loginClient.defaults.headers.common.Authorization = await getAccessToken(
    backend,
  );
  return loginClient;
};
export default getLoginClient;
function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config.url;
}
// Intercept all requests
loginClient.interceptors.request.use(
  (config) => {
    console.log(
      `%c ${config.method.toUpperCase()} - ${getUrl(config)}:`,
      'color: #0086b3; font-weight: bold',
      config,
    );
    // config.data = {...client.defaults.data, ...config.data};
    return config;
  },
  (error) => Promise.reject(error),
);
// Intercept all responses
loginClient.interceptors.response.use(
  async (response) => {
    if (response.status === 401) {
      try {
        const value = await AsyncStorage.getItem(TOKEN_DATA);
        if (value !== null) {
          // We have data!!
          AsyncStorage.clear();
          setUpApiFromRefreshToken(getRefreshToken());
          // NavigationService.navigate('AuthStackScreen');
        }
      } catch (error) {
        // Error retrieving data
        console.log(error, 'logged in client error');
      }
    }
    console.log(
      `%c ${response.status} - ${getUrl(response.config)}:`,
      'color: #008000; font-weight: bold',
      response,
    );
    return response;
  },
  (error) => {
    console.log(error, 'error console');
    if (error.response.status === 429) {
      Alert.alert('Too many requests. Please try again later.');
    }
    console.log(
      `%c ${error.response.status} - ${getUrl(error.response.config)}:`,
      'color: #a71d5d; font-weight: bold',
      error.response,
    );
    return Promise.reject(error);
  },
);
