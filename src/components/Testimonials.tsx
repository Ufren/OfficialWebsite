import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { TiltCard } from './Effects';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].testimonials;

  return (
    <section id="testimonials" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
            {t.title}
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard
                tiltMaxAngle={5}
                glareEnable={true}
                className="group relative p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-300 h-full"
              >
                <Quote className="w-8 h-8 text-[var(--color-text-muted)] opacity-30 mb-4" />
                
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6">
                  {item.content || (item as any).description}
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">
                      {item.avatar}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-[var(--color-text-primary)]">
                      {item.name}
                    </div>
                    <div className="text-sm text-[var(--color-text-muted)]">
                      {item.role}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
