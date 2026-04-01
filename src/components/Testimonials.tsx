import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { TiltCard } from './Effects';
import { FadeInText, StaggerContainer, StaggerItem } from './Animations';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].testimonials;

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="container-custom">
        <FadeInText>
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]"
            >
              {t.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </FadeInText>

        <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((item, index) => (
            <StaggerItem key={index}>
              <TiltCard
                tiltMaxAngle={5}
                glareEnable={true}
                className="group relative p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-300 h-full"
              >
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-4"
                >
                  <Quote className="w-8 h-8 text-[var(--color-text-muted)] opacity-30" />
                </motion.div>
                
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {item.content || (item as any).description}
                </p>

                <div className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center"
                  >
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {item.avatar}
                    </span>
                  </motion.div>
                  <div>
                    <div className="font-medium text-[var(--color-text-primary)]">
                      {item.name}
                    </div>
                    <div className="text-sm text-[var(--color-text-muted)]">
                      {item.role}
                    </div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute top-4 right-4 flex gap-0.5"
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[var(--color-accent)] text-[var(--color-accent)]" />
                  ))}
                </motion.div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
