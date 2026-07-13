import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Drumstick, Carrot, Wheat, Apple, HeartPulse } from 'lucide-react';
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />

      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#10b981]/15 to-[#2F6FED]/10 blur-[40px]"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {[
            { Icon: Drumstick, color: '#f97316', label: 'Protein', delay: 0.2, angle: 0 },
            { Icon: Carrot, color: '#10b981', label: 'Veggies', delay: 0.5, angle: 72 },
            { Icon: Wheat, color: '#2F6FED', label: 'Whole Grains', delay: 0.8, angle: 144 },
            { Icon: Apple, color: '#14b8a6', label: 'Healthy Fats', delay: 1.1, angle: 216 },
            { Icon: HeartPulse, color: '#f97316', label: 'Slower', delay: 1.4, angle: 288 },
          ].map(({ Icon, color, label, delay, angle }) => {
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
            className="w-24 h-24 rounded-full bg-[#10b981] flex items-center justify-center z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            <span className="text-[#0F172A] font-display font-black text-[20px]">BUILD</span>
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
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          Build Meals Around
          <motion.span
            className="text-[#10b981] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Protein, Fiber & Healthy Fats
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
