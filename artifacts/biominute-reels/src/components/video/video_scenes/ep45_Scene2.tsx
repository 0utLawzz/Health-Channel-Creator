import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Sun, Shield, Sparkles } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;

export function Scene2() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); } }, []);

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />
      <div className="absolute top-[130px] z-10 w-[90%] flex flex-col items-center gap-6">
        {/* Sun → Sunscreen → Vitamin D flow */}
        <motion.div className="flex items-center gap-4 w-full justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-[#f97316]/20 border-2 border-[#f97316]/50 flex items-center justify-center">
              <Sun size={44} color="#f97316" strokeWidth={1.4} />
            </div>
            <p className="text-[#f97316] font-display font-bold text-[16px] uppercase">Sun</p>
          </div>
          <motion.div className="text-[#94a3b8] text-3xl mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>→</motion.div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-[#10b981]/20 border-2 border-[#10b981]/50 flex items-center justify-center">
              <Shield size={44} color="#10b981" strokeWidth={1.4} />
            </div>
            <p className="text-[#10b981] font-display font-bold text-[16px] uppercase">Sunscreen</p>
          </div>
          <motion.div className="text-[#94a3b8] text-3xl mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>→</motion.div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-full bg-[#14b8a6]/20 border-2 border-[#14b8a6]/50 flex items-center justify-center">
              <Sparkles size={44} color="#14b8a6" strokeWidth={1.4} />
            </div>
            <p className="text-[#14b8a6] font-display font-bold text-[16px] uppercase">Vit D</p>
          </div>
        </motion.div>

        {/* Some rays pass through */}
        <motion.div className="bg-[#14b8a6]/10 border border-[#14b8a6]/30 rounded-2xl p-6 w-full text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, ...SPRING_SMOOTH }}>
          <p className="text-[#14b8a6] font-display font-bold text-[24px] uppercase">Some UV still gets through</p>
          <p className="text-[#94a3b8] text-[20px] mt-2">Real-world use is never perfect coverage</p>
        </motion.div>

        {/* Comparison bars */}
        <motion.div className="w-full flex flex-col gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
          <div className="flex items-center gap-4">
            <p className="text-[#94a3b8] text-[18px] w-[160px] text-right">Skin protection</p>
            <div className="flex-1 h-8 bg-[#1e293b] rounded-full overflow-hidden">
              <motion.div className="h-full bg-[#10b981] rounded-full" initial={{ width: 0 }} animate={{ width: '88%' }} transition={{ delay: 2.0, duration: 0.8 }} />
            </div>
            <p className="text-[#10b981] font-bold text-[18px] w-10">88%</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[#94a3b8] text-[18px] w-[160px] text-right">Vit D impact</p>
            <div className="flex-1 h-8 bg-[#1e293b] rounded-full overflow-hidden">
              <motion.div className="h-full bg-[#f97316] rounded-full" initial={{ width: 0 }} animate={{ width: '28%' }} transition={{ delay: 2.2, duration: 0.8 }} />
            </div>
            <p className="text-[#f97316] font-bold text-[18px] w-10">Low</p>
          </div>
        </motion.div>
      </div>
      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 60 }}>
        <motion.p className="text-[#64748b] font-body text-[18px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
          Source: Passeron T et al. 2019 — real-world sunscreen and UV transmission review
        </motion.p>
      </div>
    </motion.div>
  );
}
