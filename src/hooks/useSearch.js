import { useState, useEffect, useCallback, useRef } from 'react';
import { birdApi } from '../services/birdApi';
import { fetchBingData, searchBing } from '../services/bingService';
import { fetch360Category, search360List } from '../services/qingService';

const SEARCH_TIMEOUT = 15000;

export const useSearch = (source = 'bird', categoryId = null, initialKeyword = '', count = 12) => {
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
  const allDataRef = useRef([]);

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
      let data;

      if (source === 'bird') {
        data = await birdApi.search(searchKeyword, pageNum, count, controller.signal);
      } else if (source === 'bing') {
        if (allDataRef.current.length === 0) {
          allDataRef.current = await fetchBingData(controller.signal);
        }
        const filtered = searchBing(allDataRef.current, searchKeyword);
        data = {
          data: {
            list: filtered.slice(0, pageNum * count),
            total_count: filtered.length,
          }
        };
      } else if (source === 'qing') {
        if (allDataRef.current.length === 0) {
          const catId = categoryId || 36;
          allDataRef.current = await fetch360Category(catId, controller.signal);
        }
        const filtered = search360List(allDataRef.current, searchKeyword);
        data = {
          data: {
            list: filtered.slice(0, pageNum * count),
            total_count: filtered.length,
          }
        };
      }

      if (!mountedRef.current) return;
      clearLoadingTimeout();

      if (data && data.data) {
        const newResults = data.data.list || [];
        const total = data.data.total_count || 0;

        if (append) {
          setResults(prev => {
            const existingIds = new Set(prev.map(r => r.id));
            const uniqueNew = newResults.filter(r => !existingIds.has(r.id));
            return [...prev, ...uniqueNew];
          });
        } else {
          setResults(newResults);
        }
        setHasMore(pageNum * count < total);
      } else {
        if (!append) setResults([]);
        setHasMore(false);
      }
    } catch (err) {
      if (!mountedRef.current) return;
      if (err.name === 'AbortError' || err.code === 'ERR_CANCELED') return;
      clearLoadingTimeout();
      setError(err.message || '搜索失败');
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  }, [source, categoryId, count, clearLoadingTimeout]);

  const search = useCallback((newKeyword) => {
    setKeyword(newKeyword);
    setPage(1);
    setResults([]);
    allDataRef.current = [];
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
    allDataRef.current = [];
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
