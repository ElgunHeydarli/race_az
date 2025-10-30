import {
  LANG_STORAGE_KEY,
  Language,
  languages,
  VALID_LANGUAGES,
} from '@/types/languages';
import { create } from 'zustand';

interface IUseChangeLang {
  lang: string;
  changeLang: (lang: Language) => void;
}

const getInitialLanguage = (): string => {
  const storedLang = localStorage.getItem(LANG_STORAGE_KEY);
  if (storedLang && VALID_LANGUAGES.includes(storedLang)) {
    return storedLang;
  }
  return languages[0].code;
};
export const useChangeLang = create<IUseChangeLang>((set) => ({
  lang: getInitialLanguage(),

  changeLang: (lang: Language) => {
    if (VALID_LANGUAGES.includes(lang.code)) {
      localStorage.setItem(LANG_STORAGE_KEY, lang.code);
      set({ lang: lang.code });
    } else {
      const defaultLang = languages[0];
      localStorage.setItem(LANG_STORAGE_KEY, defaultLang.code);
      set({ lang: defaultLang.code });
    }
  },
}));
