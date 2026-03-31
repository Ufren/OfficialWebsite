import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { AppConfig } from '../config';
import { MagneticButton, RippleEffect } from './Effects';
import { ArrowRight, Download, Github, Sparkles } from 'lucide-react';

const TypewriterText: React.FC<{ text: string; delay?: number; className?: string }> = ({
  text,
  delay = 0,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 80);
    return () => clearInterval(interval);
  }, [text, started]);

  return <span className={className}>{displayText}</span>;
};

export const Hero: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].hero;

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] mb-8"
          >
            <Sparkles className="w-4 h-4 text-[var(--color-text-secondary)]" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)]">
              {t.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <TypewriterText
              text={t.title}
              delay={0.3}
              className="gradient-text"
            />
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.h2
              key={`subtitle-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6 text-[var(--color-text-secondary)]"
            >
              {t.subtitle.prefix}
              <span className="text-[var(--color-text-primary)] font-semibold">
                {t.subtitle.highlight}
              </span>
              {t.subtitle.suffix}
            </motion.h2>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`desc-${language}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {t.description}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton
              href={AppConfig.downloads.windows}
              className="group relative overflow-hidden"
            >
              <RippleEffect className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg-primary)] font-semibold text-lg hover:bg-[var(--color-accent-hover)] transition-colors">
                <Download className="w-5 h-5" />
                {t.buttons.primary}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </RippleEffect>
            </MagneticButton>

            <MagneticButton
              href="https://github.com/ufren-ai/ufren"
              className="relative overflow-hidden"
            >
              <RippleEffect className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold text-lg hover:border-[var(--color-border-hover)] transition-colors">
                <Github className="w-5 h-5" />
                {t.buttons.secondary}
              </RippleEffect>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex items-center justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">10K+</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t.stats.users}</div>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)]" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">4.9</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t.stats.rating}</div>
            </div>
            <div className="w-px h-12 bg-[var(--color-border)]" />
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">7+</div>
              <div className="text-sm text-[var(--color-text-muted)]">{t.stats.platforms}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
