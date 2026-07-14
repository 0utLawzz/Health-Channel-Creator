import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Scale, Moon } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene0() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); }
  }, []);

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />
      <motion.div className="absolute top-[16%] w-[500px] h-[500px] bg-gradient-to-tr from-[#f97316]/15 to-[#2F6FED]/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute top-[210px] flex flex-col items-center gap-5 z-10 w-full px-12">
        <motion.div className="relative flex items-center justify-center gap-4"
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, ...SPRING_SMOOTH }}>
          <div className="w-[200px] h-[200px] rounded-full bg-[#1e293b] border-4 border-[#f97316]/40 flex flex-col items-center justify-center drop-shadow-[0_0_40px_rgba(249,115,22,0.2)]">
            <Scale size={80} color="#f97316" strokeWidth={1.5} />
            {/* Flickering numbers */}
            <motion.span className="text-[#f97316] font-display font-bold text-[28px] mt-1"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              ±1–3 kg
            </motion.span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Moon size={42} color="#2F6FED" strokeWidth={1.5} />
            <span className="text-[#2F6FED] font-display font-bold text-[22px] uppercase">Overnight</span>
          </div>
        </motion.div>

        <motion.div className="flex items-center gap-3 bg-[#f97316]/10 border border-[#f97316]/30 px-7 py-4 rounded-2xl"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, ...SPRING_SMOOTH }}>
          <span className="text-[#f97316] font-display font-bold text-[22px] uppercase tracking-wider">Normal or Alarming?</span>
        </motion.div>
      </div>

      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 90 }}>
        <motion.h1 className="text-[#f8fafc] text-[58px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          Why Does Your Weight
          <motion.span className="text-[#f97316] block mt-2 drop-shadow-md" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9, ...SPRING_SNAPPY }}>Change</motion.span>
          <motion.span className="text-[#2F6FED] block mt-1 drop-shadow-md" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.3, ...SPRING_SNAPPY }}>Overnight?</motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
