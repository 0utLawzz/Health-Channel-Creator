import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

export function Scene2() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  useEffect(() => {
    const animation = animate(count, 90, {
      duration: 1.5,
      ease: "easeOut",
      delay: 0.3
    });
    return animation.stop;
  }, [count]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        style={{
          background: 'radial-gradient(circle at center, #2F6FED 0%, transparent 70%)',
        }}
      />

      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
      >
        <div className="flex items-baseline gap-4">
          <motion.div className="text-[250px] font-black text-white leading-none tracking-tighter">
            <motion.span>{rounded}</motion.span>
          </motion.div>
          <motion.div 
            className="text-[100px] font-bold text-[#10b981]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            g
          </motion.div>
        </div>
        
        <motion.div 
          className="text-4xl text-white/70 font-bold tracking-widest mt-4 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          Daily Target
        </motion.div>
      </motion.div>

      <div className="absolute bottom-40 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-5xl font-bold leading-tight font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          If you're aiming for <br/>
          <span className="text-[#2F6FED] mt-4 block">90 grams a day...</span>
        </motion.p>
      </div>
    </motion.div>
  );
}
