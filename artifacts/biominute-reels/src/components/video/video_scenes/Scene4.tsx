import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Activity, BookOpen, Coffee, Droplet, ArrowRight } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene4() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-pop.mp3`} preload="auto" />

      {/* DNA/Pulse motif background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
         <Activity size={800} color="#10B981" strokeWidth={1} />
      </div>

      <div className="absolute top-[250px] z-10 w-full px-20">
         <motion.div
           className="w-full bg-[#1e293b]/80 backdrop-blur-md rounded-[40px] border border-[#334155] p-12 flex items-center justify-center gap-8 shadow-2xl relative overflow-hidden"
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.2, ...SPRING_SNAPPY }}
         >
           {/* Orange accent dot */}
           <div className="absolute top-6 right-8 w-4 h-4 bg-[#f97316] rounded-full" />
           
           <motion.div 
             className="flex flex-col items-center"
             initial={{ x: -20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 0.8, ...SPRING_SMOOTH }}
           >
             <Droplet size={80} color="#14b8a6" fill="#14b8a6" />
             <span className="text-[#14b8a6] font-display font-bold uppercase tracking-widest mt-4 text-[24px]">Water 1st</span>
           </motion.div>

           <motion.div
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ delay: 1.2, ...SPRING_SNAPPY }}
           >
             <ArrowRight size={60} color="#64748b" />
           </motion.div>

           <motion.div 
             className="flex flex-col items-center"
             initial={{ x: 20, opacity: 0 }}
             animate={{ x: 0, opacity: 1 }}
             transition={{ delay: 1.6, ...SPRING_SMOOTH }}
           >
             <Coffee size={80} color="#2F6FED" />
             <span className="text-[#2F6FED] font-display font-bold uppercase tracking-widest mt-4 text-[24px]">Coffee 2nd</span>
           </motion.div>
         </motion.div>
      </div>

      <div 
        className="absolute w-full px-16 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 220 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[65px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
        >
          One Small Swap For<br/>
          <span className="text-[#10B981] text-[85px] mt-6 block drop-shadow-md">An Extra Edge</span>
        </motion.h2>
      </div>

      {/* Citation - Must be within safe zone, final 1-2s */}
      <motion.div 
        className="absolute w-full px-12 z-30 flex justify-center"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 60 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
      >
        <div className="flex items-center gap-4 text-[#94a3b8] text-[22px] font-medium bg-[#0F172A]/90 px-6 py-4 rounded-xl backdrop-blur-sm border border-white/10 shadow-lg">
          <BookOpen className="shrink-0" size={28} />
          <p className="leading-relaxed text-left">
            Source: Popkin BM et al. (2010), Nutrition Reviews — Water, hydration
          </p>
        </div>
      </motion.div>

    </motion.div>
  );
}
