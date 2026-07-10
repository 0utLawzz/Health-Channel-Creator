import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 };

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 1500),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-brand-navy z-10" />

      <div className="z-20 flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={SPRING_SNAPPY}
          className="relative w-[25vw] h-[25vw] min-w-[100px] min-h-[100px]"
        >
          <div className="absolute inset-0 bg-brand-teal rounded-full opacity-20 blur-3xl" />
          <img src={`${import.meta.env.BASE_URL}images/biominute-logo.png`} alt="Logo" className="relative z-10 w-full h-full object-contain drop-shadow-2xl" />
          
          <motion.div 
            className="absolute top-[10%] right-[10%] w-3 h-3 rounded-full bg-brand-orange shadow-[0_0_15px_rgba(249,115,22,1)] z-20"
            animate={{ scale: [1, 1.8, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.h1
          className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-emerald text-[4vh] mt-4 tracking-[0.2em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SNAPPY }}
        >
          BioMinute
        </motion.h1>

        <motion.div
          className="w-full max-w-[80vw] mt-[8vh] p-[3vh] rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-md shadow-2xl text-center"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
          transition={SPRING_SNAPPY}
        >
          <p className="font-display font-bold text-[3vh] text-brand-text leading-tight">
            Do you reach for water or coffee first thing?
          </p>
        </motion.div>

        <motion.div
          className="mt-[4vh] flex gap-[2vw]"
          initial={{ opacity: 0 }}
          animate={phase >= 2 ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-[12vw] h-1 rounded-full bg-brand-teal" />
          <div className="w-[4vw] h-1 rounded-full bg-brand-emerald" />
          <div className="w-[2vw] h-1 rounded-full bg-brand-orange" />
        </motion.div>
      </div>
    </motion.div>
  );
}
