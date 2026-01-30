import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, User, MessageSquare } from 'lucide-react';
import Section from '../components/Section';
import Toast from '../components/Toast';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toastRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toastRef.current.add("Message sent successfully!", "success");
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <Section className="pb-20">
      <Toast ref={toastRef} />
      
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 mb-6 pb-2">
           Let's Work Together
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
           Have a project in mind? Looking for a partner to build your next big idea? I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
        
        {/* Contact Info Column */}
        <div className="lg:col-span-2 space-y-12">
          
          <div className="space-y-8">
            <ContactItem 
               icon={Mail} 
               label="Email Me" 
               value={profile.email} 
               color="text-blue-500" 
               bg="bg-blue-50 dark:bg-blue-900/20"
            />
            <ContactItem 
               icon={Phone} 
               label="Call Me" 
               value={profile.phone} 
               color="text-purple-500" 
               bg="bg-purple-50 dark:bg-purple-900/20"
            />
            <ContactItem 
               icon={MapPin} 
               label="Location" 
               value={profile.location} 
               color="text-emerald-500" 
               bg="bg-emerald-50 dark:bg-emerald-900/20"
            />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Connect</h3>
            <div className="flex gap-4">
              {profile.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name} 
                    href={social.url}
                    className="w-12 h-12 rounded-2xl glass-panel border border-white/20 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-white hover:scale-110 hover:-translate-y-1 transition-all duration-300 group"
                    style={{ '--hover-bg': social.name === 'GitHub' ? '#24292e' : social.name === 'Twitter' ? '#1DA1F2' : '#0077b5' }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-cyan-400 to-blue-500 -z-10" />
                    <Icon size={20} className="relative z-10" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="lg:col-span-3">
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit} 
            className="glass-panel p-8 md:p-10 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl"
          >
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
               <MessageSquare className="text-cyan-500" />
               Send a Message
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Name</label>
                   <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="text"
                        id="name"
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:text-white"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
                   <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        id="email"
                        required
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:text-white"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                   </div>
                 </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-400 dark:text-white"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>Send Message <Send size={20} /></>
                  )}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </Section>
  );
}

function ContactItem({ icon: Icon, label, value, color, bg }) {
  return (
    <div className="flex items-center gap-5 group">
      <div className={`w-14 h-14 ${bg} rounded-full flex items-center justify-center ${color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide mb-0.5">{label}</p>
        <p className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">{value}</p>
      </div>
    </div>
  );
}
