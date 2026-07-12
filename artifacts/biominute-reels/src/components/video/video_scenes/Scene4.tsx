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
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/swoosh.mp3`} preload="auto" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-8 gap-4 p-8 opacity-10">
         {Array.from({length: 48}).map((_, i) => (
            <motion.div 
               key={i} 
               className="bg-white/20 rounded-full w-full pt-[100%]"
               initial={{ opacity: 0, scale: 0 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, delay: i * 0.02 }}
            />
         ))}
      </div>

      {/* Stacking Steps Visualization */}
      <div className="relative z-10 flex items-end justify-center w-full h-[40%] mb-32 gap-6">
         {[1, 2, 3, 4].map((bar, index) => (
            <motion.div 
               key={bar}
               className="w-24 bg-gradient-to-t from-[#2F6FED] to-[#10B981] rounded-t-2xl relative"
               initial={{ height: "10%" }}
               animate={{ height: `${20 + (index * 25)}%` }}
               transition={{ duration: 1.5, delay: 0.5 + (index * 0.3), ease: "easeOut" }}
            >
               {/* Plus indicator */}
               <motion.div 
                  className="absolute -top-16 left-1/2 -translate-x-1/2 text-3xl font-bold text-[#10B981]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + (index * 0.3) }}
               >
                  +{index > 0 ? (index * 2) + "00" : "0"}
               </motion.div>
            </motion.div>
         ))}
      </div>

      {/* Text Content */}
      <div className="absolute bottom-32 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-5xl font-bold leading-tight font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          Gradually adding a few hundred <br/>
          more steps each week...
        </motion.p>
        <motion.p
          className="text-[#10B981] text-6xl font-black leading-tight mt-8 drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 4, type: "spring" }}
        >
          matters more than hitting an arbitrary number.
        </motion.p>
      </div>

    </motion.div>
  );
}
