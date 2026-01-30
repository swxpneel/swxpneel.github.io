import { useRef } from 'react';
import { motion } from 'framer-motion';

export default function Tabs({ tabs, activeTab, onChange }) {
  const tabsRef = useRef([]);

  const handleKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    
    if (nextIndex !== null) {
      e.preventDefault();
      tabsRef.current[nextIndex]?.focus();
    }
  };

  return (
    <div 
      role="tablist" 
      className="flex space-x-1 p-1.5 rounded-2xl glass w-fit overflow-x-auto max-w-full no-scrollbar"
      aria-label="Main Navigation"
    >
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={el => tabsRef.current[index] = el}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`
              relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap outline-none
              ${isActive ? 'text-cyan-700 dark:text-cyan-300 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <tab.icon size={18} />}
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
