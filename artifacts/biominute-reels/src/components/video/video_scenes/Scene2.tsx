import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TrendingUp, Activity, Footprints } from 'lucide-react';
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

      {/* Line graph visual */}
      <div className="absolute top-[220px] z-10 w-full px-12">
        <motion.div
          className="relative w-full h-[420px] bg-[#1e293b]/50 rounded-[32px] border border-[#334155] p-8 overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="absolute w-full h-px bg-[#94a3b8]" style={{ top: `${20 + i * 15}%` }} />
            ))}
          </div>

          {/* Y-axis labels */}
          <div className="absolute left-4 top-8 bottom-8 flex flex-col justify-between text-[#94a3b8] text-[18px] font-display font-bold">
            <span>10K</span>
            <span>7.5K</span>
            <span>5K</span>
            <span>2.5K</span>
            <span>0</span>
          </div>

          {/* Graph line */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 420" preserveAspectRatio="none">
            <motion.path
              d="M 80 360 C 200 360, 250 300, 400 220 C 550 140, 600 120, 720 100"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 80 360 C 200 360, 250 300, 400 220 C 550 140, 600 120, 720 100 L 720 420 L 80 420 Z"
              fill="url(#graphGradient)"
              opacity="0.2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 1.8, duration: 1 }}
            />
            <defs>
              <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
          </svg>

          {/* Sweet spot zone */}
          <motion.div
            className="absolute top-[80px] left-[45%] w-[200px] h-[140px] bg-[#10b981]/20 border-2 border-[#10b981] rounded-2xl flex flex-col items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.2, ...SPRING_SNAPPY }}
          >
            <span className="text-[#10b981] font-display font-black text-[42px]">6-7.5K</span>
            <span className="text-[#f8fafc] font-display font-bold text-[18px] uppercase tracking-wider">Sweet Spot</span>
          </motion.div>

          {/* Trending up icon */}
          <motion.div
            className="absolute top-8 right-8"
            initial={{ scale: 0, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ delay: 2.8, ...SPRING_SNAPPY }}
          >
            <TrendingUp size={60} color="#f97316" strokeWidth={2.5} />
          </motion.div>
        </motion.div>
      </div>

      {/* Text */}
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
          Health Benefits Begin
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.0, ...SPRING_SNAPPY }}
          >
            Well Below 10,000 Steps
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
