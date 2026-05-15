import zh from './zh';
import en from './en';

const locales = { zh, en };

export function t(lang, path) {
  const keys = path.split('.');
  let value = locales[lang];
  for (const key of keys) {
    if (value == null) return path;
    value = value[key];
  }
  return value ?? path;
}

export const languages = {
  zh: '中文',
  en: 'English',
};
