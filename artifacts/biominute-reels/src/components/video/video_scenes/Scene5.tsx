import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

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
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />

      {/* Background Particles/Noise */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: `radial-gradient(circle, #2F6FED 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 w-full px-16 flex flex-col items-center">
        {/* Logo Lockup */}
        <motion.div
          className="flex items-center gap-6 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        >
          {/* DNA/Heartbeat Motif Logo */}
          <div className="relative w-24 h-24 bg-[#14b8a6] rounded-3xl flex items-center justify-center rotate-3 overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.3)]">
            <svg className="w-16 h-16 text-white -rotate-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-6xl font-black tracking-tight leading-none">BioMinute</span>
            <span className="text-[#14b8a6] text-2xl font-bold tracking-[0.2em] uppercase mt-1">Science Simplified</span>
          </div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          className="w-full bg-[#1e293b] rounded-[3rem] p-12 border-2 border-white/10 text-center shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, type: "spring", bounce: 0.4 }}
        >
          {/* Accent glow behind CTA */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[#f97316]/10 blur-[100px] pointer-events-none" />

          <motion.div 
            className="text-[#f97316] font-bold text-3xl uppercase tracking-widest mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Question of the day
          </motion.div>
          
          <motion.h2 
            className="text-white text-5xl font-black leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
          >
            Which meal has the most protein for you right now?
          </motion.h2>

          <motion.div
            className="mt-10 flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
          >
            <div className="bg-[#0F172A] text-white px-8 py-4 rounded-full text-2xl font-bold border border-white/20">💬 Drop a comment</div>
          </motion.div>
        </motion.div>
      </div>

    </motion.div>
  );
}
