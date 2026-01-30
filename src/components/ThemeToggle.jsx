import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500
        ${isDark ? 'bg-slate-700' : 'bg-slate-200'}
      `}
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`
          w-6 h-6 rounded-full shadow-sm transform flex items-center justify-center
          ${isDark ? 'bg-slate-900 translate-x-6' : 'bg-white translate-x-0'}
        `}
      >
        {isDark ? (
          <Moon size={14} className="text-cyan-400" />
        ) : (
          <Sun size={14} className="text-amber-500" />
        )}
      </motion.div>
    </button>
  );
}
