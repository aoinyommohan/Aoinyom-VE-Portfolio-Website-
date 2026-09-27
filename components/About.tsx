import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Zap, Music, Aperture, Layers } from 'lucide-react';

const SkillCard = ({ name, icon: Icon, delay }: { name: string, icon: any, delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-premium-orange/30 transition-all duration-300 group cursor-default backdrop-blur-sm"
    >
      <Icon className="h-5 w-5 text-premium-orange group-hover:scale-110 transition-transform" />
      <span className="font-medium text-white text-sm tracking-wide">{name}</span>
    </motion.div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 bg-premium-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left: Cartoon Portrait - Clean No 3D Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {/* Height adjusted to fit full image without cropping head */}
            <div className="relative w-full aspect-[9/16] rounded-[40px] overflow-hidden border border-white/10 bg-white/5 shadow-2xl flex items-end justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,77,0,0.1),transparent_60%)]" />
              <img src="/workstation.jpg" alt="Filmmaking Workstation" className="w-full h-full object-cover object-center" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-hand text-premium-orange text-3xl mb-4 block rotate-2">Meet the Editor</span>
              <h2 className="text-5xl md:text-6xl font-bold font-display text-white mb-8 leading-tight">
                Not Just Cutting <br />
                <span className="text-premium-silver">Storytelling</span>
              </h2>

              <div className="space-y-6 text-lg text-premium-silver font-light leading-relaxed">
                <p>
                  I don't just assemble clips; I architect emotions. With over <span className="text-white font-medium">4 years</span> of experience, I've mastered the rhythm of attention in a distracted world.
                </p>
                <p>
                  My philosophy is simple: <span className="text-white font-medium">Every frame matters</span> Whether it's a high energy short or a documentary masterpiece, I ensure your message isn't just seen—it's felt.
                </p>
              </div>

              {/* Skills Grid */}
              <div className="mt-12">
                <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6 opacity-70">My Toolkit</h3>
                <div className="flex flex-wrap gap-3">
                  <SkillCard name="Motion Graphics" icon={Monitor} delay={0.1} />
                  <SkillCard name="Color Grading" icon={Aperture} delay={0.2} />
                  <SkillCard name="Sound Design" icon={Music} delay={0.3} />
                  <SkillCard name="Storytelling" icon={Layers} delay={0.4} />
                  <SkillCard name="VFX" icon={Zap} delay={0.5} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;