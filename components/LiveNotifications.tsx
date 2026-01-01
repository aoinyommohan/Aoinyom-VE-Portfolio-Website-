import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

const notificationMessages = [
    { id: 1, icon: "🔥", message: "Sarah just booked a Viral Package!", timestamp: "2 min ago" },
    { id: 2, icon: "⭐", message: "New 5-star review from @CreatorStudio", timestamp: "15 min ago" },
    { id: 3, icon: "🎬", message: "New showreel dropped in Portfolio", timestamp: "1 hour ago" },
    { id: 4, icon: "✨", message: "Alex's video just hit 1M views", timestamp: "3 hours ago" },
    { id: 5, icon: "🚀", message: "Only 2 slots left for October", timestamp: "Today" },
];

const LiveNotifications: React.FC = () => {
    const [currentNotification, setCurrentNotification] = useState<typeof notificationMessages[0] | null>(null);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Initial delay
        const timer = setTimeout(() => { setCurrentNotification(notificationMessages[Math.floor(Math.random() * notificationMessages.length)]); }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (currentNotification && !isDismissed) {
            const hideTimer = setTimeout(() => {
                setCurrentNotification(null);
                setIsDismissed(false);
                setTimeout(() => { setCurrentNotification(notificationMessages[Math.floor(Math.random() * notificationMessages.length)]); }, Math.random() * 20000 + 15000);
            }, 6000); // Show for 6s
            return () => clearTimeout(hideTimer);
        }
    }, [currentNotification, isDismissed]);

    return (
        <div className="fixed left-6 bottom-6 z-40 hidden md:block">
            <AnimatePresence>
                {currentNotification && !isDismissed && (
                    <motion.div initial={{ opacity: 0, x: -50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -20, scale: 0.95 }}
                        className="bg-black/60 backdrop-blur-xl text-white pl-4 pr-10 py-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4 max-w-sm relative group overflow-hidden">

                        <div className="absolute top-0 left-0 w-1 h-full bg-premium-orange" />

                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl shadow-inner border border-white/5">
                            {currentNotification.icon}
                        </div>

                        <div className="flex-1">
                            <p className="font-medium text-sm leading-snug font-display">{currentNotification.message}</p>
                            <p className="text-premium-silver text-xs mt-0.5 flex items-center gap-1">
                                <CheckCircle2 size={10} className="text-premium-orange" /> Verified • {currentNotification.timestamp}
                            </p>
                        </div>

                        <button onClick={() => { setIsDismissed(true); setCurrentNotification(null); }}
                            className="absolute top-2 right-2 text-white/20 hover:text-white transition-colors p-1">
                            <X className="w-3 h-3" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LiveNotifications;
