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

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />
      
      {/* Background noise/texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Visual content: 3000 steps emphasis */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full mb-20">
         <motion.div
            className="flex items-center gap-6"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
         >
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
               <motion.div 
                 className="w-16 h-16 border-t-4 border-r-4 border-[#2F6FED] rounded-tr-xl rotate-45"
                 animate={{ y: [-5, 5, -5] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               />
            </div>
            <div className="text-[120px] font-black text-white tracking-tighter tabular-nums drop-shadow-2xl">
               3,000
            </div>
         </motion.div>
         <motion.div
            className="text-4xl font-bold text-[#2F6FED] uppercase tracking-widest mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
         >
            Steps a day
         </motion.div>

         {/* Crossed out "Perfection" */}
         <motion.div 
            className="mt-20 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
         >
            <span className="text-[80px] font-black text-white/40 uppercase tracking-tight">Perfection</span>
            <motion.div 
               className="absolute top-1/2 left-[-10%] w-[120%] h-4 bg-[#f97316] rotate-[-5deg]"
               initial={{ scaleX: 0, transformOrigin: "left" }}
               animate={{ scaleX: 1 }}
               transition={{ duration: 0.5, delay: 2.2, ease: "easeOut" }}
            />
         </motion.div>
      </div>

      {/* Text Content */}
      <div className="absolute bottom-40 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-5xl font-bold leading-tight font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          If you're only getting 3,000 steps a day, <br/>
          <motion.span 
            className="text-[#f97316] block mt-6 text-6xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 3.5, type: "spring" }}
          >
            don't chase perfection.
          </motion.span> 
        </motion.p>
      </div>

    </motion.div>
  );
}
