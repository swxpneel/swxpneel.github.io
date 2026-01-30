import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers } from 'lucide-react';

export default function Modal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

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
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-white/20 dark:border-slate-700 shadow-2xl custom-scrollbar"
        >
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-800 transition-colors text-slate-700 dark:text-slate-200"
            >
              <X size={20} />
            </button>

            {/* Header Image */}
            <div className="h-64 md:h-80 bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
              />
              <div className="absolute inset-0 hidden items-center justify-center text-slate-400">
                No Image Available
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8">
                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-white bg-cyan-500 rounded-full">
                  {project.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
              </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Description</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Gallery */}
                {project.gallery && project.gallery.length > 0 && (
                   <div>
                      <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Gallery</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.gallery.map((img, i) => (
                           <div key={i} className="rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700/50 aspect-video bg-slate-100 dark:bg-slate-800 relative group">
                              <img 
                                src={img} 
                                alt={`Gallery ${i}`} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                              />
                              <div className="hidden absolute inset-0 items-center justify-center text-xs text-slate-400">Image not found</div>
                           </div>
                        ))}
                      </div>
                   </div>
                )}
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg border border-cyan-100 dark:border-cyan-800">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                   <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider mb-3">Links</h3>
                   <div className="space-y-3">
                     <a 
                       href={project.link} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex items-center gap-3 w-full p-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm transition-transform active:scale-95 hover:shadow-lg"
                     >
                       <ExternalLink size={16} />
                       Live Demo
                     </a>
                     <a 
                       href="#" 
                       className="flex items-center gap-3 w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                     >
                       <Github size={16} />
                       Source Code
                     </a>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
