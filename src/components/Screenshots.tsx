import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X, Pause, Play } from 'lucide-react';
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

const ShimmerOverlay: React.FC<{ isHovered: boolean }> = ({ isHovered }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none z-10 overflow-hidden rounded-xl"
    initial={false}
    animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <motion.div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
        backgroundSize: '200% 100%',
      }}
      animate={isHovered ? { backgroundPosition: ['200% 0', '-200% 0'] } : {}}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    />
  </motion.div>
);

const SpotlightOnCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(120,120,120,0.06), transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
};

const ScreenshotCard: React.FC<{
  screenshot: typeof screenshots[0];
  index: number;
  language: 'en' | 'zh' | 'ja';
  isActive: boolean;
  onClick: () => void;
}> = ({ screenshot, index, language, isActive, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex-shrink-0 cursor-pointer"
      style={{ perspective: '1000px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isActive ? 1.05 : 1,
          y: isActive ? -12 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-[280px] md:w-[320px] lg:w-[360px] rounded-xl overflow-hidden bg-[var(--color-bg-card)] border border-[var(--color-border)]"
      >
        <SpotlightOnCard>
          <div
            className="aspect-video relative overflow-hidden bg-[var(--color-bg-secondary)]"
            style={{ transform: 'translateZ(0px)' }}
          >
            <motion.img
              src={screenshot.src}
              alt={screenshot.title[language]}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            <ShimmerOverlay isHovered={isHovered} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end justify-center pb-4"
            >
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0 }}
                transition={{ delay: 0.05, duration: 0.2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-white text-sm font-medium border border-white/10"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  <Maximize2 className="w-4 h-4" />
                </motion.div>
                <span>{language === 'en' ? 'View' : language === 'ja' ? '表示' : '查看'}</span>
              </motion.div>
            </motion.div>

            {isActive && (
              <motion.div
                layoutId="active-indicator"
                className="absolute top-3 right-3 px-2 py-1 rounded-md bg-white/15 backdrop-blur-md text-white text-xs font-medium border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                {language === 'en' ? 'Active' : language === 'ja' ? 'アクティブ' : '当前'}
              </motion.div>
            )}
          </div>
        </SpotlightOnCard>

        <div className="p-4 relative">
          <motion.h3
            className="text-sm font-medium text-[var(--color-text-primary)]"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {screenshot.title[language]}
          </motion.h3>
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: 'linear-gradient(90deg, var(--color-text-primary), var(--color-text-muted))',
              transformOrigin: 'left',
            }}
          />
        </div>

        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            boxShadow: isHovered
              ? '0 25px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(120,120,120,0.1)'
              : isActive
              ? '0 15px 30px -8px rgba(0,0,0,0.15), 0 0 0 1px rgba(120,120,120,0.08)'
              : '0 4px 6px -1px rgba(0,0,0,0.1)',
            transition: 'box-shadow 0.3s ease',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const ProgressDots: React.FC<{
  total: number;
  current: number;
  onSelect: (index: number) => void;
}> = ({ total, current, onSelect }) => (
  <div className="flex items-center justify-center gap-2 mt-8">
    {Array.from({ length: total }).map((_, i) => (
      <motion.button
        key={i}
        onClick={() => onSelect(i)}
        className="relative rounded-full overflow-hidden"
        whileHover={{ scale: 1.3 }}
        whileTap={{ scale: 0.9 }}
        style={{ width: i === current ? 24 : 8, height: 8 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: i === current
              ? 'var(--color-text-primary)'
              : 'var(--color-border)',
          }}
          transition={{ duration: 0.3 }}
        />
        {i === current && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'var(--color-text-primary)' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 5, ease: 'linear' }}
            onAnimationComplete={() => onSelect((current + 1) % total)}
          />
        )}
      </motion.button>
    ))}
  </div>
);

const AutoPlayControl: React.FC<{
  isPlaying: boolean;
  onToggle: () => void;
}> = ({ isPlaying, onToggle }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={onToggle}
    className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[var(--color-bg-card)]/80 backdrop-blur-sm border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
  >
    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
  </motion.button>
);

