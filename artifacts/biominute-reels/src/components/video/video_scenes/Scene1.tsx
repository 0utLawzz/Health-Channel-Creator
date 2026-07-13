import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Droplets, Wind, Moon } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene1() {
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />

      {/* Dim night-sky gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-[#1e293b] via-[#0F172A] to-[#0F172A] opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
      />

      {/* Moon icon — night context */}
      <motion.div
        className="absolute top-[200px] right-[80px] opacity-30"
        initial={{ scale: 0, rotate: -45, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 0.3 }}
        transition={{ delay: 0.3, ...SPRING_SNAPPY }}
      >
        <Moon size={120} color="#f97316" fill="#f97316" />
      </motion.div>

      {/* Central stat card */}
      <motion.div
        className="absolute top-[280px] z-10 w-[85%] bg-[#1e293b]/80 backdrop-blur-md border border-[#334155] rounded-[40px] p-14 flex flex-col items-center shadow-2xl"
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, ...SPRING_SMOOTH }}
      >
        {/* Orange accent dot */}
        <div className="absolute top-6 right-8 w-4 h-4 bg-[#f97316] rounded-full" />

        {/* Stat */}
        <motion.div
          className="flex items-end gap-3 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, ...SPRING_SNAPPY }}
        >
          <span className="text-[#10b981] text-[130px] font-black leading-none font-display drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">~1L</span>
        </motion.div>

        <motion.p
          className="text-[#94a3b8] text-[38px] font-bold font-display uppercase tracking-widest text-center leading-snug"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          of water lost<br />while you sleep
        </motion.p>

        {/* How you lose it */}
        <div className="flex gap-10 mt-12">
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.0, ...SPRING_SMOOTH }}
          >
            <div className="w-20 h-20 rounded-2xl bg-[#14b8a6]/10 border border-[#14b8a6]/30 flex items-center justify-center">
              <Wind size={36} color="#14b8a6" />
            </div>
            <span className="text-[#64748b] font-display uppercase tracking-widest text-[22px]">Breathing</span>
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 2.4, ...SPRING_SMOOTH }}
          >
            <div className="w-20 h-20 rounded-2xl bg-[#2F6FED]/10 border border-[#2F6FED]/30 flex items-center justify-center">
              <Droplets size={36} color="#2F6FED" />
            </div>
            <span className="text-[#64748b] font-display uppercase tracking-widest text-[22px]">Sweating</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Headline */}
      <div
        className="absolute w-full px-16 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[70px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0 }}
        >
          You Wake Up
          <motion.span
            className="text-[#f97316] block mt-4 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.5, ...SPRING_SNAPPY }}
          >
            Already Dehydrated
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
