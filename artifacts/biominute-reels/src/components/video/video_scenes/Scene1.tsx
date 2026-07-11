import { motion } from 'framer-motion';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

function WakeUpGraphic() {
  return (
    <div className="w-full relative" style={{ height: 'calc(var(--cvh)*25)' }}>
      <svg viewBox="0 0 200 160" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Soft parallax kitchen/bedroom elements in background */}
        <motion.g 
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: -10, opacity: 0.3 }}
          transition={{ duration: 8, ease: "linear" }}
        >
          {/* Window / Kitchen abstraction */}
          <rect x="140" y="20" width="40" height="60" rx="4" fill="none" stroke="#2F6FED" strokeWidth="2" />
          <line x1="140" y1="50" x2="180" y2="50" stroke="#2F6FED" strokeWidth="2" />
        </motion.g>
        
        {/* Bed/Character waking */}
        <motion.g
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ ...SPRING_SMOOTH, delay: 0.5 }}
        >
          {/* Bed */}
          <path d="M20,120 L180,120 L180,140 L20,140 Z" fill="#1e293b" />
          <path d="M20,100 L40,100 L40,120 L20,120 Z" fill="#14b8a6" opacity="0.5" />
          
          {/* Character */}
          <motion.g
            initial={{ rotate: -80, x: 20, y: 15, transformOrigin: "40px 110px" }}
            animate={{ rotate: 0, x: 0, y: 0 }}
            transition={{ ...SPRING_SMOOTH, delay: 1.5, duration: 1.5 }}
          >
            {/* Body sitting up */}
            <path d="M60,120 C60,90 90,80 90,120 Z" fill="#2F6FED" />
            <circle cx="75" cy="70" r="15" fill="#14b8a6" />
          </motion.g>
        </motion.g>

        {/* Fluid/Sweat escaping */}
        <motion.circle cx="95" cy="60" r="4" fill="#f97316"
          initial={{ opacity: 0, scale: 0 }} 
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -30, x: 20 }}
          transition={{ duration: 2, delay: 2.5 }} />
        <motion.circle cx="65" cy="50" r="3" fill="#f97316"
          initial={{ opacity: 0, scale: 0 }} 
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: -20, x: -10 }}
          transition={{ duration: 2, delay: 3 }} />
      </svg>
    </div>
  );
}

export function Scene1() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display bg-brand-navy overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center p-[8%] gap-[calc(var(--cvh)*3)]">
        <motion.div
          className="w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
        >
          <WakeUpGraphic />
        </motion.div>

        <motion.span
          className="text-white/90 font-medium leading-snug text-center mt-[calc(var(--cvh)*2)]"
          style={{ fontSize: 'calc(var(--cvw)*6.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SNAPPY, delay: 1.0 }}
        >
          After <span className="text-brand-blue font-bold">7 to 8 hours</span> of sleep...
        </motion.span>

        <motion.div
          className="flex flex-col items-center text-center gap-[calc(var(--cvh)*1.5)] bg-brand-orange/10 border border-brand-orange/20 rounded-[calc(var(--cvw)*3)] px-[calc(var(--cvw)*5)] py-[calc(var(--cvh)*3)] mt-[calc(var(--cvh)*2)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SNAPPY, delay: 3.0 }}
        >
          <span className="text-white font-bold leading-tight drop-shadow-md"
            style={{ fontSize: 'calc(var(--cvw)*7)' }}>
            Your body is naturally <span className="text-brand-orange">low on fluids</span>
          </span>
          <span className="text-white/70" style={{ fontSize: 'calc(var(--cvw)*4.5)' }}>
            just from breathing and sweating overnight.
          </span>
        </motion.div>

      </div>
    </motion.div>
  );
}
