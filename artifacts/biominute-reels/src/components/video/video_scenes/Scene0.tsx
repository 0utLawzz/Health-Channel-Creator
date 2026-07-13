import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Beef, Clock, ArrowDown } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene0() {
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

      {/* Radial glow */}
      <motion.div
        className="absolute top-[25%] w-[700px] h-[700px] bg-gradient-to-tr from-[#10b981]/12 to-[#f97316]/8 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central protein icon with clock */}
      <div className="absolute top-[260px] flex items-center justify-center z-10 w-full">
        <motion.div
          className="relative w-[300px] h-[300px] rounded-full bg-[#0F172A] border-8 border-[#10b981] flex items-center justify-center drop-shadow-[0_0_60px_rgba(16,185,129,0.35)]"
          initial={{ scale: 0.6, opacity: 0, rotate: -20 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          <Beef size={140} color="#10b981" strokeWidth={1.5} />
          <motion.div
            className="absolute -top-5 -right-5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, ...SPRING_SNAPPY }}
          >
            <Clock size={70} color="#f97316" strokeWidth={2.5} />
          </motion.div>
          <motion.div
            className="absolute -bottom-3 -left-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, ...SPRING_SNAPPY }}
          >
            <ArrowDown size={50} color="#14b8a6" strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h1
          className="text-[#f8fafc] text-[68px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Are You Eating
          <motion.span
            className="text-[#f97316] block mt-3 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, ...SPRING_SNAPPY }}
          >
            Protein at the Wrong Time?
          </motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
