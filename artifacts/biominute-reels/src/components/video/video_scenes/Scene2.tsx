import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene2() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full p-[8%] flex flex-col items-center justify-center">
        
        {/* Kitchen background element */}
        <motion.img 
            src={`${BASE_URL}images/kitchen-elements.png`}
            className="absolute top-[10%] w-[150%] opacity-10 object-cover max-w-none mix-blend-screen pointer-events-none"
            initial={{ x: "0%" }}
            animate={{ x: "-10%" }}
            transition={{ duration: 15, ease: "linear" }}
        />

        {/* Icons side by side */}
        <div className="relative w-full flex flex-row items-center justify-center gap-[calc(var(--cvw)*4)] mb-[calc(var(--cvh)*6)]">
          
          {/* Water Glass container */}
          <motion.div 
             className="relative w-[40%] aspect-square flex items-center justify-center bg-brand-emerald/10 rounded-[calc(var(--cvw)*6)] border-2 border-brand-emerald/30 shadow-[0_0_40px_rgba(16,185,129,0.2)]"
             initial={{ scale: 0, x: -50 }}
             animate={{ scale: 1, x: 0 }}
             transition={{ ...SPRING_SMOOTH, delay: 0.4 }}
          >
             <motion.img 
                src={`${BASE_URL}images/water-glass.png`}
                className="w-[70%] h-[70%] object-contain relative z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...SPRING_SNAPPY, delay: 0.8 }}
             />
             {/* Droplet animation */}
             <motion.div 
                className="absolute top-[-20%] w-[calc(var(--cvw)*8)] h-[calc(var(--cvw)*8)] bg-brand-teal rounded-full shadow-[0_0_20px_rgba(20,184,166,0.6)]"
                style={{ borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)' }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 20, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1.5 }}
             />
             <motion.div 
                className="absolute bottom-[10%] w-[80%] h-[10%] bg-brand-emerald/30 blur-md rounded-full z-0"
             />
          </motion.div>

          {/* Coffee Cup container */}
          <motion.div 
             className="relative w-[40%] aspect-square flex items-center justify-center bg-white/5 rounded-[calc(var(--cvw)*6)] border-2 border-white/10"
             initial={{ scale: 0, x: 50 }}
             animate={{ scale: 1, x: 0 }}
             transition={{ ...SPRING_SMOOTH, delay: 0.6 }}
          >
             <motion.img 
                src={`${BASE_URL}images/coffee-cup.png`}
                className="w-[70%] h-[70%] object-contain relative z-10 grayscale opacity-40"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.4 }}
                transition={{ ...SPRING_SNAPPY, delay: 1.0 }}
             />
          </motion.div>

        </div>

        {/* Text */}
        <motion.div className="flex flex-col items-center text-center gap-[calc(var(--cvh)*2)] w-full relative z-20">
           <motion.p 
             className="text-white/90 font-medium tracking-wide"
             style={{ fontSize: 'calc(var(--cvw)*6.5)' }}
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 1.2 }}
           >
             Swap the order
           </motion.p>
           <motion.p 
             className="text-brand-emerald font-bold leading-tight"
             style={{ fontSize: 'calc(var(--cvw)*9)' }}
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ ...SPRING_SNAPPY, delay: 1.4 }}
           >
             Drink a glass of water before your first coffee
           </motion.p>
        </motion.div>

      </div>
    </motion.div>
  );
}