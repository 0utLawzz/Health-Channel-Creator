import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene3() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full p-[8%] flex flex-col items-center justify-center">
        
        {/* Coffee brightens */}
        <motion.div 
           className="relative w-[60%] aspect-square flex items-center justify-center rounded-[calc(var(--cvw)*8)] border-[calc(var(--cvw)*1)] border-brand-teal shadow-[0_0_80px_rgba(20,184,166,0.4)] mb-[calc(var(--cvh)*6)]"
           initial={{ scale: 0.8, backgroundColor: 'rgba(255,255,255,0.05)' }}
           animate={{ scale: 1, backgroundColor: 'rgba(16,185,129,0.1)' }}
           transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
           style={{ overflow: 'hidden' }}
        >
           <motion.div 
              className="absolute inset-0 opacity-50"
              style={{ background: 'linear-gradient(135deg, rgba(47,111,237,0.5), rgba(16,185,129,0.5))' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 0.8 }}
           />
           <motion.img 
              src={`${BASE_URL}images/coffee-cup.png`}
              className="w-[70%] h-[70%] object-contain relative z-10"
              initial={{ filter: 'grayscale(100%) blur(2px)', opacity: 0.5 }}
              animate={{ filter: 'grayscale(0%) blur(0px)', opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.0 }}
           />
           {/* Steam */}
           <motion.div
             className="absolute top-[10%] w-[calc(var(--cvw)*10)] h-[calc(var(--cvw)*20)] bg-white/20 blur-xl rounded-full"
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: -20, opacity: [0, 0.5, 0] }}
             transition={{ duration: 2, repeat: Infinity, delay: 2.0 }}
           />
        </motion.div>

        {/* Text */}
        <motion.div className="flex flex-col items-center text-center gap-[calc(var(--cvh)*2)] w-full">
           <motion.p 
             className="text-white/90 font-medium tracking-wide"
             style={{ fontSize: 'calc(var(--cvw)*6.5)' }}
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 0.8 }}
           >
             Coffee has a mild diuretic effect
           </motion.p>
           <motion.p 
             className="text-gradient-emerald-teal font-bold leading-tight"
             style={{ fontSize: 'calc(var(--cvw)*9)' }}
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 1.0 }}
           >
             Starting hydrated balances it out
           </motion.p>
        </motion.div>

      </div>
    </motion.div>
  );
}