import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { Quote } from 'lucide-react';

export const Testimonials = () => {
  const language = useStore(languageStore);
  const t = translations[language].testimonials;

  return (
    <section className="py-24 bg-slate-900/30 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
           <motion.div
             key={`heading-${language}`}
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             exit={{ opacity: 0, y: -10 }}
             className="text-center mb-16"
           >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                {t.heading}
              </h2>
           </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-2xl bg-slate-950 border border-slate-800 hover:border-cyan-500/30 transition-all shadow-xl hover:shadow-cyan-900/10"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-800" />
              
              <AnimatePresence mode="wait">
                  <motion.div
                    key={`${language}-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                      <p className="text-slate-300 leading-relaxed mb-6 min-h-[5rem]">
                        "{item.content}"
                      </p>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                            {item.author.charAt(0)}
                        </div>
                        <div>
                            <div className="text-white font-semibold">{item.author}</div>
                            <div className="text-sm text-slate-500">{item.role}</div>
                        </div>
                      </div>
                  </motion.div>
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
