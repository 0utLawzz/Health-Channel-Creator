import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { CalendarX, Moon, Sunrise, ArrowRight } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene3() {
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />

      {/* 7-9 hrs badge with moon-to-sun transition */}
      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <motion.div
          className="relative w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-[#2F6FED] to-[#10b981] flex items-center justify-center p-2 drop-shadow-[0_0_60px_rgba(47,111,237,0.4)]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          <div className="w-full h-full rounded-full bg-[#0F172A] flex flex-col items-center justify-center">
            <motion.span
              className="text-[#2F6FED] text-[72px] font-black font-display leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...SPRING_SNAPPY }}
            >
              7-9
            </motion.span>
            <span className="text-[#94a3b8] text-[22px] font-display uppercase tracking-widest mt-2">Hours</span>
          </div>
        </motion.div>

        {/* Moon to sun transition */}
        <div className="mt-8 flex items-center gap-6">
          <motion.div
            className="flex items-center gap-2 bg-[#1e293b] border border-[#334155] px-5 py-3 rounded-2xl"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, ...SPRING_SMOOTH }}
          >
            <Moon size={28} color="#2F6FED" />
            <span className="text-[#f8fafc] font-display font-bold text-[18px] uppercase tracking-wider">Consistent</span>
          </motion.div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, ...SPRING_SNAPPY }}
          >
            <ArrowRight size={32} color="#14b8a6" />
          </motion.div>
          <motion.div
            className="flex items-center gap-2 bg-[#1e293b] border border-[#334155] px-5 py-3 rounded-2xl"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8, ...SPRING_SMOOTH }}
          >
            <Sunrise size={28} color="#f97316" />
            <span className="text-[#f8fafc] font-display font-bold text-[18px] uppercase tracking-wider">Every Night</span>
          </motion.div>
        </div>

        {/* Weekend catch-up myth */}
        <motion.div
          className="mt-8 flex items-center gap-3 bg-[#f97316]/10 border border-[#f97316]/30 px-6 py-4 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, ...SPRING_SMOOTH }}
        >
          <CalendarX size={28} color="#f97316" />
          <span className="text-[#f8fafc] font-display font-bold text-[22px] uppercase tracking-wider">You Can't Catch Up Over a Weekend</span>
        </motion.div>
      </div>

      {/* Text */}
      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[58px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Prioritize a Consistent
          <motion.span
            className="text-[#2F6FED] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            7 to 9 Hour Window
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
