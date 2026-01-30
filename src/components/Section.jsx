import { motion } from 'framer-motion';

export default function Section({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay }}
      className={`p-6 md:p-10 ${className}`}
    >
      {children}
    </motion.section>
  );
}
