import { atom } from 'nanostores';

export type Language = 'en' | 'zh';

export const languageStore = atom<Language>('zh'); // Default to Chinese as per context implying Chinese user

export const toggleLanguage = () => {
  const current = languageStore.get();
  languageStore.set(current === 'en' ? 'zh' : 'en');
};
