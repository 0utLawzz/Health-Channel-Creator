import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene4() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full p-[8%] flex flex-col items-center justify-center">
        
        {/* Abstract Data Rings */}
        <div className="relative w-[70%] aspect-square flex items-center justify-center mb-[calc(var(--cvh)*6)]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
             <motion.circle 
               cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1" className="text-brand-teal/20"
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
               style={{ originX: '50px', originY: '50px' }}
             />
             <motion.circle 
               cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-blue/30"
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ ...SPRING_SMOOTH, delay: 0.4 }}
               style={{ originX: '50px', originY: '50px' }}
             />
             <motion.circle 
               cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="4" className="text-brand-emerald"
               strokeLinecap="round"
               strokeDasharray="157"
               initial={{ strokeDashoffset: 157, rotate: -90 }}
               animate={{ strokeDashoffset: 0, rotate: -90 }}
               transition={{ duration: 2, ease: "easeInOut", delay: 1.0 }}
               style={{ originX: '50px', originY: '50px' }}
             />
          </svg>
          
          <motion.div 
             className="absolute flex flex-col items-center justify-center text-center gap-[calc(var(--cvh)*1)]"
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 2.0 }}
          >
             <span className="text-white font-bold" style={{ fontSize: 'calc(var(--cvw)*6)' }}>1. WATER</span>
             <span className="text-brand-teal font-bold" style={{ fontSize: 'calc(var(--cvw)*6)' }}>2. COFFEE</span>
          </motion.div>
        </div>

        {/* Text */}
        <motion.div className="flex flex-col items-center text-center gap-[calc(var(--cvh)*2)] w-full">
           <motion.p 
             className="text-white font-bold leading-tight"
             style={{ fontSize: 'calc(var(--cvw)*9)' }}
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 0.8 }}
           >
             A small swap for an extra edge
           </motion.p>
        </motion.div>
        
        {/* Citation (only final 2s) */}
        <motion.div 
          className="absolute bottom-[calc(var(--cvh)*5)] text-white/40 font-body text-center w-[80%]"
          style={{ fontSize: 'calc(var(--cvw)*3.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 7 }}
        >
          Popkin BM et al. (2010), Nutrition Reviews — Water, hydration and health
        </motion.div>

      </div>
    </motion.div>
  );
}