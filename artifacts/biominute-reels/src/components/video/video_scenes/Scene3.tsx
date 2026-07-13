import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Heart, Wind } from 'lucide-react';
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

      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
          <motion.div
            className="w-[260px] h-[260px] rounded-full bg-[#0F172A] border-8 border-[#2F6FED] flex items-center justify-center drop-shadow-[0_0_60px_rgba(47,111,237,0.35)]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.05, 1], opacity: 1 }}
            transition={{ delay: 0.2, duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Wind size={110} color="#2F6FED" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-[#14b8a6] opacity-0"
            animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="mt-10 flex items-center gap-6">
          <motion.div
            className="flex flex-col items-center gap-2 bg-[#1e293b] border border-[#334155] px-6 py-4 rounded-2xl"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, ...SPRING_SMOOTH }}
          >
            <span className="text-[#2F6FED] font-display font-black text-[48px]">4</span>
            <span className="text-[#94a3b8] font-display font-bold text-[14px] uppercase tracking-wider">In</span>
          </motion.div>
          <motion.div
            className="text-[#14b8a6] font-display font-black text-[48px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, ...SPRING_SNAPPY }}
          >
            →
          </motion.div>
          <motion.div
            className="flex flex-col items-center gap-2 bg-[#1e293b] border border-[#334155] px-6 py-4 rounded-2xl"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.8, ...SPRING_SMOOTH }}
          >
            <span className="text-[#14b8a6] font-display font-black text-[48px]">6</span>
            <span className="text-[#94a3b8] font-display font-bold text-[14px] uppercase tracking-wider">Out</span>
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
          In for 4, Out for 6
          <motion.span
            className="text-[#2F6FED] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Lowers Heart Rate & Eases Stress
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
