import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ArrowUp, Footprints, Target } from 'lucide-react';
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

      {/* Walking silhouette + step counter visual */}
      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <motion.div
          className="relative w-[300px] h-[300px] rounded-full bg-[#0F172A] border-8 border-[#14b8a6] flex items-center justify-center drop-shadow-[0_0_60px_rgba(20,184,166,0.35)]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          <Footprints size={140} color="#14b8a6" strokeWidth={1.5} />
          <motion.div
            className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-[#10b981] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.0, ...SPRING_SNAPPY }}
          >
            <ArrowUp size={40} color="#0F172A" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        {/* Step counter growing */}
        <motion.div
          className="mt-10 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, ...SPRING_SMOOTH }}
        >
          <div className="flex items-center gap-3 bg-[#1e293b] border border-[#334155] px-6 py-3 rounded-2xl">
            <Target size={28} color="#f97316" />
            <span className="text-[#f8fafc] font-display font-bold text-[24px] uppercase tracking-wider">Start here</span>
          </div>
          <div className="flex items-center gap-2 mt-4">
            {['3,000', '3,500', '4,000', '4,500', '5,000'].map((step, i) => (
              <motion.span
                key={step}
                className={`font-display font-black text-[28px] ${i === 4 ? 'text-[#10b981]' : 'text-[#475569]'}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.2, ...SPRING_SNAPPY }}
              >
                {step}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Text */}
      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[60px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Don't Chase Perfection
          <motion.span
            className="text-[#14b8a6] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Add a Few Hundred Steps Each Week
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
