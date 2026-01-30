import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Tag, User } from 'lucide-react';

export default function BlogModal({ isOpen, onClose, post }) {
  if (!isOpen || !post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-panel border border-white/20 dark:border-slate-700 shadow-2xl custom-scrollbar"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
          >
            <X size={20} />
          </button>

          {/* Wrapper */}
          <div className="flex flex-col">
            
            {/* Header Image */}
            <div className="h-64 sm:h-80 w-full relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="hidden absolute inset-0 items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800">
                Featured Image
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white bg-pink-500 rounded-full">
                  {post.category}
                </span>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h2>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 font-medium">
                  <span className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Body Content */}
            <div className="p-6 md:p-10 bg-white/50 dark:bg-slate-900/50">
              
              {/* Content Parser */}
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4">
                {post.content ? (
                  post.content.split('\n\n').map((paragraph, index) => {
                    // Simple Markdown-like parsing for Headers
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-slate-900 dark:text-white">{paragraph.replace('### ', '')}</h3>;
                    }
                    if (paragraph.startsWith('* ')) {
                      return (
                        <ul key={index} className="list-disc pl-5 space-y-1">
                          {paragraph.split('\n').map((item, i) => (
                             <li key={i}>{item.replace('* ', '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={index}>{paragraph}</p>;
                  })
                ) : (
                  <p>{post.excerpt}</p>
                )}
              </div>

              {/* Footer Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={16} className="text-pink-500" />
                    <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
