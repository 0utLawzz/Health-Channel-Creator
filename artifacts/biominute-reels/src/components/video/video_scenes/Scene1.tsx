import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
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

      <div className="absolute top-[260px] flex items-center justify-center z-10 w-full">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
          <motion.div
            className="absolute left-0 w-[120px] h-[120px] rounded-full bg-[#334155] border-4 border-[#64748b] flex items-center justify-center opacity-50"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            transition={{ delay: 0.2, ...SPRING_SMOOTH }}
          >
            <XCircle size={56} color="#94a3b8" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="absolute right-0 w-[120px] h-[120px] rounded-full bg-[#334155] border-4 border-[#64748b] flex items-center justify-center opacity-50"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            transition={{ delay: 0.4, ...SPRING_SMOOTH }}
          >
            <span className="text-[#94a3b8] font-display font-black text-[40px]">💊</span>
          </motion.div>

          <motion.div
            className="w-[240px] h-[240px] rounded-full bg-[#0F172A] border-8 border-[#10b981] flex items-center justify-center drop-shadow-[0_0_60px_rgba(16,185,129,0.35)]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, ...SPRING_SMOOTH }}
          >
            <span className="text-[#10b981] font-display font-black text-[72px]">YES</span>
            <motion.div
              className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-[#10b981] flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.4, ...SPRING_SNAPPY }}
            >
              <CheckCircle size={40} color="#0F172A" strokeWidth={2.5} />
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
          For Most People
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.0, ...SPRING_SNAPPY }}
          >
            The Answer Is Yes
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
