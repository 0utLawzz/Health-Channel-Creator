import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene0() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const displayCount = useTransform(rounded, (value) => value.toLocaleString());

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const controls = animate(count, 10000, { duration: 3, ease: "easeOut", delay: 0.5 });
    return controls.stop;
  }, [count]);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/swoosh.mp3`} preload="auto" />
      
      {/* Background elements */}
      <motion.div
        className="absolute top-[-10%] right-[-20%] w-[80vw] h-[80vw] rounded-full bg-[#2F6FED]/10 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], x: [0, -50, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-20%] w-[60vw] h-[60vw] rounded-full bg-[#f97316]/10 blur-[100px]"
        animate={{ scale: [1, 1.3, 1], x: [0, 50, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Hook Title Top */}
      <motion.div
        className="absolute top-32 w-full px-12 text-center z-30"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-white text-5xl font-bold uppercase tracking-widest opacity-80">
          Is 10,000 Steps
        </h1>
        <h2 className="text-[#f97316] text-6xl font-black uppercase mt-2 tracking-tight">
          Actually a Myth?
        </h2>
      </motion.div>

      {/* Visual content: Pedometer icon counting up */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-[80%] aspect-square mb-20 mt-10"
        initial={{ scale: 0.8, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
        <motion.div 
          className="absolute inset-0 rounded-[3rem] border-8 border-[#2F6FED]/40 flex flex-col items-center justify-center bg-[#0F172A]/80 shadow-[0_0_50px_rgba(47,111,237,0.3)] backdrop-blur-md"
          initial={{ rotateX: -20, rotateY: 20 }}
          animate={{ rotateX: 0, rotateY: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <div className="w-[85%] h-[85%] rounded-[2rem] border-4 border-dashed border-[#10b981]/50 flex flex-col items-center justify-center bg-black/40">
            <motion.div className="text-8xl font-mono text-white font-bold drop-shadow-lg tabular-nums tracking-tighter">
              {displayCount}
            </motion.div>
            <div className="text-[#10b981] text-3xl font-bold uppercase tracking-widest mt-4">
              Steps
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Text Content */}
      <div className="absolute bottom-32 w-full px-16 text-center z-20">
        <motion.p
          className="text-white text-5xl font-bold leading-tight font-sans tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          The 10,000 step goal started as a<br/>
          <motion.span 
            className="text-[#f97316] block mt-4 text-6xl drop-shadow-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2, type: "spring" }}
          >
            1965 marketing campaign...
          </motion.span> 
        </motion.p>
      </div>

    </motion.div>
  );
}
