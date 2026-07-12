import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/swoosh.mp3`} preload="auto" />
      
      {/* Background Layer: Parallax silhouette walking */}
      <motion.div 
        className="absolute bottom-60 w-[200%] h-64 opacity-10 pointer-events-none"
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{ duration: 15, ease: "linear", repeat: Infinity }}
      >
         <div className="w-full h-full flex justify-around items-end pb-4 border-b border-white/20">
            {/* Simple CSS silhouette representation */}
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-24 h-48 bg-white rounded-t-full relative">
                 <div className="absolute -top-12 left-6 w-12 h-12 bg-white rounded-full"></div>
              </div>
            ))}
         </div>
      </motion.div>

      {/* Visual content: Rising Line Graph */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-end w-full max-w-[85%] h-[40%] mb-40 border-l-4 border-b-4 border-white/20 p-8"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Sweet Spot Highlight Box */}
        <motion.div 
          className="absolute bottom-0 left-[60%] w-[15%] h-[80%] bg-[#10B981]/20 border-2 border-[#10B981] rounded-t-lg z-0"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "80%", opacity: 1 }}
          transition={{ duration: 1, delay: 2, ease: "easeOut" }}
        >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#10B981] text-[#0F172A] px-4 py-1 rounded-full font-bold whitespace-nowrap text-xl shadow-[0_0_15px_rgba(16,185,129,0.5)]">
               SWEET SPOT
            </div>
        </motion.div>

        {/* The Graph Line */}
        <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
           <motion.path 
             d="M 0 90 Q 20 85, 40 60 T 60 20 T 100 15"
             fill="none"
             stroke="#2F6FED"
             strokeWidth="3"
             strokeLinecap="round"
             initial={{ pathLength: 0 }}
             animate={{ pathLength: 1 }}
             transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
           />
           {/* Markers */}
           <motion.circle cx="0" cy="90" r="2" fill="#white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
           <motion.circle cx="60" cy="20" r="3" fill="#10B981" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2, type: "spring" }} />
           <motion.circle cx="100" cy="15" r="2" fill="#white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} />
        </svg>

        {/* X-Axis Labels */}
        <div className="absolute -bottom-12 left-0 w-full flex justify-between text-white/60 font-bold text-2xl">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>2k</motion.span>
          <motion.span className="text-[#10B981] drop-shadow-md z-20" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 }}>6k-7.5k</motion.span>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>10k</motion.span>
        </div>
        {/* Y-Axis Label */}
        <div className="absolute -left-16 bottom-1/2 -translate-y-1/2 -rotate-90 text-white/60 font-bold text-2xl tracking-widest whitespace-nowrap">
           BENEFITS
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="absolute bottom-20 w-full px-12 text-center z-20">
        <motion.p
          className="text-white text-4xl font-bold leading-relaxed font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.5 }}
        >
          Research suggests health benefits begin <br/>
          <span className="text-[#2F6FED]">well below 10,000 steps</span> for many adults...
        </motion.p>
        <motion.p
          className="text-[#10B981] text-5xl font-black leading-tight mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 5, type: "spring" }}
        >
          ...with gains starting around 6,000 to 7,500 steps before leveling off.
        </motion.p>
      </div>

    </motion.div>
  );
}
