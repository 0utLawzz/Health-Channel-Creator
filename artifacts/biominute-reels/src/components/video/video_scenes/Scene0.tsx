import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene0() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full p-[8%] flex flex-col items-center justify-center">
        {/* Visual Element */}
        <motion.div 
          className="relative w-[70%] aspect-square mb-[calc(var(--cvh)*5)]"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
        >
           <div className="absolute inset-0 bg-brand-orange/20 blur-[60px] rounded-full" />
           <img 
              src={`${BASE_URL}images/sunrise-bg.png`} 
              alt="Sunrise"
              className="absolute inset-0 w-full h-full object-cover rounded-full opacity-60 mix-blend-screen"
           />
           <img 
              src={`${BASE_URL}images/character-waking.png`} 
              alt="Character Waking"
              className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(249,115,22,0.4)]"
           />
        </motion.div>

        {/* Text */}
        <motion.div className="flex flex-col items-center text-center">
           <motion.span 
             className="text-white font-bold leading-none tracking-tight"
             style={{ fontSize: 'calc(var(--cvw)*12)' }}
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 0.5 }}
           >
             Drink Water
           </motion.span>
           <motion.span 
             className="text-white font-bold leading-none tracking-tight mt-[calc(var(--cvh)*1)]"
             style={{ fontSize: 'calc(var(--cvw)*10)' }}
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 0.6 }}
           >
             Before Your
           </motion.span>
           <motion.span 
             className="text-gradient-emerald-teal font-extrabold leading-tight tracking-tight mt-[calc(var(--cvh)*1)]"
             style={{ fontSize: 'calc(var(--cvw)*12)' }}
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 0.7 }}
           >
             Morning Coffee
           </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}