import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Calendar, ShoppingBag, Stethoscope } from 'lucide-react';
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

      {/* Vintage badge + pedometer visual */}
      <div className="absolute top-[240px] flex items-center justify-center z-10 w-full">
        <motion.div
          className="relative w-[320px] h-[320px] rounded-full bg-[#0F172A] border-8 border-[#f97316] flex items-center justify-center drop-shadow-[0_0_60px_rgba(249,115,22,0.35)]"
          initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          <div className="text-center">
            <motion.div
              className="text-[#f97316] font-display font-black text-[80px] leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, ...SPRING_SNAPPY }}
            >
              1965
            </motion.div>
            <motion.div
              className="text-[#f8fafc] font-display font-bold text-[26px] uppercase tracking-widest mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              Japan
            </motion.div>
          </div>
          <motion.div
            className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-[#10b981] flex items-center justify-center"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, ...SPRING_SNAPPY }}
          >
            <ShoppingBag size={40} color="#0F172A" strokeWidth={2} />
          </motion.div>
        </motion.div>
      </div>

      {/* Icon row */}
      <div className="absolute top-[620px] flex items-center justify-center gap-8 z-10 w-full">
        <motion.div
          className="flex items-center gap-3 bg-[#1e293b] border border-[#334155] px-5 py-3 rounded-xl"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.4, ...SPRING_SMOOTH }}
        >
          <Calendar size={28} color="#14b8a6" />
          <span className="text-[#f8fafc] font-display font-bold text-[20px] uppercase tracking-wider">1965</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-3 bg-[#1e293b] border border-[#f97316] px-5 py-3 rounded-xl"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.7, ...SPRING_SMOOTH }}
        >
          <Stethoscope size={28} color="#f97316" />
          <span className="text-[#f97316] font-display font-bold text-[20px] uppercase tracking-wider">Not Medicine</span>
        </motion.div>
      </div>

      {/* Headline */}
      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[60px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          It Started as a
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.4, ...SPRING_SNAPPY }}
          >
            Marketing Campaign
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
