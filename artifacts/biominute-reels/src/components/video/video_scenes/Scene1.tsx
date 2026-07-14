import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FlaskConical, ScrollText, Check } from 'lucide-react';
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

  const papers = [
    { color: '#10b981', delay: 0.2, x: -80, y: -40 },
    { color: '#2F6FED', delay: 0.5, x: 80, y: -20 },
    { color: '#f97316', delay: 0.8, x: 0, y: 60 },
  ];

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
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2F6FED]/15 to-[#10b981]/10 blur-[40px]"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.div
            className="w-[240px] h-[240px] rounded-full bg-[#0F172A] border-8 border-[#2F6FED] flex items-center justify-center drop-shadow-[0_0_60px_rgba(47,111,237,0.35)]"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, ...SPRING_SMOOTH }}
          >
            <FlaskConical size={88} color="#2F6FED" strokeWidth={1.5} />
          </motion.div>

          {papers.map(({ color, delay, x, y }, i) => (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center w-16 h-20 rounded-lg border-2"
              style={{ borderColor: color, backgroundColor: `${color}15`, boxShadow: `0 0 20px ${color}40` }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.5 }}
              animate={{ x, y, opacity: 1, scale: 1 }}
              transition={{ delay, ...SPRING_SMOOTH }}
            >
              <ScrollText size={28} color={color} strokeWidth={2} />
              <motion.div
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ backgroundColor: color }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: delay + 0.4, ...SPRING_SNAPPY }}
              >
                <Check size={16} color="#0F172A" strokeWidth={3} />
              </motion.div>
            </motion.div>
          ))}
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
          One of the Most
          <motion.span
            className="text-[#2F6FED] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Studied Supplements
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
