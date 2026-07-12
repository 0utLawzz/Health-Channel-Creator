import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Moon } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene0() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/swoosh.mp3`} preload="auto" />
      
      {/* Parallax Stars */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
         {[...Array(50)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute bg-white rounded-full"
             style={{
               width: Math.random() * 4 + 1,
               height: Math.random() * 4 + 1,
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               opacity: Math.random() * 0.5 + 0.3
             }}
             animate={{ y: [0, -100] }}
             transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
           />
         ))}
      </div>

      {/* Moon */}
      <motion.div
        className="absolute z-10 text-[#2F6FED] drop-shadow-[0_0_30px_rgba(47,111,237,0.8)]"
        initial={{ y: 200, scale: 0.5, opacity: 0 }}
        animate={{ y: -150, scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Moon size={300} strokeWidth={1} fill="#2F6FED" fillOpacity={0.2} />
      </motion.div>

      {/* Text Content */}
      <div className="absolute bottom-48 w-full px-16 text-center z-20">
        <motion.h1
          className="text-white text-7xl font-bold uppercase tracking-widest leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Sleep isn't
          <motion.span 
            className="text-[#f97316] block mt-4 drop-shadow-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
          >
            Downtime.
          </motion.span> 
        </motion.h1>
      </div>

    </motion.div>
  );
}
