import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene1() {
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
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />
      
      {/* Background elements */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#f97316]/15 blur-[120px]"
        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Visual content: Vintage Badge Stamp */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-[80%] aspect-square mt-20"
        initial={{ rotateY: 90, scale: 0.5, opacity: 0 }}
        animate={{ rotateY: 0, scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring", stiffness: 100, damping: 15 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-full border-[16px] border-[#f97316] flex flex-col items-center justify-center bg-[#0F172A] shadow-[0_0_80px_rgba(249,115,22,0.4)]"
        >
          {/* Inner ring */}
          <div className="absolute inset-4 rounded-full border-4 border-dashed border-[#f97316]/60"></div>
          
          <motion.div 
            className="text-[#f97316] font-black text-8xl uppercase tracking-tighter leading-none text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8, type: "spring", bounce: 0.5 }}
          >
            NOT
          </motion.div>
          <motion.div 
            className="text-white font-bold text-4xl uppercase tracking-widest mt-4 text-center px-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            Medicine
          </motion.div>
        </motion.div>
        
        {/* Grunge overlay texture simulated with CSS */}
        <div className="absolute inset-0 rounded-full mix-blend-overlay opacity-30 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiLz48cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIi8+PC9zdmc+')] pointer-events-none rounded-full" style={{ backgroundSize: '10px 10px' }}></div>
      </motion.div>

      {/* Text Content */}
      <div className="absolute bottom-40 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-5xl font-bold leading-tight font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          ...for a Japanese pedometer,
          <motion.span 
            className="text-[#f97316] block mt-4 text-6xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2, type: "spring" }}
          >
            not a medical guideline.
          </motion.span> 
        </motion.p>
      </div>

    </motion.div>
  );
}
