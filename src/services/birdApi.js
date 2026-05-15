import apiClient from './api';

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

const getCacheKey = (endpoint, params) => {
  return `${endpoint}-${JSON.stringify(params)}`;
};

const getFromCache = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const birdApi = {
  async getByCategory(categoryId, page = 1, count = 12, signal = null) {
    const cacheKey = getCacheKey('GetListByCategory', { categoryId, page, count });
    const cached = getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get('/GetListByCategory', {
      params: {
        cids: categoryId,
        pageno: page,
        count,
      },
      signal,
    });

    setCache(cacheKey, response.data);
    return response.data;
  },

  async search(keyword, page = 1, count = 12, signal = null) {
    const cacheKey = getCacheKey('search', { keyword, page, count });
    const cached = getFromCache(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await apiClient.get('/search', {
      params: {
        content: keyword,
        pageno: page,
        count,
      },
      signal,
    });

    setCache(cacheKey, response.data);
    return response.data;
  },
};
