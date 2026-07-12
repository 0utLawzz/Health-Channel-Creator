import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { BatteryWarning, AlertTriangle } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene2() {
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/swoosh.mp3`} preload="auto" />
      
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#14b8a6 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Visual content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full mb-32">
        <motion.div
          className="relative w-[600px] h-[600px] rounded-full border-4 border-[#14b8a6]/20 flex items-center justify-center bg-[#0F172A]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            className="absolute top-[-40px] bg-[#0F172A] px-8 border-4 border-[#2F6FED] rounded-full drop-shadow-[0_0_20px_rgba(47,111,237,0.5)] z-20"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            <span className="text-[#2F6FED] text-5xl font-black uppercase tracking-widest whitespace-nowrap leading-loose block">7-9 hrs</span>
          </motion.div>

          <motion.div 
            className="flex flex-col items-center justify-center gap-8 text-[#f97316]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 100 }}
          >
            <BatteryWarning size={200} strokeWidth={1} />
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-4 text-4xl font-bold uppercase tracking-widest bg-[#f97316]/10 px-8 py-4 rounded-full border border-[#f97316]/30"
            >
              <AlertTriangle size={40} /> Under 7 Hours
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-32 w-full px-12 text-center z-20">
        <motion.p
          className="text-white text-5xl font-medium leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          Consistently sleeping <span className="text-[#f97316] font-bold">under 7 hours</span> is linked with reduced focus, slower reaction time, and greater long-term health risk.
        </motion.p>
      </div>

    </motion.div>
  );
}
