import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ExternalLink, Star } from 'lucide-react';
import { Testimonial } from '../types';

const testimonials: Testimonial[] = [
  { content: "Aoinyom transformed my content game! My average view duration increased by 40% after he started editing my videos", author: "Sarah Johnson", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150", result: "40% increase in watch time", featured: true },
  { content: "Professional, fast, and incredibly creative. Our brand promo video exceeded all expectations and drove a 3X increase in conversions", author: "Raj Enterprises", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150", result: "3X conversion rate boost" },
  { content: "Best editor we've worked with. Aoinyom delivers cinematic quality on tight deadlines. Our clients always rave about his work", author: "Mike Chen", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150", result: "100% client satisfaction" }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-premium-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-premium-silver font-bold tracking-widest uppercase text-xs">Social Proof</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-2 text-4xl md:text-5xl font-bold text-white font-display">
            Trusted by Creators
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 }}
              className={`p-8 rounded-[32px] relative group transition-all duration-500 ${testimonial.featured ? 'bg-white/10 border border-premium-orange/30' : 'bg-white/5 border border-white/5 hover:bg-white/10'}`}>

              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 text-premium-orange fill-current" />))}
              </div>

              <blockquote className="text-lg text-white font-light leading-relaxed mb-8 relative z-10">
                "{testimonial.content}"
              </blockquote>

              {testimonial.result && (
                <div className="mb-6 inline-block bg-premium-orange/10 px-3 py-1 rounded-full border border-premium-orange/20">
                  <p className="text-premium-orange text-xs font-bold">📈 {testimonial.result}</p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
                    <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
                  </div>
                  <div><h4 className="text-white font-bold text-sm font-display">{testimonial.author}</h4></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;