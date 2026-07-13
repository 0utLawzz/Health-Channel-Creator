import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Beef, Moon, Sun, Sunset } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene1() {
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

      {/* Three plates visual */}
      <div className="absolute top-[260px] flex items-end justify-center gap-8 z-10 w-full px-10">
        {/* Breakfast - small/empty */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 0.4 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <div className="w-[140px] h-[140px] rounded-full border-4 border-[#475569] bg-[#0F172A] flex items-center justify-center">
            <Sun size={50} color="#475569" />
          </div>
          <span className="text-[#475569] font-display uppercase tracking-widest text-[20px] font-bold">Breakfast</span>
          <div className="w-24 h-2 bg-[#475569]/30 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#475569]" initial={{ width: 0 }} animate={{ width: "20%" }} transition={{ delay: 1.0, duration: 1 }} />
          </div>
        </motion.div>

        {/* Lunch - medium */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 0.6 }}
          transition={{ delay: 0.5, ...SPRING_SMOOTH }}
        >
          <div className="w-[160px] h-[160px] rounded-full border-4 border-[#64748b] bg-[#0F172A] flex items-center justify-center">
            <Sunset size={55} color="#64748b" />
          </div>
          <span className="text-[#64748b] font-display uppercase tracking-widest text-[22px] font-bold">Lunch</span>
          <div className="w-28 h-2 bg-[#64748b]/30 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#64748b]" initial={{ width: 0 }} animate={{ width: "35%" }} transition={{ delay: 1.3, duration: 1 }} />
          </div>
        </motion.div>

        {/* Dinner - large/full (the problem) */}
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, ...SPRING_SMOOTH }}
        >
          <div className="relative w-[200px] h-[200px] rounded-full border-8 border-[#f97316] bg-[#0F172A] flex items-center justify-center drop-shadow-[0_0_40px_rgba(249,115,22,0.4)]">
            <Moon size={70} color="#f97316" fill="#f97316" />
            <motion.div
              className="absolute -top-4 -right-4 bg-[#f97316] text-[#0F172A] font-display font-bold text-[18px] px-3 py-1 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.0, ...SPRING_SNAPPY }}
            >
              60g+
            </motion.div>
          </div>
          <span className="text-[#f97316] font-display uppercase tracking-widest text-[26px] font-bold">Dinner</span>
          <div className="w-36 h-3 bg-[#f97316]/20 rounded-full overflow-hidden">
            <motion.div className="h-full bg-[#f97316]" initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ delay: 1.6, duration: 1.5 }} />
          </div>
        </motion.div>
      </div>

      {/* Headline */}
      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[60px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          Most People Load
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.0, ...SPRING_SNAPPY }}
          >
            Protein at Dinner
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
