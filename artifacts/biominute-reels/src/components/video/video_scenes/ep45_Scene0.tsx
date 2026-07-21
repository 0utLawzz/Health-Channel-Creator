import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Sun, Shield, Sparkles } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene0() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); } }, []);

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />
      <motion.div className="absolute top-[12%] w-[520px] h-[520px] bg-gradient-to-tr from-[#f97316]/18 to-[#10b981]/10 rounded-full blur-[130px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-12">
        <motion.div className="relative w-[220px] h-[220px]"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, ...SPRING_SNAPPY }}>
          {/* Sun rays */}
          {[0,1,2,3,4,5].map(i => (
            <motion.div key={i} className="absolute top-1/2 left-1/2 w-[6px] h-[50px] origin-bottom rounded-full bg-[#f97316]/40"
              style={{ rotate: `${i * 60}deg`, marginLeft: -3, marginTop: -110 }}
              animate={{ opacity: [0.3, 0.8, 0.3], scaleY: [0.8, 1.2, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }} />
          ))}
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sun size={88} color="#f97316" strokeWidth={1.3} />
          </motion.div>
          <motion.div className="absolute bottom-0 right-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
            <Shield size={52} color="#10b981" strokeWidth={1.5} />
          </motion.div>
          <motion.div className="absolute top-4 left-4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}>
            <Sparkles size={36} color="#14b8a6" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
        <motion.div className="flex items-center gap-3 bg-[#f97316]/10 border border-[#f97316]/30 px-7 py-4 rounded-2xl"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, ...SPRING_SMOOTH }}>
          <Sun size={20} color="#f97316" />
          <span className="text-[#f97316] font-display font-bold text-[18px] uppercase tracking-wider">S6 • Healthy Aging</span>
        </motion.div>
      </div>

      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 90 }}>
        <motion.h1 className="text-[#f8fafc] text-[44px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          Does Sunscreen
          <motion.span className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9, ...SPRING_SNAPPY }}>
            Block Vitamin D
          </motion.span>
          <motion.span className="text-[#10b981] block mt-1 drop-shadow-md"
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.3, ...SPRING_SNAPPY }}>
            Production?
          </motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
