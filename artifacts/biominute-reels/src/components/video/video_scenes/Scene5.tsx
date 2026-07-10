import { motion } from 'framer-motion';

const SPRING_SNAPPY = { type: 'spring' as const, stiffness: 400, damping: 30 };

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
      <div className="absolute inset-0 bg-brand-navy/80 z-10" />

      <motion.div
        className="relative z-20 flex flex-col items-center w-full px-[8vw]"
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={SPRING_SNAPPY}
      >
        <div className="relative w-[25vw] h-[25vw] min-w-[100px] min-h-[100px]">
          <div className="absolute inset-0 bg-brand-teal rounded-full opacity-40 blur-3xl" />
          <img
            src={`${import.meta.env.BASE_URL}images/biominute-logo.png`}
            alt="BioMinute"
            className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        <motion.div
          className="mt-[8vh] w-full p-[4vh] rounded-3xl bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur-md shadow-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ...SPRING_SNAPPY }}
        >
          <p className="font-display font-bold text-[3.5vh] text-brand-text leading-tight drop-shadow-md">
            Do you walk after meals, or sit right down?
          </p>
        </motion.div>
        
        <motion.p
          className="font-body text-[2.5vh] text-brand-teal mt-[6vh] tracking-[0.2em] uppercase font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          @BioMinute
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
