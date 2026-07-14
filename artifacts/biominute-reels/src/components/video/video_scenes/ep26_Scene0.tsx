import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Dumbbell, RefreshCw } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene0() {
  const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.volume = 0.6; audioRef.current.play().catch(() => {}); }
  }, []);

  return (
    <motion.div className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }} transition={{ duration: 0.8 }}>
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />
      <motion.div className="absolute top-[16%] w-[500px] h-[500px] bg-gradient-to-tr from-[#2F6FED]/15 to-[#10b981]/10 rounded-full blur-[120px]"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute top-[210px] flex flex-col items-center gap-5 z-10 w-full px-12">
        <motion.div className="relative flex items-center justify-center gap-6"
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, ...SPRING_SMOOTH }}>
          <div className="w-[180px] h-[180px] rounded-full bg-[#2F6FED]/10 border-4 border-[#2F6FED]/50 flex items-center justify-center drop-shadow-[0_0_40px_rgba(47,111,237,0.25)]">
            <Dumbbell size={90} color="#2F6FED" strokeWidth={1.5} />
          </div>
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
            <span className="text-[#f97316] font-display font-bold text-[52px]">×7?</span>
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center gap-3 bg-[#2F6FED]/10 border border-[#2F6FED]/30 px-7 py-4 rounded-2xl"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, ...SPRING_SMOOTH }}>
          <RefreshCw size={26} color="#10b981" />
          <span className="text-[#2F6FED] font-display font-bold text-[22px] uppercase tracking-wider">Or Do You Need Rest?</span>
        </motion.div>
      </div>

      <div className="absolute w-full px-12 text-center z-20" style={{ bottom: BOTTOM_SAFE_ZONE_PX + 90 }}>
        <motion.h1 className="text-[#f8fafc] text-[60px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
          Should You Work Out
          <motion.span className="text-[#2F6FED] block mt-2 drop-shadow-md" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.9, ...SPRING_SNAPPY }}>Every</motion.span>
          <motion.span className="text-[#10b981] block mt-1 drop-shadow-md" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.3, ...SPRING_SNAPPY }}>Day?</motion.span>
        </motion.h1>
      </div>
    </motion.div>
  );
}
