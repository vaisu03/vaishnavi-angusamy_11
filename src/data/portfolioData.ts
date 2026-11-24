export interface HeroFactItem {
  value: string;
  label: string;
  detail: string;
}

export interface SkillGroup {
  id: string;
  category: 'languages' | 'web' | 'databases' | 'tools' | 'concepts';
  title: string;
  items: string[];
}

export interface InternshipItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  highlights: string[];
}

export interface AcademicProjectItem {
  id: string;
  kind: 'academic';
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface InternshipShowcaseItem {
  id: string;
  kind: 'internship';
  title: string;
  context: string;
  period: string;
  image: string;
  imageAlt: string;
  description: string;
  technologies: string[];
}

export type ShowcaseItem = AcademicProjectItem | InternshipShowcaseItem;

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer?: string;
}

export const PROFILE = {
  name: 'Vaishnavi A',
  headline: 'MCA Graduate | Full-Stack Developer | AI Application Development',
  introParagraph1:
    'I am an MCA graduate with hands-on experience in Full Stack Web Development, Front-End Development, and AI-powered application development through multiple internships.',
  introParagraph2:
    'I enjoy building scalable applications, solving real-world problems and continuously learning modern technologies.',
  email: 'vaish6819@gmail.com',
  phone: '+91 9047212170',
  linkedin: 'https://linkedin.com/in/vaishnavi-angusamy-891869276/',
  github: 'https://github.com/vaisu03',
};

export const HERO_FACTS: HeroFactItem[] = [
  {
    value: '8.3',
    label: 'MCA CGPA',
    detail: 'Ethiraj College for Women (2024–2026)',
  },
  {
    value: '7.5',
    label: 'B.Sc. CS CGPA',
    detail: 'Alagappa Govt. Arts College (2021–2024)',
  },
  {
    value: '3',
    label: 'Internships',
    detail: 'AI, Front-End & MERN Stack',
  },
  {
    value: '5',
    label: 'Certifications',
    detail: 'SWAYAM, Forage, Novi Tech & Python',
  },
];

