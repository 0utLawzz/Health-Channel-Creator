import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Droplets, Snowflake, Thermometer } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene0() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
    const t = setInterval(() => setPulse((v) => v + 1), 800);
    return () => clearInterval(t);
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

      {/* Background glow — cool blue */}
      <motion.div
        className="absolute top-[12%] w-[520px] h-[520px] bg-gradient-to-tr from-[#2F6FED]/20 to-[#14b8a6]/10 rounded-full blur-[130px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Visual: shower burst + cold droplets */}
      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-12">
        <motion.div
          className="relative w-[220px] h-[220px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, ...SPRING_SNAPPY }}
        >
          {/* Shower head / burst ring */}
          <svg width="220" height="220" viewBox="0 0 220 220" className="absolute inset-0">
            <circle cx="110" cy="110" r="100" fill="none" stroke="#2F6FED" strokeWidth="6" opacity="0.35" />
            <circle cx="110" cy="110" r="75" fill="none" stroke="#14b8a6" strokeWidth="4" opacity="0.25" />
            <circle cx="110" cy="110" r="50" fill="none" stroke="#2F6FED" strokeWidth="3" opacity="0.15" />
          </svg>

          {/* Droplets falling */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2"
              initial={{ y: -40, x: -50 + i * 20, opacity: 0 }}
              animate={{ y: 60, opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeIn' }}
            >
              <Droplets size={18} color="#2F6FED" strokeWidth={2} />
            </motion.div>
          ))}

          {/* Center snowflake/thermometer */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Snowflake size={72} color="#14b8a6" strokeWidth={1.4} />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 bg-[#2F6FED]/10 border border-[#2F6FED]/30 px-7 py-4 rounded-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, ...SPRING_SMOOTH }}
        >
          <Thermometer size={20} color="#2F6FED" />
          <span className="text-[#2F6FED] font-display font-bold text-[18px] uppercase tracking-wider">S4 • Stress &amp; Mind</span>
        </motion.div>
      </div>

      {/* Hook text */}
      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 90 }}
      >
        <motion.h1
          className="text-[#f8fafc] text-[44px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Do Cold Showers
          <motion.span
            className="text-[#2F6FED] block mt-2 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, ...SPRING_SNAPPY }}
          >
            Really Have
          </motion.span>
          <motion.span
            className="text-[#14b8a6] block mt-1 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, ...SPRING_SNAPPY }}
          >
            Health Benefits?
          </motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
