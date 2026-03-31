import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Database, Cpu, Image as ImageIcon, Zap, Code } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';

const icons = {
  "Unified Model Hub": <MessageSquare className="w-6 h-6" />,
  "统一模型中心": <MessageSquare className="w-6 h-6" />,
  "RAG Knowledge Base": <Database className="w-6 h-6" />,
  "RAG 知识库": <Database className="w-6 h-6" />,
  "MCP Ecosystem": <Cpu className="w-6 h-6" />,
  "MCP 生态系统": <Cpu className="w-6 h-6" />,
  "Creative Studio": <ImageIcon className="w-6 h-6" />,
  "创意工坊": <ImageIcon className="w-6 h-6" />,
  "Secure Code Sandbox": <Code className="w-6 h-6" />,
  "安全代码沙箱": <Code className="w-6 h-6" />,
  "Native Experience": <Zap className="w-6 h-6" />,
  "原生极致体验": <Zap className="w-6 h-6" />,
};

// Fallback icons map based on index if title match fails
const iconList = [
    <MessageSquare className="w-6 h-6" />,
    <Database className="w-6 h-6" />,
    <Cpu className="w-6 h-6" />,
    <ImageIcon className="w-6 h-6" />,
    <Code className="w-6 h-6" />,
    <Zap className="w-6 h-6" />,
];

export const Features = () => {
  const language = useStore(languageStore);
  const t = translations[language].features;

  return (
    <section className="py-24 relative bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 h-32 md:h-24">
           <AnimatePresence mode="wait">
              <motion.div
                key={language}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                    {t.heading}
                  </h2>
                  <p className="text-slate-400 max-w-2xl mx-auto">
                    {t.subheading}
                  </p>
              </motion.div>
           </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                {iconList[index]}
              </div>
              <AnimatePresence mode="wait">
                  <motion.div
                    key={`${language}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                      <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed min-h-[4.5rem]">
                        {feature.description}
                      </p>
                  </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

