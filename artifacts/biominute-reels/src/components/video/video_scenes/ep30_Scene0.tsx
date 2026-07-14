import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Droplets, X } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

// Juice/detox drink icon
function JuiceIcon({ size = 100 }: { size?: number }) {
  const s = size;
  return (
    <svg width={s * 0.7} height={s} viewBox="0 0 70 100" fill="none">
      {/* Glass */}
      <path d="M 10 20 L 15 90 L 55 90 L 60 20 Z" fill="#10b981" opacity={0.85} rx="4" />
      <path d="M 10 20 L 60 20" stroke="#10b981" strokeWidth="4" strokeLinecap="round" />
      {/* Straw */}
      <rect x="40" y="5" width="6" height="50" rx="3" fill="#f97316" opacity={0.9} />
      {/* Highlight */}
      <path d="M 18 35 L 16 80" stroke="white" strokeWidth="3" strokeLinecap="round" opacity={0.2} />
    </svg>
  );
}

export function Scene0() {
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

      <motion.div
        className="absolute top-[16%] w-[500px] h-[500px] bg-gradient-to-tr from-[#10b981]/15 to-[#2F6FED]/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute top-[210px] flex flex-col items-center gap-5 z-10 w-full px-12">
        {/* Detox drink with X */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <div className="w-[220px] h-[220px] rounded-full bg-[#10b981]/10 border-4 border-[#10b981]/40 flex items-center justify-center">
            <JuiceIcon size={140} />
          </div>
          {/* X badge */}
          <motion.div
            className="absolute -top-4 -right-4 w-[72px] h-[72px] rounded-full bg-[#f97316] flex items-center justify-center drop-shadow-[0_0_20px_rgba(249,115,22,0.5)]"
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 1.0, ...SPRING_SNAPPY }}
          >
            <X size={36} color="#0F172A" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {/* "Myth" label */}
        <motion.div
          className="flex items-center gap-3 bg-[#f97316]/10 border border-[#f97316]/30 px-7 py-4 rounded-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, ...SPRING_SMOOTH }}
        >
          <Droplets size={28} color="#f97316" />
          <span className="text-[#f97316] font-display font-bold text-[22px] uppercase tracking-wider">Do They Actually Work?</span>
        </motion.div>
      </div>

      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 90 }}
      >
        <motion.h1
          className="text-[#f8fafc] text-[58px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Do Detox Drinks
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, ...SPRING_SNAPPY }}
          >
            Really Clean
          </motion.span>
          <motion.span
            className="text-[#2F6FED] block mt-1 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, ...SPRING_SNAPPY }}
          >
            Your Body?
          </motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
