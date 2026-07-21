import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Activity, Moon, Brain } from 'lucide-react';
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

      <div className="absolute top-[180px] flex flex-col items-center gap-5 z-10 w-full px-10">
        <motion.div
          className="bg-[#2F6FED]/10 border border-[#2F6FED]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <span className="text-[#2F6FED] font-display font-bold text-[22px] uppercase tracking-wider">REM Sleep Takes a Hit</span>
        </motion.div>

        {/* Two sleep graphs */}
        <div className="flex gap-4 w-full">
          {/* Without alcohol — smooth */}
          <motion.div
            className="flex-1 rounded-[24px] p-5 flex flex-col items-center gap-3 border"
            style={{ backgroundColor: '#10b98118', borderColor: '#10b98145' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, ...SPRING_SNAPPY }}
          >
            <Moon size={40} color="#10b981" strokeWidth={1.8} />
            <span className="text-[#10b981] font-display font-bold text-[18px] uppercase text-center leading-tight">Without<br/>Alcohol</span>
            <svg width="100" height="50" viewBox="0 0 100 50" className="mt-2">
              <motion.path
                d="M0 40 Q25 10 50 35 T100 15"
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.0, duration: 1.5 }}
              />
            </svg>
            <span className="text-[#94a3b8] font-body text-[15px] text-center">Smooth REM cycles</span>
          </motion.div>

          {/* With alcohol — jagged */}
          <motion.div
            className="flex-1 rounded-[24px] p-5 flex flex-col items-center gap-3 border"
            style={{ backgroundColor: '#f9731618', borderColor: '#f9731645' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, ...SPRING_SNAPPY }}
          >
            <WineIcon />
            <span className="text-[#f97316] font-display font-bold text-[18px] uppercase text-center leading-tight">With<br/>Alcohol</span>
            <svg width="100" height="50" viewBox="0 0 100 50" className="mt-2">
              <motion.path
                d="M0 45 L10 20 L25 40 L35 15 L50 45 L60 25 L75 42 L85 18 L100 40"
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1.0, duration: 1.5 }}
              />
            </svg>
            <span className="text-[#94a3b8] font-body text-[15px] text-center">Fragmented REM</span>
          </motion.div>
        </div>

        {/* REM importance card */}
        <motion.div
          className="w-full bg-[#1e293b] border border-[#334155] rounded-[28px] px-8 py-6 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ...SPRING_SMOOTH }}
        >
          <div className="flex items-center gap-3">
            <Brain size={28} color="#2F6FED" strokeWidth={1.8} />
            <span className="text-[#94a3b8] font-display font-bold text-[20px] uppercase tracking-wide">REM matters</span>
          </div>
          <span className="text-[#f8fafc] font-body text-[19px] text-center leading-snug">
            REM is tied to memory and mental recovery — alcohol cuts into it
          </span>
        </motion.div>
      </div>

      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[50px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Sleep Looks
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, ...SPRING_SNAPPY }}
          >
            Long, Not Deep
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}

function WineIcon() {
  return <Activity size={40} color="#f97316" strokeWidth={1.8} />;
}
