import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;

export function Scene5() {
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
      
      {/* BioMinute Logo Motif */}
      <motion.div
        className="absolute top-[200px] z-10 w-48 h-48 rounded-full bg-gradient-to-tr from-[#14b8a6] to-[#10b981] flex items-center justify-center p-1.5 drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, ...SPRING_SNAPPY }}
      >
        <div className="w-full h-full bg-[#0F172A] rounded-full flex items-center justify-center relative">
          <Activity size={80} color="#14b8a6" strokeWidth={2} />
          {/* Orange accent dot */}
          <div className="absolute top-8 right-10 w-4 h-4 bg-[#f97316] rounded-full" />
        </div>
      </motion.div>

      <motion.h2 
        className="absolute top-[420px] bg-gradient-to-r from-[#14b8a6] to-[#10b981] bg-clip-text text-transparent text-[70px] font-black uppercase tracking-[0.2em] font-display z-10 drop-shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        BioMinute
      </motion.h2>

      {/* CTA Box */}
      <motion.div
        className="absolute top-[620px] z-10 bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-sm w-[85%] text-center shadow-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <h3 className="text-[#10B981] text-[35px] font-bold mb-6 uppercase tracking-wider font-display">Join the Conversation</h3>
        <p className="text-white text-[55px] font-medium leading-tight font-body">
          Do you reach for water or coffee first thing? 👇
        </p>
      </motion.div>

      {/* Hashtags */}
      <motion.div 
        className="absolute w-full px-12 z-10 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[#2F6FED] text-[26px] font-bold opacity-80"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 40 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1 }}
      >
        <span>#BioMinute</span>
        <span>#Hydration</span>
        <span>#MorningRoutine</span>
        <span>#WaterFirst</span>
        <span>#WellnessTips</span>
      </motion.div>
    </motion.div>
  );
}
