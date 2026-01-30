import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Tag, ChevronDown } from 'lucide-react';
import Section from '../components/Section';
import SearchBar from '../components/SearchBar';
import FilterChips from '../components/FilterChips';
import BlogModal from '../components/BlogModal';

export default function Blog({ profile }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  // Extract all unique tags
  const allTags = useMemo(() => ['All', ...new Set(profile.blog.flatMap(post => post.tags || []))], [profile.blog]);

  // Filtering Logic
  const filteredPosts = useMemo(() => {
    return profile.blog.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === 'All' || (post.tags && post.tags.includes(selectedTag));
      
      return matchesSearch && matchesTag;
    });
  }, [profile.blog, searchQuery, selectedTag]);

  // Reset visible count when filters change
  useMemo(() => {
     setVisibleCount(6);
  }, [searchQuery, selectedTag]);

  const featuredPost = useMemo(() => filteredPosts.find(p => p.featured) || filteredPosts[0], [filteredPosts]);
  const allGridPosts = useMemo(() => filteredPosts.filter(p => p.id !== featuredPost?.id), [filteredPosts, featuredPost]);
  
  const visibleGridPosts = allGridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allGridPosts.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <Section className="space-y-12 pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
             Thoughts & Insights
          </h1>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl">
             Sharing my journey, tutorials, and latest tech trends.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-auto">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search articles..." 
          />
        </div>
      </div>

      {/* Tag Filters */}
      <FilterChips 
        options={allTags} 
        activeFilter={selectedTag} 
        onSelect={setSelectedTag} 
      />

      <AnimatePresence mode="wait">
        {filteredPosts.length > 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="space-y-12"
          >
            
            {/* Featured Post (Only show if matches filter) */}
            {featuredPost && (
              <FeaturedPostCard post={featuredPost} onClick={() => setSelectedPost(featuredPost)} />
            )}

            {/* Grid Layout */}
            {visibleGridPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2 mb-8">
                   <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                   Recent Articles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visibleGridPosts.map((post) => (
                    <BlogPostCard 
                      key={post.id} 
                      post={post} 
                      onClick={() => setSelectedPost(post)} 
                    />
                  ))}
                </div>
              </div>
            )}
            
          </motion.div>
        ) : (
          <div className="py-20 text-center text-slate-500 dark:text-slate-400">
             No articles found matching your search.
          </div>
        )}
      </AnimatePresence>

      {/* Load More Button */}
      {hasMore && filteredPosts.length > 0 && (
         <div className="flex justify-center pt-4">
           <button
             onClick={loadMore}
             className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors font-semibold text-slate-600 dark:text-slate-300"
           >
             Load More <ChevronDown size={16} />
           </button>
         </div>
      )}

      <BlogModal 
        isOpen={!!selectedPost} 
        onClose={() => setSelectedPost(null)} 
        post={selectedPost} 
      />

    </Section>
  );
}

const FeaturedPostCard = memo(({ post, onClick }) => (
  <motion.div 
    layoutId={`post-${post.id}`}
    onClick={onClick}
    className="group cursor-pointer relative rounded-3xl overflow-hidden glass-panel border border-white/20 dark:border-slate-700/50 min-h-[400px] flex flex-col md:flex-row shadow-lg hover:shadow-2xl transition-all duration-300 animated-gradient-border"
  >
    <div className="md:w-1/2 h-64 md:h-auto bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
       <img 
         src={post.image} 
         alt={post.title} 
         loading="lazy"
         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
         onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
       />
       <div className="hidden absolute inset-0 items-center justify-center text-slate-400">Featured Image</div>
       <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-xs font-bold text-pink-500 flex items-center gap-1">
         <Tag size={12} />
         Featured
       </div>
    </div>
    
    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
       <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-4">
         <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
         <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
       </div>
       
       <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-pink-500 transition-colors">
         {post.title}
       </h2>
       <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
         {post.excerpt}
       </p>
       
       <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold hover:gap-4 transition-all w-fit">
         Read Article <ChevronRight size={18} />
       </div>
    </div>
  </motion.div>
));

const BlogPostCard = memo(({ post, onClick }) => (
  <motion.article
    layoutId={`post-${post.id}`}
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -8 }}
    transition={{ duration: 0.4 }}
    className="group cursor-pointer glass-panel rounded-2xl overflow-hidden border border-white/20 dark:border-slate-700/50 flex flex-col h-full hover:shadow-xl transition-all"
  >
     <div className="h-48 overflow-hidden bg-slate-200 dark:bg-slate-800 relative">
       <img 
         src={post.image} 
         alt={post.title} 
         loading="lazy"
         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
         onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
       />
       <div className="hidden absolute inset-0 items-center justify-center text-xs text-slate-400">No Image</div>
       
       <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-2 py-1 bg-black/50 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur rounded">
            {post.category}
          </span>
       </div>
     </div>
     
     <div className="p-6 flex-1 flex flex-col">
       <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
         <span>{post.date}</span>
         <span>•</span>
         <span>{post.readTime}</span>
       </div>
       
       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-purple-500 transition-colors">
         {post.title}
       </h3>
       
       <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3 mb-4 flex-1">
         {post.excerpt}
       </p>
       
       {post.tags && (
         <div className="flex flex-wrap gap-2 mb-4">
           {post.tags.slice(0, 3).map(tag => (
             <span key={tag} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">#{tag}</span>
           ))}
         </div>
       )}

       <span className="text-sm font-bold text-purple-600 dark:text-purple-400 group-hover:underline decoration-2 underline-offset-4 flex items-center gap-1">
         Read More <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
       </span>
     </div>
  </motion.article>
));
