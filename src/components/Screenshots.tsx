import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';

const screenshots = [
  { src: '/info/screenshots/chat.png', title: { en: 'AI Chat', zh: '智能对话' } },
  { src: '/info/screenshots/models.png', title: { en: 'Model Market', zh: '模型市场' } },
  { src: '/info/screenshots/knowledge.png', title: { en: 'Knowledge Base', zh: '知识库' } },
  { src: '/info/screenshots/agents.png', title: { en: 'AI Agents', zh: 'AI 智能体' } },
  { src: '/info/screenshots/skills.png', title: { en: 'Skills', zh: '技能插件' } },
  { src: '/info/screenshots/channels.png', title: { en: 'Channels', zh: '频道管理' } },
  { src: '/info/screenshots/settings.png', title: { en: 'Settings', zh: '设置中心' } },
  { src: '/info/screenshots/cron.png', title: { en: 'Scheduled Tasks', zh: '定时任务' } },
  { src: '/info/screenshots/setup.png', title: { en: 'Quick Setup', zh: '快速配置' } },
];

const ScreenshotCard: React.FC<{
  screenshot: typeof screenshots[0];
  index: number;
  language: 'en' | 'zh';
  onClick: () => void;
}> = ({ screenshot, index, language, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="relative flex-shrink-0 w-[280px] md:w-[320px] lg:w-[360px] cursor-pointer group"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)]"
        style={{
          boxShadow: isHovered 
            ? '0 20px 40px -10px rgba(0, 212, 170, 0.2), 0 0 0 1px rgba(0, 212, 170, 0.3)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="aspect-video relative overflow-hidden">
          {!isLoaded && (
            <div className="absolute inset-0 bg-[var(--color-bg-secondary)] animate-pulse" />
          )}
          <motion.img
            src={screenshot.src}
            alt={screenshot.title[language]}
            className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4"
          >
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm"
            >
              <Maximize2 className="w-4 h-4" />
              <span>{language === 'en' ? 'View' : '查看'}</span>
            </motion.div>
          </motion.div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-[var(--color-text-primary)]">
            {screenshot.title[language]}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Lightbox: React.FC<{
  screenshot: typeof screenshots[0];
  language: 'en' | 'zh';
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ screenshot, language, onClose, onPrev, onNext }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8"
      onClick={onClose}
    >
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </motion.button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative max-w-5xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={screenshot.src}
          alt={screenshot.title[language]}
          className="w-full h-auto rounded-lg shadow-2xl"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
          <h3 className="text-white text-lg font-medium">
            {screenshot.title[language]}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Screenshots: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].screenshots;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 380;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + screenshots.length) % screenshots.length);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % screenshots.length);
    }
  };

  React.useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => ref.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <section id="screenshots" className="section-padding relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={language}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[var(--color-text-primary)]">
                {t.heading}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                {t.subheading}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="relative">
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-lg hover:border-[var(--color-accent)] transition-colors"
              style={{ transform: 'translateY(-50%) translateX(-50%)' }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-4 -mx-4"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {screenshots.map((screenshot, index) => (
              <div key={screenshot.src} style={{ scrollSnapAlign: 'start' }}>
                <ScreenshotCard
                  screenshot={screenshot}
                  index={index}
                  language={language}
                  onClick={() => setSelectedIndex(index)}
                />
              </div>
            ))}
          </div>

          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-lg hover:border-[var(--color-accent)] transition-colors"
              style={{ transform: 'translateY(-50%) translateX(50%)' }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-2 mt-8"
        >
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * 380,
                    behavior: 'smooth',
                  });
                }
              }}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: index === 0 ? 'var(--color-accent)' : 'var(--color-border)',
              }}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            screenshot={screenshots[selectedIndex]}
            language={language}
            onClose={() => setSelectedIndex(null)}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
