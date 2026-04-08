import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { AppConfig } from '../config';
import { MagneticButton, RippleEffect, ShimmerButton } from './Effects';
import { CountUp, FadeInText, FloatingElement, TextReveal } from './Animations';
import { SpotlightArea } from './Spotlight';
import { ProductMockup } from './ProductMockup';
import { MorphingBlob } from './MorphingBlob';
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
          <FadeInText delay={0}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] mb-8"
            >
              <FloatingElement duration={2} distance={3}>
                <Sparkles className="w-4 h-4 text-[var(--color-text-secondary)]" />
              </FloatingElement>
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">
                {t.badge}
              </span>
            </motion.div>
          </FadeInText>

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
              className="relative overflow-hidden"
            >
              <ShimmerButton
                className="font-semibold text-lg"
                shimmerColor="rgba(255, 255, 255, 0.25)"
                shimmerDuration="3s"
                background="var(--color-accent)"
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Download className="w-5 h-5 text-[var(--color-bg-primary)]" />
                </motion.div>
                <span className="text-[var(--color-bg-primary)]">{t.buttons.primary}</span>
                <ArrowRight className="w-5 h-5 text-[var(--color-bg-primary)] group-hover:translate-x-1 transition-transform" />
              </ShimmerButton>
            </MagneticButton>

            <MagneticButton
              href="https://github.com/Ufren/UfrenClaw"
              className="relative overflow-hidden"
            >
              <RippleEffect className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] font-semibold text-lg hover:border-[var(--color-border-hover)] transition-colors">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Github className="w-5 h-5" />
                </motion.div>
                {t.buttons.secondary}
              </RippleEffect>
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 flex items-center justify-center gap-8 md:gap-16"
          >
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                <CountUp end={10} suffix="K+" />
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">{t.stats.users}</div>
            </motion.div>
            <motion.div
              className="w-px h-12 bg-[var(--color-border)]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                <CountUp end={4.9} duration={2.5} />
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">{t.stats.rating}</div>
            </motion.div>
            <motion.div
              className="w-px h-12 bg-[var(--color-border)]"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                <CountUp end={7} suffix="+" />
              </div>
              <div className="text-sm text-[var(--color-text-muted)]">{t.stats.platforms}</div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-16 max-w-3xl mx-auto relative"
        >
          <MorphingBlob className="absolute inset-0" />
          <ProductMockup />
        </motion.div>
      </div>

      <FloatingElement duration={4} distance={15} delay={0} className="absolute top-1/4 left-10 opacity-20">
        <div className="w-2 h-2 rounded-full bg-[var(--color-text-muted)]" />
      </FloatingElement>
      <FloatingElement duration={5} distance={20} delay={1} className="absolute top-1/3 right-20 opacity-20">
        <div className="w-3 h-3 rounded-full bg-[var(--color-text-muted)]" />
      </FloatingElement>
      <FloatingElement duration={3.5} distance={12} delay={0.5} className="absolute bottom-1/4 left-1/4 opacity-20">
        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-muted)]" />
      </FloatingElement>
    </section>
  );
};
