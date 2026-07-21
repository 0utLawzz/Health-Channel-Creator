import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Smartphone, Moon, Eye, ArrowDown } from 'lucide-react';
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />

      <div className="absolute top-[185px] flex flex-col items-center gap-5 z-10 w-full px-10">
        <motion.div
          className="bg-[#2F6FED]/10 border border-[#2F6FED]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <span className="text-[#2F6FED] font-display font-bold text-[22px] uppercase tracking-wider">The Melatonin Delay</span>
        </motion.div>

        {/* Phone → eye → moon chain */}
        <div className="flex items-center gap-4 w-full justify-center">
          <motion.div
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#2F6FED18', border: '3px solid #2F6FED55' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, ...SPRING_SNAPPY }}
          >
            <Smartphone size={48} color="#2F6FED" strokeWidth={1.6} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, ...SPRING_SMOOTH }}
          >
            <ArrowDown size={32} color="#94a3b8" strokeWidth={2} className="rotate-[-90deg]" />
          </motion.div>

          <motion.div
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#f9731618', border: '3px solid #f9731655' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, ...SPRING_SNAPPY }}
          >
            <Eye size={48} color="#f97316" strokeWidth={1.6} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, ...SPRING_SMOOTH }}
          >
            <ArrowDown size={32} color="#94a3b8" strokeWidth={2} className="rotate-[-90deg]" />
          </motion.div>

          <motion.div
            className="w-[100px] h-[100px] rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#14b8a618', border: '3px solid #14b8a655' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, ...SPRING_SNAPPY }}
          >
            <Moon size={48} color="#14b8a6" strokeWidth={1.6} />
          </motion.div>
        </div>

        {/* Key insight cards */}
        {[
          { color: '#2F6FED', title: 'Blue light signals daytime', body: 'Your brain suppresses melatonin' },
          { color: '#14b8a6', title: 'Falling asleep gets harder', body: 'Especially in a dark room with a bright screen' },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="bg-[#1e293b] border border-[#334155] rounded-[24px] px-7 py-5 w-full"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.4 + i * 0.35, ...SPRING_SMOOTH }}
          >
            <p className="font-display font-bold text-[21px] uppercase leading-tight" style={{ color: item.color }}>{item.title}</p>
            <p className="text-[#94a3b8] font-body text-[19px] leading-snug mt-1">{item.body}</p>
          </motion.div>
        ))}
      </div>

      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[50px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Real Effect,
          <motion.span
            className="text-[#14b8a6] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, ...SPRING_SNAPPY }}
          >
            Modest Impact
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
