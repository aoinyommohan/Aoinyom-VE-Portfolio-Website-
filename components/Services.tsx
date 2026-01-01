import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Film, Youtube, Clock, Zap, Target } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    title: "Short Form Content",
    description: "High retention editing for Reels, TikToks, and Shorts. Fast paced, engaging captions, and hook based structures.",
    icon: Smartphone
  },
  {
    title: "Long Form Cinematic",
    description: "Documentary style, vlogs, and narrative content. Focus on pacing, sound design, and color grading for immersion.",
    icon: Film
  },
  {
    title: "Podcast Production",
    description: "Multi cam editing, audio cleanup, noise reduction, and social media clips extraction from full episodes.",
    icon: Youtube
  },
  {
    title: "Speed Ramps & Transitions",
    description: "Seamless transitions and time remapping to create dynamic flow and energy in sports or travel videos.",
    icon: Clock
  },
  {
    title: "Ads & Promotional",
    description: "Conversion focused editing for brands. Clear call to actions and brand guideline adherence.",
    icon: Target
  },
  {
    title: "VFX & Compositing",
    description: "Adding visual flair with After Effects. Green screen removal, tracking, and motion graphics integration.",
    icon: Zap
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-premium-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="text-premium-orange font-bold tracking-widest uppercase text-xs mb-2 block">Services</span>
            <h2 className="text-4xl md:text-6xl font-bold font-display text-white mt-2 leading-tight">
              Crafting Digital <br /> <span className="text-premium-silver">Perfection</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-sm text-right hidden md:block"
          >
            <p className="text-premium-silver font-hand text-2xl rotate-2">
              " I make your videos pop "
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white/5 border border-white/5 rounded-[32px] p-8 hover:bg-white/10 transition-colors duration-300 group cursor-default backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-premium-orange/10 rounded-2xl flex items-center justify-center mb-6 text-premium-orange group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 font-display group-hover:text-premium-orange transition-colors">{service.title}</h3>
              <p className="text-premium-silver leading-relaxed font-light">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;