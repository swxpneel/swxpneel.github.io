import type {
  BlogPost,
  Client,
  Project,
  Service,
  Skill,
  SocialLink,
  Testimonial,
  TimelineItem,
} from './types'

export const profile = {
  name: 'Daniel Rajakumar',
  role: 'Computer Science Student',
  location: 'Mahwah, NJ',
  email: 'hello@danielrajakumar.com',
  phone: '+1 (609) 388-1811',
  resumeUrl: '/resume.pdf',
  status: {
    label: 'Software Developer',
    available: true,
  },
  graduation: {
    label: 'Expected May 2026',
    datetime: '2026-05',
  },
  avatar: '/assets/images/profile-picture-11.png',
  ogAvatar: '/assets/images/profile-picture-11-og.png',
  about: [
    'Hi there! I am a Computer Science undergraduate with 7 years of programming experience, building practical and real-world applications.',
    "I have experience working on full-stack applications, software and mobile projects, and data-focused work through hackathons and coursework. As the founder of my college's Google Developer Student Club and a leader in the Computer Science Club, I organized workshops. I led teams that helped students complete hands-on development projects.",
    'I am looking for software developer opportunities that will let me work with teams that practice strong technical principles while building real-world products.',
  ],
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/daniel-rajakumar' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daniel-rajakumar/' },
]

export const education: TimelineItem[] = [
  {
    title: 'B.S. Computer Science',
    org: 'Ramapo College of New Jersey, Mahwah, NJ',
    range: 'Aug 2022 — May 2026',
    details: [
      'Presidential Scholarship (full-tuition merit award).',
    ],
    coursework: [
      'Software Design',
      'Data Structures & Algorithms',
      'Machine Learning',
      'Web Application Development',
      'Data Analysis & Visualization',
    ],
  },
]

export const experience: TimelineItem[] = [
  {
    title: 'Lead',
    org: 'Google Developer Student Club, Ramapo College',
    range: 'Aug 2023 — May 2025',
    details: [
      'Organized first DevFest Event on campus, bringing together over 50 students for keynote and hands-on technical workshops.',
      'Led a hands-on Android development workshop leveraging Java, teaching students how to develop and deploy apps using Android Studio',
      'Directed a team of 8 to deliver diverse workshops and coding events, fostering a vibrant developer community',
    ],
  },
  {
    title: 'Founding President',
    org: 'Computer Science Club',
    range: 'Apr 2022 — Jun 2024',
    details: [
      'Initiated and established the Computer Science Club, creating a student-led hub for campus tech community.',
      'Organized and oversaw over 10 workshops on React.js, portfolio building, and collaborative software development practices.',
      "Built and maintained club's website using HTML, CSS, and JS to showcase events and provide resources to over 150 students.",
    ],
  },
]

export const skills: Skill[] = [
  { name: 'Java', logo: '/assets/images/skills/java.svg' },
  { name: 'C++', logo: '/assets/images/skills/cpp.svg' },
  { name: 'JavaScript', logo: '/assets/images/skills/javascript.svg' },
  { name: 'TypeScript', logo: '/assets/images/skills/typescript.svg' },
  { name: 'HTML/CSS', logo: '/assets/images/skills/html-css.svg' },
  { name: 'Python', logo: '/assets/images/skills/python.svg' },
  { name: 'Pandas', logo: '/assets/images/skills/pandas.svg' },
  { name: 'Scikit-learn', logo: '/assets/images/skills/scikit-learn.svg' },
  { name: 'React.js', logo: '/assets/images/skills/react.svg' },
  { name: 'OpenAI API', logo: '/assets/images/skills/openai.svg' },
  { name: 'Netlify', logo: '/assets/images/skills/netlify.svg' },
  { name: 'SQL', logo: '/assets/images/skills/sql.svg' },
  { name: 'Google Cloud', logo: '/assets/images/skills/google-cloud.svg' },
]

export const services: Service[] = [
  {
    title: 'Full-stack engineering',
    description:
      'Design and build web apps end-to-end with clean architecture, tested code, and reliable deployments.',
    icon: 'dev',
  },
  {
    title: 'Mobile development',
    description:
      'Android-first development in Kotlin/Java, from prototypes to production features.',
    icon: 'app',
  },
  {
    title: 'Data-driven systems',
    description:
      'ETL, analytics, and ML prototypes using Python, SQL, Pandas, and scikit-learn.',
    icon: 'data',
  },
  {
    title: 'Technical leadership',
    description:
      'Workshops, mentoring, and leading student dev teams with clear communication and collaboration.',
    icon: 'leadership',
  },
]

