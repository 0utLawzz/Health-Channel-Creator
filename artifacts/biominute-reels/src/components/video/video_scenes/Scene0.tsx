import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene0() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute top-[calc(var(--cvh)*10)] flex flex-col items-center z-20">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={SPRING_SNAPPY}
          className="relative w-[calc(var(--cvw)*15)] h-[calc(var(--cvw)*15)] min-w-[60px] min-h-[60px]"
        >
          <img src={`${import.meta.env.BASE_URL}images/biominute-logo.png`} alt="Logo" className="w-full h-full object-contain drop-shadow-2xl" />
          <motion.div 
            className="absolute top-0 right-0 w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.h1
          className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-emerald text-[calc(var(--cvh)*2.5)] mt-2 tracking-widest uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SPRING_SNAPPY }}
        >
          BioMinute
        </motion.h1>
      </div>

      <div className="z-20 w-full px-[calc(var(--cvw)*8)] flex flex-col items-center text-center mt-[calc(var(--cvh)*10)]">
        <motion.div
          className="font-mono font-bold text-[calc(var(--cvh)*2.5)] tracking-widest text-brand-blue uppercase mb-[calc(var(--cvh)*2)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          Daily Habit
        </motion.div>
        
        <motion.h2
          className="font-display font-extrabold text-[calc(var(--cvh)*5.5)] leading-[1.15] text-brand-text drop-shadow-2xl mt-[calc(var(--cvh)*2)]"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
          transition={SPRING_SMOOTH}
        >
          Walk After<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">Meals</span>
        </motion.h2>
      </div>

      <motion.div 
        className="absolute bottom-0 w-full h-[calc(var(--cvh)*30)] bg-gradient-to-t from-brand-navy to-transparent z-10"
      />
    </motion.div>
  );
}
