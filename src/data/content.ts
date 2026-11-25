import type { ProjectImageKey } from './images';

export type SkillCategory = 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools';

export interface FeaturedProject {
  id: string;
  title: string;
  year: string;
  problem: string;
  summary: string;
  award?: string;
  tech: string[];
  imageKey: ProjectImageKey;
  liveUrl?: string;
  githubUrl?: string;
}

export interface CompactProject {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
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

export interface FactMetric {
  value: string;
  label: string;
}

export const siteContent = {
  personal: {
    name: 'Amadul Islam',
    initials: 'AI',
    roles: [
      'Software Developer',
      'AI Engineer',
      'Full-Stack Developer',
      'Data Science Enthusiast',
      // 'Competitive Programmer',
    ],
    availability: 'Available for internships & software roles',
    heroPitch:
      'I build full-stack web apps and applied AI tools, grounded in 1,500+ competitive programming problems solved.',
    aboutParagraphs: [
      "I'm a Computer Science and Engineering undergraduate at United International University with a 3.88 CGPA (126 of 137 credits completed). Most of my work sits at the intersection of full-stack web systems and applied machine learning.",
      "I've solved over 1,500 competitive programming problems on Codeforces and AtCoder, and I currently serve as an Undergraduate Assistant (UGA) and CP Batch Representative at UIU. I prefer straightforward architecture, readable code, and software that solves a clear problem.",
    ],
    // TODO: Add your city/country (e.g., "Dhaka, Bangladesh") if you want it shown publicly
    location: 'United International University (UIU)',
    // Calculated from earliest CV role (2025 - Present)
    experienceSpan: '2025 – Present',
    cvPath: '/cv.pdf',
    cvDownloadName: 'Amadul_Islam_CV.pdf',
  },

  facts: [
    { value: '1,500+', label: 'Problems solved (CF 700+, 1200+ Pupil & AtCoder)' },
    { value: '3.88', label: 'B.Sc. CSE CGPA at UIU (126/137 credits)' },
    { value: '10×', label: 'UIU Undergraduate Merit Scholarship (up to 100%)' },
    { value: '1+ yr', label: 'Teaching, team leadership & software development' },
  ] satisfies FactMetric[],

  contact: {
    email: 'amdadulibm@gmail.com',
    // Active zero-backend email delivery (confirm once via the email sent to your inbox on first submission)
    formSubmitEndpoint: 'https://formsubmit.co/ajax/amdadulibm@gmail.com',
    // TODO: Replace YOUR_FORMSPREE_ID if you prefer Formspree (automatically takes priority when configured)
    formspreeEndpoint: 'https://formspree.io/f/YOUR_FORMSPREE_ID',
    heading: 'Get in touch',
    description:
      'Looking for software engineering internships, backend or full-stack roles, and applied AI projects. Email me directly or send a note below.',
    socials: {
      github: 'https://github.com/A-I-B-M',
      linkedin: 'https://www.linkedin.com/in/amdadul09',
      codeforces: 'https://codeforces.com/profile/amdadul_',
    },
  },

  navLinks: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ] as const,

  featuredProjects: [
    {
      id: 'mosquitowatch',
      title: 'MosquitoWatch',
      year: '2025',
      problem:
        'Public health teams lack fast, verified location data to catch mosquito breeding sites early.',
      summary:
        'Built an AI surveillance platform where residents report breeding sites, PyTorch and Gemini classify mosquito species from photos, and coordinators dispatch field workers on an interactive map.',
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
      githubUrl: 'https://github.com/A-I-B-M/MosquitoWatch',
    },
    {
      id: 'easycode',
      title: 'EasyCode',
      year: '2025–2026',
      problem:
        'Beginners often drop off when practicing algorithms alone without real-time feedback or competition.',
      summary:
        'Led development of a gamified coding platform with AI hints, structured practice tracks, and live 1v1 WebSocket coding matches backed by Java Spring Boot.',
      award: '4th Runner-Up · CSE Project Show, Fall 2025',
      tech: ['React', 'Java', 'Spring Boot', 'MySQL', 'WebSocket', 'AI Integration'],
      imageKey: 'project2',
      // TODO: Add live demo URL for EasyCode when deployed
      liveUrl: undefined,
      githubUrl: 'https://github.com/A-I-B-M/Easycode-backend',
    },
    {
      id: 'niramoy',
      title: 'Niramoy',
      year: '2025',
      problem:
        'Patients searching across separate hospitals struggle to figure out which specialist matches their symptoms.',
      summary:
        'Built a multi-hospital management web app that unifies hospital directories and recommends the right doctor from patient-entered symptoms.',
      award: '3rd Runner-Up · CSE Project Show, Spring 2025',
      tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
      imageKey: 'project3',
      // TODO: Add live demo URL for Niramoy when deployed
      liveUrl: undefined,
      githubUrl: 'https://github.com/A-I-B-M/Niramoy-',
    },
  ] satisfies FeaturedProject[],

