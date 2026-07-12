import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

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

  const plates = [
    { label: "BREAKFAST", delay: 0.5, icon: "🍳" },
    { label: "LUNCH", delay: 1.5, icon: "🥗" },
    { label: "DINNER", delay: 2.5, icon: "🥩" },
  ];

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />
      
      <div className="flex flex-col items-center justify-center gap-12 w-full px-16 -mt-20">
        {plates.map((plate, i) => (
          <motion.div 
            key={i}
            className="flex items-center w-full gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: plate.delay, type: "spring" }}
          >
            {/* Plate Icon */}
            <motion.div 
              className="relative w-32 h-32 flex-shrink-0 bg-[#1e293b] rounded-full flex items-center justify-center border-4 border-white/10"
              animate={{ 
                boxShadow: ["0px 0px 0px rgba(16,185,129,0)", "0px 0px 30px rgba(16,185,129,0.4)", "0px 0px 0px rgba(16,185,129,0)"],
                borderColor: ["rgba(255,255,255,0.1)", "rgba(16,185,129,0.5)", "rgba(255,255,255,0.1)"]
              }}
              transition={{ duration: 2, delay: 4.5, repeat: Infinity }}
            >
              <span className="text-6xl">{plate.icon}</span>
              
              {/* Progress Ring Background */}
              <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
              </svg>
              
              {/* Progress Ring Fill */}
              <motion.svg className="absolute inset-0 w-full h-full -rotate-90 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" viewBox="0 0 100 100">
                <motion.circle 
                  cx="50" cy="50" r="46" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: plate.delay + 0.5, ease: "easeOut" }}
                />
              </motion.svg>
              
              {/* Orange Accent Dot */}
              <motion.div 
                className="absolute top-0 right-0 w-8 h-8 bg-[#f97316] rounded-full border-4 border-[#0F172A] z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: plate.delay + 1.5, type: "spring", stiffness: 300 }}
              />
            </motion.div>
            
            {/* Progress Bar & Label */}
            <div className="flex-1">
              <div className="flex justify-between items-end mb-2">
                <span className="text-white text-3xl font-bold tracking-widest">{plate.label}</span>
                <motion.span 
                  className="text-[#10b981] text-4xl font-black"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: plate.delay + 1 }}
                >
                  30g
                </motion.span>
              </div>
              <div className="h-6 w-full bg-[#1e293b] rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#14b8a6] to-[#10b981]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: plate.delay + 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-32 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-4xl font-bold leading-tight font-sans tracking-tight mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          ...try roughly <span className="text-[#10b981]">30 grams</span><br/>
          at breakfast, lunch, and dinner.
        </motion.p>
        
        <motion.div
          className="bg-[#2F6FED]/20 border-2 border-[#2F6FED] rounded-full py-4 px-10 inline-block text-white text-5xl font-black"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 5.5, type: "spring", bounce: 0.5 }}
        >
          90g TOTAL
        </motion.div>
      </div>
    </motion.div>
  );
}
