import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Clock, Utensils, Sandwich } from 'lucide-react';
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

      <div className="absolute top-[240px] flex flex-col items-center z-10 w-full">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#10b981]/15 to-[#2F6FED]/10 blur-[40px]"
            animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 340 340">
            <motion.path
              d="M 80 170 Q 170 80 260 170"
              fill="none"
              stroke="#2F6FED"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </svg>

          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            style={{ marginLeft: -10 }}
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, ...SPRING_SMOOTH }}
          >
            <div className="w-[100px] h-[100px] rounded-full bg-[#0F172A] border-4 border-[#10b981] flex items-center justify-center drop-shadow-[0_0_30px_rgba(16,185,129,0.35)]">
              <Utensils size={48} color="#10b981" strokeWidth={1.5} />
            </div>
            <span className="font-display font-bold text-[14px] uppercase tracking-wider text-[#10b981]">Morning</span>
          </motion.div>

          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2"
            style={{ marginRight: -10 }}
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, ...SPRING_SMOOTH }}
          >
            <div className="w-[100px] h-[100px] rounded-full bg-[#0F172A] border-4 border-[#f97316] flex items-center justify-center drop-shadow-[0_0_30px_rgba(249,115,22,0.35)]">
              <Sandwich size={48} color="#f97316" strokeWidth={1.5} />
            </div>
            <span className="font-display font-bold text-[14px] uppercase tracking-wider text-[#f97316]">Later</span>
          </motion.div>

          <motion.div
            className="w-24 h-24 rounded-full bg-[#2F6FED] flex items-center justify-center z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, ...SPRING_SNAPPY }}
          >
            <Clock size={48} color="#0F172A" strokeWidth={2} />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 bg-[#10b981]/10 border border-[#10b981]/30 px-6 py-4 rounded-2xl text-center max-w-[80%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, ...SPRING_SMOOTH }}
        >
          <span className="text-[#f8fafc] font-display font-bold text-[22px] uppercase tracking-wider">Both Patterns Can Work</span>
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
          Some Feel Better With It
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, ...SPRING_SNAPPY }}
          >
            Others Prefer Eating Later
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
