import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Crown, Flame } from 'lucide-react';
import { PricingTier } from '../types';

const shortFormTiers: PricingTier[] = [
  { name: "Essential", price: "$30", description: "Basic cuts and captions for quick turnaround", features: ["Up to 30 sec duration", "Standard Captions", "Basic Color Correction", "1 Revision", "2 Day Delivery"] },
  { name: "Engage", price: "$50", description: "Polished editing with engaging elements", recommended: true, features: ["Up to 60 sec duration", "Dynamic Captions & Emojis", "B-Roll Integration", "Sound Effects & Mixing", "2 Revisions", "Stock Footage Included"] },
  { name: "Viral", price: "$90", description: "Retention hacked editing for maximum growth", features: ["Up to 90 sec duration", "Advanced Motion Graphics", "Visual Effects (VFX)", "Storytelling Hook Optimization", "Unlimited Revisions", "Thumbnail Suggestion"] }
];

const longFormTiers: PricingTier[] = [
  { name: "Narrative", price: "$150", description: "Clean storytelling for vlogs and interviews", features: ["Up to 10 min duration", "A-Cut & Narrative Flow", "Background Music", "Basic Audio Cleanup", "2 Revisions", "5 Day Delivery"] },
  { name: "Cinematic", price: "$300", description: "High end production value for docs and YouTube", recommended: true, features: ["Up to 15 min duration", "Advanced Color Grading", "Sound Design & Mastering", "Motion Graphics Titles", "3 Revisions", "Thumbnail Design"] },
  { name: "Masterpiece", price: "$600+", description: "Netflix style documentary editing", features: ["20+ min duration", "Full Post Production Suite", "Custom Animations", "Deep Research & Story Editing", "Priority Support", "Strategy Call"] }
];

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'short' | 'long'>('short');
  const activeTiers = activeTab === 'short' ? shortFormTiers : longFormTiers;

  return (
    <section id="pricing" className="py-24 bg-premium-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-premium-silver font-bold tracking-widest uppercase text-xs">Investment</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-2 text-4xl md:text-5xl font-bold text-white font-display">
            Transparent <span className="text-premium-orange">Pricing</span>
          </motion.h2>

          <div className="mt-8 inline-flex bg-white/5 p-1 rounded-full border border-white/10 relative backdrop-blur-md">
            <div className={`absolute top-1 bottom-1 w-[140px] bg-white rounded-full transition-all duration-300 shadow-lg ${activeTab === 'short' ? 'left-1' : 'left-[145px]'}`} />
            <button onClick={() => setActiveTab('short')} className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-colors w-[140px] ${activeTab === 'short' ? 'text-black' : 'text-premium-silver hover:text-white'}`}>SHORT FORM</button>
            <button onClick={() => setActiveTab('long')} className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold tracking-wide transition-colors w-[140px] ${activeTab === 'long' ? 'text-black' : 'text-premium-silver hover:text-white'}`}>LONG FORM</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTiers.map((tier, index) => (
              <motion.div key={tier.name + activeTab} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ delay: index * 0.1, duration: 0.3 }}
                className={`relative p-8 rounded-[32px] border flex flex-col transition-all duration-300 ${tier.recommended ? 'bg-white/10 border-premium-orange/50 shadow-2xl shadow-premium-orange/10 z-10 scale-105 md:-mt-4 md:-mb-4 backdrop-blur-md' : 'bg-white/5 border-white/5 hover:border-white/10 backdrop-blur-sm'}`}>
                {tier.recommended && (<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-premium-orange text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest shadow-lg flex items-center gap-1"><Star className="w-3 h-3 fill-current" /> MOST POPULAR</div>)}

                <div className="mb-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white font-display">{tier.name}</h3>
                    {tier.name.includes("Viral") && <Zap className="w-5 h-5 text-premium-orange fill-current" />}
                    {tier.name.includes("Masterpiece") && <Crown className="w-5 h-5 text-premium-orange fill-current" />}
                  </div>
                  <div className="flex items-baseline text-white">
                    <span className="text-5xl font-bold tracking-tighter font-display">{tier.price}</span>
                    <span className="ml-1 text-premium-silver font-medium">/ video</span>
                  </div>
                  <p className="mt-4 text-sm text-premium-silver leading-relaxed min-h-[40px]">{tier.description}</p>
                </div>

                <div className="w-full h-px bg-white/10 mb-8" />

                <ul className="space-y-4 mb-8 flex-1">
                  {tier.features.map((feature) => (<li key={feature} className="flex items-start"><Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${tier.recommended ? 'text-premium-orange' : 'text-white'}`} /><p className="ml-3 text-sm text-premium-silver font-light">{feature}</p></li>))}
                </ul>

                <a href="#contact" className={`w-full block text-center py-4 px-8 rounded-xl font-bold transition-all text-sm uppercase tracking-wider ${tier.recommended ? 'bg-white text-black hover:bg-premium-orange hover:text-white shadow-lg' : 'bg-white/5 text-white border border-white/10 hover:bg-white text-white hover:text-black hover:border-transparent'}`}>
                  {tier.recommended ? 'Get Started' : `Select ${tier.name}`}
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-full text-red-500 font-medium text-sm animate-pulse">
            <Flame className="w-4 h-4 fill-current" /><span>Only 3 slots remaining for new clients this month</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;