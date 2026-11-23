import type { ProjectImageKey } from './images';

export type SkillCategory = 'Languages' | 'Frameworks' | 'Tools';

export interface SkillItem {
  name: string;
  iconKey: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  imageKey: ProjectImageKey;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current?: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  grade: string;
  details?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  context: string;
  year?: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

export const siteContent = {
  personal: {
    name: 'Amadul Islam',
    initials: 'AI',
    role: 'CSE Undergraduate & Software Developer',
    tagline: 'Programmer · Full-Stack & AI Enthusiast',
    availability: 'Available for work',
    valueProposition:
      'Building full-stack web applications and AI-powered systems backed by strong algorithmic problem-solving.',
    bio: [
      "I'm a Computer Science & Engineering undergraduate at United International University (3.88 CGPA) focused on software engineering, web development, and applied AI. Skilled across C, C++, Java, Python, and modern full-stack stacks, I enjoy turning complex ideas into clean, reliable software.",
      "With 1,500+ competitive programming problems solved across Codeforces and AtCoder, I bring disciplined problem-solving to every system I design. I currently serve as an Undergraduate Teaching Assistant and CP Batch Representative at UIU while exploring LLMs, creative design, and AI tooling.",
    ],
    // TODO: Add your city/country (e.g., "Dhaka, Bangladesh") if you'd like it shown publicly
    location: 'United International University (UIU)',
    // Calculated from earliest work/leadership date in CV (2025 – Present)
    yearsOfExperience: '1+ Year',
    experienceSpan: '2025 – Present',
    currentFocus: 'Full-Stack Engineering, LLMs & Applied AI',
    cvPath: '/cv.pdf',
    cvDownloadName: 'Amadul_Islam_CV.pdf',
  },

  contact: {
    email: 'amdadulibm@gmail.com',
    // TODO: Replace YOUR_FORMSPREE_ID with your real Formspree form ID (https://formspree.io/forms)
    formspreeEndpoint: 'https://formspree.io/f/YOUR_FORMSPREE_ID',
    heading: "Let's build something together",
    description:
      'Open to software engineering internships, full-stack & AI projects, and meaningful collaborations. Drop a message or reach out directly via email.',
    socials: {
      // TODO: Verify your exact GitHub profile URL
      github: 'https://github.com/amdadul',
      // TODO: Verify your exact LinkedIn profile URL
      linkedin: 'https://www.linkedin.com/in/amdadul',
      codeforces: 'https://codeforces.com/profile/amdadul',
    },
  },

  navLinks: [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ] as const,

  stats: [
    {
      value: '1,500+',
      label: 'Problems Solved',
      sublabel: 'Codeforces (700+, 1200+ Pupil) & AtCoder',
    },
    {
      value: '3.88',
      label: 'B.Sc. CSE CGPA',
      sublabel: '126 / 137 credits completed at UIU',
    },
    {
      value: '10×',
      label: 'Merit Scholarship',
      sublabel: 'UIU academic excellence, including 100%',
    },
    {
      value: '1+ yr',
      label: 'Experience',
      sublabel: '2025 – Present across teaching & dev',
    },
  ] satisfies StatItem[],

  skills: {
    Languages: [
      { name: 'C', iconKey: 'c' },
      { name: 'C++', iconKey: 'cpp' },
      { name: 'Java', iconKey: 'java' },
      { name: 'Python', iconKey: 'python' },
      { name: 'JavaScript', iconKey: 'javascript' },
      { name: 'PHP', iconKey: 'php' },
      { name: 'HTML5', iconKey: 'html' },
      { name: 'CSS3', iconKey: 'css' },
    ],
    Frameworks: [
      { name: 'React.js', iconKey: 'react' },
      { name: 'Spring Boot', iconKey: 'springboot' },
      { name: 'Node.js', iconKey: 'nodejs' },
      { name: 'Express.js', iconKey: 'express' },
      { name: 'Flask', iconKey: 'flask' },
      { name: 'PyTorch', iconKey: 'pytorch' },
      { name: 'Bootstrap', iconKey: 'bootstrap' },
      { name: 'Leaflet.js', iconKey: 'leaflet' },
    ],
    Tools: [
      { name: 'PostgreSQL', iconKey: 'postgresql' },
      { name: 'MySQL', iconKey: 'mysql' },
      { name: 'Docker', iconKey: 'docker' },
      { name: 'Git', iconKey: 'git' },
      { name: 'GitHub', iconKey: 'github' },
      { name: 'REST APIs', iconKey: 'rest' },
      { name: 'WebSocket', iconKey: 'websocket' },
      { name: 'Postman', iconKey: 'postman' },
      { name: 'Gemini API', iconKey: 'gemini' },
      { name: 'Figma', iconKey: 'figma' },
      { name: 'Linux (Ubuntu)', iconKey: 'linux' },
      { name: 'Jupyter & Colab', iconKey: 'jupyter' },
    ],
  } satisfies Record<SkillCategory, SkillItem[]>,

  featuredProjects: [
    {
      id: 'mosquitowatch',
      title: 'MosquitoWatch',
      category: 'AI & Community Health',
      description:
        'AI-powered mosquito surveillance and community health platform to report breeding sites, identify mosquito species via image recognition, and dispatch field workers for remediation.',
      tech: [
        'React',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Python',
        'PyTorch',
        'Flask',
        'Google Gemini API',
        'Leaflet.js',
      ],
      imageKey: 'project1',
      // TODO: Add live demo URL for MosquitoWatch when deployed
      liveUrl: undefined,
      // TODO: Add GitHub repository URL for MosquitoWatch
      githubUrl: undefined,
    },
    {
      id: 'easycode',
      title: 'EasyCode',
      category: 'EdTech & Real-Time Contests',
      description:
        'Gamified coding learning platform built with React and Java Spring Boot, featuring AI assistance, real-time 1v1 coding contests via WebSocket, and an interactive learning system.',
      tech: ['React', 'Spring Boot', 'Java', 'MySQL', 'WebSocket', 'AI Integration'],
      imageKey: 'project2',
      // TODO: Add live demo URL for EasyCode when deployed
      liveUrl: undefined,
      // TODO: Add GitHub repository URL for EasyCode
      githubUrl: undefined,
    },
    {
      id: 'niramoy',
      title: 'Niramoy',
      category: 'Healthcare Management',
      description:
        'Unified hospital management platform integrating multiple hospitals under one system to help patients discover the best-matched doctor based on their symptoms.',
      tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      imageKey: 'project3',
      // TODO: Add live demo URL for Niramoy when deployed
      liveUrl: undefined,
      // TODO: Add GitHub repository URL for Niramoy
      githubUrl: undefined,
    },
  ] satisfies ProjectItem[],

  // TODO: Add any additional projects here to automatically display an "Other Projects" section
  otherProjects: [] as ProjectItem[],

  experience: [
    {
      id: 'uta-uiu',
      role: 'Undergraduate Teaching Assistant',
      company: 'United International University (UIU)',
      location: 'UIU',
      period: 'Summer 2026 – Present',
      current: true,
      bullets: [
        'Assisted undergraduate students during Software Engineering lab sessions.',
        'Guided students through practical assignments and core software engineering workflows.',
      ],
    },
    {
      id: 'cp-rep-uiu',
      role: 'CP Batch Representative (Batch-223)',
      company: 'United International University (UIU)',
      location: 'UIU',
      period: '2025 – Present',
      current: true,
      bullets: [
        'Guided peers and junior students in Data Structures, Algorithms, and problem-solving strategies.',
        'Supported Batch-223 students in building consistency across competitive programming platforms.',
      ],
    },
    {
      id: 'team-lead-easycode',
      role: 'Team Lead – Software Development',
      company: 'EasyCode',
      location: 'United International University',
      period: 'Oct 2025 – Feb 2026',
      bullets: [
        'Led full-stack software development using React, Java Spring Boot, and MySQL.',
        'Architected real-time 1v1 contest features with WebSocket and integrated AI-assisted learning capabilities.',
      ],
    },
  ] satisfies ExperienceItem[],

  education: [
    {
      id: 'uiu-bsc',
      institution: 'United International University (UIU)',
      degree: 'B.Sc. in Computer Science & Engineering',
      period: 'Oct 2022 – Present',
      grade: 'CGPA: 3.88',
      details: 'Completed 126 / 137 credits',
    },
    {
      id: 'bm-hsc',
      institution: 'BM High School & College',
      degree: 'Higher Secondary Certificate (Science)',
      period: '2021',
      grade: 'GPA: 5.00',
    },
  ] satisfies EducationItem[],

  coursework: [
    'Artificial Intelligence',
    'Data Structures & Algorithms',
    'Computer Networks',
    'Database Management System',
  ],

  awards: [
    {
      id: 'iupc-2025',
      title: 'Inter-University Programming Contest (IUPC) Representative',
      context: 'Represented United International University',
      year: '2025',
    },
    {
      id: 'cse-show-spring-2025',
      title: '3rd Runner-Up, CSE Project Show',
      context: 'Team UIU_Hotasha · Database Management System project',
      year: 'Spring 2025',
    },
    {
      id: 'cse-show-fall-2025',
      title: '4th Runner-Up, CSE Project Show',
      context: 'Team UIU_Hotasha · Advanced Object Oriented Programming',
      year: 'Fall 2025',
    },
    {
      id: 'uiu-scholarship',
      title: 'UIU Undergraduate Merit Scholarship (10×)',
      context: 'Awarded 10 times for academic excellence, including full (100%)',
    },
    {
      id: 'bm-coding-2019',
      title: 'Excellence Award, Coding Competition',
      context: 'BM High School & College',
      year: '2019',
    },
  ] satisfies AwardItem[],
} as const;
