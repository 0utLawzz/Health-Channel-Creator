import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Moon, Wind, Droplets, Bed } from 'lucide-react';
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
      
      {/* Background soft parallax */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ y: -50 }}
        animate={{ y: 50 }}
        transition={{ duration: 6, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-full h-full bg-[linear-gradient(rgba(248,250,252,0.1)_2px,transparent_2px)] bg-[size:100px_100px]" />
      </motion.div>

      <div className="absolute top-[250px] flex flex-col items-center z-10 w-full">
        <motion.div
          className="relative w-48 h-48 rounded-full bg-[#0F172A] border-4 border-[#2F6FED] flex items-center justify-center drop-shadow-[0_0_40px_rgba(47,111,237,0.3)] mb-12"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ...SPRING_SMOOTH }}
        >
          <Bed size={80} color="#2F6FED" />
          <motion.div 
             className="absolute -top-4 -right-4"
             initial={{ rotate: -45, opacity: 0 }}
             animate={{ rotate: 0, opacity: 1 }}
             transition={{ delay: 0.8, ...SPRING_SNAPPY }}
          >
             <Moon size={60} color="#f97316" fill="#f97316" />
          </motion.div>
        </motion.div>

        <div className="flex gap-16 mt-4">
           <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2, ...SPRING_SMOOTH }}
           >
              <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                 <Wind size={40} color="#14b8a6" />
              </div>
              <span className="text-[#94a3b8] font-display uppercase tracking-widest text-[24px]">Breathing</span>
           </motion.div>

           <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.5, ...SPRING_SMOOTH }}
           >
              <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                 <Droplets size={40} color="#14b8a6" />
              </div>
              <span className="text-[#94a3b8] font-display uppercase tracking-widest text-[24px]">Sweating</span>
           </motion.div>
        </div>
      </div>

      {/* Text Content */}
      <div 
        className="absolute w-full px-16 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 120 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[65px] font-bold uppercase tracking-widest font-display drop-shadow-md leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          7-8 Hours Of Sleep
        </motion.h2>
        <motion.p
          className="text-[#10b981] text-[45px] mt-6 uppercase tracking-widest font-bold font-display"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
        >
          Naturally Low On Fluids
        </motion.p>
      </div>

    </motion.div>
  );
}
