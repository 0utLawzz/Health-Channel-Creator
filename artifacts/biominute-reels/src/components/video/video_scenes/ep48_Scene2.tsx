import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Zap, Moon } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene2() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); } }, []);

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />
      <div className="absolute top-[120px] z-10 w-[90%] flex flex-col items-center gap-6">
        <motion.p className="text-[#94a3b8] font-display text-[24px] uppercase tracking-widest text-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>Sleep Quality Gauge</motion.p>

        {/* Low levels scenario */}
        <motion.div className="w-full bg-[#10b981]/10 border border-[#10b981]/30 rounded-[24px] p-5"
          initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, ...SPRING_SMOOTH }}>
          <div className="flex items-center gap-3 mb-3">
            <Zap size={28} color="#2F6FED" />
            <p className="text-[#2F6FED] font-display font-bold text-[20px] uppercase">Magnesium + Low Levels</p>
          </div>
          <div className="w-full h-8 bg-[#1e293b] rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-[#2F6FED] to-[#10b981] rounded-full flex items-center justify-end pr-3"
              initial={{ width: 0 }} animate={{ width: '75%' }} transition={{ delay: 0.9, duration: 1 }}>
              <span className="text-white font-bold text-sm">↑ Sleep improves</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Normal levels scenario */}
        <motion.div className="w-full bg-[#334155]/30 border border-[#334155] rounded-[24px] p-5"
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1, ...SPRING_SMOOTH }}>
          <div className="flex items-center gap-3 mb-3">
            <Zap size={28} color="#64748b" />
            <p className="text-[#94a3b8] font-display font-bold text-[20px] uppercase">Magnesium + Normal Levels</p>
          </div>
          <div className="w-full h-8 bg-[#1e293b] rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#64748b] rounded-full flex items-center justify-end pr-3"
              initial={{ width: 0 }} animate={{ width: '28%' }} transition={{ delay: 1.5, duration: 0.8 }}>
              <span className="text-white font-bold text-sm">→</span>
            </motion.div>
          </div>
          <p className="text-[#64748b] text-[17px] mt-2">Minimal change — gauge stays flat</p>
        </motion.div>

        <motion.div className="flex items-center gap-3 bg-[#14b8a6]/10 border border-[#14b8a6]/30 rounded-2xl px-6 py-4 w-full"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, ...SPRING_SMOOTH }}>
          <Moon size={28} color="#14b8a6" />
          <p className="text-[#14b8a6] font-display font-bold text-[20px] uppercase">Deficiency is the key driver</p>
        </motion.div>
      </div>
      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 60 }}>
        <motion.p className="text-[#64748b] font-body text-[18px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
          Source: Abbasi B et al. (2012), Journal of Research in Medical Sciences
        </motion.p>
      </div>
    </motion.div>
  );
}
