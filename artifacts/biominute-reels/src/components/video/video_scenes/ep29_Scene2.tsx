import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Salad, Wheat, Apple } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

function EggIcon({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <ellipse cx="50" cy="68" rx="38" ry="48" fill="#f97316" opacity={0.9} />
      <ellipse cx="50" cy="38" rx="26" ry="30" fill="#f97316" opacity={0.9} />
    </svg>
  );
}

export function Scene2() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); }
  }, []);

  const pairings = [
    { icon: Salad, label: 'Vegetables', color: '#10b981' },
    { icon: Wheat, label: 'Whole Grains', color: '#f97316' },
    { icon: Apple, label: 'Fruit', color: '#2F6FED' },
  ];

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />
      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-10">
        <motion.div className="bg-[#f97316]/10 border border-[#f97316]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ...SPRING_SMOOTH }}>
          <span className="text-[#f97316] font-display font-bold text-[24px] uppercase tracking-wider">It's About Diet Quality</span>
        </motion.div>
        <motion.div className="bg-[#1e293b] border border-[#334155] rounded-[32px] p-8 w-full"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, ...SPRING_SMOOTH }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div className="w-[100px] h-[120px] rounded-full bg-[#f97316]/10 border-4 border-[#f97316]/40 flex items-center justify-center"
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6, ...SPRING_SNAPPY }}>
              <EggIcon size={64} />
            </motion.div>
            <span className="text-[#64748b] font-display font-bold text-[28px]">+</span>
            {pairings.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div key={i} className="flex flex-col items-center gap-2"
                  initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 + i * 0.2, ...SPRING_SNAPPY }}>
                  <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${p.color}20`, border: `3px solid ${p.color}40` }}>
                    <Icon size={38} color={p.color} strokeWidth={1.8} />
                  </div>
                  <span className="text-[#94a3b8] font-display font-bold text-[16px] text-center">{p.label}</span>
                </motion.div>
              );
            })}
          </div>
          <motion.div className="bg-[#0F172A]/60 rounded-2xl px-6 py-4 text-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>
            <span className="text-[#f8fafc] font-display font-bold text-[24px] uppercase">= A Balanced Meal</span>
          </motion.div>
        </motion.div>
        <motion.div className="bg-[#1e293b]/80 border border-[#334155] px-8 py-5 rounded-2xl w-full text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, ...SPRING_SMOOTH }}>
          <p className="text-[#f8fafc] font-display font-bold text-[26px] leading-snug uppercase tracking-wide">Overall Diet Quality <span className="text-[#10b981]">Matters More</span></p>
        </motion.div>
      </div>
      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}>
        <motion.h2 className="text-[#f8fafc] text-[56px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
          Pair Eggs With
          <motion.span className="text-[#10b981] block mt-2 drop-shadow-md" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, ...SPRING_SNAPPY }}>Veggies & Grains</motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
