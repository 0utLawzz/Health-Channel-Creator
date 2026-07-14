import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Dumbbell, BatteryWarning, Apple, Zap } from 'lucide-react';
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

  const issues = [
    { Icon: Dumbbell, label: 'Performance', color: '#f97316', delay: 0.2, angle: 0 },
    { Icon: Apple, label: 'Eating', color: '#10b981', delay: 0.5, angle: 120 },
    { Icon: Zap, label: 'Energy', color: '#2F6FED', delay: 0.8, angle: 240 },
  ];

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
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#f97316]/15 to-[#2F6FED]/10 blur-[40px]"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {issues.map(({ Icon, label, color, delay, angle }) => {
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * 130;
            const y = Math.sin(rad) * 130;
            return (
              <motion.div
                key={label}
                className="absolute flex flex-col items-center gap-2"
                style={{ left: '50%', top: '50%', marginLeft: -44, marginTop: -44 }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
                animate={{ x, y, opacity: 1, scale: 1 }}
                transition={{ delay, ...SPRING_SMOOTH }}
              >
                <div
                  className="w-[88px] h-[88px] rounded-full bg-[#0F172A] border-4 flex items-center justify-center"
                  style={{ borderColor: color, boxShadow: `0 0 30px ${color}40` }}
                >
                  <Icon size={40} color={color} strokeWidth={2} />
                </div>
                <span className="font-display font-bold text-[14px] uppercase tracking-wider" style={{ color }}>{label}</span>
              </motion.div>
            );
          })}

          <motion.div
            className="w-24 h-24 rounded-full bg-[#f97316] flex items-center justify-center z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, ...SPRING_SNAPPY }}
          >
            <BatteryWarning size={48} color="#0F172A" strokeWidth={2} />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 bg-[#f97316]/10 border border-[#f97316]/30 px-6 py-4 rounded-2xl text-center max-w-[80%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, ...SPRING_SMOOTH }}
        >
          <span className="text-[#f8fafc] font-display font-bold text-[22px] uppercase tracking-wider">Poor Sleep Dims All Three</span>
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
          Poor Sleep Can Reduce
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Performance, Eating & Energy
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
