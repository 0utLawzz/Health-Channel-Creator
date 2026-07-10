import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800), // No speed/distance text
      setTimeout(() => setPhase(2), 2200), // 10-15 min badge
      setTimeout(() => setPhase(3), 3500), // Enough text
      setTimeout(() => setPhase(4), 5000), // Citation
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="z-20 w-full px-[calc(var(--cvw)*8)] flex flex-col items-center text-center">
        
        <motion.p
          className="font-display text-[calc(var(--cvh)*3.5)] text-brand-muted font-bold leading-tight mb-[calc(var(--cvh)*6)]"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={SPRING_SNAPPY}
        >
          You don't need <span className="line-through text-brand-text decoration-brand-orange decoration-4">speed</span> or <span className="line-through text-brand-text decoration-brand-orange decoration-4">distance</span>.
        </motion.p>

        {/* 10-15 min Badge */}
        <motion.div
           className="relative flex items-center justify-center w-[calc(var(--cvw)*45)] h-[calc(var(--cvw)*45)] max-w-[220px] max-h-[220px] mb-[calc(var(--cvh)*6)] z-10"
           initial={{ scale: 0, opacity: 0 }}
           animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
           transition={SPRING_SNAPPY}
        >
           <motion.div 
             className="absolute inset-0 rounded-full bg-brand-emerald/20 blur-[30px]"
             animate={phase >= 2 ? { scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] } : {}}
             transition={{ duration: 3, repeat: Infinity }}
           />
           <div className="absolute inset-0 rounded-full border-8 border-brand-emerald bg-brand-navy shadow-[0_0_40px_rgba(16,185,129,0.4)] flex flex-col items-center justify-center">
             <span className="font-display font-black text-[calc(var(--cvh)*6)] text-white drop-shadow-lg leading-none tracking-tighter">
               10-15
             </span>
             <span className="font-mono text-[calc(var(--cvh)*2)] font-bold text-brand-emerald uppercase tracking-widest mt-2">
               Minutes
             </span>
           </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={SPRING_SNAPPY}
          className="flex flex-col items-center w-full"
        >
          <div className="w-full bg-gradient-to-r from-brand-teal/20 to-brand-emerald/20 border border-brand-teal/40 px-[calc(var(--cvw)*6)] py-[calc(var(--cvh)*3)] rounded-3xl backdrop-blur-md shadow-2xl">
            <p className="font-display text-[calc(var(--cvh)*2.5)] text-brand-text font-bold leading-tight">
              A relaxed walk is enough to make a 
              <span className="block text-brand-teal uppercase tracking-widest font-black text-[calc(var(--cvh)*2.8)] mt-2 leading-none drop-shadow-sm">Meaningful Difference</span>
            </p>
          </div>
        </motion.div>

        {/* Citations */}
        <motion.div 
          className="absolute bottom-[calc(var(--cvh)*4)] left-[calc(var(--cvw)*4)] right-[calc(var(--cvw)*4)] text-center"
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="font-body text-[calc(var(--cvh)*1.4)] text-brand-muted/60 tracking-wide leading-[1.6]">
            Dipietro L et al. (2013), Diabetes Care<br/>
            Reynolds AN et al. (2016), Diabetologia
          </p>
        </motion.div>
        
      </div>
    </motion.div>
  );
}
