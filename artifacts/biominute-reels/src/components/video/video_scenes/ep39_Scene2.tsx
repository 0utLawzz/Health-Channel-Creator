import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Gauge, Flame, Shield, AlertTriangle } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene2() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [gauge, setGauge] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }
    const t = setInterval(() => {
      setGauge((v) => (v < 90 ? v + 10 : 90));
    }, 200);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A] flex flex-col items-center justify-center overflow-hidden font-body"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-sparkle.mp3`} preload="auto" />

      <div className="absolute top-[180px] flex flex-col items-center gap-5 z-10 w-full px-10">
        <motion.div
          className="bg-[#f97316]/10 border border-[#f97316]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <span className="text-[#f97316] font-display font-bold text-[22px] uppercase tracking-wider">Separate the Hype</span>
        </motion.div>

        {/* Alertness gauge — spikes up */}
        <motion.div
          className="w-full bg-[#1e293b] border border-[#334155] rounded-[28px] px-8 py-6 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, ...SPRING_SMOOTH }}
        >
          <div className="flex items-center gap-3">
            <Gauge size={28} color="#2F6FED" strokeWidth={1.8} />
            <span className="text-[#94a3b8] font-display font-bold text-[20px] uppercase tracking-wide">Alertness</span>
          </div>
          <div className="w-full h-6 bg-[#0F172A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#2F6FED] to-[#14b8a6]"
              initial={{ width: '0%' }}
              animate={{ width: `${gauge}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <span className="text-[#2F6FED] font-display font-bold text-[24px]">Well supported</span>
        </motion.div>

        {/* Two myth bubbles with caution marks */}
        <div className="flex gap-4 w-full">
          {[
            { icon: Flame, color: '#f97316', label: 'Major fat loss', status: 'Weak evidence' },
            { icon: Shield, color: '#f97316', label: 'Super immunity', status: 'Weak evidence' },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-[24px] p-5 flex flex-col items-center gap-3 border"
                style={{ backgroundColor: '#33415530', borderColor: '#64748b45' }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2 + i * 0.2, ...SPRING_SNAPPY }}
              >
                <div className="relative">
                  <Icon size={44} color={item.color} strokeWidth={1.8} />
                  <motion.div
                    className="absolute -top-2 -right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.0 + i * 0.2, ...SPRING_SNAPPY }}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#f97316]/20 border-2 border-[#f97316] flex items-center justify-center">
                      <AlertTriangle size={14} color="#f97316" strokeWidth={2.5} />
                    </div>
                  </motion.div>
                </div>
                <span className="text-[#f8fafc] font-display font-bold text-[18px] uppercase text-center leading-tight">{item.label}</span>
                <span className="text-[#64748b] font-body text-[16px] text-center">{item.status}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div
        className="absolute w-full px-12 text-center z-20"
        style={{ bottom: BOTTOM_SAFE_ZONE_PX + 80 }}
      >
        <motion.h2
          className="text-[#f8fafc] text-[50px] font-bold uppercase tracking-wider font-display leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Some Claims
          <motion.span
            className="text-[#f97316] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, ...SPRING_SNAPPY }}
          >
            Are Overstated
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
