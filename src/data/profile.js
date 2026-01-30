import { User, Code, Briefcase, FileText, Mail, Github, Linkedin, Twitter, Layout, Server, Database, Smartphone, PenTool, Globe } from 'lucide-react';

export const profileData = {
  name: "Naif Alqubalee",
  title: "MOBILE, WEB Developer",
  tagline: "Building digital products, brands, and experiences.",
  email: "nq.opensources@gmail.com",
  phone: "+967 --- --- ---",
  location: "Yemen",
  availability: "Available for Hire",
  stats: [
    { label: "Years Exp", value: "1+" },
    { label: "Projects", value: "1+" },
    { label: "Clients", value: "0+" }
  ],
  translations: {
    en: {
      downloadCV: "Download CV",
      copyEmail: "Copy Email",
      contactMe: "Contact Me",
      yearsEx: "Years Exp",
      projects: "Projects",
      clients: "Clients"
    },
    ar: {
      downloadCV: "تحميل السيرة الذاتية",
      copyEmail: "نسخ البريد",
      contactMe: "تواصل معي",
      yearsEx: "سنوات خبرة",
      projects: "مشاريع",
      clients: "عملاء"
    }
  },
  social: [
    { name: "GitHub", url: "#", icon: Github },
    { name: "LinkedIn", url: "#", icon: Linkedin },
    { name: "Twitter", url: "#", icon: Twitter },
    { name: "Email", url: "mailto:alex@example.com", icon: Mail }
  ],
  services: [
    { title: "Web Development", description: "Building fast, responsive, and SEO-friendly websites using modern technologies.", icon: Globe },
    { title: "UI/UX Design", description: "Understanding UI/UX principles and capable of designing intuitive, accessible interfaces. Continuously improving and able to quickly adapt to project requirements when UI/UX design is needed.", icon: Layout },
    { title: "Backend API", description: "Developing robust and scalable RESTful and GraphQL APIs.", icon: Server },
    { title: "Mobile Apps", description: "Creating cross-platform mobile applications for iOS and Android.", icon: Smartphone },
    { title: "Database Architecture", description: "Designing efficient database schemas and optimizing queries.", icon: Database },
    { title: "Technical Writing", description: "Documenting APIs and writing technical blog posts.", icon: PenTool }
  ],
  skills: [
    { 
      category: "Frontend", 
      items: [
        { name: "React (Still Learning)", level: 50 },
        { name: "JavaScript", level: 70 },
        { name: "Tailwind CSS (Coming Soon!)", level: 10 },
        { name: "Framer Motion (Coming Soon!)", level: 10 },
        { name: "Vite (Still Learning)", level: 50 },
        { name: "Next.js (Coming Soon!)", level: 10 },
        { name: "TypeScript (Coming Soon!)", level: 10 },
        { name: "Windows Forms", level: 80 },
        { name: "MVC By .NET Framework (Still Learning)", level: 50 }
      ]
    },
    { 
      category: "Backend", 
      items: [
        { name: "Node.js (Still Learning)", level: 50 },
        { name: "Express (Still Learning)", level: 50 },
        { name: "PostgreSQL (Still Learning)", level: 50 },
        { name: "Firebase (Coming Soon!)", level: 10 },
        { name: "MongoDB (Still Learning)", level: 50 },
        { name: "Supabase (Coming Soon!)", level: 10 },
        { name: "Prisma (Coming Soon!)", level: 10 }
      ]
    },
    { 
      category: "Tools", 
      items: [
        { name: "Git", level: 90 },
        { name: "Docker (Coming Soon!)", level: 10 },
        { name: "Figma (Coming Soon!)", level: 10 },
        { name: "VS Code", level: 95 },
        { name: "Android Studio", level: 80 },
        { name: "VS 2022", level: 80 },
        { name: "Jest (Coming Soon!)", level: 10 },
        { name: "CI/CD", level: 10 }
      ]
    }
  ],
  testimonials: [
    {
      id: 1,
      quote: "Naif ...expect more Coming Soon!",
      author: "Naif Alqubalee",
      role: "Coming Soon!",
      avatar: "/assets/avatar.png" 
    },
    {
      id: 2,
      quote: "Naif ...expect more Coming Soon!",
      author: "Naif Alqubalee",
      role: "Coming Soon!",
      avatar: "/assets/avatar.png"
    },
    {
      id: 3,
      quote: "Naif ...expect more Coming Soon!",
      author: "Naif Alqubalee",
      role: "Coming Soon!",
      avatar: "/assets/avatar.png"
    }
  ],
  clients: [
    { name: "Coming Soon!", logo: "/assets/client-1.png" },
    { name: "Coming Soon!", logo: "/assets/client-2.png" },
    { name: "Coming Soon!", logo: "/assets/client-3.png" },
    { name: "Coming Soon!", logo: "/assets/client-4.png" },
    { name: "Coming Soon!", logo: "/assets/client-5.png" }
  ],
  experience: [
    {
      id: 1,
      role: "Senior Frontend Engineer",
      company: "Tech Corp",
      period: "2021 - Present",
      description: "Leading a team of 5 developers building the next generation SaaS platform.",
      achievements: [
        "Architected and implemented a new component library causing a 40% reduction in development time.",
        "Optimized application performance, improving Core Web Vitals scores by 25 points.",
        "Mentored junior developers and conducted code reviews to ensure code quality."
      ]
    },
    {
      id: 2,
      role: "Software Developer",
      company: "StartUp Inc",
      period: "2019 - 2021",
      description: "Developed and maintained multiple React applications for client deliverables.",
      achievements: [
        "Delivered 10+ client projects on time and within budget.",
        "Integrated payment gateways (Stripe, PayPal) for e-commerce sites.",
        "Collaborated with designers to implement pixel-perfect user interfaces."
      ]
    }
  ],
  education: [
    {
      id: 1,
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2015 - 2019",
      description: "Graduated with Honors. Focused on Software Engineering and Human-Computer Interaction."
    }
  ],
  certifications: [
    { id: 1, name: "AWS Certified Developer - Associate", issuer: "Amazon Web Services", date: "2023" },
    { id: 2, name: "Meta Frontend Developer Professional Certificate", issuer: "Coursera", date: "2022" },
    { id: 3, name: "Google UX Design Professional Certificate", issuer: "Coursera", date: "2021" }
  ],
  projects: [
    {
      id: 1,
      title: "E-Commerce Dashboard",
      category: "Web Apps",
      description: "A comprehensive dashboard for online retailers with real-time analytics and inventory management.",
      technologies: ["React", "Tailwind", "Recharts", "Node.js"],
      image: "/assets/project-1.jpg",
      gallery: ["/assets/project-1.jpg", "/assets/project-2.jpg"],
      link: "#",
      featured: true
    },
    {
      id: 2,
      title: "Social Media Manager",
      category: "Mobile",
      description: "Cross-platform mobile app for scheduling social media posts with AI-powered caption generation.",
      technologies: ["React Native", "Firebase", "OpenAI API"],
      image: "/assets/project-2.jpg",
      gallery: ["/assets/project-2.jpg", "/assets/project-3.jpg"],
      link: "#",
      featured: true
    },
    {
      id: 3,
      title: "Portfolio Template",
      category: "Web Design",
      description: "Minimalist portfolio template for developers with dark mode and accessible components.",
      technologies: ["HTML", "CSS", "JS", "A11y"],
      image: "/assets/project-3.jpg",
      gallery: ["/assets/project-3.jpg", "/assets/project-1.jpg"],
      link: "#",
      featured: false
    },
    {
      id: 4,
      title: "Brand Identity Guide",
      category: "Branding",
      description: "Complete brand identity guidelines including typography, color palette, and usage rules.",
      technologies: ["Figma", "Illustrator"],
      image: "/assets/project-1.jpg", 
      gallery: ["/assets/project-1.jpg"],
      link: "#",
      featured: false
    }
  ],
  blog: [
    {
      id: 1,
      title: "Mastering React Hooks",
      date: "Oct 12, 2023",
      category: "Development",
      tags: ["React", "JavaScript", "Hooks"],
      excerpt: "A deep dive into useEffect, prose, and custom hooks. Learn how to write cleaner and more efficient React components.",
      content: "React Hooks have revolutionized how we write React components. In this guide, we'll explore the most common hooks and how to use them effectively.\n\n### The useEffect Hook\nThe useEffect hook lets you perform side effects in function components. It's close to componentDidMount, componentDidUpdate, and componentWillUnmount.\n\n### Custom Hooks\nBuilding your own hooks lets you extract component logic into reusable functions.",
      readTime: "5 min read",
      image: "/assets/project-1.jpg", 
      featured: true
    },
    {
      id: 2,
      title: "Why Tailwind CSS?",
      date: "Sep 28, 2023",
      category: "Design",
      tags: ["CSS", "Tailwind", "Design"],
      excerpt: "Exploring the benefits of utility-first CSS frameworks and how they speed up the development process.",
      content: "Tailwind CSS is a utility-first CSS framework that can speed up your development process significantly.\n\nInstead of fighting with cascading styles, you compose complex user interfaces using small, composable utilities.\n\n**Benefits:**\n1. Faster styling\n2. Consistent design system\n3. Mobile-first approach",
      readTime: "3 min read",
      image: "/assets/project-2.jpg",
      featured: false
    },
    {
      id: 3,
      title: "The Future of Web Dev",
      date: "Aug 15, 2023",
      category: "Trends",
      tags: ["AI", "WebAssembly", "Future"],
      excerpt: "Predictions for 2024 and beyond. AI, WebAssembly, and the rise of edge computing.",
      content: "The web development landscape is changing rapidly. Here are my top predictions for the coming years:\n\n* **AI-Assisted Coding**: Tools like Copilot and Gemini will become standard.\n* **WebAssembly**: More meaningful applications running in the browser.\n* **Edge Computing**: Moving logic closer to the user for speed.",
      readTime: "6 min read",
      image: "/assets/project-3.jpg",
      featured: false
    },
    {
      id: 4,
      title: "UI/UX Best Practices",
      date: "Jul 10, 2023",
      category: "Design",
      tags: ["UI", "UX", "Accessibility"],
      excerpt: "Tips for creating accessible and user-friendly interfaces that drive engagement.",
      content: "Good UI/UX is invisible. It helps the user achieve their goal without getting in the way.\n\n### Accessibility\nensure your site is usable by everyone. Use semantic HTML, ARIA labels where necessary, and sufficient color contrast.\n\n### Consistency\nMaintain a consistent design language throughout your application.",
      readTime: "4 min read",
      image: "/assets/project-1.jpg",
      featured: false
    }
  ]
};
