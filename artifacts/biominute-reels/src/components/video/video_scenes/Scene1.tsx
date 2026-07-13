import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Beef, Wheat, Salad, TrendingDown } from 'lucide-react';
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

      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-[#f97316]/10 border-4 border-[#f97316]/30"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {[
            { Icon: Beef, color: '#f97316', label: 'Protein', delay: 0.3, x: -90, y: -90 },
            { Icon: Wheat, color: '#f97316', label: 'Fiber', delay: 0.6, x: 90, y: -90 },
            { Icon: Salad, color: '#10b981', label: 'Veggies', delay: 0.9, x: 0, y: 100 },
          ].map(({ Icon, color, label, delay, x, y }) => (
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
          ))}

          <motion.div
            className="absolute flex items-center justify-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, ...SPRING_SMOOTH }}
          >
            <div className="w-28 h-28 rounded-full bg-[#1e293b] border-4 border-[#f97316] flex items-center justify-center">
              <TrendingDown size={48} color="#f97316" />
            </div>
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
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Low Protein or Fiber?
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, ...SPRING_SNAPPY }}
          >
            Meals Tend to Be Less Filling
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
