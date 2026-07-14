import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Scale, Smartphone, X } from 'lucide-react';
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />

      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f97316]/15 to-[#10b981]/10 blur-[40px]"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340">
            <motion.line
              x1="80" y1="170" x2="260" y2="170"
              stroke="#334155" strokeWidth="6" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.line
              x1="170" y1="80" x2="170" y2="260"
              stroke="#334155" strokeWidth="6" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
          </svg>

          <motion.div
            className="absolute left-[40px] top-1/2 -translate-y-1/2 w-[100px] h-[100px] rounded-full bg-[#0F172A] border-4 border-[#10b981] flex items-center justify-center z-10"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, ...SPRING_SMOOTH }}
          >
            <Scale size={48} color="#10b981" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            className="absolute right-[40px] top-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full bg-[#0F172A] border-4 border-[#f97316] flex items-center justify-center z-10"
            initial={{ scale: 0, opacity: 0, rotate: 15 }}
            animate={{ scale: 1, opacity: 1, rotate: 25 }}
            transition={{ delay: 1.2, ...SPRING_SMOOTH }}
          >
            <Smartphone size={60} color="#f97316" strokeWidth={1.5} />
            <motion.div
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.8, ...SPRING_SNAPPY }}
            >
              <X size={24} color="#0F172A" strokeWidth={3} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 bg-[#f97316]/10 border border-[#f97316]/30 px-6 py-4 rounded-2xl text-center max-w-[80%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, ...SPRING_SMOOTH }}
        >
          <span className="text-[#f8fafc] font-display font-bold text-[22px] uppercase tracking-wider">Reality Is Less Than Social Hype</span>
        </motion.div>
      </div>

      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[58px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Most Healthy Adults
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Need Far Less Than Hype
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
