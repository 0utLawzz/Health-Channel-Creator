import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Sparkles, PersonStanding } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene2() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />
      
      {/* Background gradient */}
      <motion.div 
        className="absolute top-[20%] w-[800px] h-[800px] bg-gradient-to-tr from-[#14b8a6]/20 to-[#f97316]/20 rounded-full blur-[100px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute top-[350px] flex items-center justify-center z-10 w-full">
        <motion.div
          className="relative flex items-center justify-center w-[350px] h-[350px] bg-[#0F172A] border-8 border-[#14b8a6] rounded-full drop-shadow-[0_0_50px_rgba(20,184,166,0.3)]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
        >
          <PersonStanding size={180} color="#14b8a6" />
          <motion.div
            className="absolute top-10 right-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
          >
            <Sparkles size={80} color="#f97316" />
          </motion.div>
        </motion.div>
      </div>

      <div 
        className="absolute w-full px-16 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 120 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[90px] font-bold uppercase tracking-wider font-display"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Aid Digestion
        </motion.h2>
        <motion.p
          className="text-[#94a3b8] text-[40px] mt-8 font-medium leading-tight"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Reduce the post-meal slump
        </motion.p>
      </div>
    </motion.div>
  );
}
