import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { FadeInText, ScaleOnScroll } from './Animations';
import { ArrowRight, Zap, Shield, Globe, Code, Lock } from 'lucide-react';

export const DeepDive: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].deepdive;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  return (
    <section ref={containerRef} className="section-padding relative overflow-hidden">
      <motion.div 
        style={{ y, opacity }}
        className="container-custom"
      >
        <div className="max-w-6xl mx-auto">
          <FadeInText>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                {t.title}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>
          </FadeInText>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScaleOnScroll>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative p-8 rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-border)] overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-transparent" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center"
                    >
                      <Code className="w-6 h-6 text-[var(--color-bg-primary)]" />
                    </motion.div>
                    <div>
                      <span className="text-xs text-[var(--color-accent)] font-medium">{t.opencode.badge}</span>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                        {t.opencode.title}
                      </h3>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[var(--color-text-secondary)] mb-6 leading-relaxed"
                  >
                    {t.opencode.description}
                  </motion.p>

                  <div className="space-y-3">
                    {t.opencode.features.map((feature: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <Zap className="w-4 h-4 text-[var(--color-accent)]" />
                        <span className="text-sm text-[var(--color-text-secondary)]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScaleOnScroll>

            <ScaleOnScroll>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative p-8 rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-border)] overflow-hidden h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/5 via-transparent to-transparent" />
                
                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-12 h-12 rounded-xl bg-[var(--color-accent)] flex items-center justify-center"
                    >
                      <Lock className="w-6 h-6 text-[var(--color-bg-primary)]" />
                    </motion.div>
                    <div>
                      <span className="text-xs text-[var(--color-accent)] font-medium">{t.privacy.badge}</span>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                        {t.privacy.title}
                      </h3>
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-[var(--color-text-secondary)] mb-6 leading-relaxed"
                  >
                    {t.privacy.description}
                  </motion.p>

                  <div className="space-y-3">
                    {t.privacy.features.map((feature: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <Shield className="w-4 h-4 text-[var(--color-accent)]" />
                        <span className="text-sm text-[var(--color-text-secondary)]">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </ScaleOnScroll>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
