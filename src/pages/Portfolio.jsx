import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SortAsc, Eye, ExternalLink, ChevronDown } from 'lucide-react';
import Section from '../components/Section';
import FilterChips from '../components/FilterChips';
import Modal from '../components/Modal';

export default function Portfolio({ profile }) {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); 
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Derive unique categories from projects
  const categories = useMemo(() => ['All', ...new Set(profile.projects.map(p => p.category))], [profile.projects]);

  const filteredProjects = useMemo(() => {
    let result = [...profile.projects];

    // Filter by Category
    if (filter !== 'All') {
      result = result.filter(p => p.category === filter);
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortOrder) {
      case 'az':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'popular':
        result.sort((a, b) => (b.featured === a.featured) ? 0 : b.featured ? 1 : -1);
        break;
      case 'newest':
      default:
        break;
    }

    return result;
  }, [profile.projects, filter, searchQuery, sortOrder]);

  // Reset visible count when filter/search changes
  useMemo(() => {
     setVisibleCount(6);
  }, [filter, searchQuery, sortOrder]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const featuredProjects = useMemo(() => profile.projects.filter(p => p.featured), [profile.projects]);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <Section className="space-y-12 min-h-screen pb-20">
      
      {/* Header & Controls */}
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Portfolio
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-md">
            A selection of my best work, ranging from web applications to mobile apps and brand designs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               type="text" 
               placeholder="Search projects..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all"
             />
          </div>
          
          <div className="relative">
             <select 
               value={sortOrder}
               onChange={(e) => setSortOrder(e.target.value)}
               className="w-full sm:w-40 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:outline-none appearance-none cursor-pointer"
             >
               <option value="newest">Newest First</option>
               <option value="popular">Popular</option>
               <option value="az">A - Z</option>
             </select>
             <SortAsc className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <FilterChips 
        options={categories} 
        activeFilter={filter} 
        onSelect={setFilter} 
      />

      {/* Featured Section (only show if filtering All and not searching) */}
      {filter === 'All' && !searchQuery && featuredProjects.length > 0 && (
        <div className="mb-12">
           <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
              Featured Projects
           </h2>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             {featuredProjects.map(project => (
               <ProjectCard 
                 key={`featured-${project.id}`} 
                 project={project} 
                 onClick={() => setSelectedProject(project)}
                 isFeatured 
               />
             ))}
           </div>
        </div>
      )}

      {/* Main Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {visibleProjects.map((project) => (
             <ProjectCard 
               key={project.id} 
               project={project} 
               onClick={() => setSelectedProject(project)}
             />
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-20 text-slate-500 dark:text-slate-400">
           No projects found matching your criteria.
        </div>
      )}

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={loadMore}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors font-semibold text-slate-600 dark:text-slate-300"
          >
            Load More <ChevronDown size={16} />
          </button>
        </div>
      )}

      <Modal 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
        project={selectedProject} 
      />

    </Section>
  );
}

const ProjectCard = memo(function ProjectCard({ project, onClick, isFeatured = false }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className={`
        group relative rounded-2xl overflow-hidden glass-panel border border-white/20 dark:border-slate-700/50
        ${isFeatured ? 'col-span-1 shadow-2xl animated-gradient-border' : 'shadow-lg'}
        flex flex-col
      `}
    >
      {/* Image Area */}
      <div className={`relative overflow-hidden ${isFeatured ? 'h-64' : 'h-48'} bg-slate-200 dark:bg-slate-800`}>
         <img 
           src={project.image} 
           alt={project.title} 
           loading="lazy"
           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
           onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
         />
         <div className="hidden absolute inset-0 items-center justify-center text-xs text-slate-400">No Image</div>
         
         {/* Overlay Actions */}
         <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              className="p-3 bg-white/10 backdrop-blur hover:bg-white text-white hover:text-slate-900 rounded-full transition-all transform hover:scale-110"
              title="View Details"
            >
              <Eye size={20} />
            </button>
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer" 
              className="p-3 bg-white/10 backdrop-blur hover:bg-cyan-500 text-white rounded-full transition-all transform hover:scale-110"
              title="Live Demo"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink size={20} />
            </a>
         </div>

         {/* Category Badge */}
         <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/10">
           {project.category}
         </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col">
         <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors">
           {project.title}
         </h3>
         <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 mb-4 flex-1">
           {project.description}
         </p>
         
         <div className="flex flex-wrap gap-2 mt-auto">
           {project.technologies.slice(0, 3).map(t => (
             <span key={t} className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
               {t}
             </span>
           ))}
           {project.technologies.length > 3 && (
             <span className="text-xs font-medium text-slate-400 px-2 py-1">+ {project.technologies.length - 3}</span>
           )}
         </div>
         
         <button 
           onClick={onClick}
           className="mt-6 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
         >
           View Details
         </button>
      </div>

    </motion.div>
  );
});
