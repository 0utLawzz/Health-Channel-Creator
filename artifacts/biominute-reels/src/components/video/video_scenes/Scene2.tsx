import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 };

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2500),
    ];
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, x: '50vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative w-full flex justify-center items-center h-[40vh] mb-[5vh]">
        {/* Coffee Cup */}
        <motion.div
          className="absolute z-10 w-[40vw] h-[40vw]"
          initial={{ x: 0, scale: 1.2 }}
          animate={phase >= 1 ? { x: '20vw', scale: 1 } : { x: 0, scale: 1.2 }}
          transition={SPRING_SMOOTH}
        >
          <img
            src={`${import.meta.env.BASE_URL}images/coffee-cup.png`}
            alt="Coffee Cup"
            className="w-full h-full object-contain drop-shadow-2xl grayscale opacity-60"
            style={{
              filter: phase >= 1 ? 'grayscale(0%) opacity(1)' : 'grayscale(80%) opacity(0.6)'
            }}
          />
        </motion.div>

        {/* Water Glass appearing */}
        <motion.div
          className="absolute z-20 w-[35vw] h-[35vw]"
          initial={{ x: '-20vw', opacity: 0, scale: 0.8 }}
          animate={phase >= 1 ? { x: '-25vw', opacity: 1, scale: 1 } : { x: '-20vw', opacity: 0, scale: 0.8 }}
          transition={SPRING_SNAPPY}
        >
          <div className="absolute inset-0 bg-brand-teal rounded-full opacity-30 blur-2xl" />
          <img
            src={`${import.meta.env.BASE_URL}images/water-glass.png`}
            alt="Water Glass"
            className="relative w-full h-full object-contain drop-shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="z-20 w-full px-[8vw] flex flex-col items-center text-center">
        <motion.p
          className="font-body text-[3vh] font-semibold text-brand-text leading-snug"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          Coffee has a mild diuretic effect too, so...
        </motion.p>

        <motion.div
          className="mt-[4vh] p-[2vh] rounded-2xl bg-brand-navy/50 border border-brand-teal/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={phase >= 2 ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 20, rotateX: 90 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <p className="font-display text-[2.5vh] text-brand-emerald font-bold uppercase tracking-wider">
            Starting Hydrated
          </p>
          <p className="font-body text-[2vh] text-brand-text/90 mt-1">
            helps balance that out.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
