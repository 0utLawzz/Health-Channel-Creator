import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { BookOpen } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene5() {
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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />
      
      {/* Parallax Stars background preserved */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
         {[...Array(30)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute bg-white rounded-full"
             style={{
               width: Math.random() * 3 + 1,
               height: Math.random() * 3 + 1,
               top: `${Math.random() * 100}%`,
               left: `${Math.random() * 100}%`,
               opacity: Math.random() * 0.5 + 0.1
             }}
           />
         ))}
      </div>

      {/* Logo mark */}
      <motion.div
        className="relative z-10 w-40 h-40 mb-16 rounded-full bg-gradient-to-tr from-[#14b8a6] to-[#2F6FED] flex items-center justify-center p-1"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="w-full h-full bg-[#0F172A] rounded-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-20 h-20 text-[#14b8a6]" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>

      <motion.h2 
        className="text-white text-6xl font-black uppercase tracking-[0.2em] mb-32 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        BioMinute
      </motion.h2>

      {/* CTA Box */}
      <motion.div
        className="z-10 bg-white/5 border border-white/10 p-12 rounded-3xl backdrop-blur-sm max-w-[85%] text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h3 className="text-[#10B981] text-4xl font-bold mb-4 uppercase tracking-wider">Join the Conversation</h3>
        <p className="text-white text-5xl font-medium leading-tight">
          What time did you go to bed last night? 👇
        </p>
      </motion.div>

      {/* Citation */}
      <motion.div 
        className="absolute bottom-12 w-full px-12 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="flex items-start gap-4 text-white/50 text-xl font-medium">
          <BookOpen className="shrink-0 mt-1" size={24} />
          <p className="leading-relaxed">
            Source: Watson NF et al. (2015), Sleep — AASM/SRS Recommended Sleep Duration Consensus
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
