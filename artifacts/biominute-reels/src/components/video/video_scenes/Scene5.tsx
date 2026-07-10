import { motion } from 'framer-motion';

const SPRING_SNAPPY = { type: 'spring', stiffness: 400, damping: 30 };

export function Scene5() {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-brand-navy"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <video
        src={`${import.meta.env.BASE_URL}videos/endscreen.mp4`}
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        playsInline
        loop
      />
      <div className="absolute inset-0 bg-brand-navy/50 z-10" />

      <motion.div
        className="relative z-20 flex flex-col items-center"
        initial={{ scale: 0.6, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={SPRING_SNAPPY}
      >
        <div className="relative w-[22vw] h-[22vw] min-w-[90px] min-h-[90px]">
          <div className="absolute inset-0 bg-brand-teal rounded-full opacity-30 blur-3xl" />
          <img
            src={`${import.meta.env.BASE_URL}images/biominute-logo.png`}
            alt="BioMinute"
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        <motion.p
          className="font-body text-[2.2vh] text-brand-muted mt-[3vh] tracking-widest uppercase"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, ...SPRING_SNAPPY }}
        >
          @BioMinutesh
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
