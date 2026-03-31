import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Download } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { AppConfig } from '../config';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex items-center justify-center bg-slate-900 rounded-lg border border-slate-800 shadow-lg shadow-cyan-900/20">
            <img src="/logo.png" alt="Logo" className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-100 tracking-tight">
            Ufren AI <span className="text-cyan-400">Desktop</span>
          </span>
        </div>

        {/* Actions Section */}
        <div className="flex items-center gap-4">
          {/* GitHub Link - Hidden on mobile, visible on tablet+ */}
          <a
            href="https://github.com/your-org/ufren" 
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>

          <LanguageSwitcher />

          {/* Download Button - Only visible when scrolled down */}
          <motion.a
            href={AppConfig.downloads.windows}
            initial={{ opacity: 0, width: 0 }}
            animate={{ 
                opacity: isScrolled ? 1 : 0,
                width: isScrolled ? 'auto' : 0,
                paddingLeft: isScrolled ? '1rem' : 0,
                paddingRight: isScrolled ? '1rem' : 0
            }}
            className="hidden md:flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-full h-9 overflow-hidden whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
};
