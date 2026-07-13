import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Droplets, Utensils, ArrowRight } from 'lucide-react';
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />

      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
          <motion.div
            className="absolute left-0 w-[140px] h-[140px] rounded-full bg-[#1e293b] border-4 border-[#2F6FED] flex items-center justify-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, ...SPRING_SMOOTH }}
          >
            <Droplets size={64} color="#2F6FED" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute right-0 w-[140px] h-[140px] rounded-full bg-[#1e293b] border-4 border-[#f97316] flex items-center justify-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, ...SPRING_SMOOTH }}
          >
            <Utensils size={64} color="#f97316" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, ...SPRING_SNAPPY }}
          >
            <div className="w-20 h-20 rounded-full bg-[#14b8a6] flex items-center justify-center">
              <ArrowRight size={40} color="#0F172A" strokeWidth={2.5} />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 flex items-center gap-3 bg-[#2F6FED]/10 border border-[#2F6FED]/30 px-6 py-4 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, ...SPRING_SMOOTH }}
        >
          <span className="text-[#f8fafc] font-display font-bold text-[22px] uppercase tracking-wider">Don't Mistake Thirst for Hunger</span>
        </motion.div>
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
          Hydration Helps You
          <motion.span
            className="text-[#14b8a6] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Avoid False Hunger
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
