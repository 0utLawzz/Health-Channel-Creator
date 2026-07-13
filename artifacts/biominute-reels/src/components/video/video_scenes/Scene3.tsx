import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Target, Beef, Check } from 'lucide-react';
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

      {/* Central total counter */}
      <div className="absolute top-[260px] flex flex-col items-center z-10 w-full">
        <motion.div
          className="relative w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-[#10b981] to-[#14b8a6] flex items-center justify-center p-2 drop-shadow-[0_0_50px_rgba(16,185,129,0.4)]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          <div className="w-full h-full rounded-full bg-[#0F172A] flex flex-col items-center justify-center">
            <motion.span
              className="text-[#10b981] text-[90px] font-black font-display leading-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, ...SPRING_SNAPPY }}
            >
              90g
            </motion.span>
            <span className="text-[#94a3b8] text-[22px] font-display uppercase tracking-widest mt-2">Total Daily Target</span>
          </div>
          <motion.div
            className="absolute -top-3 -right-3 w-12 h-12 bg-[#f97316] rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            <Target size={24} color="#0F172A" />
          </motion.div>
        </motion.div>

        {/* Three checkmarks */}
        <div className="flex gap-8 mt-10">
          {[
            { label: '30g Breakfast', delay: 1.2 },
            { label: '30g Lunch', delay: 1.5 },
            { label: '30g Dinner', delay: 1.8 },
          ].map(({ label, delay }) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 bg-[#1e293b] border border-[#334155] px-4 py-3 rounded-xl"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay, ...SPRING_SMOOTH }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.3, ...SPRING_SNAPPY }}
              >
                <Check size={20} color="#10b981" strokeWidth={3} />
              </motion.div>
              <span className="text-[#f8fafc] font-display text-[18px] font-bold uppercase tracking-wider">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Text */}
      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[60px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          Aim for
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, ...SPRING_SNAPPY }}
          >
            30 Grams at Each Meal
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