const Lightbox: React.FC<{
  screenshot: typeof screenshots[0];
  language: 'en' | 'zh' | 'ja';
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}> = ({ screenshot, language, onClose, onPrev, onNext, currentIndex, totalCount }) => {
  const lightboxRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!lightboxRef.current) return;
    const rect = lightboxRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.button
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
      >
        <X className="w-5 h-5" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-50 p-4 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors border border-white/10"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      <motion.div
        ref={lightboxRef}
        onMouseMove={handleMouseMove}
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0, rotateX: 5 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.85, opacity: 0, rotateX: -5 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: '1200px',
        }}
        className="relative z-40 max-w-5xl w-[90vw] max-h-[85vh] rounded-2xl overflow-hidden"
      >
        <div className="relative bg-[var(--color-bg-card)] rounded-2xl overflow-hidden border border-[var(--color-border)]">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-[var(--color-bg-card)] text-xs text-[var(--color-text-muted)] border border-[var(--color-border)]">
                {screenshot.title[language]}
              </div>
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {currentIndex + 1} / {totalCount}
            </div>
          </div>

          <div className="p-2">
            <img
              src={screenshot.src}
              alt={screenshot.title[language]}
              className="w-full h-full object-contain rounded-lg"
              style={{ maxHeight: '70vh' }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1.5"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {Array.from({ length: totalCount }).map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: i === currentIndex ? 20 : 6,
              height: 6,
              backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.3)',
            }}
            animate={{
              width: i === currentIndex ? 20 : 6,
              backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.3)',
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export const Screenshots: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].screenshots;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 380;
    const containerWidth = scrollRef.current.clientWidth;
    const scrollLeft = index * cardWidth - containerWidth / 2 + cardWidth / 2;
    scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left'
      ? Math.max(0, activeIndex - 1)
      : Math.min(screenshots.length - 1, activeIndex + 1);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => {
          const next = (prev + 1) % screenshots.length;
          scrollToIndex(next);
          return next;
        });
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, scrollToIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = 380;
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const centerIndex = Math.round((scrollLeft + containerWidth / 2 - cardWidth / 2) / cardWidth);
      if (centerIndex >= 0 && centerIndex < screenshots.length) {
        setActiveIndex(centerIndex);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

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
          whileHover={{ scale: 1.1, x: -3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[var(--color-bg-card)]/90 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-lg hover:border-[var(--color-border-hover)] hover:shadow-xl transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1, x: 3 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[var(--color-bg-card)]/90 backdrop-blur-md border border-[var(--color-border)] text-[var(--color-text-primary)] shadow-lg hover:border-[var(--color-border-hover)] hover:shadow-xl transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>

        <div className="relative">
          <AutoPlayControl
            isPlaying={isAutoPlaying}
            onToggle={() => setIsAutoPlaying(!isAutoPlaying)}
          />

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-8 py-6 scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            }}
            onMouseEnter={() => {
              if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            }}
            onMouseLeave={() => {
              if (isAutoPlaying) {
                autoPlayRef.current = setInterval(() => {
                  setActiveIndex((prev) => {
                    const next = (prev + 1) % screenshots.length;
                    scrollToIndex(next);
                    return next;
                  });
                }, 5000);
              }
            }}
          >
            {screenshots.map((screenshot, index) => (
              <ScreenshotCard
                key={screenshot.src}
                screenshot={screenshot}
                index={index}
                language={language}
                isActive={index === activeIndex}
                onClick={() => setSelectedScreenshot(index)}
              />
            ))}
          </div>
        </div>

        <ProgressDots
          total={screenshots.length}
          current={activeIndex}
          onSelect={scrollToIndex}
        />
      </div>

      <AnimatePresence mode="wait">
        {selectedScreenshot !== null && (
          <Lightbox
            key={selectedScreenshot}
            screenshot={screenshots[selectedScreenshot]}
            language={language}
            onClose={() => setSelectedScreenshot(null)}
            onPrev={() => setSelectedScreenshot((prev) => (prev === 0 ? screenshots.length - 1 : prev! - 1))}
            onNext={() => setSelectedScreenshot((prev) => (prev === screenshots.length - 1 ? 0 : prev! + 1))}
            currentIndex={selectedScreenshot}
            totalCount={screenshots.length}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
