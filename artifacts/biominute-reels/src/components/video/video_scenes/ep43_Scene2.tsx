import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Brain, Pill } from 'lucide-react';
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />

      <div className="absolute top-[160px] z-10 w-[90%] flex flex-col items-center gap-6">
        <motion.p
          className="text-[#94a3b8] font-display text-[24px] uppercase tracking-widest text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          For mild to moderate anxiety
        </motion.p>

        {/* Scale visual */}
        <motion.div
          className="relative w-full flex justify-center items-end gap-10 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {/* Meditation side */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, ...SPRING_SMOOTH }}
          >
            <div className="w-[120px] h-[120px] rounded-full bg-[#2F6FED]/15 border-4 border-[#2F6FED]/50 flex items-center justify-center">
              <Brain size={60} color="#2F6FED" strokeWidth={1.4} />
            </div>
            <div className="bg-[#1e293b] border border-[#2F6FED]/30 rounded-2xl px-5 py-3 text-center">
              <p className="text-[#2F6FED] font-display font-bold text-[20px] uppercase">Meditation</p>
              <p className="text-[#94a3b8] text-[17px] mt-1">Consistent practice</p>
            </div>
          </motion.div>

          {/* VS badge */}
          <motion.div
            className="w-14 h-14 rounded-full bg-[#f97316]/15 border-2 border-[#f97316]/40 flex items-center justify-center mb-14"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.0, ...SPRING_SNAPPY }}
          >
            <span className="text-[#f97316] font-display font-bold text-[18px]">VS</span>
          </motion.div>

          {/* Medication side */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, ...SPRING_SMOOTH }}
          >
            <div className="w-[120px] h-[120px] rounded-full bg-[#10b981]/15 border-4 border-[#10b981]/50 flex items-center justify-center">
              <Pill size={60} color="#10b981" strokeWidth={1.4} />
            </div>
            <div className="bg-[#1e293b] border border-[#10b981]/30 rounded-2xl px-5 py-3 text-center">
              <p className="text-[#10b981] font-display font-bold text-[20px] uppercase">Standard Tx</p>
              <p className="text-[#94a3b8] text-[17px] mt-1">Some treatments</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Balance bar */}
        <motion.div
          className="w-[85%] h-3 bg-[#334155] rounded-full overflow-hidden mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#2F6FED] to-[#10b981] rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '50%' }}
            transition={{ delay: 1.6, duration: 1, ease: 'easeOut' }}
          />
        </motion.div>
        <motion.p
          className="text-[#10b981] font-display font-bold text-[20px] uppercase tracking-wider text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
        >
          Roughly comparable — for mild to moderate
        </motion.p>
      </div>

      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 60 }}
      >
        <motion.p
          className="text-[#64748b] font-body text-[18px] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
        >
          Source: Goyal M et al. (2014), JAMA Internal Medicine
        </motion.p>
      </div>
    </motion.div>
  );
}
