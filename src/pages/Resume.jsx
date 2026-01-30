import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ChevronDown, CheckCircle, Award } from 'lucide-react';
import Section from '../components/Section';

export default function Resume({ profile }) {
  return (
    <Section className="space-y-16">
      <div className="text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-6 pb-2">Resume</h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
           My professional journey, skills, and qualifications.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Experience Column */}
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
             <Briefcase className="text-blue-500" />
             Experience
          </h2>
          <div className="space-y-6">
            {profile.experience.map((job) => (
              <TimelineItem key={job.id} data={job} type="work" />
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
             <GraduationCap className="text-green-500" />
             Education
          </h2>
          <div className="space-y-6">
             {profile.education.map((edu) => (
               <TimelineItem key={edu.id} data={edu} type="education" />
             ))}
          </div>
        </div>
      </div>

      {/* Skills Progress Bars */}
      <div>
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
           <Award className="text-purple-500" />
           Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
           {profile.skills.map((category, idx) => (
             <div key={idx} className="bg-white/40 dark:bg-slate-800/40 p-6 rounded-2xl glass-panel">
               <h3 className="font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                 {category.category}
               </h3>
               <div className="space-y-5">
                 {category.items.map((skill) => (
                   <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                 ))}
               </div>
             </div>
           ))}
        </div>
      </div>

      {/* Certifications */}
      <div>
         <h2 className="text-2xl font-bold mb-8">Certifications</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
           {profile.certifications.map((cert) => (
             <motion.div 
               key={cert.id}
               whileHover={{ y: -5 }}
               className="glass-panel p-5 border border-white/20 dark:border-slate-700/50 flex flex-col justify-between"
             >
               <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-1 leading-tight">{cert.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{cert.issuer}</p>
               </div>
               <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                  <span>Issued: {cert.date}</span>
                  <Award size={16} className="text-yellow-500" />
               </div>
             </motion.div>
           ))}
         </div>
      </div>

    </Section>
  );
}

function TimelineItem({ data, type }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-700 last:border-0 pb-2">
      <span className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
         type === 'work' ? 'bg-blue-500' : 'bg-green-500'
      }`}></span>
      
      <div className="glass-panel p-5 hover:border-blue-400/30 transition-colors">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-start text-left focus:outline-none"
          aria-expanded={isOpen}
        >
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{type === 'work' ? data.role : data.degree}</h3>
            <p className="text-cyan-600 dark:text-cyan-400 font-medium">{type === 'work' ? data.company : data.school}</p>
          </div>
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="p-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500"
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-2 font-mono bg-slate-50 dark:bg-slate-900/50 w-fit px-2 py-0.5 rounded">
          {data.period}
        </p>

        <AnimatePresence>
          {isOpen && (
            <motion.div
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               className="overflow-hidden"
            >
               <div className="pt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700/50 mt-3">
                 <p className="mb-3">{data.description}</p>
                 {data.achievements && (
                   <ul className="space-y-2">
                     {data.achievements.map((ach, i) => (
                       <li key={i} className="flex gap-2 items-start">
                         <span className="mt-1 text-cyan-500 flex-shrink-0">
                           <CheckCircle size={14} />
                         </span>
                         <span>{ach}</span>
                       </li>
                     ))}
                   </ul>
                 )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SkillBar({ name, level }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-medium text-sm text-slate-700 dark:text-slate-200">{name}</span>
        <span className="text-xs font-bold text-slate-400">{level}%</span>
      </div>
      <div className="h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </div>
  );
}
