import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Card({ title, subtitle, description, tags, image, link, onClick }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="glass-panel overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-white/60 dark:hover:border-slate-600 cursor-pointer group flex flex-col h-full"
      onClick={onClick}
    >
      {image && (
        <div className="h-48 overflow-hidden bg-slate-200 dark:bg-slate-800 relative flex-shrink-0">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
               e.target.style.display = 'none';
               e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="absolute inset-0 hidden items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 font-medium">
            No Image
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
           <div>
             <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">{title}</h3>
             {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
           </div>
           {link && (
             <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors p-1" onClick={e => e.stopPropagation()}>
               <ExternalLink size={18} />
             </a>
           )}
        </div>
        
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">{description}</p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium border border-white/20 dark:border-slate-700/50">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
