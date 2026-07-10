import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 };

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 800),
      setTimeout(() => setPhase(2), 3000),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-[50vw] h-[50vw] mb-[5vh]">
        <motion.div
          className="absolute inset-0 bg-brand-emerald rounded-full opacity-20 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.img
          src={`${import.meta.env.BASE_URL}images/water-glass.png`}
          alt="Water Glass"
          className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        />
        
        {/* Floating water droplet particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute z-20 rounded-full bg-brand-teal"
            style={{ 
              width: `${Math.random() * 10 + 5}px`, 
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0, 1, 0], y: -50 }}
            transition={{ 
              duration: 2 + Math.random(), 
              repeat: Infinity,
              delay: Math.random() * 2 
            }}
          />
        ))}
      </div>

      <div className="z-20 w-full px-[8vw] flex flex-col items-center text-center">
        <motion.p
          className="font-body text-[3.5vh] font-semibold text-brand-text leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ...SPRING_SMOOTH }}
        >
          Drinking a glass of water before your first coffee
        </motion.p>

        <motion.div
          className="w-[10vw] h-[4px] rounded-full bg-brand-teal my-[3vh]"
          initial={{ scaleX: 0 }}
          animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        />

        <motion.p
          className="font-body text-[2.8vh] text-brand-muted max-w-[85vw]"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={SPRING_SMOOTH}
        >
          helps replace those overnight losses and supports normal hydration and alertness.
        </motion.p>
      </div>
    </motion.div>
  );
}
