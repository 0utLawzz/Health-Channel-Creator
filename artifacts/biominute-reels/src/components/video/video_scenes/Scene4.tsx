import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene4() {
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
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/swoosh.mp3`} preload="auto" />

      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-[#14b8a6]/20 to-transparent"
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 2, ease: "easeOut" }}
      />

      <div className="relative z-10 w-full px-16 -mt-20">
        <motion.div 
          className="relative w-full aspect-square bg-[#1e293b] rounded-[3rem] border border-white/10 p-12 overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        >
          {/* Animated Muscle/DNA abstract background */}
          <motion.svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path 
              d="M0,50 Q25,20 50,50 T100,50" 
              fill="none" 
              stroke="#f97316" 
              strokeWidth="4"
              initial={{ pathLength: 0, pathOffset: 1 }}
              animate={{ pathLength: 1, pathOffset: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.path 
              d="M0,50 Q25,80 50,50 T100,50" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="4"
              initial={{ pathLength: 0, pathOffset: 1 }}
              animate={{ pathLength: 1, pathOffset: 0 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </motion.svg>

          {/* Central Scales Graphic */}
          <div className="relative h-full flex flex-col items-center justify-center z-10">
            <motion.div 
              className="text-white text-5xl font-black mb-8 text-center uppercase tracking-widest"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              The Formula
            </motion.div>
            
            <div className="flex items-center justify-center w-full gap-8">
              <motion.div 
                className="flex-1 bg-[#0F172A] rounded-2xl p-8 border-2 border-[#2F6FED]"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <div className="text-[#2F6FED] font-bold text-3xl mb-2 text-center">TOTAL</div>
                <div className="text-white/50 text-xl text-center">Most Important</div>
              </motion.div>
              
              <div className="text-white/30 text-5xl font-black">+</div>
              
              <motion.div 
                className="flex-1 bg-[#0F172A] rounded-2xl p-8 border-2 border-[#f97316]"
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
              >
                <div className="text-[#f97316] font-bold text-3xl mb-2 text-center">TIMING</div>
                <div className="text-white/50 text-xl text-center">The Advantage</div>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-12 bg-[#10b981]/20 text-[#10b981] px-8 py-4 rounded-full text-3xl font-bold tracking-wider uppercase border border-[#10b981]/50"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 2.5, type: "spring", bounce: 0.6 }}
            >
              Max Muscle Synthesis
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-32 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-5xl font-bold leading-tight font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Total protein still matters most — <br/>
          <motion.span 
            className="text-[#f97316] block mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            but timing gives you an edge
          </motion.span>
        </motion.p>
      </div>
      
      {/* Citation */}
      <motion.div 
        className="absolute bottom-8 left-8 text-white/40 text-xl font-mono text-left max-w-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        Specially for strength training
      </motion.div>
    </motion.div>
  );
}
