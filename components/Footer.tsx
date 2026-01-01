import React from 'react';
import { Instagram, Youtube, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-premium-dark border-t border-white/5 py-24 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute -top-40 left-1/2 transform -translate-x-1/2 w-[1000px] h-40 bg-premium-orange/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-1 mb-6">
              <span className="text-3xl font-bold text-white font-display tracking-tight">AOINYOM</span>
              <span className="text-3xl font-bold text-premium-orange animate-pulse">.</span>
            </div>
            <p className="text-premium-silver mb-8 max-w-sm leading-relaxed">
              Transforming raw footage into viral reality Premium video editing for creators who refuse to be ignored
            </p>
            <div className="flex gap-4">
              {[Youtube, Instagram, Twitter, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href={Icon === Mail ? "mailto:aoinyommohan221@gmail.com" : "#"} className="text-premium-silver hover:text-white hover:bg-white/10 transition-all p-3 rounded-full hover:scale-110 border border-transparent hover:border-white/10">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold font-display mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Services', 'Portfolio', 'Pricing', 'Contact'].map((link) => (
                <li key={link}><a href={`#${link.toLowerCase()}`} className="text-premium-silver hover:text-premium-orange transition-colors font-medium">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-premium-silver text-sm">© {new Date().getFullYear()} Aoinyom Mohan All rights reserved</p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-premium-silver hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-premium-silver hover:text-white transition-colors">Terms</a>
          </div>
          <p className="text-white/20 text-xs font-mono tracking-widest uppercase">Designed in the Future</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;