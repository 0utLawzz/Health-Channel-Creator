import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 };

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
      <div className="absolute top-[10vh] flex flex-col items-center z-20">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={SPRING_SNAPPY}
          className="relative w-[15vw] h-[15vw] min-w-[60px] min-h-[60px]"
        >
          <img src={`${import.meta.env.BASE_URL}images/biominute-logo.png`} alt="Logo" className="w-full h-full object-contain drop-shadow-2xl" />
          <motion.div 
            className="absolute top-0 right-0 w-2 h-2 rounded-full bg-brand-orange shadow-[0_0_10px_rgba(249,115,22,0.8)]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.h1
          className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-emerald text-[2.5vh] mt-2 tracking-widest uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SPRING_SNAPPY }}
        >
          BioMinute
        </motion.h1>
      </div>

      <div className="z-20 w-full px-[8vw] flex flex-col items-center text-center mt-[10vh]">
        <motion.div
          className="font-mono font-bold text-[2.5vh] tracking-widest text-brand-blue uppercase mb-[2vh]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          S3: Sleep & Recovery
        </motion.div>
        
        <motion.h2
          className="font-display font-extrabold text-[5.5vh] leading-[1.15] text-brand-text drop-shadow-2xl mt-[2vh]"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={phase >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
          transition={SPRING_SMOOTH}
        >
          Why Sleep Matters<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-blue">More Than You Think</span>
        </motion.h2>
      </div>

      <motion.div 
        className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-brand-navy to-transparent z-10"
      />
    </motion.div>
  );
}