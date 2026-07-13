import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Coffee, Droplets, Scale } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />

      {/* Balancing Scale animation */}
      <div className="absolute top-[250px] flex flex-col items-center z-10 w-full">
         <motion.div
            className="mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, ...SPRING_SMOOTH }}
         >
            <Scale size={150} color="#475569" strokeWidth={1} />
         </motion.div>

         <div className="flex gap-20">
            <motion.div
              className="relative flex flex-col items-center gap-6"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, ...SPRING_SMOOTH }}
            >
              <div className="w-[180px] h-[180px] rounded-3xl border-4 border-[#14b8a6] bg-[#14b8a6]/10 flex items-center justify-center drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]">
                <Droplets size={80} color="#14b8a6" fill="#14b8a6" opacity={0.8} />
              </div>
              <span className="text-[#14b8a6] text-[35px] font-bold font-display uppercase tracking-widest">Start Hydrated</span>
            </motion.div>

            <motion.div
              className="relative flex flex-col items-center gap-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5, ...SPRING_SMOOTH }}
            >
              <div className="w-[180px] h-[180px] rounded-3xl border-4 border-[#f97316] bg-[#f97316]/10 flex items-center justify-center drop-shadow-[0_0_30px_rgba(249,115,22,0.3)]">
                <Coffee size={80} color="#f97316" />
              </div>
              <span className="text-[#f97316] text-[35px] font-bold font-display uppercase tracking-widest">Mild Diuretic</span>
            </motion.div>
         </div>
      </div>

      <div 
        className="absolute w-full px-16 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 120 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[75px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          Balance The Effect
        </motion.h2>
      </div>
    </motion.div>
  );
}
