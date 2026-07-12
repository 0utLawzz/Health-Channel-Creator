import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { HeartPulse } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene4() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.25;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />

      {/* Heartbeat motif background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
         <HeartPulse size={800} color="#10B981" strokeWidth={1} />
      </div>

      <motion.div
        className="absolute top-[350px] z-10 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#10B981] to-[#14b8a6] flex items-center justify-center p-2 drop-shadow-[0_0_60px_rgba(16,185,129,0.5)]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.5 }}
      >
        <div className="w-full h-full bg-[#0F172A] rounded-full flex flex-col items-center justify-center shadow-inner">
          <motion.span 
            className="text-[120px] font-black text-[#f8fafc] font-display leading-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            10-15
          </motion.span>
          <motion.span 
            className="text-[50px] text-[#10B981] font-bold uppercase tracking-widest mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Minutes
          </motion.span>
        </div>
      </motion.div>

      <div 
        className="absolute w-full px-16 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 120 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[70px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Make a <br/>
          <span className="text-[#10B981] text-[90px] mt-6 block">Meaningful Difference</span>
        </motion.h2>
      </div>

    </motion.div>
  );
}
