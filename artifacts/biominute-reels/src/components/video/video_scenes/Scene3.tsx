import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Digestion icon
      setTimeout(() => setPhase(2), 2500), // Plus items
      setTimeout(() => setPhase(3), 4000), // Energy up
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: 'calc(var(--cvw) * -50)' }}
      transition={{ duration: 0.8 }}
    >
      <div className="z-20 w-full px-[calc(var(--cvw)*8)] flex flex-col items-center text-center mt-[calc(var(--cvh)*-5)]">
        
        {/* Core Icon */}
        <motion.div
           className="relative flex items-center justify-center w-[calc(var(--cvw)*35)] h-[calc(var(--cvw)*35)] max-w-[180px] max-h-[180px] rounded-full bg-brand-blue/10 border border-brand-blue/30 shadow-[0_0_40px_rgba(47,111,237,0.2)] z-10 mb-[calc(var(--cvh)*6)]"
           initial={{ scale: 0, y: 50 }}
           animate={phase >= 1 ? { scale: 1, y: 0 } : { scale: 0, y: 50 }}
           transition={SPRING_SNAPPY}
        >
           <motion.div
             className="absolute inset-0 rounded-full border border-brand-blue/50"
             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
           />
           <svg className="w-[50%] h-[50%] stroke-brand-blue fill-none" viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
             <path d="M12 8v4l3 3" />
           </svg>
        </motion.div>

        {/* Benefits text */}
        <div className="flex flex-col gap-[calc(var(--cvh)*3)] w-full">
           <motion.div
              className="flex items-center gap-4 bg-brand-teal/10 border border-brand-teal/30 p-[calc(var(--cvw)*4)] rounded-2xl"
              initial={{ opacity: 0, x: -50 }}
              animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={SPRING_SMOOTH}
           >
              <div className="w-[calc(var(--cvw)*10)] h-[calc(var(--cvw)*10)] max-w-[40px] max-h-[40px] shrink-0 bg-brand-teal/20 rounded-full flex items-center justify-center border border-brand-teal/50">
                <svg className="w-[60%] h-[60%] stroke-brand-teal fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <span className="font-display text-[calc(var(--cvh)*2.5)] font-bold text-white tracking-wide text-left leading-tight">Aids Digestion</span>
           </motion.div>
           
           <motion.div
              className="flex items-center gap-4 bg-brand-orange/10 border border-brand-orange/30 p-[calc(var(--cvw)*4)] rounded-2xl"
              initial={{ opacity: 0, x: 50 }}
              animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={SPRING_SMOOTH}
           >
              <div className="w-[calc(var(--cvw)*10)] h-[calc(var(--cvw)*10)] max-w-[40px] max-h-[40px] shrink-0 bg-brand-orange/20 rounded-full flex items-center justify-center border border-brand-orange/50">
                <svg className="w-[60%] h-[60%] stroke-brand-orange fill-none" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
              </div>
              <span className="font-display text-[calc(var(--cvh)*2.5)] font-bold text-white tracking-wide text-left leading-tight">Beats the Post-Meal Slump</span>
           </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