export const testimonials: Testimonial[] = [
  // { name: "Daniel Lewis", avatar: "/assets/images/avatar-1.svg", date: "2021-06-14", text: "Daniel was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of the client.", },
  // { name: "Jessica Miller", avatar: "/assets/images/avatar-2.svg", date: "2021-05-28", text: "Daniel took a complex brief and turned it into a clean product experience. The process was collaborative and the outcome was better than expected.", },
  // { name: "Emily Evans", avatar: "/assets/images/avatar-3.svg", date: "2021-04-18", text: "The attention to detail was impressive, and the final site loads fast while looking sharp on every screen.", },
  // { name: "Henry William", avatar: "/assets/images/avatar-4.svg", date: "2021-03-09", text: "Reliable, organized, and thoughtful. Delivered on time and made the whole build feel smooth.", },
]

export const clients: Client[] = [
  // { name: "client-1", logo: "/assets/images/logo-1.svg" },
  // { name: "client-2", logo: "/assets/images/logo-2.svg" },
  // { name: "client-3", logo: "/assets/images/logo-3.svg" },
  // { name: "client-4", logo: "/assets/images/logo-4.svg" },
  // { name: "client-5", logo: "/assets/images/logo-5.svg" },
  // { name: "client-6", logo: "/assets/images/logo-6.svg" },
]

