import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 };

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 5500),
      setTimeout(() => setPhase(4), 7500),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: '-50vw' }}
      transition={{ duration: 0.8 }}
    >
      <div className="z-20 w-full px-[8vw] flex flex-col items-center text-center">
        <motion.p
          className="font-body text-[3vh] text-brand-muted"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          Total caffeine intake still matters most for how you feel...
        </motion.p>

        <div className="my-[6vh] relative">
          <motion.div
            className="absolute inset-0 bg-brand-orange rounded-full opacity-20 blur-3xl"
            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.h3
            className="font-display font-extrabold text-[5.5vh] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-brand-text to-brand-muted drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={SPRING_SNAPPY}
          >
            But this <span className="text-brand-orange">one small swap</span>
          </motion.h3>
        </div>

        <div className="flex flex-col gap-[2vh] w-full max-w-[80vw]">
          <motion.div
            className="bg-brand-teal/20 border-2 border-brand-teal/50 rounded-2xl py-[2vh] px-[4vw] flex items-center justify-between"
            initial={{ opacity: 0, x: -50 }}
            animate={phase >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={SPRING_SMOOTH}
          >
            <span className="font-display font-bold text-[3.5vh] text-brand-teal">1.</span>
            <span className="font-body font-bold text-[3vh] text-brand-text uppercase tracking-wide">Water First</span>
          </motion.div>

          <motion.div
            className="bg-brand-navy/60 border-2 border-brand-muted/30 rounded-2xl py-[2vh] px-[4vw] flex items-center justify-between"
            initial={{ opacity: 0, x: 50 }}
            animate={phase >= 3 ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={SPRING_SMOOTH}
          >
            <span className="font-display font-bold text-[3.5vh] text-brand-muted">2.</span>
            <span className="font-body font-bold text-[3vh] text-brand-text uppercase tracking-wide">Coffee Second</span>
          </motion.div>
        </div>

        <motion.p
          className="font-body text-[3vh] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-emerald mt-[6vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={SPRING_SMOOTH}
        >
          ...may give your morning an extra edge.
        </motion.p>
      </div>
      
      {/* Citation */}
      <motion.div 
        className="absolute bottom-[4vh] left-[4vw] right-[4vw] text-center"
        initial={{ opacity: 0 }}
        animate={phase >= 4 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <p className="font-body text-[1.4vh] text-brand-muted/60 tracking-wider">
          Popkin BM et al. (2010), Nutrition Reviews — Water, hydration and health
        </p>
      </motion.div>
    </motion.div>
  );
}
