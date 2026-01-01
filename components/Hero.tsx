import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Video, Scissors, Sparkles, MousePointer2 } from 'lucide-react';

// Lazy load the 3D scene for better initial page performance
const Scene = lazy(() => import('./Scene'));

const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-premium-dark">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,77,0,0.08),transparent_60%)]" />
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* 3D Scene Background (Subtle) - Lazy loaded for performance */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20">

        {/* Left: Typography & Content */}
        <div className="flex flex-col items-start text-left space-y-8">
          {/* Availability Badge - Apple Style Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-premium-orange shadow-[0_0_10px_#FF4D00]"></span>
            <span className="text-xs font-medium text-premium-gray tracking-wide text-apple-gray">AVAILABLE FOR PROJECTS</span>
          </motion.div>

          {/* Main Heading with Mixed Typography */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[1.1]"
            >
              VISUAL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50">STORYTELLER</span>
            </motion.h1>

            {/* Handwritten Accent */}
            <motion.div
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: -6, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -top-8 right-0 md:-right-12 hidden md:block"
            >
              <div className="flex flex-col items-center">
                <span className="font-hand text-premium-orange text-2xl md:text-3xl rotate-6">Premium Edits</span>
                <svg className="w-12 h-12 text-premium-orange rotate-12 mt-1" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10,10 Q50,90 90,10" strokeLinecap="round" />
                  <path d="M90,10 L80,25" strokeLinecap="round" />
                  <path d="M90,10 L75,10" strokeLinecap="round" />
                </svg>
              </div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-premium-silver max-w-lg font-light leading-relaxed font-sans"
          >
            Crafting <span className="text-white font-medium">cinematic masterpieces</span> for brands that crave attention.
            Transforming raw footage into high converting visual assets.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-5"
          >
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-black transition-all duration-300 bg-white rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] focus:outline-none"
            >
              Start Project
              <ArrowRight className="ml-2 h-5 w-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            </a>
            <a
              href="#work"
              onClick={(e) => scrollToSection(e, 'work')}
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white transition-all duration-300 bg-transparent border border-white/20 rounded-full hover:bg-white/5 hover:border-white/40 focus:outline-none backdrop-blur-sm"
            >
              <Play className="mr-3 h-4 w-4 fill-white/50 group-hover:fill-premium-orange transition-colors" />
              Showreel
            </a>
          </motion.div>

          {/* Software Badges - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="pt-8 flex gap-6 text-sm font-medium text-premium-silver uppercase tracking-widest opacity-60"
          >
            {['Pr', 'Ae', 'DaVinci', 'Ps'].map((sw, i) => (
              <span key={i} className="hover:text-white transition-colors cursor-default">{sw}</span>
            ))}
          </motion.div>
        </div>

        {/* Right: Portrait & 3D Elements */}
        <div className="relative h-full min-h-[500px] flex items-center justify-center lg:justify-end">
          {/* Abstract Glass Card Behind */}
          <motion.div
            initial={{ opacity: 0, rotate: 6, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 6, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute w-80 h-[500px] bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-[40px] backdrop-blur-2xl -z-10 right-10"
          />

          {/* The Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 w-full max-w-md"
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl shadow-premium-orange/20 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-premium-dark via-transparent to-transparent opacity-60 z-20"></div>
              {/* Fallback to placeholder if image fails, but using the path we set up */}
              <img
                src="/portrait.png"
                alt="Aoinyom Mohan"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700 hover:rotate-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                  // Show fallback div if image missing
                  const parent = (e.target as HTMLImageElement).parentElement;
                  if (parent) {
                    const div = document.createElement('div');
                    div.className = 'w-full h-[500px] bg-neutral-900 flex items-center justify-center';
                    div.innerText = 'Portrait';
                    parent.appendChild(div);
                  }
                }}
              />

              {/* Floating Badge on Portrait */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 right-8 z-30 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-3 shadow-xl"
              >
                <div className="w-10 h-10 rounded-full bg-premium-orange flex items-center justify-center text-white">
                  <Sparkles size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-white font-bold font-display text-lg leading-none">500+</p>
                  <p className="text-xs text-premium-silver font-sans">Projects Delivered</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Floating UI Elements (3D Feel) */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-0 lg:-left-20 z-20"
          >
            <div className="glass-panel p-4 rounded-2xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono text-white">REC 00:04:12</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Hero;