import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { AppConfig } from '../config';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MagneticButton, RippleEffect } from './Effects';
import { Menu, X, Download, Moon, Sun } from 'lucide-react';

export const Navbar: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    window.addEventListener('scroll', handleScroll);
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
    setIsDark(newDark);
  };

  const navItems = [
    { label: t.features, href: '#features' },
    { label: t.screenshots, href: '#screenshots' },
    { label: t.testimonials, href: '#testimonials' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-b border-[var(--color-border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <motion.a
            href="#"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-lg font-bold text-[var(--color-text-primary)]">
              {AppConfig.name}
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </motion.button>

            <MagneticButton
              href={AppConfig.downloads.windows}
              className="relative overflow-hidden"
            >
              <RippleEffect className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors">
                <Download className="w-4 h-4" />
                {t.download}
              </RippleEffect>
            </MagneticButton>
          </div>

          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="md:hidden w-10 h-10 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-primary)]"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[var(--color-bg-primary)] border-b border-[var(--color-border)]"
          >
            <div className="container-custom py-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                <LanguageSwitcher />
                
                <motion.button
                  onClick={toggleTheme}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)]"
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.button>

                <a
                  href={AppConfig.downloads.windows}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg-primary)] text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  {t.download}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
