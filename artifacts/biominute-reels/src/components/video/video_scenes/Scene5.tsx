import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene5() {
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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />
      
      {/* BioMinute Logo */}
      <motion.div
        className="absolute top-[200px] z-10 w-48 h-48 rounded-full bg-gradient-to-tr from-[#14b8a6] to-[#2F6FED] flex items-center justify-center p-1.5 drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="w-full h-full bg-[#0F172A] rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-24 h-24 text-[#14b8a6]" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>

      <motion.h2 
        className="absolute top-[420px] text-white text-[70px] font-black uppercase tracking-[0.2em] font-display z-10 drop-shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        BioMinute
      </motion.h2>

      {/* CTA Box */}
      <motion.div
        className="absolute top-[650px] z-10 bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-sm w-[85%] text-center shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h3 className="text-[#10B981] text-[40px] font-bold mb-8 uppercase tracking-wider font-display">Join the Conversation</h3>
        <p className="text-white text-[65px] font-medium leading-tight font-body">
          Do you walk after meals, or sit right down? 👇
        </p>
      </motion.div>

      {/* Citation - Must be within safe zone */}
      <motion.div 
        className="absolute w-full px-12 z-10"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 40 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex items-start justify-center gap-6 text-[#94a3b8] text-[28px] font-medium bg-[#0F172A]/80 p-6 rounded-2xl backdrop-blur-sm border border-white/5">
          <BookOpen className="shrink-0 mt-2" size={32} />
          <p className="leading-relaxed text-left">
            Sources: Dipietro L et al. (2013), Diabetes Care;<br/>
            Reynolds AN et al. (2016), Diabetologia
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
