import React, { useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { themeStore, toggleTheme, Theme } from '../store/theme';

interface ThemeToggleProps {
  className?: string;
}

const getClipPath = (x: number, y: number, isDark: boolean): string => {
  const size = isDark ? 0 : Math.max(window.innerWidth, window.innerHeight) * 2;
  return `circle(${size}px at ${x}px ${y}px)`;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const theme = useStore(themeStore);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current && overlayRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      setPosition({ x, y });
      
      const overlay = overlayRef.current;
      overlay.style.clipPath = getClipPath(x, y, theme === 'dark');
      
      requestAnimationFrame(() => {
        overlay.style.transition = 'clip-path 0.6s ease-in-out';
        overlay.style.clipPath = getClipPath(x, y, theme === 'light');
      });
      
      setTimeout(() => {
        toggleTheme();
        overlay.style.transition = 'none';
        overlay.style.clipPath = getClipPath(x, y, true);
      }, 300);
    } else {
      toggleTheme();
    }
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={handleToggle}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 overflow-hidden ${className}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              initial={{ y: -20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: 20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Moon className="w-5 h-5 text-[var(--color-accent)]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0, rotate: 90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sun className="w-5 h-5 text-[var(--color-accent)]" />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, var(--color-accent-glow), transparent)`,
          }}
        />
      </motion.button>
      
      <div
        ref={overlayRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          backgroundColor: theme === 'dark' ? 'var(--color-bg-primary)' : 'var(--color-bg-primary)',
          clipPath: getClipPath(position.x, position.y, true),
        }}
      />
    </>
  );
};
