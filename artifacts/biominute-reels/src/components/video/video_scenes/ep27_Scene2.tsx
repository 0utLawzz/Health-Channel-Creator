import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;

export function Scene2() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); }
  }, []);

  // Simulated weekly weight data — noisy day-to-day, trending down
  const points = [72.1, 71.5, 72.8, 71.2, 73.0, 71.8, 70.9];
  const min = Math.min(...points) - 0.5;
  const max = Math.max(...points) + 0.5;
  const range = max - min;
  const W = 620; const H = 220;
  const toX = (i: number) => (i / (points.length - 1)) * W;
  const toY = (v: number) => H - ((v - min) / range) * H;
  const pathD = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');
  const trendD = `M 0 ${toY(72.1)} L ${W} ${toY(70.9)}`;

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />
      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-10">
        <motion.div className="bg-[#10b981]/10 border border-[#10b981]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ...SPRING_SMOOTH }}>
          <span className="text-[#10b981] font-display font-bold text-[24px] uppercase tracking-wider">Daily Noise vs Weekly Trend</span>
        </motion.div>

        <motion.div className="bg-[#1e293b] border border-[#334155] rounded-[28px] p-6 w-full"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, ...SPRING_SMOOTH }}>
          <svg viewBox={`-10 -10 ${W + 20} ${H + 20}`} className="w-full">
            {/* Noisy daily line */}
            <motion.path d={pathD} stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 1.5, ease: 'easeInOut' }} />
            {/* Trend line */}
            <motion.path d={trendD} stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="12 6"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6, duration: 1.0 }} />
            {/* Data dots */}
            {points.map((v, i) => (
              <motion.circle key={i} cx={toX(i)} cy={toY(v)} r="7" fill="#f97316"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.15, type: 'spring', stiffness: 400 }} />
            ))}
          </svg>
          <div className="flex justify-between mt-3 px-2">
            <div className="flex items-center gap-2"><TrendingUp size={18} color="#f97316" /><span className="text-[#94a3b8] text-[18px]">Daily (noisy)</span></div>
            <div className="flex items-center gap-2"><TrendingDown size={18} color="#10b981" /><span className="text-[#94a3b8] text-[18px]">Weekly trend</span></div>
          </div>
        </motion.div>

        <motion.div className="bg-[#1e293b]/80 border border-[#334155] px-8 py-5 rounded-2xl w-full text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, ...SPRING_SMOOTH }}>
          <p className="text-[#f8fafc] font-display font-bold text-[26px] uppercase tracking-wide">Track the <span className="text-[#10b981]">Weekly Trend</span>, Not Daily Numbers</p>
        </motion.div>
      </div>

      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}>
        <motion.h2 className="text-[#f8fafc] text-[56px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
          Zoom Out to See
          <motion.span className="text-[#10b981] block mt-2 drop-shadow-md" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, ...SPRING_SNAPPY }}>Real Progress</motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
