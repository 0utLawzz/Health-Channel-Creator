import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Sun, Sunset, Moon, TrendingUp } from 'lucide-react';
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />

      {/* Three equal plates with 30g bars */}
      <div className="absolute top-[240px] flex items-end justify-center gap-10 z-10 w-full px-8">
        {[
          { icon: Sun, label: 'Breakfast', color: '#10b981', delay: 0.3 },
          { icon: Sunset, label: 'Lunch', color: '#14b8a6', delay: 0.6 },
          { icon: Moon, label: 'Dinner', color: '#2F6FED', delay: 0.9 },
        ].map(({ icon: Icon, label, color, delay }) => (
          <motion.div
            key={label}
            className="flex flex-col items-center gap-4"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay, ...SPRING_SMOOTH }}
          >
            <motion.div
              className="relative w-[170px] h-[170px] rounded-full border-4 flex items-center justify-center"
              style={{ borderColor: color, boxShadow: `0 0 30px ${color}40` }}
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, ...SPRING_SNAPPY }}
            >
              <Icon size={55} color={color} />
            </motion.div>
            <span className="font-display uppercase tracking-widest text-[20px] font-bold" style={{ color }}>{label}</span>
            <div className="w-32 h-3 rounded-full overflow-hidden bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: delay + 0.8, duration: 1.2, ease: "easeOut" }}
              />
            </div>
            <motion.span
              className="font-display font-black text-[28px]"
              style={{ color }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 1.5, ...SPRING_SNAPPY }}
            >
              30g
            </motion.span>
          </motion.div>
        ))}
      </div>

      {/* Trending up indicator */}
      <motion.div
        className="absolute top-[180px] right-[60px] z-10"
        initial={{ scale: 0, opacity: 0, rotate: -30 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 2.8, ...SPRING_SNAPPY }}
      >
        <TrendingUp size={80} color="#f97316" strokeWidth={2.5} />
      </motion.div>

      {/* Text */}
      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[58px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Spreading Protein
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, ...SPRING_SNAPPY }}
          >
            Boosts Muscle Protein Synthesis
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
