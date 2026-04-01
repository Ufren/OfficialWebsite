import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { AppConfig } from '../config';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].footer;

  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center overflow-hidden">
                <img src="/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-lg font-bold text-[var(--color-text-primary)]">
                {AppConfig.name}
              </span>
            </motion.div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-4">
              {t.description}
            </p>
            <div className="flex gap-3">
              <motion.a
                href="https://github.com/Ufren/UfrenClaw"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              {t.product}
            </h4>
            <ul className="space-y-3">
              {Object.entries(t.links).map(([key, label]) => (
                <li key={key}>
                  <a
                    href={key === 'download' ? AppConfig.downloads.windows : `#${key}`}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              {t.resources}
            </h4>
            <ul className="space-y-3">
              {Object.entries(t.resourcesLinks).map(([key, label]) => (
                <li key={key}>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
              {t.legal}
            </h4>
            <ul className="space-y-3">
              {Object.entries(t.legalLinks).map(([key, label]) => (
                <li key={key}>
                  <a
                    href="#"
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} {AppConfig.name}. {t.copyright}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm text-[var(--color-text-muted)]">
            <a href={AppConfig.beian.icp.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">
              {AppConfig.beian.icp.number}
            </a>
            <a href={AppConfig.beian.police.link} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-text-primary)] transition-colors">
              {AppConfig.beian.police.number}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
