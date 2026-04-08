import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { AppConfig } from '../config';
import { MagneticButton, RippleEffect, ShimmerButton } from './Effects';
import { FadeInText, FloatingElement } from './Animations';
import { BorderBeam } from './BorderBeam';
import { Download, ArrowRight, Sparkles } from 'lucide-react';

export const CTA: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].cta;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-secondary)] border border-[var(--color-border)] p-12 md:p-16 text-center overflow-hidden"
        >
          <BorderBeam
            size={250}
            duration={12}
            borderWidth={1}
            colorFrom="var(--color-text-secondary)"
            colorTo="transparent"
          />

          <div className="absolute inset-0 overflow-hidden">
            <FloatingElement duration={6} distance={30} delay={0} className="absolute -top-10 -left-10">
              <div className="w-40 h-40 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
            </FloatingElement>
            <FloatingElement duration={8} distance={40} delay={2} className="absolute -bottom-10 -right-10">
              <div className="w-60 h-60 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />
            </FloatingElement>
          </div>

          <div className="relative z-10">
            <FadeInText delay={0}>
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-accent)] mb-6"
              >
                <Sparkles className="w-8 h-8 text-[var(--color-bg-primary)]" />
              </motion.div>
            </FadeInText>

            <FadeInText delay={0.1}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                {t.heading}
              </h2>
            </FadeInText>

            <FadeInText delay={0.2}>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
                {t.description}
              </p>
            </FadeInText>

            <FadeInText delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                    <span className="text-[var(--color-bg-primary)]">{t.freeDownload || t.download}</span>
                    <ArrowRight className="w-5 h-5 text-[var(--color-bg-primary)]" />
                  </ShimmerButton>
                </MagneticButton>
              </div>
            </FadeInText>

            <FadeInText delay={0.4}>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-6 text-sm text-[var(--color-text-muted)]"
              >
                {t.noSignup}
              </motion.p>
            </FadeInText>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
