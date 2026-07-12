import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Utensils } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene0() {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />
      
      {/* Background accents */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
         <motion.div 
           className="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-[#14b8a6] rounded-full blur-[120px]"
           animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 4, repeat: Infinity }}
         />
      </div>

      {/* Main Visual: Plate */}
      <motion.div
        className="absolute top-[450px] z-10 w-80 h-80 rounded-full border-8 border-[#14b8a6] bg-[#0F172A] flex items-center justify-center drop-shadow-[0_0_40px_rgba(20,184,166,0.4)]"
        initial={{ y: 100, scale: 0.5, opacity: 0, rotate: -90 }}
        animate={{ y: 0, scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
      >
        <Utensils size={150} color="#14b8a6" strokeWidth={1.5} />
      </motion.div>

      {/* Text Content */}
      <div 
        className="absolute w-full px-16 text-center z-20 flex flex-col items-center"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 120 }}
      >
        <motion.h1
          className="text-[#f8fafc] text-[100px] font-bold uppercase tracking-widest leading-none font-display drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Walk After
          <motion.span 
            className="text-[#10B981] block mt-6 drop-shadow-md text-[130px]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
          >
            Meals
          </motion.span> 
        </motion.h1>
      </div>

    </motion.div>
  );
}
