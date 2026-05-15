import { useState, useEffect, useCallback, useRef } from 'react';
import { birdApi } from '../services/birdApi';

const LOADING_TIMEOUT = 15000;

export const useWallpapers = (categoryId, initialPage = 1, count = 12) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(initialPage);
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
      const data = await birdApi.getByCategory(categoryId, pageNum, count, controller.signal);

      if (!mountedRef.current) return;

      clearLoadingTimeout();

      if (data && data.data && data.data.list) {
        const newWallpapers = data.data.list;

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
  }, [categoryId, count, clearLoadingTimeout]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      fetchWallpapers(nextPage, true);
    }
  }, [loading, hasMore, fetchWallpapers]);

  const refresh = useCallback(() => {
    pageRef.current = 1;
    setWallpapers([]);
    setError(null);
    setHasMore(true);
    fetchWallpapers(1, false);
  }, [fetchWallpapers]);

  useEffect(() => {
    mountedRef.current = true;
    pageRef.current = initialPage;
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
  }, [categoryId]);

  return {
    wallpapers,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
  };
};
