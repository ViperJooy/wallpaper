import { useState, useEffect, useCallback, useRef } from 'react';
import { birdApi } from '../services/birdApi';

export const useSearch = (initialKeyword = '', count = 12) => {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const debounceTimer = useRef(null);

  const performSearch = useCallback(async (searchKeyword, pageNum, append = false) => {
    if (!searchKeyword.trim()) {
      setResults([]);
      setHasMore(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await birdApi.search(searchKeyword, pageNum, count);

      if (data && data.data) {
        const newResults = data.data;

        if (append) {
          setResults(prev => [...prev, ...newResults]);
        } else {
          setResults(newResults);
        }

        setHasMore(newResults.length === count);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError(err.message || '搜索失败');
      console.error('Error searching:', err);
    } finally {
      setLoading(false);
    }
  }, [count]);

  const search = useCallback((newKeyword) => {
    setKeyword(newKeyword);
    setPage(1);
    setResults([]);
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
  }, []);

  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

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
