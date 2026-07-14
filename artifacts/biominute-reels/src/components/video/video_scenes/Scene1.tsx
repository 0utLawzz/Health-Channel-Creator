import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Filter, Zap, X } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

function JuiceIcon({ size = 60 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s * 0.7} height={s} viewBox="0 0 70 100" fill="none">
      <path d="M 10 20 L 15 90 L 55 90 L 60 20 Z" fill="#10b981" opacity={0.8} />
      <path d="M 10 20 L 60 20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
      <rect x="40" y="5" width="6" height="50" rx="3" fill="#f97316" opacity={0.9} />
    </svg>
  );
}

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

      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-10">
        <motion.div
          className="bg-[#2F6FED]/10 border border-[#2F6FED]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <span className="text-[#2F6FED] font-display font-bold text-[24px] uppercase tracking-wider">Your Body Already Does It</span>
        </motion.div>

        {/* Liver + kidney already filtering vs juice */}
        <div className="flex items-center gap-6 w-full justify-center">
          {/* Body's natural filtration */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, ...SPRING_SMOOTH }}
          >
            <div className="relative w-[150px] h-[150px] rounded-full bg-[#10b981]/10 border-4 border-[#10b981]/60 flex items-center justify-center drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <Filter size={72} color="#10b981" strokeWidth={1.5} />
              {/* Animated filtering dots */}
              {[0,1,2].map(i => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-[#10b981] rounded-full"
                  style={{ top: '20%', left: `${25 + i * 25}%` }}
                  animate={{ y: [0, 40, 0], opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                />
              ))}
            </div>
            <span className="text-[#10b981] font-display font-bold text-[20px] uppercase text-center">Liver & Kidneys</span>
            <span className="text-[#64748b] text-[18px] text-center">Always filtering</span>
          </motion.div>

          {/* vs */}
          <motion.span
            className="text-[#64748b] font-display font-bold text-[28px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >vs</motion.span>

          {/* Detox drink - dimmed */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 0.5 }}
            transition={{ delay: 0.7, ...SPRING_SMOOTH }}
          >
            <div className="w-[150px] h-[150px] rounded-full bg-[#1e293b] border-4 border-[#334155] flex items-center justify-center">
              <JuiceIcon size={80} />
            </div>
            <span className="text-[#475569] font-display font-bold text-[20px] uppercase text-center">Detox Drink</span>
            <span className="text-[#475569] text-[18px] text-center">No evidence</span>
          </motion.div>
        </div>

        <motion.div
          className="bg-[#1e293b]/90 border border-[#f97316]/20 px-8 py-5 rounded-2xl w-full text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, ...SPRING_SMOOTH }}
        >
          <p className="text-[#f8fafc] font-display font-bold text-[26px] leading-snug uppercase tracking-wide">
            <span className="text-[#f97316]">No Strong Evidence</span> Detox Drinks Outperform Your Body
          </p>
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
          Your Liver & Kidneys
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, ...SPRING_SNAPPY }}
          >
            Do the Real Work
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
