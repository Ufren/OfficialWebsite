import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';

const topRow = [
  { name: 'OpenAI', icon: '🤖' },
  { name: 'Claude', icon: '🧠' },
  { name: 'Gemini', icon: '💎' },
  { name: 'DeepSeek', icon: '🔍' },
  { name: 'Qwen', icon: '☁️' },
  { name: 'Llama', icon: '🦙' },
  { name: 'Mistral', icon: '🌀' },
  { name: 'GLM', icon: '🔮' },
  { name: 'Yi', icon: '🎯' },
  { name: 'Grok', icon: '⚡' },
];

const bottomRow = [
  { name: 'Feishu', icon: '🐦' },
  { name: 'WeChat', icon: '💬' },
  { name: 'Slack', icon: '📱' },
  { name: 'Discord', icon: '🎮' },
  { name: 'Telegram', icon: '✈️' },
  { name: 'DingTalk', icon: '🔔' },
  { name: 'Notion', icon: '📝' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Jira', icon: '📋' },
  { name: 'Email', icon: '📧' },
];

const MarqueeRow: React.FC<{
  items: typeof topRow;
  direction: 'left' | 'right';
  speed?: number;
}> = ({ items, direction, speed = 40 }) => {
  const doubled = [...items, ...items];

  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <motion.div
        className="flex gap-6 shrink-0"
        animate={{
          x: direction === 'left' ? [0, -50 * items.length] : [-50 * items.length, 0],
        }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        {doubled.map((item, index) => (
          <div
            key={`${item.name}-${index}`}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors shrink-0 group cursor-default"
          >
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">
              {item.icon}
            </span>
            <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const InfiniteMarquee: React.FC = () => {
  const language = useStore(languageStore);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="container-custom mb-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-widest"
        >
          {language === 'zh' ? '支持多种模型与平台' : language === 'ja' ? '多数のモデルとプラットフォームをサポート' : 'Supports Multiple Models & Platforms'}
        </motion.p>
      </div>

      <div className="space-y-4">
        <MarqueeRow items={topRow} direction="left" speed={45} />
        <MarqueeRow items={bottomRow} direction="right" speed={50} />
      </div>
    </section>
  );
};
