import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Droplets, Zap } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene2() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />
      
      {/* Background gradient */}
      <motion.div 
        className="absolute top-[20%] w-[800px] h-[800px] bg-gradient-to-tr from-[#10b981]/15 to-[#14b8a6]/15 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute top-[250px] flex items-center justify-center z-10 w-full">
        <motion.div
          className="relative flex items-center justify-center w-[300px] h-[300px] bg-[#0F172A] border-8 border-[#10b981] rounded-full drop-shadow-[0_0_50px_rgba(16,185,129,0.3)] overflow-hidden"
          initial={{ y: 50, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          {/* Water filling up from bottom */}
          <motion.div
            className="absolute bottom-0 w-full bg-[#14b8a6]"
            initial={{ height: "0%" }}
            animate={{ height: "70%" }}
            transition={{ delay: 1.0, duration: 2, ease: "easeInOut" }}
          />
          <Droplets size={120} color="#f8fafc" className="z-10 mix-blend-overlay opacity-80" />
        </motion.div>

        {/* Floating Droplets outside */}
        <motion.div
          className="absolute top-[50px]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 150, opacity: [0, 1, 0] }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeIn" }}
        >
          <Droplets size={60} color="#14b8a6" />
        </motion.div>

        <motion.div
          className="absolute top-[180px] right-[200px]"
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 15 }}
          transition={{ delay: 2.2, ...SPRING_SNAPPY }}
        >
          <Zap size={100} color="#f97316" fill="#f97316" className="drop-shadow-[0_0_30px_rgba(249,115,22,0.6)]" />
        </motion.div>
      </div>

      <div 
        className="absolute w-full px-16 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 120 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[80px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Replace Overnight Losses
        </motion.h2>
        <motion.p
          className="text-[#10b981] text-[45px] mt-6 font-bold font-display uppercase tracking-widest drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          Support Hydration & Alertness
        </motion.p>
      </div>
    </motion.div>
  );
}
