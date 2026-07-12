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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />
      
      {/* Background Pulse */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#2F6FED]/20 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Logo & Branding */}
      <motion.div 
        className="relative z-10 flex flex-col items-center mb-32"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
      >
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#10B981] to-[#2F6FED] p-1 flex items-center justify-center shadow-[0_0_40px_rgba(47,111,237,0.5)]">
           <div className="w-full h-full bg-[#0F172A] rounded-[22px] flex items-center justify-center">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <defs>
                   <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor="#10B981" />
                     <stop offset="100%" stopColor="#2F6FED" />
                   </linearGradient>
                 </defs>
                 <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
           </div>
        </div>
        <motion.div 
           className="text-white text-5xl font-black mt-8 tracking-widest uppercase"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
        >
           BioMinute
        </motion.div>
      </motion.div>

      {/* CTA Prompt */}
      <motion.div
        className="absolute bottom-60 w-full px-16 text-center z-20"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, type: "spring" }}
      >
         <div className="inline-block bg-[#f97316] text-white px-10 py-5 rounded-full text-4xl font-bold shadow-[0_10px_30px_rgba(249,115,22,0.3)]">
            How many steps do you average each day? 👇
         </div>
      </motion.div>

      {/* Citation End Card */}
      <motion.div
        className="absolute bottom-12 w-full text-center px-12 z-20 text-white/40 text-xl font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        Source: Paluch AZ et al. (2021), JAMA Network Open; Lee IM et al. (2019), JAMA Internal Medicine
      </motion.div>

    </motion.div>
  );
}
