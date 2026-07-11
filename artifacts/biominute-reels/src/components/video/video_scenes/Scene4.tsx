import { motion } from 'framer-motion';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };
const SPRING_SMOOTH = { type: 'spring' as const, stiffness: 120, damping: 25 };

export function Scene4() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full font-display bg-brand-navy overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 w-full h-full flex flex-col justify-center p-[8%] gap-[calc(var(--cvh)*4)]">

        <motion.span
          className="text-white/80 font-medium"
          style={{ fontSize: 'calc(var(--cvw)*6)' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SPRING_SNAPPY, delay: 0.2 }}
        >
          Total caffeine intake still matters most...
        </motion.span>

        <motion.div
          className="flex flex-col gap-[calc(var(--cvh)*1.5)] bg-white/5 border border-white/10 rounded-[calc(var(--cvw)*4)] p-[calc(var(--cvw)*6)] relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SMOOTH, delay: 1 }}
        >
          <div className="absolute top-0 right-0 w-[50%] h-[100%] bg-gradient-to-l from-brand-emerald/15 to-transparent blur-xl" />
          
          <span className="text-brand-teal font-bold uppercase tracking-widest text-sm mb-2 relative z-10">This one small swap</span>
          
          <div className="flex items-center justify-between gap-[calc(var(--cvw)*3)] relative z-10 font-extrabold" style={{ fontSize: 'calc(var(--cvw)*7.5)' }}>
            <motion.div 
              className="flex items-center gap-2 bg-brand-emerald/20 border border-brand-emerald/30 text-brand-emerald px-4 py-2 rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...SPRING_SNAPPY, delay: 2 }}
            >
              <span>1.</span>
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current"><path d="M12 2C12 2 6 9 6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 9 12 2 12 2Z"/></svg>
            </motion.div>
            
            <motion.span 
              className="text-white/40"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.5 }}
            >
              ➜
            </motion.span>
            
            <motion.div 
              className="flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 text-brand-orange px-4 py-2 rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...SPRING_SNAPPY, delay: 3 }}
            >
              <span>2.</span>
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8H19C20.1046 8 21 8.89543 21 10C21 11.1046 20.1046 12 19 12H18M6 2V4M10 2V4M14 2V4M6 20H18C19.1046 20 20 19.1046 20 18V8H4V18C4 19.1046 4.89543 20 6 20Z"/></svg>
            </motion.div>
          </div>
        </motion.div>

        <motion.span
          className="text-white font-bold leading-tight mt-[calc(var(--cvh)*2)] text-center"
          style={{ fontSize: 'calc(var(--cvw)*7.5)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING_SNAPPY, delay: 4.5 }}
        >
          May give your morning an <span className="text-brand-emerald">extra edge.</span>
        </motion.span>

      </div>
    </motion.div>
  );
}
