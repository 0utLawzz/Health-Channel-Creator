import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { User, AlertCircle, CheckCircle2 } from 'lucide-react';
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
      <div className="absolute top-[120px] z-10 w-[90%] flex flex-col items-center gap-5">
        {/* Perfect posture, frozen */}
        <motion.div className="w-full bg-[#f97316]/10 border border-[#f97316]/30 rounded-[24px] p-5 flex items-center gap-5"
          initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, ...SPRING_SMOOTH }}>
          <User size={52} color="#f97316" strokeWidth={1.4} className="shrink-0" />
          <div>
            <p className="text-[#f97316] font-display font-bold text-[22px] uppercase">Perfect Posture</p>
            <p className="text-[#94a3b8] text-[19px] mt-1">Held static for 3 hours...</p>
          </div>
          <AlertCircle size={36} color="#f97316" strokeWidth={1.8} className="ml-auto shrink-0" />
        </motion.div>
        {/* Stiffness builds */}
        <motion.div className="w-full bg-[#1e293b] rounded-2xl p-4 flex items-center gap-3"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
          <p className="text-[#94a3b8] text-[18px]">Stiffness builds regardless of posture angle</p>
        </motion.div>
        {/* Movement breaks */}
        <motion.div className="w-full bg-[#10b981]/10 border border-[#10b981]/30 rounded-[24px] p-5 flex items-center gap-5"
          initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.4, ...SPRING_SMOOTH }}>
          <User size={52} color="#10b981" strokeWidth={1.4} className="shrink-0" />
          <div>
            <p className="text-[#10b981] font-display font-bold text-[22px] uppercase">Position Changes</p>
            <p className="text-[#94a3b8] text-[19px] mt-1">Every 30-60 min throughout the day</p>
          </div>
          <CheckCircle2 size={36} color="#10b981" strokeWidth={1.8} className="ml-auto shrink-0" />
        </motion.div>
        {/* Verdict */}
        <motion.div className="bg-[#2F6FED]/10 border border-[#2F6FED]/30 rounded-2xl px-7 py-4 w-full text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, ...SPRING_SMOOTH }}>
          <p className="text-[#2F6FED] font-display font-bold text-[22px] uppercase">Movement variability beats static perfection</p>
        </motion.div>
      </div>
      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 60 }}>
        <motion.p className="text-[#64748b] font-body text-[18px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.8 }}>
          Source: Slater D et al. (2019) — posture, movement & musculoskeletal pain review
        </motion.p>
      </div>
    </motion.div>
  );
}
