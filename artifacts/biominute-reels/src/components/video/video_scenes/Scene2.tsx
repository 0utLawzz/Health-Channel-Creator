import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 };
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 };

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // badge drop
      setTimeout(() => setPhase(2), 2500), // focus
      setTimeout(() => setPhase(3), 4000), // reaction time
      setTimeout(() => setPhase(4), 5500), // health risk
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const EffectItem = ({ label, icon, phaseReq }: { label: string, icon: React.ReactNode, phaseReq: number }) => (
    <motion.div
      className="flex items-center gap-[4vw] bg-brand-orange/10 border border-brand-orange/30 px-[6vw] py-[2vh] rounded-2xl w-full backdrop-blur-sm"
      initial={{ opacity: 0, x: 30 }}
      animate={phase >= phaseReq ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
      transition={SPRING_SNAPPY}
    >
      <div className="w-[10vw] h-[10vw] max-w-[40px] max-h-[40px] rounded-full bg-brand-orange/20 flex items-center justify-center border border-brand-orange/40 shadow-[0_0_15px_rgba(249,115,22,0.2)] shrink-0">
        {icon}
      </div>
      <span className="font-body text-[2.5vh] font-semibold text-brand-orange tracking-wide drop-shadow-md">
        {label}
      </span>
    </motion.div>
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, x: '50vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-orange/10 via-transparent to-transparent z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="z-20 w-full px-[8vw] flex flex-col items-center mt-[-5vh]">
        
        {/* < 7 hrs Badge */}
        <motion.div
           className="relative flex items-center justify-center w-[30vw] h-[30vw] max-w-[150px] max-h-[150px] rounded-full border-[6px] border-brand-orange bg-brand-navy/80 shadow-[0_0_30px_rgba(249,115,22,0.4)] mb-[6vh] z-10"
           initial={{ scale: 0, y: -50 }}
           animate={phase >= 1 ? { scale: 1, y: 0 } : { scale: 0, y: -50 }}
           transition={SPRING_SNAPPY}
        >
           <span className="font-display font-black text-[5vh] text-brand-orange drop-shadow-lg leading-none mt-1">
             &lt;7
           </span>
           <span className="absolute bottom-[-2vh] font-mono text-[1.8vh] font-bold text-white bg-brand-orange px-3 py-1 rounded-full uppercase tracking-wider">
             Hours
           </span>
        </motion.div>

        {/* Effects List */}
        <div className="flex flex-col gap-[2.5vh] w-full max-w-[80vw]">
          <EffectItem 
            label="Reduced Focus" 
            phaseReq={2} 
            icon={<svg className="w-[60%] h-[60%] stroke-brand-orange fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>} 
          />
          <EffectItem 
            label="Slower Reactions" 
            phaseReq={3} 
            icon={<svg className="w-[60%] h-[60%] stroke-brand-orange fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} 
          />
          <EffectItem 
            label="Health Risks" 
            phaseReq={4} 
            icon={<svg className="w-[60%] h-[60%] stroke-brand-orange fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>} 
          />
        </div>

      </div>
    </motion.div>
  );
}