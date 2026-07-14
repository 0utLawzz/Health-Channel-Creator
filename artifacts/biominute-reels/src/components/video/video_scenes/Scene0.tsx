import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Dumbbell, X } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

// Fat cell blob icon
function FatCell({ size = 80, color = '#f97316' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="44" rx="32" ry="30" fill={color} opacity={0.9} />
      <ellipse cx="28" cy="30" rx="10" ry="9" fill={color} />
      <ellipse cx="52" cy="26" rx="8" ry="7" fill={color} />
      <ellipse cx="40" cy="44" rx="18" ry="16" fill="white" opacity={0.12} />
    </svg>
  );
}

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

      {/* Background glow */}
      <motion.div
        className="absolute top-[18%] w-[550px] h-[550px] bg-gradient-to-tr from-[#f97316]/15 to-[#2F6FED]/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fat cell + X/arrow + Muscle icon group */}
      <div className="absolute top-[220px] flex items-center justify-center gap-0 z-10 w-full">

        {/* Fat cell */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          <div className="w-[160px] h-[160px] rounded-full bg-[#f97316]/15 border-4 border-[#f97316]/60 flex items-center justify-center drop-shadow-[0_0_40px_rgba(249,115,22,0.4)]">
            <FatCell size={100} color="#f97316" />
          </div>
          <span className="text-[#f97316] font-display font-bold text-[22px] uppercase tracking-wider">FAT</span>
        </motion.div>

        {/* Arrow + X */}
        <div className="relative flex items-center mx-4">
          <motion.div
            className="w-[80px] h-[6px] bg-[#334155] rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.2, ...SPRING_SNAPPY }}
          >
            <div className="w-[56px] h-[56px] rounded-full bg-[#ef4444] flex items-center justify-center drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]">
              <X size={32} color="white" strokeWidth={3} />
            </div>
          </motion.div>
        </div>

        {/* Muscle */}
        <motion.div
          className="flex flex-col items-center gap-3"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          <div className="w-[160px] h-[160px] rounded-full bg-[#10b981]/15 border-4 border-[#10b981]/60 flex items-center justify-center drop-shadow-[0_0_40px_rgba(16,185,129,0.4)]">
            <Dumbbell size={80} color="#10b981" strokeWidth={1.5} />
          </div>
          <span className="text-[#10b981] font-display font-bold text-[22px] uppercase tracking-wider">MUSCLE</span>
        </motion.div>
      </div>

      {/* Question text */}
      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 90 }}
      >
        <motion.h1
          className="text-[#f8fafc] text-[62px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Can You Turn
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.0, ...SPRING_SNAPPY }}
          >
            Fat Into
          </motion.span>
          <motion.span
            className="text-[#10b981] block mt-1 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.4, ...SPRING_SNAPPY }}
          >
            Muscle?
          </motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
