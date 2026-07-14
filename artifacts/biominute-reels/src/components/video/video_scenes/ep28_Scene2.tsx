import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Dumbbell, Utensils, Moon, Repeat } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene2() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); }
  }, []);

  const habits = [
    { icon: Dumbbell, label: 'Build Muscle', sub: 'Raises resting metabolic rate', color: '#2F6FED' },
    { icon: Utensils, label: 'Eat Enough Protein', sub: 'Supports muscle & thermic effect', color: '#f97316' },
    { icon: Moon, label: 'Prioritise Sleep', sub: 'Regulates hunger hormones', color: '#14b8a6' },
    { icon: Repeat, label: 'Stay Consistent', sub: 'Habits > short-term fixes', color: '#10b981' },
  ];

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />
      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-10">
        <motion.div className="bg-[#10b981]/10 border border-[#10b981]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ...SPRING_SMOOTH }}>
          <span className="text-[#10b981] font-display font-bold text-[24px] uppercase tracking-wider">What Actually Drives It</span>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 w-full">
          {habits.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div key={i} className="bg-[#1e293b] border border-[#334155] rounded-[24px] p-5 flex flex-col items-center gap-2 text-center"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5 + i * 0.18, ...SPRING_SNAPPY }}>
                <div className="w-[62px] h-[62px] rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${h.color}20`, border: `3px solid ${h.color}40` }}>
                  <Icon size={30} color={h.color} strokeWidth={1.8} />
                </div>
                <p className="font-display font-bold text-[20px] uppercase leading-tight" style={{ color: h.color }}>{h.label}</p>
                <p className="text-[#94a3b8] text-[17px] leading-tight">{h.sub}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="bg-[#1e293b]/80 border border-[#10b981]/20 px-8 py-5 rounded-2xl w-full text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6, ...SPRING_SMOOTH }}>
          <p className="text-[#f8fafc] font-display font-bold text-[26px] uppercase tracking-wide">Habits <span className="text-[#10b981]">Move the Needle</span></p>
        </motion.div>
      </div>

      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}>
        <motion.h2 className="text-[#f8fafc] text-[56px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
          Your Habits Shape
          <motion.span className="text-[#10b981] block mt-2 drop-shadow-md" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, ...SPRING_SNAPPY }}>Your Metabolism</motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
