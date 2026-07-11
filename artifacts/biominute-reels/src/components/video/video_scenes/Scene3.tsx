import { motion } from 'framer-motion';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

function CoffeeBalanceGraphic() {
  return (
    <div className="w-full flex justify-center items-center gap-[calc(var(--cvw)*6)]" style={{ height: 'calc(var(--cvh)*20)' }}>
      {/* Water Side */}
      <motion.div 
        className="flex flex-col items-center relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ...SPRING_SNAPPY, delay: 0.5 }}
      >
        <svg viewBox="0 0 60 60" className="w-[calc(var(--cvw)*18)] h-[calc(var(--cvw)*18)]" preserveAspectRatio="xMidYMid meet">
          <motion.path 
            d="M30,5 C30,5 10,30 30,50 C50,30 30,5 30,5 Z" 
            fill="none" stroke="#10b981" strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1 }}
          />
          <motion.path 
            d="M30,5 C30,5 10,30 30,50 C50,30 30,5 30,5 Z" 
            fill="#10b981"
            initial={{ scale: 0, transformOrigin: '50% 100%', opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
          />
        </svg>
        <span className="text-brand-emerald font-bold text-sm mt-3">Hydration Base</span>
      </motion.div>

      {/* Balance Scale / Plus */}
      <motion.div 
        className="text-white/30 font-bold"
        style={{ fontSize: 'calc(var(--cvw)*8)' }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ...SPRING_SNAPPY, delay: 1.5 }}
      >
        +
      </motion.div>

      {/* Coffee side */}
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0.3, filter: 'grayscale(100%)' }}
        animate={{ opacity: 1, filter: 'grayscale(0%)' }}
        transition={{ duration: 1.5, delay: 3.5 }}
      >
        <svg viewBox="0 0 60 60" className="w-[calc(var(--cvw)*18)] h-[calc(var(--cvw)*18)]" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="coffeeGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#2F6FED" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <motion.path 
            d="M10,15 L45,15 C45,15 45,45 27.5,45 C10,45 10,15 10,15 Z M45,20 L50,20 C55,20 55,30 50,30 L45,30" 
            fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
            className="text-brand-orange"
          />
          <motion.path 
            d="M10,15 L45,15 C45,15 45,45 27.5,45 C10,45 10,15 10,15 Z M45,20 L50,20 C55,20 55,30 50,30 L45,30" 
            fill="url(#coffeeGrad)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 4 }}
          />
          {/* Steam */}
          <motion.path d="M20,5 Q25,-5 20,-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/50" 
            initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 1, pathLength: 1 }} transition={{ duration: 1, delay: 4.5 }} />
          <motion.path d="M35,5 Q30,-5 35,-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-white/50" 
            initial={{ opacity: 0, pathLength: 0 }} animate={{ opacity: 1, pathLength: 1 }} transition={{ duration: 1, delay: 4.7 }} />
        </svg>
        <span className="text-brand-orange font-bold text-sm mt-3">Mild Diuretic</span>
      </motion.div>

    </div>
  );
}

export function Scene3() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display bg-brand-navy overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center p-[8%] gap-[calc(var(--cvh)*5)]">
        
        <motion.div
          className="bg-brand-orange/10 border border-brand-orange/20 rounded-[calc(var(--cvw)*3)] p-[calc(var(--cvw)*5)] w-full"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SMOOTH, delay: 0.2 }}
        >
          <span className="text-white/90 font-medium leading-snug text-center block" style={{ fontSize: 'calc(var(--cvw)*6.5)' }}>
            Coffee has a <span className="text-brand-orange font-bold">mild diuretic effect</span> too...
          </span>
        </motion.div>

        <CoffeeBalanceGraphic />

        <motion.span
          className="text-white font-bold leading-tight text-center"
          style={{ fontSize: 'calc(var(--cvw)*7.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SNAPPY, delay: 5.5 }}
        >
          Starting hydrated helps <span className="text-brand-blue">balance</span> that out.
        </motion.span>

      </div>
    </motion.div>
  );
}
