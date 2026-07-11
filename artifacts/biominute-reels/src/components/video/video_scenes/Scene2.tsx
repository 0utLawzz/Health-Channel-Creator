import { motion } from 'framer-motion';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

function WaterGlassGraphic() {
  return (
    <div className="w-full flex justify-center" style={{ height: 'calc(var(--cvh)*25)' }}>
      <svg viewBox="0 0 100 160" className="h-full" preserveAspectRatio="xMidYMid meet">
        {/* Glass outline (emerald) */}
        <path d="M25,40 L30,140 C30,145 70,145 70,140 L75,40" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
        
        {/* Water filling up */}
        <clipPath id="glassClip2">
          <motion.rect
            x="20" width="60" height="120"
            initial={{ y: 160 }}
            animate={{ y: 60 }}
            transition={{ duration: 2.5, delay: 1.8, ease: "easeInOut" }}
          />
        </clipPath>
        
        <g clipPath="url(#glassClip2)">
          <path d="M25,40 L30,140 C30,145 70,145 70,140 L75,40" fill="url(#waterGrad2)" />
        </g>

        <defs>
          <linearGradient id="waterGrad2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#2F6FED" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Floating Droplet falling into glass */}
        <motion.path 
          d="M50,10 C50,10 40,25 50,35 C60,25 50,10 50,10 Z" 
          fill="#14b8a6"
          initial={{ y: -40, opacity: 0, scale: 0.5 }}
          animate={{ y: [ -30, 80 ], opacity: [ 0, 1, 0 ], scale: [0.8, 1.2, 0.5] }}
          transition={{ duration: 1.2, repeat: 2, delay: 0.5, repeatDelay: 0.3 }}
        />
      </svg>
    </div>
  );
}

export function Scene2() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display bg-brand-navy overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-[8%] gap-[calc(var(--cvh)*4)]">
        
        <motion.span
          className="text-white/90 font-medium leading-snug text-center"
          style={{ fontSize: 'calc(var(--cvw)*6.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SNAPPY, delay: 0.2 }}
        >
          Drinking a <span className="text-brand-emerald font-bold">glass of water</span> before your first coffee...
        </motion.span>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...SPRING_SMOOTH, delay: 0.5 }}
        >
          <WaterGlassGraphic />
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-[calc(var(--cvh)*2)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SNAPPY, delay: 4.0 }}
        >
          <div className="flex items-center gap-[calc(var(--cvw)*3)] bg-brand-blue/15 border border-brand-blue/30 rounded-full px-[calc(var(--cvw)*5)] py-[calc(var(--cvh)*1.5)]">
            <span style={{ fontSize: 'calc(var(--cvw)*6)' }}>💧</span>
            <span className="text-white font-bold" style={{ fontSize: 'calc(var(--cvw)*5)' }}>
              Replaces overnight losses
            </span>
          </div>
          <div className="flex items-center gap-[calc(var(--cvw)*3)] bg-brand-emerald/15 border border-brand-emerald/30 rounded-full px-[calc(var(--cvw)*5)] py-[calc(var(--cvh)*1.5)]">
            <span style={{ fontSize: 'calc(var(--cvw)*6)' }}>⚡</span>
            <span className="text-brand-emerald font-bold" style={{ fontSize: 'calc(var(--cvw)*5)' }}>
              Supports normal alertness
            </span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
