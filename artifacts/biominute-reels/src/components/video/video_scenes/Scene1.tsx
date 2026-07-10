import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene1() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full p-[8%] flex flex-col items-center justify-center">
        
        {/* Parallax Sunrise + Character */}
        <div 
          className="relative w-[75%] mb-[calc(var(--cvh)*6)] flex items-center justify-center rounded-[calc(var(--cvw)*8)] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-brand-navy"
          style={{ aspectRatio: '3/4' }}
        >
          
          <motion.img 
            src={`${BASE_URL}images/sunrise-bg.png`}
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-50 max-w-none"
            initial={{ y: "10%" }}
            animate={{ y: "-10%" }}
            transition={{ duration: 10, ease: "linear" }}
          />
          
          <motion.img 
            src={`${BASE_URL}images/character-waking.png`}
            className="w-[80%] h-[80%] object-contain relative z-10 drop-shadow-2xl"
            initial={{ scale: 0.8, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ ...SPRING_SMOOTH, delay: 0.4 }}
          />
          
          {/* 7-8 Hrs Badge */}
          <motion.div 
            className="absolute top-[10%] right-[10%] bg-brand-blue/90 backdrop-blur-md text-white rounded-[calc(var(--cvw)*4)] px-[calc(var(--cvw)*4)] py-[calc(var(--cvw)*2)] flex items-center justify-center font-bold z-20 shadow-lg border border-white/20"
            style={{ fontSize: 'calc(var(--cvw)*5)' }}
            initial={{ scale: 0, rotate: 10 }}
            animate={{ scale: 1, rotate: -5 }}
            transition={{ ...SPRING_SNAPPY, delay: 1.2 }}
          >
            7-8 HRS
          </motion.div>
        </div>

        {/* Text */}
        <motion.div className="flex flex-col items-center text-center gap-[calc(var(--cvh)*2)] w-full">
           <motion.p 
             className="text-white/90 font-medium tracking-wide"
             style={{ fontSize: 'calc(var(--cvw)*6.5)' }}
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 0.8 }}
           >
             After waking up...
           </motion.p>
           <motion.p 
             className="text-brand-orange font-bold leading-tight"
             style={{ fontSize: 'calc(var(--cvw)*9)' }}
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 1.0 }}
           >
             Your body is naturally low on fluids
           </motion.p>
        </motion.div>

      </div>
    </motion.div>
  );
}