import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { CalendarX } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene3() {
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
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />
      
      {/* Visual content: Calendar grid */}
      <div className="relative z-10 w-full px-20 mb-40">
        <div className="grid grid-cols-7 gap-6">
          {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
            <div key={day + i} className="text-[#14b8a6] text-4xl font-bold text-center mb-4">{day}</div>
          ))}
          
          {[...Array(7)].map((_, i) => {
            const isWeekend = i >= 5;
            return (
              <motion.div
                key={i}
                className={`aspect-square rounded-2xl flex items-center justify-center border-4 ${
                  isWeekend ? "border-[#f97316] bg-[#f97316]/10" : "border-[#14b8a6]/30 bg-transparent"
                }`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {isWeekend && (
                  <motion.div
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ delay: 1 + (i-5) * 0.3, type: "spring" }}
                  >
                    <CalendarX size={80} className="text-[#f97316]" />
                  </motion.div>
                )}
                {!isWeekend && (
                  <motion.div
                    className="w-full h-full bg-[#14b8a6]/20 rounded-xl"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0.5 }}
                    style={{ transformOrigin: 'bottom' }}
                    transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-32 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          You also <span className="text-[#f97316]">can't fully make up</span> lost sleep over a weekend.
        </motion.p>
      </div>
    </motion.div>
  );
}
