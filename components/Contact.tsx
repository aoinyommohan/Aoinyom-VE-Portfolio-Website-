import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, ArrowLeft, Send, CheckCircle,
    Smartphone, Film, Youtube, Music, Monitor, HelpCircle,
    Calendar, DollarSign, User, Mail, MapPin, Link as LinkIcon,
    Mic
} from 'lucide-react';

type Step = 'type' | 'details' | 'creative' | 'timeline' | 'contact' | 'review';

interface FormData {
    projectType: string;
    videoLength: string;
    orientation: string;
    count: string;
    description: string;
    referenceLinks: string;
    deadline: string;
    budget: string;
    name: string;
    email: string;
    phone: string;
    location: string;
}

const Contact: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [direction, setDirection] = useState<number>(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        projectType: '',
        videoLength: '',
        orientation: 'Vertical (9:16)',
        count: '1',
        description: '',
        referenceLinks: '',
        deadline: '',
        budget: '',
        name: '',
        email: '',
        phone: '',
        location: ''
    });

    const totalSteps = 6;

    const handleNext = () => {
        if (step < totalSteps) {
            setDirection(1);
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setDirection(-1);
            setStep(step - 1);
        }
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Basic sanitization
        const sanitizedData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value])
        );

        try {
            const response = await fetch("https://formspree.io/f/mvzonjzb", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(sanitizedData)
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert("There was an error submitting the form. Please try again.");
            }
        } catch (error) {
            alert("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const stepVariants = {
        hidden: (direction: number) => ({ opacity: 0, x: direction > 0 ? 50 : -50, scale: 0.95 }),
        visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.3 } },
        exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -50 : 50, scale: 0.95, transition: { duration: 0.3 } })
    };

    const renderStep = () => {
        if (isSuccess) return null;

        switch (step) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-display text-white mb-8">What are we creating?</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { id: 'Short Form', icon: Smartphone, label: 'Shorts / Reels' },
                                { id: 'Long Form', icon: Youtube, label: 'YouTube Video' },
                                { id: 'Podcast', icon: Mic, label: 'Podcast' },
                                { id: 'Ad', icon: Monitor, label: 'Ad / Promo' },
                                { id: 'Music Video', icon: Music, label: 'Music Video' },
                                { id: 'Other', icon: HelpCircle, label: 'Other' },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => { handleChange('projectType', item.id); handleNext(); }}
                                    className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-4 transition-all duration-300 ${formData.projectType === item.id
                                        ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]'
                                        : 'bg-white/5 border-white/5 text-premium-silver hover:bg-white/10 hover:text-white hover:border-white/20'
                                        }`}
                                >
                                    <item.icon className="w-8 h-8" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-display text-white">The finer details</h3>
                        <div>
                            <label className="block text-sm font-medium text-premium-silver mb-2">Estimated Length</label>
                            <input type="text" placeholder="e.g. 60 sec, 10 min..." value={formData.videoLength} onChange={(e) => handleChange('videoLength', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-premium-orange focus:outline-none transition-colors" autoFocus />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-premium-silver mb-2">Orientation</label>
                                <select value={formData.orientation} onChange={(e) => handleChange('orientation', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-premium-orange focus:outline-none transition-colors appearance-none" >
                                    <option className="bg-premium-dark">Vertical (9:16)</option>
                                    <option className="bg-premium-dark">Horizontal (16:9)</option>
                                    <option className="bg-premium-dark">Square (1:1)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-premium-silver mb-2">Video Count</label>
                                <input type="number" placeholder="1" value={formData.count} onChange={(e) => handleChange('count', e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-premium-orange focus:outline-none transition-colors" />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-display text-white">Creative Vision</h3>
                        <div>
                            <label className="block text-sm font-medium text-premium-silver mb-2">Describe the idea</label>
                            <textarea rows={4} placeholder="Fast paced, cinematic, funny..." value={formData.description} onChange={(e) => handleChange('description', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-premium-orange focus:outline-none transition-colors" autoFocus />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-premium-silver mb-2">Reference Links</label>
                            <input type="text" placeholder="Zoom meeting link, Drive link etc" value={formData.referenceLinks} onChange={(e) => handleChange('referenceLinks', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-premium-orange focus:outline-none transition-colors" />
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-display text-white">Timeline & Budget</h3>
                        <div>
                            <label className="block text-sm font-medium text-premium-silver mb-2">Deadline</label>
                            <input type="date" value={formData.deadline} onChange={(e) => handleChange('deadline', e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-premium-orange focus:outline-none transition-colors [color-scheme:dark]" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-premium-silver mb-4">Budget Range</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['<$100', '$100 - $500', '$500 - $1k', '$1k+'].map((b) => (
                                    <button key={b} type="button" onClick={() => handleChange('budget', b)}
                                        className={`p-3 rounded-xl border text-sm font-medium transition-all ${formData.budget === b ? 'bg-premium-orange border-premium-orange text-white' : 'bg-white/5 border-white/10 text-premium-silver hover:text-white'}`}>
                                        {b}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-display text-white">Contact Info</h3>
                        <div className="relative"><User className="absolute left-4 top-4 w-5 h-5 text-premium-silver" /><input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 p-4 text-white focus:border-premium-orange focus:outline-none" autoFocus /></div>
                        <div className="relative"><Mail className="absolute left-4 top-4 w-5 h-5 text-premium-silver" /><input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 p-4 text-white focus:border-premium-orange focus:outline-none" /></div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold font-display text-white">Review & Submit</h3>
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4 text-sm">
                            <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-premium-silver">Type</span><span className="text-white">{formData.projectType}</span></div>
                            <div className="flex justify-between border-b border-white/5 pb-2"><span className="text-premium-silver">Budget</span><span className="text-white">{formData.budget}</span></div>
                            <div><p className="text-premium-silver mb-1">Description</p><p className="text-white italic">"{formData.description}"</p></div>
                            <div><p className="text-premium-silver mb-1">Contact</p><p className="text-white">{formData.name} ({formData.email})</p></div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <section id="contact" className="py-24 bg-premium-dark relative border-t border-white/5">
            {/* Abstract Bg */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-premium-orange/10 to-transparent rounded-full blur-[80px] will-change-transform pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Application Form (Top Priority) */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-premium-silver font-bold tracking-widest uppercase text-xs">Applications Open</motion.span>
                        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-2 text-4xl md:text-6xl font-bold text-white font-display">
                            Start Your <span className="text-premium-orange">Project</span>
                        </motion.h2>
                    </div>

                    <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-2xl relative">
                        <div className="p-8 pb-0 md:p-12 md:pb-0 mb-6 flex flex-col items-center text-center">
                            <h3 className="text-2xl text-white font-bold font-display">Project Application</h3>
                            <p className="text-premium-silver text-sm mt-1">Tell me about your vision</p>
                        </div>

                        <div className="h-1.5 bg-white/5 w-full"><motion.div className="h-full bg-premium-orange" initial={{ width: 0 }} animate={{ width: `${(step / totalSteps) * 100}%` }} transition={{ duration: 0.5 }} /></div>

                        <div className="p-8 md:p-12 pt-6 min-h-[400px] flex flex-col justify-between">
                            {isSuccess ? (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full text-center py-20">
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">Message Sent!</h3>
                                    <p className="text-premium-silver max-w-md">Thanks for reaching out! I'll review your project details and get back to you within 24 hours.</p>
                                    <button onClick={() => { setIsSuccess(false); setStep(1); setFormData({ ...formData, description: '' }) }} className="mt-8 text-premium-orange font-bold hover:text-white transition-colors">Start another project</button>
                                </motion.div>
                            ) : (
                                <>
                                    <AnimatePresence custom={direction} mode="wait">
                                        <motion.div key={step} custom={direction} variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="flex-1 w-full max-w-3xl mx-auto">
                                            {renderStep()}
                                        </motion.div>
                                    </AnimatePresence>

                                    <div className="flex justify-between items-center mt-12 pt-6 border-t border-white/5 max-w-3xl mx-auto w-full">
                                        <button type="button" onClick={handleBack} disabled={step === 1} className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === 1 ? 'text-white/20 cursor-not-allowed' : 'text-premium-silver hover:text-white'}`}><ArrowLeft className="w-4 h-4" /> Back</button>
                                        {step < totalSteps ? (
                                            <button type="button" onClick={handleNext} disabled={step === 1 && !formData.projectType} className="bg-white text-black hover:bg-premium-orange hover:text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-premium-orange/20">Next <ArrowRight className="w-4 h-4" /></button>
                                        ) : (
                                            <button onClick={(e) => handleSubmit(e)} disabled={isSubmitting} className="bg-premium-orange text-white hover:bg-orange-600 px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all shadow-lg shadow-premium-orange/30">{isSubmitting ? 'Sending...' : 'Send Request'} <Send className="w-4 h-4" /></button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Direct Contact Info (Bottom) */}
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <h3 className="text-2xl text-white font-bold font-display mb-2">Direct Contact</h3>
                        <p className="text-premium-silver">Prefer a direct line? Reach out below.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        {[
                            { icon: Mail, label: "Email", value: "aoinyommohan221@gmail.com", href: "mailto:aoinyommohan221@gmail.com" },
                            { icon: Smartphone, label: "Phone", value: "+91 60017 03190", href: "tel:+916001703190" },
                            { icon: MapPin, label: "Location", value: "Global / Remote", href: null }
                        ].map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href || '#'}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 + (index * 0.1) }}
                                className={`flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-premium-orange/30 transition-all group ${!item.href ? 'cursor-default' : ''}`}
                            >
                                <div className="w-14 h-14 bg-premium-orange/10 rounded-full flex items-center justify-center text-premium-orange group-hover:scale-110 transition-transform mb-4 shadow-lg shadow-premium-orange/5">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <p className="text-sm text-premium-silver font-medium mb-1 tracking-wide">{item.label}</p>
                                <p className="text-white font-bold text-lg md:text-xl font-display">{item.value}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Contact;
