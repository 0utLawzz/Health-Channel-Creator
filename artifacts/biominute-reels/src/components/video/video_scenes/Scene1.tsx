import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Brain, Activity, Zap, RefreshCw } from 'lucide-react';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function Scene1() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/pop.mp3`} preload="auto" />
      
      {/* Background glow */}
      <motion.div
        className="absolute w-[80vw] h-[80vw] rounded-full bg-[#10B981]/10 blur-[120px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex items-center justify-center mb-40">
        {/* Brain */}
        <motion.div
          className="relative text-[#10B981] drop-shadow-[0_0_40px_rgba(16,185,129,0.5)]"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Brain size={350} strokeWidth={1} />
          
          {/* Emerald repair particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full bg-[#10B981] shadow-[0_0_10px_#10B981]"
              style={{
                top: `${40 + Math.random() * 40}%`,
                left: `${30 + Math.random() * 40}%`,
              }}
              initial={{ scale: 0, opacity: 0, y: 0 }}
              animate={{ 
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                y: -50 - Math.random() * 50
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </motion.div>

        {/* Orbiting Icons */}
        {[
          { Icon: Activity, label: "Memory", delay: 0, color: "#2F6FED" },
          { Icon: Zap, label: "Repair", delay: 2, color: "#f97316" },
          { Icon: RefreshCw, label: "Hormones", delay: 4, color: "#14b8a6" },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            initial={{ rotate: i * 120, opacity: 0, scale: 0 }}
            animate={{ rotate: i * 120 + 360, opacity: 1, scale: 1 }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              opacity: { duration: 1, delay: 0.5 + i * 0.2 },
              scale: { duration: 1, delay: 0.5 + i * 0.2, type: "spring" }
            }}
          >
            <motion.div 
              className="mt-[-550px]"
              animate={{ rotate: -(i * 120 + 360) }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="flex flex-col items-center gap-3 bg-[#0F172A]/80 p-6 rounded-3xl border border-white/10 backdrop-blur-md">
                <item.Icon size={64} color={item.color} strokeWidth={1.5} />
                <span className="text-white text-2xl font-semibold tracking-wide uppercase">{item.label}</span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Text Content */}
      <div className="absolute bottom-32 w-full px-12 text-center z-20">
        <motion.p
          className="text-white text-5xl font-medium leading-relaxed tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          It's when your brain consolidates memory, your body repairs tissue, and hormones that regulate hunger and stress reset.
        </motion.p>
      </div>
    </motion.div>
  );
}
