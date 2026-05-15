import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themes, defaultTheme } from '../theme/theme';
import { t as translate } from '../i18n';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('theme') || 'forest';
  });
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('lang') || 'zh';
  });
  const [searchKeyword, setSearchKeyword] = useState('');

  const t = useCallback((path) => translate(lang, path), [lang]);
  const toggleLang = useCallback(() => {
    setLang(prev => {
      const next = prev === 'zh' ? 'en' : 'zh';
      localStorage.setItem('lang', next);
      return next;
    });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => {
      const next = !prev;
      localStorage.setItem('darkMode', String(next));
      return next;
    });
  }, []);

  const currentThemeKey = darkMode ? `${themeName}Dark` : themeName;
  const currentTheme = useMemo(() => themes[currentThemeKey] || defaultTheme, [currentThemeKey]);

  const handleSetTheme = useCallback((name) => {
    setThemeName(name);
    localStorage.setItem('theme', name);
  }, []);

  const [currentCategory, setCurrentCategory] = useState(null);
  const [searchHistory, setSearchHistory] = useState(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const addSearchHistory = useCallback((keyword) => {
    if (!keyword.trim()) return;
    setSearchHistory(prev => {
      const newHistory = [keyword, ...prev.filter(item => item !== keyword)].slice(0, 10);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  }, []);

  const value = {
    themeName,
    setThemeName: handleSetTheme,
    darkMode,
    toggleDarkMode,
    lang,
    toggleLang,
    t,
    searchKeyword,
    setSearchKeyword,
    currentCategory,
    setCurrentCategory,
    searchHistory,
    addSearchHistory,
    clearSearchHistory,
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </ThemeProvider>
  );
};
