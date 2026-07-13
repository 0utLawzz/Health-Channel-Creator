import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Zap, HeartCrack, Wind, AlertTriangle } from 'lucide-react';
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

      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full bg-[#f97316]/10 border-8 border-[#f97316]/40 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[220px] h-[220px] rounded-full bg-[#0F172A] border-8 border-[#f97316] flex items-center justify-center drop-shadow-[0_0_60px_rgba(249,115,22,0.35)]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, ...SPRING_SMOOTH }}
          >
            <Zap size={100} color="#f97316" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#f97316] flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, ...SPRING_SNAPPY }}
          >
            <AlertTriangle size={40} color="#0F172A" strokeWidth={2.5} />
          </motion.div>
        </div>

        <div className="mt-8 flex items-center gap-6">
          <motion.div
            className="flex items-center gap-2 bg-[#1e293b] border border-[#334155] px-5 py-3 rounded-2xl"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, ...SPRING_SMOOTH }}
          >
            <HeartCrack size={28} color="#f97316" />
            <span className="text-[#f8fafc] font-display font-bold text-[18px] uppercase tracking-wider">Heart Rate ↑</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2 bg-[#1e293b] border border-[#334155] px-5 py-3 rounded-2xl"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.5, ...SPRING_SMOOTH }}
          >
            <Wind size={28} color="#94a3b8" />
            <span className="text-[#94a3b8] font-display font-bold text-[18px] uppercase tracking-wider">Shallow Breath</span>
          </motion.div>
        </div>
      </div>

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
          Stress Triggers
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Fight-or-Flight Mode
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
