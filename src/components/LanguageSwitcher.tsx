import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore, languages, setLanguage, type Language } from '../store/language';
import { Globe, Check } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const currentLang = useStore(languageStore);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLanguage = languages.find(l => l.code === currentLang)!;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
      >
        <Globe className="w-4 h-4 text-[var(--color-text-secondary)]" />
        <span className="text-sm font-medium text-[var(--color-text-primary)]">
          {currentLanguage.flag} {currentLanguage.name}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-40 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-lg overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                whileHover={{ backgroundColor: 'var(--color-bg-secondary)' }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                  currentLang === lang.code ? 'bg-[var(--color-bg-secondary)]' : ''
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{lang.flag}</span>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    {lang.name}
                  </span>
                </span>
                {currentLang === lang.code && (
                  <Check className="w-4 h-4 text-[var(--color-text-secondary)]" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
