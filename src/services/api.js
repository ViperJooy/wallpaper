import axios from 'axios';
import { toSecureImageUrl } from '../utils/imageUrl';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://wp.shanhutech.cn/intf',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function upgradeHttpUrls(obj) {
  if (typeof obj === 'string') {
    return toSecureImageUrl(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(upgradeHttpUrls);
  }
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = upgradeHttpUrls(obj[key]);
    }
    return result;
  }
  return obj;
}

apiClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data && response.data.data.list) {
      response.data = upgradeHttpUrls(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
