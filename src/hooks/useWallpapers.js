import { useState, useEffect, useCallback, useRef } from 'react';
import { birdApi } from '../services/birdApi';
import { fetchBingData, filterByMonth } from '../services/bingService';
import { fetch360Category } from '../services/qingService';

const LOADING_TIMEOUT = 15000;

export const useWallpapers = (source = 'bird', categoryId = null, initialPage = 1, count = 12, month = 'all') => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(initialPage);
  const allDataRef = useRef([]);
  const abortRef = useRef(null);
  const loadingTimerRef = useRef(null);
  const mountedRef = useRef(true);

  const clearLoadingTimeout = useCallback(() => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  }, []);

  const fetchWallpapers = useCallback(async (pageNum, append = false) => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    const controller = new AbortController();
    abortRef.current = controller;

    if (!append) {
      setWallpapers([]);
    }
    setLoading(true);
    setError(null);

    clearLoadingTimeout();
    loadingTimerRef.current = setTimeout(() => {
      if (mountedRef.current) {
        setError('请求超时，请检查网络后重试');
        setLoading(false);
        controller.abort();
      }
    }, LOADING_TIMEOUT);

    try {
      let data;

      if (source === 'bird') {
        data = await birdApi.getByCategory(categoryId, pageNum, count, controller.signal);
      } else if (source === 'bing') {
        if (allDataRef.current.length === 0) {
          allDataRef.current = await fetchBingData(controller.signal);
        }
        const filtered = filterByMonth(allDataRef.current, month);
        data = {
          data: {
            list: filtered.slice(0, pageNum * count),
            total_count: filtered.length,
          }
        };
      } else if (source === 'qing') {
        if (allDataRef.current.length === 0) {
          allDataRef.current = await fetch360Category(categoryId, controller.signal);
        }
        data = {
          data: {
            list: allDataRef.current.slice(0, pageNum * count),
            total_count: allDataRef.current.length,
          }
        };
      }

      if (!mountedRef.current) return;
      clearLoadingTimeout();

      if (data && data.data) {
        const newWallpapers = data.data.list || [];

        if (source === 'bird') {
          if (append) {
            setWallpapers(prev => {
              const existingIds = new Set(prev.map(w => w.id));
              const uniqueNew = newWallpapers.filter(w => !existingIds.has(w.id));
              return [...prev, ...uniqueNew];
            });
          } else {
            setWallpapers(newWallpapers);
          }
          setHasMore(newWallpapers.length === count);
        } else {
          setWallpapers(newWallpapers);
          const total = data.data.total_count || 0;
          setHasMore(pageNum * count < total);
        }
      } else {
        if (!append) setWallpapers([]);
        setHasMore(false);
      }
    } catch (err) {
      if (!mountedRef.current) return;
      if (err.name === 'AbortError' || err.code === 'ERR_CANCELED') return;
      clearLoadingTimeout();
      setError(err.message || '加载失败');
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [source, categoryId, count, month, clearLoadingTimeout]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      fetchWallpapers(nextPage, true);
    }
  }, [loading, hasMore, fetchWallpapers]);

  const refresh = useCallback(() => {
    pageRef.current = 1;
    allDataRef.current = [];
    setError(null);
    setHasMore(true);
    fetchWallpapers(1, false);
  }, [fetchWallpapers]);

  useEffect(() => {
    mountedRef.current = true;
    pageRef.current = initialPage;
    allDataRef.current = [];
    clearLoadingTimeout();
    queueMicrotask(() => fetchWallpapers(initialPage, false));

    return () => {
      mountedRef.current = false;
      clearLoadingTimeout();
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, categoryId, month]);

  return {
    wallpapers,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
