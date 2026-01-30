import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MapPin, Download, Copy, Globe, ChevronDown, CheckCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Toast from './Toast';

export default function Sidebar({ profile }) {
  const [showContact, setShowContact] = useState(false);
  const [lang, setLang] = useState('en'); // 'en' or 'ar'
  const toastRef = useRef();

  const t = profile.translations[lang] || profile.translations['en'];

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    toastRef.current.add("Email copied to clipboard!", "success");
  };

  return (
    <aside className="
      w-full md:w-[320px] md:h-[calc(100vh-2rem)] 
      md:sticky md:top-4
      flex-shrink-0 z-40
    ">
      <Toast ref={toastRef} />
      
      <div className="glass-panel h-full flex flex-col relative overflow-hidden transition-colors duration-300">
        
        {/* Header Section */}
        <div className="p-6 md:p-8 flex flex-col items-center text-center border-b border-white/20 dark:border-slate-800/50">
          <div className="relative mb-4 group">
             <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-emerald-500">
               <div className="w-full h-full rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
                  <img 
                    src="/assets/avatar.png" 
                    alt={profile.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                  <div className="absolute inset-0 hidden items-center justify-center text-2xl font-bold bg-slate-300 dark:bg-slate-700 text-slate-500">
                    {profile.name.charAt(0)}
                  </div>
               </div>
             </div>
             <div className="absolute bottom-1 right-2 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" title={profile.availability}></div>
          </div>
          
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">{profile.name}</h2>
          <p className="text-cyan-600 dark:text-cyan-400 font-medium text-sm mb-3">{profile.title}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-[200px]">
            {profile.tagline || profile.bio}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 divide-x divide-white/20 dark:divide-slate-800/50 border-b border-white/20 dark:border-slate-800/50 bg-white/30 dark:bg-slate-800/30">
          {profile.stats.map((stat, i) => (
             <div key={i} className="py-4 text-center">
                <p className="text-lg font-bold text-slate-800 dark:text-white">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
                  {lang === 'ar' ? t[Object.keys(t).find(key => t[key] === stat.label)] || stat.label : stat.label}
                </p>
             </div>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          
          {/* Action Buttons */}
          <div className="flex gap-2">
             <a 
               href="/assets/cv.pdf" 
               download 
               className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
             >
               <Download size={16} />
               {t.downloadCV}
             </a>
             <button 
               onClick={copyEmail}
               className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
               title={t.copyEmail}
             >
               <Copy size={18} />
             </button>
          </div>

          {/* Collapsible Contacts */}
          <div className="bg-white/40 dark:bg-slate-800/40 rounded-2xl overflow-hidden border border-white/20 dark:border-slate-700/50">
            <button 
              onClick={() => setShowContact(!showContact)}
              className="w-full flex items-center justify-between p-4 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-white/20 dark:hover:bg-slate-700/30 transition-colors"
            >
              <span>{t.contactMe}</span>
              <motion.div animate={{ rotate: showContact ? 180 : 0 }}>
                <ChevronDown size={16} />
              </motion.div>
            </button>
            <AnimatePresence>
              {showContact && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 space-y-3 text-sm text-slate-600 dark:text-slate-400 border-t border-white/10 dark:border-slate-700/50">
                     <div className="flex items-center gap-3">
                       <Mail size={16} className="text-cyan-500" />
                       <span className="truncate">{profile.email}</span>
                     </div>
                     <div className="flex items-center gap-3">
                       <MapPin size={16} className="text-purple-500" />
                       <span>{profile.location}</span>
                     </div>
                     <div className="flex items-center gap-3">
                       <CheckCircle size={16} className="text-emerald-500" />
                       <span>{profile.availability}</span>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-4">
            {profile.social.map(social => {
              const Icon = social.icon;
              return (
                <a 
                  key={social.name}
                  href={social.url}
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-slate-500 hover:text-cyan-600 hover:scale-110 transition-all dark:bg-slate-800/50 dark:text-slate-400 dark:hover:text-cyan-400"
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>

        </div>

        {/* Footer Settings */}
        <div className="p-4 border-t border-white/20 dark:border-slate-800/50 flex items-center justify-between bg-white/20 dark:bg-slate-800/20">
          <ThemeToggle />
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-700 transition-colors"
          >
            <Globe size={14} />
            {lang}
          </button>
        </div>

      </div>
    </aside>
  );
}