  otherProjects: [
    {
      id: 'tic-tac-toe',
      title: 'Tic Tac Toe',
      description: 'Interactive browser game with win detection and clean state reset.',
      tech: ['JavaScript', 'HTML', 'CSS'],
      // TODO: Add liveUrl and githubUrl for Tic Tac Toe
      liveUrl: undefined,
      githubUrl: undefined,
    },
    {
      id: 'quizcraft',
      title: 'QuizCraft',
      description: 'Timed quiz web app with score tracking and instant answer feedback.',
      tech: ['JavaScript', 'HTML', 'CSS'],
      // TODO: Add liveUrl and githubUrl for QuizCraft
      liveUrl: undefined,
      githubUrl: undefined,
    },
    {
      id: 'todolist',
      title: 'ToDoList',
      description: 'Lightweight task manager with local persistence and status filtering.',
      tech: ['JavaScript', 'HTML', 'CSS'],
      // TODO: Add liveUrl and githubUrl for ToDoList
      liveUrl: undefined,
      githubUrl: undefined,
    },
    {
      id: 'weathernow',
      title: 'WeatherNow',
      description: 'Live weather lookup app fetching real-time city forecasts via REST API.',
      tech: ['JavaScript', 'REST API', 'CSS'],
      // TODO: Add liveUrl and githubUrl for WeatherNow
      liveUrl: undefined,
      githubUrl: undefined,
    },
  ] satisfies CompactProject[],

  skills: {
    Languages: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'PHP'],
    Frontend: ['React.js', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Web Design'],
    Backend: ['Spring Boot', 'Node.js', 'Express.js', 'REST APIs', 'WebSocket'],
    Database: ['PostgreSQL', 'MySQL'],
    Tools: [
      'Git',
      'GitHub',
      'Docker',
      'Postman',
      'PyTorch',
      'Google Gemini API',
      'Figma',
      'Linux (Ubuntu)',
      'Jupyter Notebook',
      'Google Colab',
    ],
  } satisfies Record<SkillCategory, string[]>,

  experience: [
    {
      id: 'uga-uiu',
      role: 'Undergraduate Assistant (UGA)',
      company: 'United International University (UIU)',
      period: 'Summer 2026 – Present',
      current: true,
      bullets: [
        'Assisted undergraduate students during Software Engineering lab sessions.',
        'Guided students through practical assignments and debugging exercises.',
      ],
    },
    {
      id: 'cp-rep-uiu',
      role: 'CP Batch Representative (Batch-223)',
      company: 'United International University (UIU)',
      period: '2025 – Present',
      current: true,
      bullets: [
        'Mentored peers and junior students in Data Structures, Algorithms, and problem-solving.',
        'Helped Batch-223 students build steady practice routines on Codeforces and AtCoder.',
      ],
    },
    {
      id: 'team-lead-easycode',
      role: 'Team Lead, Software Development',
      company: 'EasyCode · UIU',
      period: 'Oct 2025 – Feb 2026',
      bullets: [
        'Led full-stack development using React, Java Spring Boot, and MySQL.',
        'Built real-time 1v1 coding contest flows over WebSocket and integrated AI assistance.',
      ],
    },
  ] satisfies ExperienceItem[],

  education: [
    {
      id: 'uiu-bsc',
      institution: 'United International University (UIU)',
      degree: 'B.Sc. in Computer Science & Engineering',
      period: 'Oct 2022 – Present',
      grade: 'CGPA 3.88',
      details: '126 / 137 credits completed',
    },
    {
      id: 'bm-hsc',
      institution: 'BM High School & College',
      degree: 'HSC (Science)',
      period: '2021',
      grade: 'GPA 5.00',
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
      id: 'uiu-scholarship',
      title: 'UIU Undergraduate Merit Scholarship (10×)',
      context: 'Awarded 10 times for academic excellence, including full 100% scholarship',
    },
    {
      id: 'iupc-2025',
      title: 'Inter-University Programming Contest (IUPC)',
      context: 'Represented United International University',
      year: '2025',
    },
    {
      id: 'cse-show-fall-2025',
      title: '4th Runner-Up, CSE Project Show (EasyCode)',
      context: 'Team UIU_Hotasha · Advanced Object Oriented Programming',
      year: 'Fall 2025',
    },
    {
      id: 'cse-show-spring-2025',
      title: '3rd Runner-Up, CSE Project Show (Niramoy)',
      context: 'Team UIU_Hotasha · Database Management System',
      year: 'Spring 2025',
    },
    {
      id: 'bm-coding-2019',
      title: 'Excellence Award, Coding Competition',
      context: 'BM High School & College',
      year: '2019',
    },
  ] satisfies AwardItem[],
} as const;
