import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 };

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800), // Badge
      setTimeout(() => setPhase(2), 2000), // Energy burst
      setTimeout(() => setPhase(3), 3500), // Text
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
      <div className="z-20 w-full px-[8vw] flex flex-col items-center text-center">
        
        {/* 7-9 hrs Badge */}
        <motion.div
           className="relative flex items-center justify-center w-[40vw] h-[40vw] max-w-[200px] max-h-[200px] mb-[6vh] z-10"
           initial={{ scale: 0, opacity: 0 }}
           animate={phase >= 1 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
           transition={SPRING_SNAPPY}
        >
           <motion.div 
             className="absolute inset-0 rounded-full bg-brand-blue/20 blur-[30px]"
             animate={phase >= 2 ? { scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] } : {}}
             transition={{ duration: 2, repeat: Infinity }}
           />
           <div className="absolute inset-0 rounded-full border-8 border-brand-emerald bg-brand-navy shadow-[0_0_40px_rgba(16,185,129,0.5)] flex flex-col items-center justify-center">
             <span className="font-display font-black text-[6vh] text-white drop-shadow-lg leading-none tracking-tight">
               7-9
             </span>
             <span className="font-mono text-[2vh] font-bold text-brand-emerald uppercase tracking-widest mt-1">
               Hours
             </span>
           </div>
           
           {/* Energy particles */}
           {phase >= 2 && Array.from({length: 6}).map((_, i) => (
              <motion.div
                 key={i}
                 className="absolute w-3 h-3 bg-brand-emerald rounded-full"
                 initial={{ x: 0, y: 0, opacity: 1 }}
                 animate={{ 
                    x: Math.cos(i * (Math.PI / 3)) * 150, 
                    y: Math.sin(i * (Math.PI / 3)) * 150, 
                    opacity: 0,
                    scale: 0
                 }}
                 transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
           ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={SPRING_SNAPPY}
          className="flex flex-col items-center w-full"
        >
          <div className="w-full bg-gradient-to-r from-brand-emerald/20 to-brand-blue/20 border border-brand-emerald/40 px-[6vw] py-[3vh] rounded-3xl backdrop-blur-md shadow-2xl">
            <p className="font-display text-[3vh] text-brand-text font-bold leading-tight">
              Does more for your energy than any
              <span className="block text-brand-emerald uppercase tracking-widest font-black text-[3vh] mt-2 leading-none">Productivity Hack</span>
            </p>
          </div>
        </motion.div>

        {/* Citation */}
        <motion.div 
          className="absolute bottom-[4vh] left-[4vw] right-[4vw] text-center"
          initial={{ opacity: 0 }}
          animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="font-body text-[1.4vh] text-brand-muted/60 tracking-wide leading-[1.6]">
            Watson NF et al. (2015), Sleep — AASM/SRS<br/>Recommended Sleep Duration Consensus
          </p>
        </motion.div>
        
      </div>
    </motion.div>
  );
}