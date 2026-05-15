import { useState, useEffect, useCallback, useRef } from 'react';
import { birdApi } from '../services/birdApi';

const SEARCH_TIMEOUT = 15000;

export const useSearch = (initialKeyword = '', count = 12) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debounceTimer = useRef(null);
  const loadingTimerRef = useRef(null);
  const abortRef = useRef(null);
  const mountedRef = useRef(true);

  const clearLoadingTimeout = useCallback(() => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
  }, []);

  const performSearch = useCallback(async (searchKeyword, pageNum, append = false) => {
    if (!searchKeyword.trim()) {
      setResults([]);
      setHasMore(false);
      return;
    }

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
        setError('搜索超时，请检查网络后重试');
        setLoading(false);
        controller.abort();
      }
    }, SEARCH_TIMEOUT);

    try {
      const data = await birdApi.search(searchKeyword, pageNum, count, controller.signal);

      if (!mountedRef.current) return;

      clearLoadingTimeout();

      if (data && data.data && data.data.list) {
        const newResults = data.data.list;

        if (append) {
          setResults(prev => {
            const existingIds = new Set(prev.map(r => r.id));
            const uniqueNew = newResults.filter(r => !existingIds.has(r.id));
            return [...prev, ...uniqueNew];
          });
        } else {
          setResults(newResults);
        }

        setHasMore(newResults.length === count);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      if (!mountedRef.current) return;
      if (err.name === 'AbortError' || err.code === 'ERR_CANCELED') return;
      clearLoadingTimeout();
      setError(err.message || '搜索失败');
      console.error('Error searching:', err);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [count, clearLoadingTimeout]);

  const search = useCallback((newKeyword) => {
    setKeyword(newKeyword);
    setPage(1);
    setResults([]);
    setError(null);
    setHasMore(true);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      performSearch(newKeyword, 1, false);
    }, 500);
  }, [performSearch]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore && keyword.trim()) {
      const nextPage = page + 1;
      setPage(nextPage);
      performSearch(keyword, nextPage, true);
    }
  }, [page, loading, hasMore, keyword, performSearch]);

  const clear = useCallback(() => {
    setKeyword('');
    setResults([]);
    setPage(1);
    setHasMore(true);
    setError(null);

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    clearLoadingTimeout();
    if (abortRef.current) {
      abortRef.current.abort();
    }
  }, [clearLoadingTimeout]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      clearLoadingTimeout();
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [clearLoadingTimeout]);

  return {
    keyword,
    results,
    loading,
    error,
    hasMore,
    search,
    loadMore,
    clear,
  };
};
