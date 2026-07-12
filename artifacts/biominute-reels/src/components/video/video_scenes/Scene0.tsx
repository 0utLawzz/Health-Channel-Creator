import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

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
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/swoosh.mp3`} preload="auto" />
      
      {/* Background elements */}
      <motion.div
        className="absolute top-[-10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#2F6FED]/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], x: [0, -50, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-[#10b981]/10 blur-[100px]"
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Visual content: Big plate with meat/protein graphic */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-[80%] aspect-square mb-20"
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-[#14b8a6]/30 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[90%] h-[90%] rounded-full border border-dashed border-[#10b981]/50" />
        </motion.div>
        
        {/* Abstract protein chunk */}
        <motion.div 
          className="relative w-48 h-48 bg-gradient-to-br from-[#f97316] to-[#ea580c] rounded-3xl"
          style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, 5, -5, 0] }}
          transition={{ 
            scale: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1], delay: 0.5 },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Highlight */}
          <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full blur-sm" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-8 bg-[#0F172A] border-2 border-[#f97316] px-8 py-3 rounded-full text-[#f97316] font-bold text-4xl tracking-wider"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1, type: "spring" }}
        >
          HOW MUCH?
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <div className="absolute bottom-40 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-5xl font-bold leading-tight font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Most people only think about <br/>
          <motion.span 
            className="text-[#f97316] block mt-4 text-6xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
          >
            how much protein
          </motion.span> 
          they eat.
        </motion.p>
      </div>

    </motion.div>
  );
}
