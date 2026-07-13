import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Cookie, Pizza, Timer, AlertCircle } from 'lucide-react';
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

      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[340px] h-[340px]">
          <motion.div
            className="absolute left-0 top-0 w-[150px] h-[150px] rounded-full bg-[#334155] border-4 border-[#64748b] flex items-center justify-center opacity-60"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 0.6 }}
            transition={{ delay: 0.2, ...SPRING_SMOOTH }}
          >
            <Cookie size={64} color="#94a3b8" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute right-0 top-10 w-[130px] h-[130px] rounded-full bg-[#334155] border-4 border-[#64748b] flex items-center justify-center opacity-60"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 0.6 }}
            transition={{ delay: 0.4, ...SPRING_SMOOTH }}
          >
            <Pizza size={56} color="#94a3b8" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full bg-[#0F172A] border-8 border-[#f97316] flex items-center justify-center drop-shadow-[0_0_60px_rgba(249,115,22,0.35)]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, ...SPRING_SMOOTH }}
          >
            <Timer size={100} color="#f97316" strokeWidth={1.5} />
            <motion.div
              className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-[#f97316] flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, ...SPRING_SNAPPY }}
            >
              <AlertCircle size={40} color="#0F172A" strokeWidth={2.5} />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div
        className="absolute w-full px-14 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 100 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[58px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          Ultra-Processed Foods
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, ...SPRING_SNAPPY }}
          >
            Outpace Your Fullness Signal
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
