import { motion } from 'framer-motion';

export default function Background() {
  return (
    <>
      <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
        {/* Animated Blobs */}
        <motion.div 
          animate={{ x: [0, 100, -100, 0], y: [0, -100, 100, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          style={{ willChange: 'transform' }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-400/20 blur-[100px] mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          animate={{ x: [0, -100, 100, 0], y: [0, 100, -100, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          style={{ willChange: 'transform' }}
          className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-purple-400/20 blur-[120px] mix-blend-multiply dark:mix-blend-screen" 
        />
        <motion.div 
          animate={{ x: [0, 50, -50, 0], y: [0, 50, -50, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          style={{ willChange: 'transform' }}
          className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] rounded-full bg-emerald-400/20 blur-[130px] mix-blend-multiply dark:mix-blend-screen" 
        />
      </div>
      <div className="noise-bg" />
    </>
  );
}
