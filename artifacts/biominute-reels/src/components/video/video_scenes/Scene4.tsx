import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Sun, Moon, CheckCircle2 } from 'lucide-react';

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
      className="absolute inset-0 w-full h-full overflow-hidden flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/swoosh.mp3`} preload="auto" />

      {/* Moon to Sun gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            "linear-gradient(to bottom, #0F172A, #1e3a8a)",
            "linear-gradient(to bottom, #1e3a8a, #0ea5e9)",
            "linear-gradient(to bottom, #0ea5e9, #10B981)"
          ]
        }}
        transition={{ duration: 6, ease: "linear" }}
      />
      
      {/* Sun/Moon Orbit */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-30">
        <motion.div
          className="w-[120vw] h-[120vw] rounded-full border border-white/20 relative"
          animate={{ rotate: 180 }}
          transition={{ duration: 6, ease: "linear" }}
        >
          <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 text-white">
            <Sun size={100} fill="currentColor" />
          </div>
          <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 text-white">
            <Moon size={100} fill="currentColor" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center w-full mb-32">
        {/* 7-9 hr Badge that glows */}
        <motion.div
          className="bg-[#0F172A]/80 backdrop-blur-xl px-16 py-12 rounded-[3rem] border-4 border-[#2F6FED] flex flex-col items-center gap-6 shadow-[0_0_80px_rgba(47,111,237,0.6)]"
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
        >
          <div className="flex items-center gap-4 text-[#2F6FED]">
            <CheckCircle2 size={60} strokeWidth={3} />
            <span className="text-7xl font-black uppercase tracking-widest">7-9 hrs</span>
          </div>
          <div className="text-white/80 text-3xl font-bold tracking-widest uppercase">
            Consistent Window
          </div>
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-32 w-full px-16 text-center z-30">
        <motion.p
          className="text-white text-5xl font-bold leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Prioritizing a consistent <span className="text-[#10B981]">7 to 9 hour window</span> may do more for your energy than any productivity hack.
        </motion.p>
      </div>
    </motion.div>
  );
}
