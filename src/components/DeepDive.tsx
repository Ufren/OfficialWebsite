import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@nanostores/react';
import { languageStore } from '../store/language';
import { translations } from '../i18n/translations';
import { Terminal, CheckCircle2, Image as ImageIcon, Sparkles } from 'lucide-react';

export const DeepDive = () => {
  const language = useStore(languageStore);
  const t = translations[language].deepDive;

  return (
    <section className="py-24 bg-slate-950 overflow-hidden">
      {/* OpenCode Section - Left Image, Right Text */}
      <div className="container mx-auto px-4 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            {/* Mock Code Editor Interface */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-cyan-900/10 aspect-video group">
               <div className="absolute top-0 left-0 right-0 h-8 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  <div className="ml-4 text-xs text-slate-400 font-mono">script.py</div>
               </div>
               <div className="p-6 pt-12 font-mono text-sm text-slate-300 leading-relaxed">
                  <div><span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd</div>
                  <div><span className="text-purple-400">import</span> matplotlib.pyplot <span className="text-purple-400">as</span> plt</div>
                  <br/>
                  <div className="text-slate-500"># Analyze sales data</div>
                  <div>data = pd.read_csv(<span className="text-green-400">'sales.csv'</span>)</div>
                  <div>result = data.groupby(<span className="text-green-400">'category'</span>).sum()</div>
                  <div><span className="text-blue-400">print</span>(result)</div>
               </div>
               
               {/* Terminal Overlay */}
               <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-slate-950/90 backdrop-blur border-t border-slate-800 p-4 font-mono text-xs text-slate-300">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                     <Terminal className="w-3 h-3" />
                     <span>Terminal Output</span>
                  </div>
                  <div>category&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;amount</div>
                  <div>Electronics&nbsp;&nbsp;&nbsp;45,200</div>
                  <div>Clothing&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;12,500</div>
                  <div className="text-green-400 mt-1">Process finished with exit code 0</div>
               </div>

               {/* Decorative Glow */}
               <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            </div>
          </motion.div>

          <div className="flex-1 space-y-8">
             <AnimatePresence mode="wait">
                <motion.div
                    key={`opencode-${language}`}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-900 text-cyan-400 text-sm mb-6">
                        <Terminal className="w-4 h-4" />
                        {t.opencode.badge}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        {t.opencode.title}
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                        {t.opencode.description}
                    </p>
                    <ul className="space-y-4">
                        {t.opencode.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-cyan-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Image Gen Section - Right Image, Left Text (Reversed on desktop) */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
             <AnimatePresence mode="wait">
                <motion.div
                    key={`imagegen-${language}`}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/30 border border-purple-900 text-purple-400 text-sm mb-6">
                        <Sparkles className="w-4 h-4" />
                        {t.imageGen.badge}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                        {t.imageGen.title}
                    </h2>
                    <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                        {t.imageGen.description}
                    </p>
                    <ul className="space-y-4">
                        {t.imageGen.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300">
                                <CheckCircle2 className="w-5 h-5 text-purple-500" />
                                {feature}
                            </li>
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
            {/* Mock Image Generation Interface */}
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl shadow-purple-900/10 aspect-square md:aspect-video group">
               {/* Background Image (Abstract/AI Generated Style) */}
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-80 group-hover:scale-105 transition duration-[2s]"></div>
               <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
               
               {/* Prompt Input Overlay */}
               <div className="absolute bottom-8 left-8 right-8 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl p-4 flex items-center gap-4">
                  <div className="flex-1 font-mono text-sm text-purple-300 truncate">
                     /imagine prompt: futuristic city, cyberpunk style, neon lights, 8k render...
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center animate-pulse">
                     <ImageIcon className="w-4 h-4 text-white" />
                  </div>
               </div>

               {/* Decorative Glow */}
               <div className="absolute -inset-1 bg-gradient-to-l from-purple-500 to-pink-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
