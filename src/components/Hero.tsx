import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, Github } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { AppConfig } from '../config';

export const Hero = () => {
  const language = useStore(languageStore);
  const t = translations[language].hero;

  const handleDownload = () => {
    window.location.href = AppConfig.downloads.windows;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${language}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-cyan-400 text-sm mb-6 backdrop-blur-sm hover:border-cyan-500/50 transition-colors cursor-default">
                <img src="/logo.png" alt="Ufren Logo" className="w-4 h-4" />
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                {t.badge}
              </div>
            </motion.div>
        </AnimatePresence>

        <motion.h1
          layout
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-slate-400"
        >
          {t.title}
        </motion.h1>

        <div className="h-32 md:h-24 overflow-hidden relative">
             <AnimatePresence mode="wait">
                <motion.p
                  key={`desc-${language}`}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed absolute inset-x-0"
                >
                  {t.subtitle.prefix}<span className="text-cyan-400 font-semibold">{t.subtitle.highlight}</span>{t.subtitle.suffix} 
                  <br className="hidden md:block"/>
                  {t.description}
                  <br />
                  <span className="text-slate-300 block mt-2 text-base md:text-lg">{t.tags}</span>
                </motion.p>
            </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10"
        >
          <AnimatePresence mode="wait">
             <motion.button 
                key={`btn-dl-${language}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={handleDownload}
                className="group relative px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
             >
                <Download className="w-5 h-5" />
                {t.cta.download}
                <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover:ring-white/40 transition-all" />
             </motion.button>
          </AnimatePresence>
          
          <AnimatePresence mode="wait">
              <motion.button 
                key={`btn-gh-${language}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-medium rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                {t.cta.github}
              </motion.button>
          </AnimatePresence>
        </motion.div>

        {/* Floating UI Preview or Abstract Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.8, type: "spring" }}
          className="mt-20 mx-auto max-w-5xl rounded-xl overflow-hidden border border-slate-800 shadow-2xl shadow-cyan-900/20 bg-slate-900/50 backdrop-blur-xl aspect-video relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-transparent to-transparent z-10" />
          {/* Placeholder for App Screenshot - Using a CSS pattern for now */}
          <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-black p-8 grid grid-cols-12 gap-4">
             {/* Mock Sidebar */}
             <div className="col-span-3 bg-slate-900/80 rounded-lg border border-slate-800 h-full p-4 flex flex-col gap-3">
                <div className="h-8 w-8 rounded-full bg-cyan-500/20 mb-4" />
                <div className="h-2 w-20 bg-slate-800 rounded" />
                <div className="h-2 w-16 bg-slate-800 rounded" />
                <div className="h-2 w-24 bg-slate-800 rounded" />
             </div>
             {/* Mock Chat Area */}
             <div className="col-span-9 bg-slate-900/80 rounded-lg border border-slate-800 h-full p-6 flex flex-col justify-end">
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="h-10 w-10 rounded-full bg-slate-800 shrink-0" />
                        <div className="p-4 rounded-2xl rounded-tl-none bg-slate-800 max-w-[80%]">
                            <div className="h-2 w-48 bg-slate-700 rounded mb-2" />
                            <div className="h-2 w-32 bg-slate-700 rounded" />
                        </div>
                    </div>
                    <div className="flex gap-4 flex-row-reverse">
                         <div className="h-10 w-10 rounded-full bg-cyan-600 shrink-0" />
                         <div className="p-4 rounded-2xl rounded-tr-none bg-cyan-900/30 border border-cyan-800/50 max-w-[80%]">
                            <div className="h-2 w-64 bg-cyan-800/50 rounded mb-2" />
                            <div className="h-2 w-40 bg-cyan-800/50 rounded" />
                        </div>
                    </div>
                </div>
                <div className="mt-6 h-12 bg-slate-950 border border-slate-800 rounded-xl" />
             </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
            <span className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-cyan-400 font-mono">
              {t.cta.preview}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
