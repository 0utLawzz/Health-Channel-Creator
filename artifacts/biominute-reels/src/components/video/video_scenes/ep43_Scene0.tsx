import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Brain, Wind, Sparkles } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

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

      {/* Background glow — anxious orange → calming emerald */}
      <motion.div
        className="absolute top-[12%] w-[520px] h-[520px] rounded-full blur-[130px]"
        animate={{
          background: ['radial-gradient(circle, rgba(249,115,22,0.22) 0%, rgba(16,185,129,0.08) 100%)', 'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(47,111,237,0.08) 100%)'],
          scale: [1, 1.08, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Brain icon with sparks → waves */}
      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-12">
        <motion.div
          className="relative w-[220px] h-[220px]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, ...SPRING_SNAPPY }}
        >
          {/* Anxiety sparks */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${20 + i * 15}%`,
                left: i % 2 === 0 ? '5%' : '72%',
              }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], y: [0, -12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            >
              <Sparkles size={22} color="#f97316" strokeWidth={1.6} />
            </motion.div>
          ))}

          {/* Central brain */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#2F6FED]/20 blur-[30px] rounded-full" />
              <Brain size={100} color="#2F6FED" strokeWidth={1.3} />
            </div>
          </motion.div>

          {/* Calming wave icon */}
          <motion.div
            className="absolute bottom-0 right-0"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, ...SPRING_SNAPPY }}
          >
            <Wind size={52} color="#10b981" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        {/* Season badge */}
        <motion.div
          className="flex items-center gap-3 bg-[#2F6FED]/10 border border-[#2F6FED]/30 px-7 py-4 rounded-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, ...SPRING_SMOOTH }}
        >
          <Brain size={20} color="#2F6FED" />
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
          Is Meditation
          <motion.span
            className="text-[#2F6FED] block mt-2 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, ...SPRING_SNAPPY }}
          >
            As Effective As
          </motion.span>
          <motion.span
            className="text-[#10b981] block mt-1 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, ...SPRING_SNAPPY }}
          >
            Medication?
          </motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
