import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };
const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // Plate
      setTimeout(() => setPhase(2), 2500), // Clock
      setTimeout(() => setPhase(3), 4000), // Text 2
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: '-50vw' }}
      transition={{ duration: 0.8 }}
    >
      <div className="z-20 w-full px-[8vw] flex flex-col items-center text-center mt-[-10vh]">
        <motion.p
          className="font-display font-bold text-[4vh] text-brand-text leading-tight mb-[4vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          More than just <span className="text-brand-orange">burning calories.</span>
        </motion.p>
        
        <div className="relative w-[60vw] h-[60vw] max-w-[300px] max-h-[300px] flex items-center justify-center mt-[2vh]">
          {/* Background glow */}
          <motion.div
             className="absolute w-[80%] h-[80%] bg-brand-emerald/10 rounded-full blur-[30px]"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
          />

          {/* Plate */}
          <motion.div
             className="absolute w-[60%] h-[60%] border-4 border-brand-teal rounded-full bg-brand-navy flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.2)]"
             initial={{ rotate: -90, scale: 0, opacity: 0 }}
             animate={phase >= 1 ? { rotate: 0, scale: 1, opacity: 1 } : { rotate: -90, scale: 0, opacity: 0 }}
             transition={SPRING_SMOOTH}
          >
             {/* Food representation */}
             <div className="w-[40%] h-[40%] bg-brand-orange/80 rounded-l-full absolute left-[10%]" />
             <div className="w-[40%] h-[40%] bg-brand-emerald/80 rounded-tr-full absolute top-[10%] right-[10%]" />
             <div className="w-[40%] h-[40%] bg-brand-blue/80 rounded-br-full absolute bottom-[10%] right-[10%]" />
          </motion.div>

          {/* Clock */}
          <motion.div
             className="absolute -bottom-[2vh] -right-[2vw] w-[20vw] h-[20vw] max-w-[80px] max-h-[80px] border-4 border-brand-blue bg-brand-navy rounded-full shadow-[0_0_20px_rgba(47,111,237,0.4)] flex items-center justify-center z-10"
             initial={{ scale: 0, opacity: 0 }}
             animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
             transition={SPRING_SNAPPY}
          >
             <svg viewBox="0 0 24 24" className="w-[60%] h-[60%] stroke-brand-blue fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <motion.path 
                  d="M12 6v6l4 2" 
                  initial={{ pathLength: 0 }}
                  animate={phase >= 2 ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
             </svg>
             {phase >= 2 && (
               <motion.span 
                 className="absolute -bottom-[3vh] font-mono text-[1.6vh] text-brand-blue tracking-widest font-bold whitespace-nowrap bg-brand-navy/90 px-2 py-1 rounded"
                 initial={{ opacity: 0, y: -10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.5 }}
               >
                 30 MIN
               </motion.span>
             )}
          </motion.div>
        </div>

        <motion.p
          className="font-body text-[2.2vh] text-brand-muted mt-[8vh] max-w-[90%] leading-relaxed text-center font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={SPRING_SMOOTH}
        >
          Light movement right after eating changes how your body works.
        </motion.p>
      </div>
    </motion.div>
  );
}
