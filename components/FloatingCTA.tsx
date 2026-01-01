import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, ArrowRight } from 'lucide-react';

const FloatingCTA: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        setIsExpanded(false);
    };

    return (
        <div className="fixed right-6 bottom-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isExpanded && (
                    <motion.div initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/50 max-w-sm mb-4">
                        <div className="text-white mb-6">
                            <h4 className="font-bold text-xl font-display mb-2">Ready to level up?</h4>
                            <p className="text-premium-silver text-sm leading-relaxed">Let's discuss your project and bring your creative vision to life.</p>
                        </div>
                        <button onClick={scrollToContact} className="w-full bg-premium-orange hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-premium-orange/20 transition-all hover:scale-[1.02]">
                            Start Project <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button onClick={() => setIsExpanded(!isExpanded)}
                className="bg-premium-orange hover:bg-orange-600 text-white p-4 rounded-full shadow-lg shadow-premium-orange/30 hover:scale-110 transition-all border-4 border-black/20"
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
            >
                {isExpanded ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};

export default FloatingCTA;
