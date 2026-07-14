import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Dumbbell, TrendingUp, Beef } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene3() {
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />

      <div className="absolute top-[190px] flex flex-col items-center gap-7 z-10 w-full px-10">

        {/* How muscle building works */}
        <motion.div
          className="bg-[#10b981]/10 border border-[#10b981]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <span className="text-[#10b981] font-display font-bold text-[24px] uppercase tracking-wider">Building Muscle</span>
        </motion.div>

        {/* Growing muscle bars */}
        <motion.div
          className="flex items-end gap-4 h-[100px] w-full justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[0.3, 0.5, 0.65, 0.8, 1.0].map((h, i) => (
            <motion.div
              key={i}
              className="w-[60px] bg-[#10b981] rounded-t-xl"
              initial={{ height: 0 }}
              animate={{ height: `${h * 90}px` }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease: 'easeOut' }}
              style={{ alignSelf: 'flex-end' }}
            />
          ))}
          <motion.div
            className="flex items-end pb-1"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, ...SPRING_SNAPPY }}
          >
            <TrendingUp size={52} color="#10b981" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        {/* Strength training card */}
        <motion.div
          className="bg-[#1e293b]/90 border border-[#334155] rounded-[32px] px-8 py-7 flex items-center gap-6 w-full"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.0, ...SPRING_SMOOTH }}
        >
          <div className="w-[80px] h-[80px] rounded-full bg-[#10b981]/15 flex items-center justify-center shrink-0">
            <Dumbbell size={44} color="#10b981" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[#f8fafc] font-display font-bold text-[28px] uppercase leading-tight">Strength Training</p>
            <p className="text-[#94a3b8] font-body text-[22px] leading-snug mt-1">Progressive resistance loads</p>
          </div>
        </motion.div>

        {/* Protein card */}
        <motion.div
          className="bg-[#1e293b]/90 border border-[#334155] rounded-[32px] px-8 py-7 flex items-center gap-6 w-full"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ...SPRING_SMOOTH }}
        >
          <div className="w-[80px] h-[80px] rounded-full bg-[#2F6FED]/15 flex items-center justify-center shrink-0">
            <Beef size={44} color="#2F6FED" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[#f8fafc] font-display font-bold text-[28px] uppercase leading-tight">Adequate Protein</p>
            <p className="text-[#94a3b8] font-body text-[22px] leading-snug mt-1">Plus proper recovery</p>
          </div>
        </motion.div>
      </div>

      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[56px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Muscle Grows Through
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, ...SPRING_SNAPPY }}
          >
            Training & Protein
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
