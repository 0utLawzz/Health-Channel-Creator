import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Brain, Dumbbell, HeartPulse, Sparkles } from 'lucide-react';
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />

      {/* Sleeping silhouette + floating repair icons */}
      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[300px] h-[300px]">
          <motion.div
            className="absolute inset-0 rounded-full bg-[#2F6FED]/10 border-4 border-[#2F6FED]/30"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {[
            { Icon: Brain, color: '#2F6FED', label: 'Memory', delay: 0.3, x: -120, y: -60 },
            { Icon: Dumbbell, color: '#10b981', label: 'Repair', delay: 0.6, x: 120, y: -60 },
            { Icon: HeartPulse, color: '#f97316', label: 'Hormones', delay: 0.9, x: 0, y: 120 },
          ].map(({ Icon, color, label, delay, x, y }) => (
            <motion.div
              key={label}
              className="absolute flex flex-col items-center gap-2"
              style={{ left: '50%', top: '50%', marginLeft: -40, marginTop: -40 }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
              animate={{ x, y, opacity: 1, scale: 1 }}
              transition={{ delay, ...SPRING_SMOOTH }}
            >
              <div
                className="w-20 h-20 rounded-full bg-[#0F172A] border-4 flex items-center justify-center"
                style={{ borderColor: color, boxShadow: `0 0 30px ${color}40` }}
              >
                <Icon size={36} color={color} strokeWidth={2} />
              </div>
              <span className="font-display font-bold text-[16px] uppercase tracking-wider" style={{ color }}>{label}</span>
            </motion.div>
          ))}

          {/* Central sleeping figure */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, ...SPRING_SMOOTH }}
          >
            <div className="w-32 h-32 rounded-full bg-[#1e293b] border-4 border-[#94a3b8] flex items-center justify-center">
              <span className="text-[#94a3b8] font-display text-[40px]">😴</span>
            </div>
          </motion.div>
        </div>

        {/* Repair particles */}
        <div className="mt-12 flex gap-3">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 0], y: -40 }}
              transition={{ delay: 1.2 + i * 0.2, duration: 2, repeat: Infinity }}
            >
              <Sparkles size={24} color="#10b981" />
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
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Sleep Isn't Downtime
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, ...SPRING_SNAPPY }}
          >
            It's When Your Body Repairs
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
