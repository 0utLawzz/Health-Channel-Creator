import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene5() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display bg-brand-navy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full p-[8%] flex flex-col items-center justify-center">
        
        {/* Animated Background Ring */}
        <motion.div 
           className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none"
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 0.2 }}
           transition={{ duration: 2 }}
        >
           <div className="w-[150%] aspect-square rounded-full border-[calc(var(--cvw)*0.5)] border-brand-teal/30" />
           <div className="absolute w-[120%] aspect-square rounded-full border-[calc(var(--cvw)*0.5)] border-brand-blue/30" />
        </motion.div>

        {/* BioMinute Logo */}
        <motion.div 
           className="relative w-[50%] mb-[calc(var(--cvh)*4)]"
           initial={{ scale: 0.5, opacity: 0, y: 50 }}
           animate={{ scale: 1, opacity: 1, y: 0 }}
           transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
        >
           <img 
              src={`${BASE_URL}images/biominute-logo.png`} 
              alt="BioMinute Logo"
              className="w-full h-auto drop-shadow-[0_10px_20px_rgba(20,184,166,0.3)]"
           />
        </motion.div>

        {/* Wordmark */}
        <motion.h1 
           className="text-gradient-emerald-teal font-extrabold tracking-tight mb-[calc(var(--cvh)*8)]"
           style={{ fontSize: 'calc(var(--cvw)*11)' }}
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ ...SPRING_SNAPPY, delay: 0.6 }}
        >
           BioMinute
        </motion.h1>

        {/* CTA Text */}
        <motion.div 
           className="w-full text-center"
           initial={{ y: 30, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ ...SPRING_SNAPPY, delay: 1.0 }}
        >
           <p 
             className="text-white/90 font-medium"
             style={{ fontSize: 'calc(var(--cvw)*6)' }}
           >
             Do you reach for water or coffee first thing?
           </p>
        </motion.div>
        
        {/* End pulse effect */}
        <motion.div 
          className="absolute w-[10px] h-[10px] bg-brand-teal rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 100, opacity: 0 }}
          transition={{ duration: 1.5, delay: 5 }}
        />

      </div>
    </motion.div>
  );
}