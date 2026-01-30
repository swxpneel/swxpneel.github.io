import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    const toggleVisibility = () => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        if (window.scrollY > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
        timeoutId = null;
      }, 150); // Throttle wait time
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/80 dark:bg-white/90 text-white dark:text-slate-900 shadow-xl backdrop-blur-sm border border-white/20 hover:scale-110 transition-transform"
          aria-label="Back to top"
        >
          <ArrowUp size={20} className="stroke-[3]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
