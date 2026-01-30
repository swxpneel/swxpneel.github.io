import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { User, FileText, Briefcase, PenTool, Mail, Loader2 } from 'lucide-react';

import Sidebar from './components/Sidebar';
import Background from './components/Background';
import Tabs from './components/Tabs';
import CommandPalette from './components/CommandPalette';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import { profileData } from './data/profile';

// Lazy Load Pages
const About = lazy(() => import('./pages/About'));
const Resume = lazy(() => import('./pages/Resume'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Blog = lazy(() => import('./pages/Blog'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  const [activePage, setActivePage] = useState('about');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const shouldReduceMotion = useReducedMotion();

  const navItems = [
    { id: 'about', label: 'About', icon: User },
    { id: 'resume', label: 'Resume', icon: FileText },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'blog', label: 'Blog', icon: PenTool },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  // Theme Sync
  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    }
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Command Palette: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }

      // Tab Switching: 1-5 (Only if focused on body/not input)
      if (
        !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && 
        !e.ctrlKey && !e.metaKey && !e.altKey
      ) {
        const key = parseInt(e.key);
        if (key >= 1 && key <= 5) {
          const targetTab = navItems[key - 1];
          if (targetTab) {
            window.location.hash = targetTab.id;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navItems]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      const validPage = navItems.find(item => item.id === hash);
      if (validPage) {
        setActivePage(validPage.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        window.location.hash = 'about'; 
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [navItems]);

  const handleTabChange = (id) => {
    window.location.hash = id;
  };

  const renderPage = () => {
    switch (activePage) {
      case 'about': return <About profile={profileData} />;
      case 'resume': return <Resume profile={profileData} />;
      case 'portfolio': return <Portfolio profile={profileData} />;
      case 'blog': return <Blog profile={profileData} />;
      case 'contact': return <Contact profile={profileData} />;
      default: return <About profile={profileData} />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.02 }
  };

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-900 dark:selection:text-cyan-100">
      
      <Background />
      <ScrollProgress />
      <BackToTop />
      
      <CommandPalette 
        isOpen={isPaletteOpen} 
        onClose={() => setIsPaletteOpen(false)} 
        navItems={navItems}
        onNavigate={handleTabChange}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Sticky Sidebar */}
        <Sidebar profile={profileData} />

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Header */}
          <header className="sticky top-4 z-30 mb-8 flex justify-center md:justify-start">
             <Tabs 
                tabs={navItems} 
                activeTab={activePage} 
                onChange={handleTabChange} 
             />
          </header>

          {/* Content Panel */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={{ duration: 0.3 }}
                className="min-h-[50vh]"
              >
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-[50vh]">
                    <Loader2 className="animate-spin text-cyan-500" size={48} />
                  </div>
                }>
                  {renderPage()}
                </Suspense>
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="mt-20 text-center text-slate-500 dark:text-slate-500 text-sm">
             <p>© {new Date().getFullYear()} {profileData.name}. Designed with 💜 & ✨</p>
             <p className="mt-2 text-xs opacity-60">Press <kbd className="font-sans px-1 bg-slate-200 dark:bg-slate-800 rounded">Ctrl+K</kbd> for command palette</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