export const ABOUT_FOCUS = [
  {
    index: '01',
    title: 'Full-Stack Web Development',
    description:
      'Building responsive web applications with authentication, database integration, and REST APIs using React.js, Node.js, Express.js, PHP, MongoDB, and MySQL.',
  },
  {
    index: '02',
    title: 'Front-End Development',
    description:
      'Designing and implementing responsive user interfaces with HTML, CSS, JavaScript, and React.js, focusing on usability and clean debugging practices.',
  },
  {
    index: '03',
    title: 'AI & Data-Driven Applications',
    description:
      'Applying Python, Pandas, and Scikit-learn for data preprocessing, feature selection, classification modeling, and AI-powered application modules.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    category: 'languages',
    title: 'Programming Languages',
    items: ['Python', 'JavaScript', 'SQL', 'PHP'],
  },
  {
    id: 'web',
    category: 'web',
    title: 'Web Technologies',
    items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js'],
  },
  {
    id: 'databases',
    category: 'databases',
    title: 'Databases',
    items: ['MongoDB', 'MySQL'],
  },
  {
    id: 'tools',
    category: 'tools',
    title: 'Tools',
    items: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
  {
    id: 'concepts',
    category: 'concepts',
    title: 'Concepts',
    items: ['SDLC', 'REST APIs', 'Responsive Web Design', 'Debugging', 'Problem Solving'],
  },
];

export const INTERNSHIPS: InternshipItem[] = [
  {
    id: 'exp-aadhavan',
    role: 'AI Intern',
    company: 'Aadhavan Consultancy LLP',
    location: 'Karaikudi',
    period: 'December 2025 – April 2026',
    highlights: [
      'Developed AI-powered marine logistics modules for shipment and fleet management.',
      'Worked with modern web technologies and collaborated on real-world software development.',
      'Improved problem-solving, debugging, API integration and project development skills.',
    ],
  },
  {
    id: 'exp-ibm',
    role: 'Front-End Development Intern',
    company: 'IBM SkillBuild',
    period: 'August 2025 – September 2025',
    highlights: [
      'Designed and developed the Smart Study Planner web application.',
      'Built responsive user interfaces using HTML, CSS and JavaScript.',
      'Improved UI design, debugging and front-end development practices.',
    ],
  },
  {
    id: 'exp-zaalima',
    role: 'Web Development Intern',
    company: 'Zaalima Development Pvt. Ltd.',
    period: 'March 2025 – June 2025',
    highlights: [
      'Developed an E-commerce Clothing Platform using the MERN Stack.',
      'Implemented authentication, product management and responsive UI components.',
      'Worked with MongoDB, Express.js, React.js and Node.js.',
    ],
  },
];

export const ACADEMIC_PROJECTS: AcademicProjectItem[] = [
  {
    id: 'heart-failure-prediction',
    kind: 'academic',
    title: 'Heart Failure Prediction System',
    subtitle: 'AI & Machine Learning Healthcare Classification',
    image: '/src/assets/images/project_heart_failure_ml_1795535187425.jpg',
    imageAlt:
      'Conceptual illustration of Heart Failure Prediction System healthcare machine learning analytics',
    description:
      'Built an AI-based prediction system using Machine Learning algorithms to analyze healthcare data.',
    highlights: [
      'Performed data preprocessing.',
      'Conducted feature selection.',
      'Trained and evaluated classification models.',
      'Compared model performance using Precision, Recall, F1-Score and Confusion Matrix.',
      'Developed an interactive prediction interface for heart failure risk prediction.',
    ],
    technologies: ['Python', 'Machine Learning', 'Scikit-learn', 'Pandas'],
  },
  {
    id: 'kids-story-platform',
    kind: 'academic',
    title: 'Kids Story Reading Platform',
    subtitle: 'Interactive Digital Storybook Web Application',
    image: '/src/assets/images/project_kids_story_platform_1795535186992.jpg',
    imageAlt:
      'Conceptual illustration of Kids Story Reading Platform with interactive digital storybooks',
    description:
      'Developed a web-based platform where children can read and explore interactive digital storybooks.',
    highlights: [
      'Implemented user authentication.',
      'Added story categorization.',
      'Implemented search functionality.',
      'Created responsive web pages.',
    ],
    technologies: ['HTML', 'CSS', 'PHP', 'JavaScript', 'MySQL'],
  },
];

export const INTERNSHIP_SHOWCASE: InternshipShowcaseItem[] = [
  {
    id: 'marine-logistics-tool',
    kind: 'internship',
    title: 'Marine Logistics Tool',
    context: 'Developed during AI internship at Aadhavan Consultancy LLP',
    period: 'December 2025 – April 2026',
    image: '/src/assets/images/project_marine_logistics_1795535188269.jpg',
    imageAlt: 'Conceptual illustration of Marine Logistics Tool for cargo ships and maritime logistics',
    description: 'AI-powered marine logistics modules for shipment and fleet management.',
    technologies: ['AI Modules', 'Web Technologies', 'API Integration'],
  },
  {
    id: 'smart-study-planner',
    kind: 'internship',
    title: 'Smart Study Planner',
    context: 'Developed during IBM SkillBuild Front-End Development internship',
    period: 'August 2025 – September 2025',
    image: '/src/assets/images/project_smart_study_planner_1795535188391.jpg',
    imageAlt: 'Conceptual illustration of Smart Study Planner calendar and productivity dashboard',
    description:
      'A web application for planning study schedules using responsive HTML, CSS and JavaScript interfaces.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'ecommerce-clothing-platform',
    kind: 'internship',
    title: 'E-Commerce Clothing Platform',
    context: 'Developed during Zaalima Development internship',
    period: 'March 2025 – June 2025',
    image: '/src/assets/images/project_ecommerce_clothing_1795535188231.jpg',
    imageAlt: 'Conceptual illustration of E-Commerce Clothing Platform shopping interface',
    description:
      'A MERN-stack clothing e-commerce platform with authentication, product management and responsive interfaces.',
    technologies: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'edu-mca',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Ethiraj College for Women, Chennai',
    period: '2024–2026',
    cgpa: '8.3',
  },
  {
    id: 'edu-bsc',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Alagappa Government Arts College, Karaikudi',
    period: '2021–2024',
    cgpa: '7.5',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  { id: 'cert-swayam', name: 'Web Technology', issuer: 'SWAYAM' },
  { id: 'cert-novi', name: 'Data Analytics', issuer: 'Novi Tech' },
  { id: 'cert-hpe', name: 'HPE Software Engineering', issuer: 'Forage' },
  { id: 'cert-python', name: 'Python Programming' },
  { id: 'cert-eda', name: 'Exploratory Data Analysis', issuer: 'Forage' },
];
