import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, Moon, Sun, Monitor } from 'lucide-react';

export default function CommandPalette({ isOpen, onClose, navItems, onNavigate, theme, onToggleTheme }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Filter actions based on query
  const filteredNavItems = navItems.filter(item => 
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const actions = [
    { 
      id: 'theme', 
      label: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`, 
      icon: theme === 'dark' ? Sun : Moon,
      action: onToggleTheme
    }
  ];

  const filteredActions = actions.filter(action =>
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  const allItems = [...filteredNavItems, ...filteredActions];

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % allItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + allItems.length) % allItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = allItems[selectedIndex];
        if (selected) {
          if (selected.action) {
            selected.action();
          } else {
            onNavigate(selected.id);
          }
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, allItems, onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-white/20 dark:border-slate-700 overflow-hidden"
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-slate-100 dark:border-slate-800">
            <Search className="text-slate-400" size={20} />
            <input 
              ref={inputRef}
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or search..."
              className="flex-1 bg-transparent text-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
            <div className="hidden md:flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs text-slate-500 font-mono">ESC</span>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[300px] overflow-y-auto p-2">
            {allItems.length === 0 ? (
              <div className="p-4 text-center text-slate-500 text-sm">No results found.</div>
            ) : (
              <div className="space-y-1">
                {getAllSections(filteredNavItems, filteredActions).map((section, idx) => (
                   section.items.length > 0 && (
                     <div key={idx}>
                       <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                         {section.title}
                       </div>
                       {section.items.map((item) => {
                         const globalIndex = allItems.indexOf(item);
                         const isSelected = globalIndex === selectedIndex;
                         const Icon = item.icon || Command;
                         
                         return (
                           <button
                             key={item.id || item.label}
                             onClick={() => {
                               if (item.action) item.action();
                               else onNavigate(item.id);
                               onClose();
                             }}
                             onMouseEnter={() => setSelectedIndex(globalIndex)}
                             className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                               isSelected 
                                 ? 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400' 
                                 : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                             }`}
                           >
                             <div className="flex items-center gap-3">
                               <Icon size={18} className={isSelected ? 'text-cyan-500' : 'text-slate-400'} />
                               <span>{item.label}</span>
                             </div>
                             {isSelected && <ArrowRight size={16} className="text-cyan-500" />}
                           </button>
                         );
                       })}
                     </div>
                   )
                ))}
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><kbd className="font-sans px-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded shadow-sm">↑↓</kbd> to navigate</span>
            <span className="flex items-center gap-1"><kbd className="font-sans px-1 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded shadow-sm">↵</kbd> to select</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function getAllSections(nav, actions) {
  return [
    { title: "Navigation", items: nav },
    { title: "Actions", items: actions }
  ];
}
