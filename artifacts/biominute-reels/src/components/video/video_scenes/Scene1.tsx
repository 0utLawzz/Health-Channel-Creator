import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Dumbbell, X, ArrowRight } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

function FatCell({ size = 60, color = '#f97316' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="44" rx="32" ry="30" fill={color} opacity={0.9} />
      <ellipse cx="28" cy="30" rx="10" ry="9" fill={color} />
      <ellipse cx="52" cy="26" rx="8" ry="7" fill={color} />
      <ellipse cx="40" cy="44" rx="18" ry="16" fill="white" opacity={0.12} />
    </svg>
  );
}

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

      {/* Two tissue types side by side with crossed-out arrow */}
      <div className="absolute top-[200px] flex flex-col items-center gap-8 z-10 w-full px-10">

        {/* Top label */}
        <motion.div
          className="bg-[#1e293b] border border-[#334155] px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <span className="text-[#94a3b8] font-display font-bold text-[24px] uppercase tracking-wider">They Are Different Tissues</span>
        </motion.div>

        {/* Side by side icons */}
        <div className="flex items-center gap-6 w-full justify-center">
          {/* Fat cell */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, ...SPRING_SMOOTH }}
          >
            <div className="w-[140px] h-[140px] rounded-full bg-[#f97316]/10 border-4 border-[#f97316]/50 flex items-center justify-center">
              <FatCell size={80} color="#f97316" />
            </div>
            <span className="text-[#f97316] font-display font-bold text-[20px] uppercase">Adipose</span>
            <span className="text-[#64748b] font-body text-[18px]">Fat tissue</span>
          </motion.div>

          {/* Arrow with X */}
          <motion.div
            className="relative flex items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.0, ...SPRING_SNAPPY }}
          >
            <ArrowRight size={48} color="#334155" />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1.4, ...SPRING_SNAPPY }}
            >
              <div className="w-[44px] h-[44px] rounded-full bg-[#ef4444] flex items-center justify-center">
                <X size={26} color="white" strokeWidth={3} />
              </div>
            </motion.div>
          </motion.div>

          {/* Muscle */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, ...SPRING_SMOOTH }}
          >
            <div className="w-[140px] h-[140px] rounded-full bg-[#10b981]/10 border-4 border-[#10b981]/50 flex items-center justify-center">
              <Dumbbell size={64} color="#10b981" strokeWidth={1.5} />
            </div>
            <span className="text-[#10b981] font-display font-bold text-[20px] uppercase">Muscle</span>
            <span className="text-[#64748b] font-body text-[18px]">Muscle tissue</span>
          </motion.div>
        </div>

        {/* Info card */}
        <motion.div
          className="bg-[#1e293b]/80 border border-[#ef4444]/20 px-8 py-5 rounded-2xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, ...SPRING_SMOOTH }}
        >
          <p className="text-[#f8fafc] font-display font-bold text-[26px] text-center leading-snug uppercase tracking-wide">
            One <span className="text-[#ef4444]">Never Converts</span> Into The Other
          </p>
        </motion.div>
      </div>

      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[56px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Completely Different
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, ...SPRING_SNAPPY }}
          >
            Types of Tissue
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
