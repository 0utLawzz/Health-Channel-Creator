import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Battery shows low
      setTimeout(() => setPhase(2), 2500), // Weekend blocks drop in
      setTimeout(() => setPhase(3), 3500), // Battery attempts to fill but fails
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: '-50vw' }}
      transition={{ duration: 0.8 }}
    >
      <div className="z-20 w-full px-[8vw] flex flex-col items-center text-center mt-[-5vh]">
        
        <motion.p
          className="font-display text-[4vh] text-brand-text font-bold leading-tight mb-[6vh]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          You can't "make up" lost sleep
        </motion.p>

        {/* Battery Container */}
        <motion.div
           className="relative w-[30vw] h-[50vh] max-w-[120px] border-4 border-brand-muted/40 rounded-3xl p-2 flex flex-col justify-end overflow-hidden z-10 bg-brand-navy"
           initial={{ opacity: 0, y: 50 }}
           animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
           transition={SPRING_SNAPPY}
        >
           {/* Battery top nub */}
           <div className="absolute top-[-14px] left-[50%] translate-x-[-50%] w-[40%] h-[14px] bg-brand-muted/40 rounded-t-lg" />
           
           {/* Battery Fill */}
           <motion.div
             className="w-full bg-brand-orange rounded-xl"
             initial={{ height: '20%', backgroundColor: '#F97316' }}
             animate={phase >= 3 ? { height: '50%', backgroundColor: '#2F6FED' } : { height: '20%', backgroundColor: '#F97316' }}
             transition={{ duration: 1.5, ease: "easeInOut" }}
           />

           {/* Label inside */}
           <span className="absolute inset-0 flex items-center justify-center font-mono font-bold text-[2vh] text-white/50 tracking-widest uppercase rotate-[-90deg]">
             Sleep Debt
           </span>
        </motion.div>

        {/* Weekend blocks falling in */}
        <div className="flex gap-[4vw] mt-[4vh]">
           <motion.div
              className="w-[15vw] h-[15vw] max-w-[60px] max-h-[60px] bg-brand-teal/20 border-2 border-brand-teal/50 rounded-xl flex items-center justify-center shadow-lg"
              initial={{ opacity: 0, y: -100, rotate: -20 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotate: -5 } : { opacity: 0, y: -100, rotate: -20 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 20 }}
           >
              <span className="font-display font-bold text-brand-teal text-[2vh] uppercase">Sat</span>
           </motion.div>
           <motion.div
              className="w-[15vw] h-[15vw] max-w-[60px] max-h-[60px] bg-brand-teal/20 border-2 border-brand-teal/50 rounded-xl flex items-center justify-center shadow-lg"
              initial={{ opacity: 0, y: -100, rotate: 20 }}
              animate={phase >= 2 ? { opacity: 1, y: 0, rotate: 5 } : { opacity: 0, y: -100, rotate: 20 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 20, delay: 0.1 }}
           >
              <span className="font-display font-bold text-brand-teal text-[2vh] uppercase">Sun</span>
           </motion.div>
        </div>

      </div>
    </motion.div>
  );
}