export const projects: Project[] = [
  {
    title: 'Bubble-PoppAR',
    category: 'Applications',
    description:
      '2-player webcam shooter with hand/eye gesture controls, real-time multiplayer, and server-authoritative scoring.',
    tech: ['Next.js', 'Socket.IO', 'Three.js', 'MediaPipe'],
    image: '/assets/images/projects/BubblePoppAR/thumbnail_v16.png',
    links: [
      {
        label: 'Live site',
        href: 'https://ramapohack2026.onrender.com',
      },
      {
        label: 'Source code',
        href: 'https://github.com/daniel-rajakumar/Bubble-PoppAR',
      },
    ],
    screenshots: [
      {
        src: '/assets/images/projects/BubblePoppAR/gameplay-01.png',
        caption: 'Gameplay 1',
      },
      {
        src: '/assets/images/projects/BubblePoppAR/gameplay-02.png',
        caption: 'Gameplay 2',
      },
    ],
  },
  {
    title: 'Assembler & Emulator (VC407)',
    category: 'Applications',
    description:
      'Built a VC407 assembler/emulator in C++ with a two-pass assembly process and modular design.',
    // caseStudyPath: '/case-study/assembler-emulator.md',
    tech: ['C++', 'Assembler', 'Agile'],
    image: '/assets/images/projects/VC370Assem/thumbnail.png',
    links: [
      {
        label: 'Source code',
        href: 'https://github.com/daniel-rajakumar/VC307',
      },
    ],
    screenshots: [
      {
        src: '/assets/images/projects/VC370Assem/one.png',
        caption: 'Assembler output view',
      },
      {
        src: '/assets/images/projects/VC370Assem/two.png',
        caption: 'Emulator run results',
      },
      {
        src: '/assets/images/projects/VC370Assem/three.png',
        caption: 'Assembler output view',
      },
      {
        src: '/assets/images/projects/VC370Assem/four.png',
        caption: 'Emulator run results',
      },
    ],
  },
  {
    title: 'Social Media Engagement Analysis',
    category: 'Other',
    description:
      'Analyzed 250+ Instagram posts with ML models, reaching up to 88% classification accuracy.',
    tech: ['Python', 'Pandas', 'Scikit-learn'],
    image:
      '/assets/images/projects/SocialMediaEngagementAnalysis/thumbnail.png',

    links: [
      {
        label: 'Jupyter Notebook',
        href: 'https://colab.research.google.com/drive/1hl8U_H2wvaPor3S9I9ANfC1QrbbEEJK-?usp=sharing'
      }
    ],
    screenshots: [
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/one.png',
        caption: 'Project screenshot',
      },
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/two.png',
        caption: 'Data visualization example',
      },
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/three.png',
        caption: 'Model accuracy results',
      },
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/four.png',
        caption: 'Feature importance analysis',
      },
      {
        src: '/assets/images/projects/SocialMediaEngagementAnalysis/five.png',
        caption: 'Engagement prediction results',
      },
    ],
  },
  {
    title: 'Canoga Game',
    category: 'Applications',
    description:
      'Developed a 2D Canoga game in Java with multiplayer support and AI opponent.',
    tech: ['Java', 'OOP', 'Game Development'],
    image: '/assets/images/projects/CanogaGame/thumbnail.png',
    links: [
      {
        label: 'Live site',
        href: 'https://projects.canogagame.danielrajakumar.com/',
      },
      {
        label: 'Source code',
        href: 'https://github.com/daniel-rajakumar/CanogaGame',
      },
    ],
    screenshots: [
      {
        src: '/assets/images/projects/CanogaGame/one.png',
        caption: 'Game board view',
      },
      {
        src: '/assets/images/projects/CanogaGame/two.png',
        caption: 'Multiplayer mode',
      },
      {
        src: '/assets/images/projects/CanogaGame/three.png',
        caption: 'Multiplayer mode',
      },
      {
        src: '/assets/images/projects/CanogaGame/four.png',
        caption: 'Multiplayer mode',
      },
      {
        src: '/assets/images/projects/CanogaGame/five.png',
        caption: 'Multiplayer mode',
      },
      {
        src: '/assets/images/projects/CanogaGame/six.png',
        caption: 'Multiplayer mode',
      },
    ],
  },
  {
    title: 'Ramapo International Street Food Festival 2025 Website',
    category: 'Web development',
    description:
      'Created a responsive website for the Ramapo International Street Food Festival 2025 using React.js and hosted on Netlify.',
    tech: ['React.js', 'CSS', 'Netlify'],
    image: '/assets/images/projects/ISFF25/thumbnail.png',
    links: [
      {
        label: 'Live site',
        href: 'https://projects.isff25.danielrajakumar.com/',
      },
      {
        label: 'Source code',
        href: 'https://github.com/RCNJ-Computer-Science-Club/ISFF25',
      },
    ],
    screenshots: [
      {
        src: '/assets/images/projects/ISFF25/one.png',
        caption: 'Homepage view',
      },
      {
        src: '/assets/images/projects/ISFF25/two.png',
        caption: 'Event schedule section',
      },
      {
        src: '/assets/images/projects/ISFF25/three.png',
        caption: 'Vendor information page',
      },
      {
        src: '/assets/images/projects/ISFF25/four.png',
        caption: 'Contact form view',
      },
      {
        src: '/assets/images/projects/ISFF25/five.png',
        caption: 'Responsive design on mobile',
      },
    ],
  },
  {
    title: 'RockyGPT: Ramapo College Chatbot',
    category: 'Web development',
    description:
      "Developed RockyGPT, a chatbot for Ramapo College using OpenAI's GPT-3.5 API to assist students with campus-related queries.",
    tech: ['JavaScript', 'OpenAI API', 'HTML/CSS'],
    image: '/assets/images/projects/RockyGPT/thumbnail.png',
    status: 'In Progress',
    screenshots: [
      // {
      //     src: '/assets/images/projects/RockyGPT/thumbnail.png',
      //     caption: "Chat interface",
      // },
      // {
      //     src: "/assets/images/projects/RockyGPT/two.png",
      //     caption: "Sample conversation",
      // },
      // {
      //     src: "/assets/images/projects/RockyGPT/three.png",
      //     caption: "Mobile view",
      // }
    ],
  },
]

export const blogPosts: BlogPost[] = [
  // { title: "Design conferences in 2025", category: "Design", date: "2025-02-23", excerpt: "A quick rundown of the events I am tracking this year.", image: "/assets/images/blog-1.svg", },
  // { title: "Best fonts every designer uses", category: "Design", date: "2025-02-16", excerpt: "A short list of typefaces that work across web and print.", image: "/assets/images/blog-2.svg", },
  // { title: "Building with intent", category: "Product", date: "2025-01-30", excerpt: "How I keep projects tight, useful, and easy to ship.", image: "/assets/images/blog-3.svg", },
]

export const hasBlogPosts = blogPosts.length > 0
