import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Clock, AlertTriangle, TrendingDown, ZapOff } from 'lucide-react';
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

      {/* 7-hour warning clock */}
      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <motion.div
          className="relative w-[300px] h-[300px] rounded-full bg-[#0F172A] border-8 border-[#f97316] flex items-center justify-center drop-shadow-[0_0_60px_rgba(249,115,22,0.35)]"
          initial={{ scale: 0.6, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.2, ...SPRING_SMOOTH }}
        >
          <Clock size={140} color="#f97316" strokeWidth={1.5} />
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#f8fafc] font-display font-black text-[48px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, ...SPRING_SNAPPY }}
          >
            &lt;7
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#f97316] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, ...SPRING_SNAPPY }}
          >
            <AlertTriangle size={32} color="#0F172A" strokeWidth={2.5} />
          </motion.div>
        </motion.div>

        {/* Impact cards */}
        <div className="mt-10 flex gap-5">
          {[
            { Icon: ZapOff, text: 'Reduced Focus', delay: 1.4 },
            { Icon: TrendingDown, text: 'Slower Reaction', delay: 1.7 },
            { Icon: AlertTriangle, text: 'Long-Term Risk', delay: 2.0 },
          ].map(({ Icon, text, delay }) => (
            <motion.div
              key={text}
              className="flex flex-col items-center gap-2 bg-[#1e293b] border border-[#334155] px-5 py-4 rounded-2xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay, ...SPRING_SMOOTH }}
            >
              <Icon size={32} color="#f97316" />
              <span className="text-[#f8fafc] font-display font-bold text-[16px] uppercase tracking-wider">{text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Text */}
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
          Under 7 Hours Is Linked to
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, ...SPRING_SNAPPY }}
          >
            Reduced Focus & Long-Term Risk
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
