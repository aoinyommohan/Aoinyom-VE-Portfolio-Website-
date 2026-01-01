import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Film, Users, Award } from 'lucide-react';

interface StatProps {
    icon: React.ReactNode;
    value: string;
    numericValue: number;
    label: string;
    delay: number;
}

const AnimatedCounter: React.FC<{ target: number; duration?: number; suffix?: string }> = ({
    target,
    duration = 2000,
    suffix = ''
}) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    let start = 0;
                    const end = target;
                    const incrementTime = duration / end;

                    const timer = setInterval(() => {
                        start += Math.ceil(end / 50);
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(start);
                        }
                    }, incrementTime);

                    return () => clearInterval(timer);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const StatCard: React.FC<StatProps> = ({ icon, value, numericValue, label, delay }) => {
    const suffix = value.replace(/[0-9.,]/g, '');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
            className="flex flex-col items-center justify-center p-8 rounded-[32px] bg-white/5 border border-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors duration-300 group"
        >
            <div className="mb-4 text-premium-orange opacity-80 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-4xl md:text-5xl font-bold font-display text-white mb-2">
                <AnimatedCounter target={numericValue} suffix={suffix} />
            </h3>
            <p className="text-premium-silver font-medium text-sm uppercase tracking-wider">{label}</p>
        </motion.div>
    );
};

const Statistics: React.FC = () => {
    const stats: StatProps[] = [
        {
            icon: <TrendingUp className="w-8 h-8" />,
            value: "2500000+",
            numericValue: 2500000,
            label: "Views Generated",
            delay: 0.1
        },
        {
            icon: <Film className="w-8 h-8" />,
            value: "500+",
            numericValue: 500,
            label: "Videos Delivered",
            delay: 0.2
        },
        {
            icon: <Users className="w-8 h-8" />,
            value: "50+",
            numericValue: 50,
            label: "Happy Clients",
            delay: 0.3
        },
        {
            icon: <Award className="w-8 h-8" />,
            value: "98%",
            numericValue: 98,
            label: "Satisfaction Rate",
            delay: 0.4
        }
    ];

    return (
        <section className="py-20 relative overflow-hidden bg-premium-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="font-hand text-premium-orange text-2xl rotate-[-4deg] inline-block mb-4">Trusted by creators</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-display">
                        Impact by the <span className="text-premium-orange">Numbers</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Statistics;
