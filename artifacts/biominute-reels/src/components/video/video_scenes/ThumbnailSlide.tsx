import { motion } from 'framer-motion';

const BASE_URL = import.meta.env.BASE_URL ?? '/';

export function ThumbnailSlide() {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full bg-[#0F172A]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      <img
        src={`${BASE_URL}images/episode-thumbnail-ep3.png`}
        alt="Episode Thumbnail Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        draggable={false}
      />
      
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/80 via-transparent to-[#0F172A]/90" />

      {/* Title overlay to match thumbnail spec */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-40 px-16 text-center">
        <h1 className="text-white text-[80px] font-black leading-tight tracking-tight drop-shadow-2xl">
          Are You Eating<br />
          Protein at the<br />
          <span className="text-[#f97316]">Wrong Time?</span>
        </h1>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </motion.div>
  );
}
