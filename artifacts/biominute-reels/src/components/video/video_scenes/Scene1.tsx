import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 };
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 };

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000), // downtime text
      setTimeout(() => setPhase(2), 2500), // brain / memory
      setTimeout(() => setPhase(3), 4000), // body / tissue
      setTimeout(() => setPhase(4), 5500), // hormones
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
          className="font-display font-bold text-[4vh] text-brand-text leading-tight mb-[6vh]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          Sleep isn't <span className="text-brand-orange">downtime.</span>
        </motion.p>
        
        {/* Central Graphic */}
        <div className="relative w-[60vw] h-[60vw] max-w-[300px] max-h-[300px] flex items-center justify-center mt-[4vh]">
          {/* Character Silhouette */}
          <motion.div
             className="absolute bottom-0 w-[80%] h-[40%] bg-brand-blue/20 rounded-full blur-[20px]"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.5 }}
          />
          <motion.svg
             viewBox="0 0 100 50"
             className="absolute bottom-4 w-[70%] fill-brand-blue drop-shadow-xl"
             initial={{ rotate: -90, x: -50, opacity: 0 }}
             animate={{ rotate: 0, x: 0, opacity: 1 }}
             transition={{ delay: 0.5, ...SPRING_SMOOTH }}
          >
             <path d="M20 30 A10 10 0 1 1 20 10 A10 10 0 1 1 20 30 Z" />
             <path d="M35 25 L80 25 A10 10 0 0 1 80 45 L10 45 A10 10 0 0 1 10 25 Z" />
          </motion.svg>

          {/* Brain Icon & Particles */}
          <motion.div
            className="absolute top-0 w-[15vw] h-[15vw] min-w-[60px] min-h-[60px] bg-brand-emerald/20 border border-brand-emerald/50 rounded-full flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 2 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={SPRING_SNAPPY}
          >
             <svg viewBox="0 0 24 24" className="w-[60%] h-[60%] stroke-brand-emerald fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 3c-1.5 0-3 1-3 3a4.5 4.5 0 0 0 2.5 8.5h6A4.5 4.5 0 0 0 17.5 6c0-2-1.5-3-3-3" />
                <path d="M12 3v18" />
             </svg>
             {phase >= 2 && (
               <motion.span 
                 className="absolute -top-[3.5vh] font-mono text-[1.6vh] text-brand-emerald tracking-widest font-bold whitespace-nowrap bg-brand-navy/80 px-2 py-1 rounded"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
               >
                 MEMORY
               </motion.span>
             )}
          </motion.div>
          
          {/* Repair / Body Icon */}
          <motion.div
            className="absolute left-[-5vw] top-[40%] w-[12vw] h-[12vw] min-w-[50px] min-h-[50px] bg-brand-teal/20 border border-brand-teal/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(20,184,166,0.3)] z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 3 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={SPRING_SNAPPY}
          >
             <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] stroke-brand-teal fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" />
                <path d="M4 12h16" />
                <path d="M12 8v8" />
             </svg>
             {phase >= 3 && (
               <motion.span 
                 className="absolute -left-[9vw] font-mono text-[1.4vh] text-brand-teal tracking-widest font-bold whitespace-nowrap bg-brand-navy/80 px-2 py-1 rounded"
                 initial={{ opacity: 0, x: 10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
               >
                 REPAIR
               </motion.span>
             )}
          </motion.div>

          {/* Hormones Icon */}
          <motion.div
            className="absolute right-[-5vw] top-[40%] w-[12vw] h-[12vw] min-w-[50px] min-h-[50px] bg-brand-blue/20 border border-brand-blue/50 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(47,111,237,0.3)] z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={phase >= 4 ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={SPRING_SNAPPY}
          >
             <svg viewBox="0 0 24 24" className="w-[50%] h-[50%] stroke-brand-blue fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20" />
                <path d="m17 5-5-3-5 3" />
                <path d="m17 19-5 3-5-3" />
                <path d="M2 12h20" />
             </svg>
             {phase >= 4 && (
               <motion.span 
                 className="absolute -right-[10vw] font-mono text-[1.4vh] text-brand-blue tracking-widest font-bold whitespace-nowrap bg-brand-navy/80 px-2 py-1 rounded"
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.2 }}
               >
                 HORMONES
               </motion.span>
             )}
          </motion.div>

          {/* Emerald pulses */}
          <motion.div
             className="absolute inset-0 flex items-center justify-center z-0"
          >
             {phase >= 2 && Array.from({length: 3}).map((_, i) => (
                <motion.div
                   key={i}
                   className="absolute w-[20vw] h-[20vw] rounded-full border border-brand-emerald"
                   initial={{ scale: 0.5, opacity: 1 }}
                   animate={{ scale: 2, opacity: 0 }}
                   transition={{ duration: 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
                />
             ))}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}