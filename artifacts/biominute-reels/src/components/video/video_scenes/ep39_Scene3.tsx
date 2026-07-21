import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { CheckCircle, XCircle, Droplets, Clock } from 'lucide-react';
import { BOTTOM_SAFE_ZONE_PX } from '@/lib/video';

const BASE_URL = import.meta.env.BASE_URL ?? '/';
const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 } as const;
const SPRING_SMOOTH = { type: 'spring', stiffness: 120, damping: 25 } as const;

export function Scene3() {
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
      <audio ref={audioRef} src={`${BASE_URL}audio/sfx-whoosh.mp3`} preload="auto" />

      <div className="absolute top-[185px] flex flex-col items-center gap-6 z-10 w-full px-10">
        <motion.div
          className="bg-[#10b981]/10 border border-[#10b981]/30 px-8 py-4 rounded-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SMOOTH }}
        >
          <span className="text-[#10b981] font-display font-bold text-[22px] uppercase tracking-wider">The Balanced Take</span>
        </motion.div>

        {/* Two columns: supported vs not supported */}
        <div className="flex gap-4 w-full">
          {/* Supported */}
          <motion.div
            className="flex-1 rounded-[24px] p-5 flex flex-col items-center gap-3 border"
            style={{ backgroundColor: '#10b98118', borderColor: '#10b98145' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, ...SPRING_SNAPPY }}
          >
            <div className="w-[58px] h-[58px] rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#10b98120', border: '3px solid #10b98140' }}>
              <CheckCircle size={30} color="#10b981" strokeWidth={1.8} />
            </div>
            <span className="text-[#10b981] font-display font-bold text-[20px] uppercase text-center">Short-term boost</span>
            <span className="text-[#94a3b8] font-body text-[16px] text-center">Alertness, mood, energy</span>
          </motion.div>

          {/* Not supported */}
          <motion.div
            className="flex-1 rounded-[24px] p-5 flex flex-col items-center gap-3 border"
            style={{ backgroundColor: '#33415530', borderColor: '#64748b45' }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7, ...SPRING_SNAPPY }}
          >
            <div className="w-[58px] h-[58px] rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#f9731620', border: '3px solid #f9731640' }}>
              <XCircle size={30} color="#f97316" strokeWidth={1.8} />
            </div>
            <span className="text-[#f97316] font-display font-bold text-[20px] uppercase text-center">Big claims</span>
            <span className="text-[#94a3b8] font-body text-[16px] text-center">Fat loss, super immunity</span>
          </motion.div>
        </div>

        {/* Resilience over time */}
        <motion.div
          className="bg-[#1e293b] border border-[#334155] rounded-[28px] px-8 py-5 flex items-center gap-5 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, ...SPRING_SMOOTH }}
        >
          <div className="w-[58px] h-[58px] rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#2F6FED20', border: '3px solid #2F6FED40' }}>
            <Clock size={30} color="#2F6FED" strokeWidth={1.8} />
          </div>
          <div>
            <p className="font-display font-bold text-[22px] uppercase leading-tight text-[#2F6FED]">May build stress resilience</p>
            <p className="text-[#94a3b8] font-body text-[19px] leading-snug mt-1">Regular cold exposure can help some people adapt over time — but it is optional, not essential</p>
          </div>
        </motion.div>
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
          One Option
          <motion.span
            className="text-[#14b8a6] block mt-2 drop-shadow-md"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, ...SPRING_SNAPPY }}
          >
            Among Many
          </motion.span>
        </motion.h2>
      </div>
    </motion.div>
  );
}
