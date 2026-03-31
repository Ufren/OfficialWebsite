import { atom, onMount } from 'nanostores';

export type Theme = 'light' | 'dark';

export const themeStore = atom<Theme>('dark');

if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  themeStore.set(initialTheme);
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
}

export const toggleTheme = () => {
  const currentTheme = themeStore.get();
  const newTheme: Theme = currentTheme === 'dark' ? 'light' : 'dark';
  themeStore.set(newTheme);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  }
};

export const setTheme = (theme: Theme) => {
  themeStore.set(theme);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
};
