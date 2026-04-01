import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { FadeInText } from './Animations';

const screenshots = [
  { src: '/info/screenshots/chat.png', title: { en: 'AI Chat', zh: '智能对话', ja: 'AIチャット' } },
  { src: '/info/screenshots/models.png', title: { en: 'Model Market', zh: '模型市场', ja: 'モデル市場' } },
  { src: '/info/screenshots/agents.png', title: { en: 'AI Agents', zh: 'AI 智能体', ja: 'AIエージェント' } },
  { src: '/info/screenshots/skills.png', title: { en: 'Skills', zh: '技能插件', ja: 'スキル' } },
  { src: '/info/screenshots/channels.png', title: { en: 'Channels', zh: '频道管理', ja: 'チャンネル' } },
  { src: '/info/screenshots/settings.png', title: { en: 'Settings', zh: '设置中心', ja: '設定' } },
  { src: '/info/screenshots/cron.png', title: { en: 'Scheduled Tasks', zh: '定时任务', ja: 'スケジュール' } },
  { src: '/info/screenshots/setup.png', title: { en: 'Quick Setup', zh: '快速配置', ja: 'クイック設定' } },
];

const ScreenshotCard: React.FC<{
  screenshot: typeof screenshots[0];
  index: number;
  language: 'en' | 'zh' | 'ja';
  onClick: () => void;
}> = ({ screenshot, index, language, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] cursor-pointer group"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative rounded-xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)]"
        style={{
          boxShadow: isHovered 
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="aspect-video relative overflow-hidden bg-[var(--color-bg-secondary)]">
          <img
            src={screenshot.src}
            alt={screenshot.title[language]}
            className="w-full h-full object-cover transition-transform duration-300"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-4"
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1, duration: 0.2 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Maximize2 className="w-4 h-4" />
              </motion.div>
              <span>{language === 'en' ? 'View' : language === 'ja' ? '表示' : '查看'}</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="p-4">
          <motion.h3 
            className="text-sm font-medium text-[var(--color-text-primary)]"
            animate={{ x: isHovered ? 5 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {screenshot.title[language]}
          </motion.h3>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)] origin-left"
        />
      </motion.div>
    </motion.div>
  );
};

const Lightbox: React.FC<{
  screenshot: typeof screenshots[0];
  language: 'en' | 'zh' | 'ja';
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ screenshot, language, onClose, onPrev, onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="max-w-5xl max-h-[80vh] rounded-xl overflow-hidden"
      >
        <img
          src={screenshot.src}
          alt={screenshot.title[language]}
          className="w-full h-full object-contain"
        />
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-black/50 text-center"
        >
          <h3 className="text-white font-medium">{screenshot.title[language]}</h3>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const Screenshots: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].screenshots;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="screenshots" className="section-padding relative overflow-hidden">
      <div className="container-custom">
        <FadeInText>
          <div className="text-center mb-12">
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
      </div>

      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-lg hover:border-[var(--color-border-hover)] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-lg hover:border-[var(--color-border-hover)] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-8 py-4 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {screenshots.map((screenshot, index) => (
            <ScreenshotCard
              key={screenshot.src}
              screenshot={screenshot}
              index={index}
              language={language}
              onClick={() => setSelectedScreenshot(index)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedScreenshot !== null && (
          <Lightbox
            screenshot={screenshots[selectedScreenshot]}
            language={language}
            onClose={() => setSelectedScreenshot(null)}
            onPrev={() => setSelectedScreenshot((prev) => (prev === 0 ? screenshots.length - 1 : prev! - 1))}
            onNext={() => setSelectedScreenshot((prev) => (prev === screenshots.length - 1 ? 0 : prev! + 1))}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
