import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, Monitor, Apple, Terminal, Sparkles } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { AppConfig } from '../config';

const platforms = [
  { 
    id: 'windows', 
    label: { en: 'Windows', zh: 'Windows' },
    icon: Monitor,
    available: true,
    url: AppConfig.downloads.windows
  },
  { 
    id: 'mac', 
    label: { en: 'macOS', zh: 'macOS' },
    icon: Apple,
    available: false,
    url: AppConfig.downloads.mac
  },
  { 
    id: 'linux', 
    label: { en: 'Linux', zh: 'Linux' },
    icon: Terminal,
    available: false,
    url: AppConfig.downloads.linux
  },
];

export const CTA: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].cta;
  const [activePlatform, setActivePlatform] = useState('windows');
  const [isHovered, setIsHovered] = useState(false);

  const currentPlatform = platforms.find(p => p.id === activePlatform)!;
  const PlatformIcon = currentPlatform.icon;

  const handleDownload = () => {
    if (currentPlatform.available && currentPlatform.url !== '#') {
      window.location.href = currentPlatform.url;
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[var(--color-bg-secondary)]" />
          
          <div className="relative p-8 md:p-12 lg:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              {t.badge}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.h2
                key={language}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]"
              >
                {t.heading}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${language}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8"
              >
                {t.description}
              </motion.p>
            </AnimatePresence>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {platforms.map((platform) => {
                const Icon = platform.icon;
                return (
                  <motion.button
                    key={platform.id}
                    onClick={() => setActivePlatform(platform.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                      activePlatform === platform.id
                        ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)] border-[var(--color-accent)]'
                        : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-border-hover)]'
                    } ${!platform.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!platform.available}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{platform.label[language]}</span>
                    {!platform.available && (
                      <span className="text-xs opacity-60">({t.comingSoon})</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative inline-block"
            >
              <motion.button
                onClick={handleDownload}
                disabled={!currentPlatform.available}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 overflow-hidden ${
                  currentPlatform.available
                    ? 'bg-[var(--color-accent)] text-[var(--color-bg-primary)]'
                    : 'bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  animate={{ x: isHovered ? '100%' : '-100%' }}
                  transition={{ duration: 0.5 }}
                />
                
                <PlatformIcon className="w-6 h-6 relative z-10" />
                <span className="relative z-10">
                  {currentPlatform.available ? t.download : t.comingSoon}
                </span>
                {currentPlatform.available && (
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                )}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center justify-center gap-6 text-sm text-[var(--color-text-muted)]"
            >
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                {t.freeDownload}
              </span>
              <span>•</span>
              <span>v{AppConfig.version}</span>
              <span>•</span>
              <span>{t.noSignup}</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
