import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene1() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />
      
      {/* Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#14b8a6 1px, transparent 1px), linear-gradient(90deg, #14b8a6 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full px-16 -mt-32">
        <motion.div
          className="flex items-end justify-between h-[500px] border-b-4 border-l-4 border-white/20 pb-4 pl-4 relative"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transformOrigin: "bottom" }}
        >
          {/* Y Axis Label */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 -rotate-90 text-white/50 font-bold text-2xl tracking-widest w-64 text-center">
            SYNTHESIS
          </div>
          
          {/* Bars */}
          {[
            { label: "BFAST", typical: 10, ideal: 30, delay: 0.5 },
            { label: "LUNCH", typical: 20, ideal: 30, delay: 0.7 },
            { label: "DINNER", typical: 60, ideal: 30, delay: 0.9 },
          ].map((bar, i) => (
            <div key={i} className="flex flex-col items-center w-1/3 group">
              <div className="relative w-24 h-[400px] flex items-end justify-center mb-4">
                {/* Typical loading (red/orange) - animate out */}
                <motion.div
                  className="absolute bottom-0 w-24 bg-white/10 rounded-t-xl"
                  initial={{ height: 0 }}
                  animate={{ height: `${bar.typical}%`, opacity: [1, 1, 0] }}
                  transition={{ 
                    height: { duration: 0.8, delay: bar.delay, ease: "easeOut" },
                    opacity: { duration: 0.5, delay: 3.5 }
                  }}
                />
                {/* Ideal spreading (emerald) - animate in later */}
                <motion.div
                  className="absolute bottom-0 w-24 bg-gradient-to-t from-[#10b981] to-[#34d399] rounded-t-xl"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${bar.ideal}%`, opacity: [0, 0, 1] }}
                  transition={{ 
                    height: { duration: 0.8, delay: 3.5 + i * 0.2, type: "spring", stiffness: 100 },
                    opacity: { duration: 0.1, delay: 3.5 }
                  }}
                />
              </div>
              <motion.span 
                className="text-white/80 font-bold text-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: bar.delay + 0.3 }}
              >
                {bar.label}
              </motion.span>
            </div>
          ))}
          
          {/* Target Line */}
          <motion.div 
            className="absolute bottom-[30%] left-0 w-full border-t-4 border-dashed border-[#f97316]"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 4.5, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          >
            <span className="absolute -top-8 right-0 text-[#f97316] font-bold text-2xl bg-[#0F172A] px-2">OPTIMAL THRESHOLD</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-40 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-5xl font-bold leading-tight font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Research suggests spreading protein 
          <motion.span 
            className="text-[#10b981] block mt-4 text-6xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.8, type: "spring" }}
          >
            across meals
          </motion.span> 
        </motion.p>
      </div>

      {/* Citation */}
      <motion.div 
        className="absolute bottom-8 right-8 text-white/40 text-xl font-mono text-right max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        Morton RW et al. (2018)<br/>
        Am J Clin Nutr
      </motion.div>
    </motion.div>
  );
}
