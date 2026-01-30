import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Section from '../components/Section';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function About({ profile }) {
  return (
    <Section className="space-y-20">
      
      {/* 1. About Me (Intro) */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center md:text-left max-w-3xl mx-auto md:mx-0"
      >
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-emerald-500 mb-6 pb-2"
        >
          About Me
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
        >
          {profile.bio}
        </motion.p>
      </motion.div>

      {/* 2. What I Do (Services) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-10 h-1 bg-cyan-500 rounded-full"></span>
          What I Do
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group relative p-6 rounded-2xl glass-panel border border-white/20 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:shadow-2xl"
              >

                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-cyan-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-cyan-500 mb-4 transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 3. Tech Stack */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-10 h-1 bg-emerald-500 rounded-full"></span>
          Tech Stack
        </motion.h2>

        <div className="space-y-6">
          {profile.skills.map((category, idx) => (
             <motion.div key={idx} variants={itemVariants} className="bg-white/40 dark:bg-slate-800/40 p-6 rounded-2xl border border-white/20 dark:border-slate-700/50">
               <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">{category.category}</h3>
               <div className="flex flex-wrap gap-3">
                 {category.items.map((skill) => (
                   <div key={skill} className="group relative">
                     <span className="px-4 py-2 bg-white dark:bg-slate-900 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-default">
                       {skill.name}
                     </span>
                     {/* Tooltip */}
                     <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-slate-900 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                       Proficient
                     </span>
                   </div>
                 ))}
               </div>
             </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 4. Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8 flex items-center gap-3">
          <span className="w-10 h-1 bg-purple-500 rounded-full"></span>
          Testimonials
        </motion.h2>

        <TestimonialCarousel testimonials={profile.testimonials} />
      </motion.div>

      {/* 5. Clients */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-bold mb-8 flex items-center gap-3">
           <span className="w-10 h-1 bg-pink-500 rounded-full"></span>
           Trusted By
        </motion.h2>

        <div className="bg-white/30 dark:bg-slate-800/30 p-8 rounded-2xl glass-panel flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {profile.clients.map((client, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ scale: 1.1, filter: 'grayscale(0%)' }}
              className="w-24 h-12 relative grayscale opacity-70 hover:opacity-100 transition-all duration-300"
            >
               {/* Placeholder Logo Logic */}
               <div className="w-full h-full bg-slate-200 dark:bg-slate-700 rounded flex items-center justify-center text-xs font-bold text-slate-400">
                 {client.name}
               </div>
               {/* Actual Image if available */}
               <img 
                 src={client.logo} 
                 alt={client.name} 
                 className="absolute inset-0 w-full h-full object-contain" 
                 onError={(e) => e.target.style.display = 'none'}
               />
            </motion.div>
          ))}
        </div>
      </motion.div>

    </Section>
  );
}

function TestimonialCarousel({ testimonials }) {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative bg-gradient-to-br from-cyan-500/5 to-purple-500/5 dark:from-cyan-900/20 dark:to-purple-900/20 rounded-3xl p-8 md:p-12 border border-cyan-100 dark:border-cyan-900/30">
      
      {/* Decorative Quotes */}
      <div className="absolute top-6 left-8 text-6xl text-cyan-200 dark:text-cyan-800 font-serif opacity-50">"</div>

      <div className="relative h-[250px] md:h-[200px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="text-center max-w-2xl px-4"
          >
            <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 font-light italic leading-relaxed mb-6">
              {testimonials[index].quote}
            </p>
            
            <div className="flex flex-col items-center">
               <div className="w-12 h-12 rounded-full overflow-hidden mb-2 ring-2 ring-cyan-400 ring-offset-2 dark:ring-offset-slate-900">
                 <img src={testimonials[index].avatar} alt={testimonials[index].author} className="w-full h-full object-cover" />
               </div>
               <h4 className="font-bold text-slate-900 dark:text-white">{testimonials[index].author}</h4>
               <p className="text-sm text-cyan-600 dark:text-cyan-400">{testimonials[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button onClick={prev} className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-800 transition-colors">
          <ChevronLeft className="text-slate-600 dark:text-slate-400" />
        </button>
        
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === index ? 'bg-cyan-500 w-8' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            />
          ))}
        </div>

        <button onClick={next} className="p-2 rounded-full hover:bg-white/50 dark:hover:bg-slate-800 transition-colors">
          <ChevronRight className="text-slate-600 dark:text-slate-400" />
        </button>
      </div>
    </div>
  );
}
