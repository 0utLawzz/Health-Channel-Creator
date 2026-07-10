import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Spike graph
      setTimeout(() => setPhase(2), 3000), // Flatline graph
      setTimeout(() => setPhase(3), 5000), // Muscles absorb
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, x: '50vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-emerald/10 via-transparent to-transparent z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />

      <div className="z-20 w-full px-[8vw] flex flex-col items-center mt-[-5vh]">
        <motion.p
          className="font-display text-[3.5vh] text-brand-text font-bold leading-tight mb-[6vh] text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          Steadier <span className="text-brand-emerald">blood sugar</span>
        </motion.p>

        {/* Graph Container */}
        <div className="relative w-[80vw] h-[25vh] bg-brand-navy border border-white/10 rounded-2xl p-4 shadow-xl flex items-end overflow-hidden z-10">
           {/* Grid lines */}
           <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-10">
             <div className="w-full h-px bg-white" />
             <div className="w-full h-px bg-white" />
             <div className="w-full h-px bg-white" />
             <div className="w-full h-px bg-white" />
           </div>

           {/* Orange Spike Path (Sitting) */}
           <motion.svg
             viewBox="0 0 100 50"
             className="absolute w-full h-full left-0 bottom-0 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]"
             preserveAspectRatio="none"
             initial={{ opacity: 0 }}
             animate={phase >= 1 && phase < 2 ? { opacity: 1 } : { opacity: 0.3 }}
             transition={{ duration: 0.5 }}
           >
             <motion.path
               d="M0 45 Q 20 45, 30 10 T 60 40 T 100 45"
               fill="none"
               stroke="#F97316"
               strokeWidth="3"
               strokeLinecap="round"
               initial={{ pathLength: 0 }}
               animate={phase >= 1 ? { pathLength: 1 } : { pathLength: 0 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
             />
           </motion.svg>

           {/* Emerald Flat Path (Walking) */}
           <motion.svg
             viewBox="0 0 100 50"
             className="absolute w-full h-full left-0 bottom-0 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]"
             preserveAspectRatio="none"
           >
             <motion.path
               d="M0 45 Q 20 45, 40 35 T 80 40 T 100 45"
               fill="none"
               stroke="#10B981"
               strokeWidth="4"
               strokeLinecap="round"
               initial={{ pathLength: 0, opacity: 0 }}
               animate={phase >= 2 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
             />
           </motion.svg>
        </div>

        {/* Labels */}
        <div className="flex justify-between w-[80vw] mt-4">
           <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
           >
              <div className="w-3 h-3 rounded-full bg-brand-orange" />
              <span className="font-mono text-[1.4vh] text-brand-orange font-bold">SITTING</span>
           </motion.div>
           <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
           >
              <div className="w-3 h-3 rounded-full bg-brand-emerald" />
              <span className="font-mono text-[1.4vh] text-brand-emerald font-bold">WALKING</span>
           </motion.div>
        </div>

        {/* Muscle context */}
        <motion.div
          className="mt-[6vh] bg-brand-teal/10 border border-brand-teal/30 px-[6vw] py-[3vh] rounded-2xl backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={SPRING_SMOOTH}
        >
          <p className="font-body text-[2.2vh] text-brand-teal font-medium text-center">
            Walking helps muscles absorb glucose from your meal.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
}
