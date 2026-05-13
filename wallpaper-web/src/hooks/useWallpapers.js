import { useState, useEffect, useCallback } from 'react';
import { birdApi } from '../services/birdApi';

export const useWallpapers = (categoryId, initialPage = 1, count = 12) => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const fetchWallpapers = useCallback(async (pageNum, append = false) => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      const data = await birdApi.getByCategory(categoryId, pageNum, count);

      if (data && data.data) {
        const newWallpapers = data.data;

        if (append) {
          setWallpapers(prev => [...prev, ...newWallpapers]);
        } else {
          setWallpapers(newWallpapers);
        }

        setHasMore(newWallpapers.length === count);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message || '加载失败');
      console.error('Error fetching wallpapers:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId, count, loading]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchWallpapers(nextPage, true);
    }
  }, [page, loading, hasMore, fetchWallpapers]);

  const refresh = useCallback(() => {
    setPage(1);
    setWallpapers([]);
    setHasMore(true);
    fetchWallpapers(1, false);
  }, [fetchWallpapers]);

  useEffect(() => {
    fetchWallpapers(page, false);
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
