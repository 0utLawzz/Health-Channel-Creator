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
        src={`${BASE_URL}images/episode-thumbnail.png`}
        alt="Episode Thumbnail"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
    </motion.div>
  );
}
