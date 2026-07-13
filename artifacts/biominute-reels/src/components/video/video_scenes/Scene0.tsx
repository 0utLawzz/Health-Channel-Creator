import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Droplet, Coffee, Sunrise, User } from 'lucide-react';
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
      
      {/* Sunrise Gradient Background */}
      <motion.div 
        className="absolute bottom-0 w-full h-[70%] bg-gradient-to-t from-[#f97316]/30 via-[#f97316]/5 to-transparent opacity-60"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      
      <motion.div 
        className="absolute top-[10%] opacity-20"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 3, ease: "easeOut" }}
      >
        <Sunrise size={400} color="#f97316" strokeWidth={1} />
      </motion.div>

      {/* Main Visual: Glass filling with water, coffee cup beside it */}
      <div className="absolute top-[280px] flex items-end justify-center gap-12 z-10 w-full h-[300px]">
        
        {/* Animated Character Waking */}
        <motion.div
          className="absolute -left-20 top-20 flex flex-col items-center opacity-40"
          initial={{ y: 50, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 0.6, scale: 1 }}
          transition={{ delay: 0.5, ...SPRING_SMOOTH }}
        >
          <User size={80} color="#14b8a6" />
        </motion.div>

        {/* Glass of Water */}
        <motion.div
          className="relative w-32 h-48 border-x-8 border-b-8 border-[#10b981] rounded-b-3xl bg-[#0F172A] overflow-hidden drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, ...SPRING_SNAPPY }}
        >
          <motion.div
            className="absolute bottom-0 w-full bg-gradient-to-t from-[#14b8a6] to-[#10b981]"
            initial={{ height: "0%" }}
            animate={{ height: "80%" }}
            transition={{ delay: 1.0, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Floating Droplet */}
        <motion.div
          className="absolute left-[50%] -translate-x-[150px] top-0"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 100, opacity: [0, 1, 0] }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeIn" }}
        >
          <Droplet size={50} color="#14b8a6" fill="#14b8a6" />
        </motion.div>

        {/* Coffee Cup dims then brightens */}
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, ...SPRING_SNAPPY }}
        >
          <motion.div
            className="w-32 h-32 rounded-3xl border-8 border-[#2F6FED] bg-[#0F172A] flex items-center justify-center drop-shadow-[0_0_30px_rgba(47,111,237,0.3)] overflow-hidden"
            animate={{ 
              opacity: [1, 0.4, 1],
              filter: ['grayscale(0%)', 'grayscale(80%)', 'grayscale(0%)'],
              borderColor: ['#2F6FED', '#475569', '#10b981']
            }}
            transition={{ delay: 1.0, duration: 2.5, times: [0, 0.5, 1], ease: "easeInOut" }}
          >
            <motion.div 
               className="absolute inset-0 bg-gradient-to-tr from-[#2F6FED] to-[#10b981] opacity-0"
               animate={{ opacity: [0, 0, 0.3] }}
               transition={{ delay: 1.0, duration: 2.5, times: [0, 0.5, 1] }}
            />
            <Coffee size={60} color="#2F6FED" className="z-10" />
          </motion.div>
        </motion.div>

      </div>

      {/* Text Content */}
      <div 
        className="absolute w-full px-16 text-center z-20 flex flex-col items-center"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 120 }}
      >
        <motion.h1
          className="text-[#f8fafc] text-[65px] font-bold uppercase tracking-widest leading-none font-display drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Drink Water Before
          <motion.span 
            className="text-[#2F6FED] block mt-6 drop-shadow-md text-[80px]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5, ...SPRING_SNAPPY }}
          >
            Your Morning Coffee
          </motion.span> 
        </motion.h1>
      </div>
    </motion.div>
  );
}
