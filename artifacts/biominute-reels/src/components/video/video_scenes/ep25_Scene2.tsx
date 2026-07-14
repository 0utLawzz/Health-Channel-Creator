import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Flame, TrendingDown, Scale } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

function FatCell({ size = 50, color = '#f97316', opacity = 0.9 }: { size?: number; color?: string; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" style={{ opacity }}>
      <ellipse cx="40" cy="44" rx="32" ry="30" fill={color} />
      <ellipse cx="28" cy="30" rx="10" ry="9" fill={color} />
      <ellipse cx="52" cy="26" rx="8" ry="7" fill={color} />
      <ellipse cx="40" cy="44" rx="18" ry="16" fill="white" opacity={0.12} />
    </svg>
  );
}

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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />

      <div className="absolute top-[190px] flex flex-col items-center gap-7 z-10 w-full px-10">

        {/* How fat loss works */}
        <motion.div
          className="bg-[#f97316]/10 border border-[#f97316]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <span className="text-[#f97316] font-display font-bold text-[24px] uppercase tracking-wider">Losing Fat</span>
        </motion.div>

        {/* Fat cells shrinking */}
        <motion.div
          className="flex items-end gap-3 h-[110px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[1, 0.8, 0.62, 0.44, 0.28].map((scale, i) => (
            <motion.div
              key={i}
              className="flex items-end"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: scale, opacity: scale }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: 'easeOut' }}
            >
              <FatCell size={72} color="#f97316" opacity={scale} />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, ...SPRING_SNAPPY }}
          >
            <TrendingDown size={52} color="#10b981" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        {/* Calorie deficit card */}
        <motion.div
          className="bg-[#1e293b]/90 border border-[#334155] rounded-[32px] px-8 py-7 flex items-center gap-6 w-full"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.0, ...SPRING_SMOOTH }}
        >
          <div className="w-[80px] h-[80px] rounded-full bg-[#f97316]/15 flex items-center justify-center shrink-0">
            <Flame size={44} color="#f97316" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[#f8fafc] font-display font-bold text-[28px] uppercase leading-tight">Calorie Deficit</p>
            <p className="text-[#94a3b8] font-body text-[22px] leading-snug mt-1">Burn more than you consume</p>
          </div>
        </motion.div>

        {/* Scale card */}
        <motion.div
          className="bg-[#1e293b]/90 border border-[#334155] rounded-[32px] px-8 py-7 flex items-center gap-6 w-full"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ...SPRING_SMOOTH }}
        >
          <div className="w-[80px] h-[80px] rounded-full bg-[#2F6FED]/15 flex items-center justify-center shrink-0">
            <Scale size={44} color="#2F6FED" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[#f8fafc] font-display font-bold text-[28px] uppercase leading-tight">Over Time</p>
            <p className="text-[#94a3b8] font-body text-[22px] leading-snug mt-1">Consistency is the key</p>
          </div>
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
          Fat Is Lost Through
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, ...SPRING_SNAPPY }}
          >
            A Calorie Deficit
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
