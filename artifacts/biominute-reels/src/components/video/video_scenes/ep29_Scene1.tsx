import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Heart, CheckCircle } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

function EggIcon({ size = 70, color = '#f97316' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 100 120" fill="none">
      <ellipse cx="50" cy="68" rx="38" ry="48" fill={color} opacity={0.9} />
      <ellipse cx="50" cy="38" rx="26" ry="30" fill={color} opacity={0.9} />
    </svg>
  );
}

export function Scene1() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); }
  }, []);

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />
      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-10">
        <motion.div className="bg-[#10b981]/10 border border-[#10b981]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, ...SPRING_SMOOTH }}>
          <span className="text-[#10b981] font-display font-bold text-[24px] uppercase tracking-wider">For Most Healthy People</span>
        </motion.div>
        <div className="flex items-center justify-center gap-6 w-full">
          <motion.div className="flex flex-col items-center gap-3" initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, ...SPRING_SMOOTH }}>
            <div className="w-[150px] h-[150px] rounded-full bg-[#f97316]/10 border-4 border-[#f97316]/40 flex items-center justify-center">
              <EggIcon size={88} color="#f97316" />
            </div>
            <span className="text-[#f97316] font-display font-bold text-[20px] uppercase">Eggs</span>
          </motion.div>
          <motion.div className="flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            <span className="text-[#64748b] font-display font-bold text-[28px]">≠</span>
          </motion.div>
          <motion.div className="flex flex-col items-center gap-3" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.1, ...SPRING_SMOOTH }}>
            <div className="relative w-[150px] h-[150px] rounded-full bg-[#10b981]/10 border-4 border-[#10b981]/60 flex items-center justify-center drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <Heart size={72} color="#10b981" fill="#10b981" strokeWidth={1.5} />
              <motion.div className="absolute -top-3 -right-3 w-[44px] h-[44px] rounded-full bg-[#10b981] flex items-center justify-center"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6, ...SPRING_SNAPPY }}>
                <CheckCircle size={26} color="#0F172A" strokeWidth={2.5} />
              </motion.div>
            </div>
            <span className="text-[#10b981] font-display font-bold text-[20px] uppercase">Heart Risk</span>
          </motion.div>
        </div>
        <motion.div className="bg-[#1e293b]/90 border border-[#10b981]/20 px-8 py-5 rounded-2xl w-full text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, ...SPRING_SMOOTH }}>
          <p className="text-[#f8fafc] font-display font-bold text-[26px] leading-snug uppercase tracking-wide">Eggs in <span className="text-[#10b981]">Moderation</span> Aren't Linked to Heart Disease</p>
        </motion.div>
      </div>
      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}>
        <motion.h2 className="text-[#f8fafc] text-[56px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}>
          The Heart Stays
          <motion.span className="text-[#10b981] block mt-2 drop-shadow-md" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.6, ...SPRING_SNAPPY }}>Steady</motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
