import React from 'react';
import axios from 'axios';
import config from '@/config';

export default () => {
  const api = React.useCallback((token) => {
    return axios.create({
      baseURL: config.baseUrl,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }, []);

  return {API: api};
};
