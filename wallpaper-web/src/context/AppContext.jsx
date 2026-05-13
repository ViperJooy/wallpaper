import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [dataSource, setDataSource] = useState('bird');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const addSearchHistory = (keyword) => {
    if (!keyword.trim()) return;

    const newHistory = [
      keyword,
      ...searchHistory.filter(item => item !== keyword)
    ].slice(0, 10);

    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const value = {
    dataSource,
    setDataSource,
    searchKeyword,
    setSearchKeyword,
    currentCategory,
    setCurrentCategory,
    searchHistory,
    addSearchHistory,
    clearSearchHistory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
