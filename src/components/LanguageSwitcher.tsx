import React from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { languageStore, toggleLanguage } from '../store/language';
import { Languages } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

export const LanguageSwitcher = ({ className }: Props) => {
  const language = useStore(languageStore);

  return (
    <motion.button
      onClick={toggleLanguage}
      className={twMerge(
        "flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all group",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Languages className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
      <div className="relative w-12 h-5 overflow-hidden font-medium text-sm">
        <AnimatePresence mode="wait">
          <motion.span
            key={language}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {language === 'en' ? 'EN / 中' : '中 / EN'}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  );
};
