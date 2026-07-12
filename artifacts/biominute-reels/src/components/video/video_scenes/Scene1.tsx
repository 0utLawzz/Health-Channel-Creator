import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Activity, Clock } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene1() {
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
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />
      
      {/* Background Lines */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(rgba(248,250,252,0.1)_2px,transparent_2px)] bg-[size:100px_100px]" />
      </div>

      <div className="absolute top-[300px] flex gap-12 z-10">
        <motion.div
          className="relative w-48 h-48 rounded-3xl bg-[#0F172A] border-4 border-[#2F6FED] flex items-center justify-center drop-shadow-[0_0_30px_rgba(47,111,237,0.4)]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <Clock size={80} color="#2F6FED" />
        </motion.div>

        <motion.div
          className="w-48 h-48 rounded-3xl bg-[#0F172A] border-4 border-[#10B981] flex items-center justify-center drop-shadow-[0_0_30px_rgba(16,185,129,0.4)]"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          <Activity size={90} color="#10B981" />
        </motion.div>
      </div>

      {/* Glucose Line Animation */}
      <div className="absolute top-[550px] w-[800px] h-[300px] z-10">
         <svg viewBox="0 0 800 300" className="w-full h-full overflow-visible">
           <motion.path
             d="M 0 150 Q 100 150 200 50 Q 300 -50 400 150 T 800 150"
             fill="none"
             stroke="#f97316"
             strokeWidth="12"
             strokeLinecap="round"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 2, ease: "easeInOut" }}
           />
           <motion.path
             d="M 400 150 L 800 150"
             fill="none"
             stroke="#10B981"
             strokeWidth="16"
             strokeLinecap="round"
             initial={{ pathLength: 0, opacity: 0 }}
             animate={{ pathLength: 1, opacity: 1 }}
             transition={{ duration: 1.5, delay: 2, ease: "easeInOut" }}
           />
         </svg>
      </div>

      {/* Text Content */}
      <div 
        className="absolute w-full px-16 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 120 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[80px] font-bold uppercase tracking-widest font-display drop-shadow-md leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          Stabilize
          <span className="text-[#10B981] block mt-4 text-[100px]">Blood Sugar</span>
        </motion.h2>
      </div>

    </motion.div>
  );
}
