import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { TiltCard } from './Effects';
import { FadeInText, StaggerContainer, StaggerItem } from './Animations';
import { Rocket, MessageSquare, Cpu, Brain, Plug, Wrench, Clock, Settings, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  MessageSquare,
  Cpu,
  Brain,
  Plug,
  Wrench,
  Clock,
  Settings,
};

export const Features: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].modules;

  return (
    <section id="features" className="section-padding relative">
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

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.items.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Rocket;
            return (
              <StaggerItem key={index}>
                <TiltCard
                  tiltMaxAngle={6}
                  glareEnable={true}
                  className="group relative p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all duration-300 h-full"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
                  >
                    <IconComponent className="w-6 h-6 text-[var(--color-text-primary)]" />
                  </motion.div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {item.subtitle}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {item.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--color-accent)]/5 to-transparent pointer-events-none"
                  />
                </TiltCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};
