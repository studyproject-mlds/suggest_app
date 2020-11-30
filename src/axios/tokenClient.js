import axios from 'axios';
import {apiConfig} from './apiConfig';
const client = axios.create({
  baseURL: apiConfig.baseUrlAuth,
  headers: {
    Accept: 'application/json',
  },
  data: {
    client_id: apiConfig.clientId,
    client_secret: apiConfig.clientSecret,
  },
});
export default client;
function getUrl(config) {
  if (config.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config.url;
}
// Intercept all request
client.interceptors.request.use(
  (config) => {
    console.log(
      `%c ${config.method.toUpperCase()} - ${getUrl(config)}:`,
      'color: #0086b3; font-weight: bold',
      config,
    );
    config.data = {...client.defaults.data, ...config.data};
    return config;
  },
  (error) => Promise.reject(error),
);
// Intercept all responses
client.interceptors.response.use(
  async (response) => {
    console.log(
      `%c ${response.status} - ${getUrl(response.config)}:`,
      'color: #008000; font-weight: bold',
      response,
    );
    return response;
  },
  (error) => {
    console.log(
      `%c ${error.response.status} - ${getUrl(error.response.config)}:`,
      'color: #a71d5d; font-weight: bold',
      error.response,
    );
    return Promise.reject(error);
  },
);
