import { atom } from 'nanostores';

export type Language = 'en' | 'zh' | 'ja';

export const languageStore = atom<Language>('zh');

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

export const setLanguage = (lang: Language) => {
  languageStore.set(lang);
};
