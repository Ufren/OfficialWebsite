import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { Terminal, CheckCircle2, Code2, Lock, Layers } from 'lucide-react';

const CodeAnimation: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  const codeLines = [
    'import { Agent, Task } from "openclaw"',
    '',
    '// Create an AI agent',
    'const agent = new Agent({',
    '  name: "DataAnalyzer",',
    '  model: "claude-3-opus",',
    '  skills: ["python", "data-analysis"]',
    '})',
    '',
    '// Execute a task',
    'const result = await agent.execute(task)',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < codeLines.length) {
        setLines(prev => [...prev, codeLines[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-sm leading-relaxed">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            ${line.startsWith('import') ? 'text-[var(--color-text-secondary)]' : ''}
            ${line.startsWith('//') ? 'text-[var(--color-text-muted)]' : ''}
            ${line.includes('const') || line.includes('await') ? 'text-[var(--color-text-primary)]' : ''}
            ${!line ? 'h-4' : ''}
          `}
        >
          {line || '\u00A0'}
        </motion.div>
      ))}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block w-2 h-4 bg-[var(--color-text-primary)] ml-1"
      />
    </div>
  );
};

export const DeepDive: React.FC = () => {
  const language = useStore(languageStore);
  const t = translations[language].deepdive;

  return (
    <section id="deepdive" className="section-padding relative overflow-hidden bg-[var(--color-bg-secondary)]">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
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
                {t.title}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                {t.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="space-y-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-10 bg-[var(--color-bg-secondary)] flex items-center px-4 gap-2 border-b border-[var(--color-border)]">
                  <div className="w-3 h-3 rounded-full bg-[var(--color-border-hover)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--color-border-hover)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--color-border-hover)]" />
                  <div className="ml-4 text-xs text-[var(--color-text-muted)] font-mono flex items-center gap-2">
                    <Code2 className="w-3 h-3" />
                    agent.ts
                  </div>
                </div>
                <div className="p-6 pt-14 min-h-[280px]">
                  <CodeAnimation />
                </div>
              </div>
            </motion.div>

            <div className="flex-1 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`opencode-${language}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm mb-4">
                    <Terminal className="w-4 h-4" />
                    {t.opencode.badge}
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text-primary)] leading-tight">
                    {t.opencode.title}
                  </h3>
                  <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                    {t.opencode.description}
                  </p>
                  <ul className="space-y-3">
                    {t.opencode.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-[var(--color-text-primary)]"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-text-secondary)]" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`privacy-${language}`}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text-secondary)] text-sm mb-4">
                    <Lock className="w-4 h-4" />
                    {t.privacy.badge}
                  </div>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[var(--color-text-primary)] leading-tight">
                    {t.privacy.title}
                  </h3>
                  <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                    {t.privacy.description}
                  </p>
                  <ul className="space-y-3">
                    {t.privacy.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-3 text-[var(--color-text-primary)]"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-text-secondary)]" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex-1 w-full"
            >
              <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-bg-card)] shadow-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[var(--color-text-secondary)]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--color-text-primary)]">Local Processing</div>
                    <div className="text-xs text-[var(--color-text-muted)]">Ollama Connected</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {['llama3.2:latest', 'mistral:7b', 'codellama:34b'].map((model, i) => (
                    <motion.div
                      key={model}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
                    >
                      <div className="w-8 h-8 rounded bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center">
                        <Layers className="w-4 h-4 text-[var(--color-text-muted)]" />
                      </div>
                      <div className="flex-1 text-sm text-[var(--color-text-primary)]">{model}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">Ready</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 p-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
                >
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">Status</div>
                  <div className="text-sm text-[var(--color-text-primary)]">
                    All processing happens locally on your device
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
