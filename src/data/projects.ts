import { Project } from '../components/ui/ProjectCard';

export const projects: Project[] = [
  {
    id: 'project-1',
    title: "Muon Music Visualiser",
    description: [
      "Music visualizer built with Three.js",
      "Audio reactive shaders and visuals"
    ],
    tags: ["three.js", "audio", "shader", "webgl"],
    imageUrl: "/images/projects/Muon music visualiser.png",
    mediaType: "image",
    githubUrl: "https://github.com/najafmohammed/muon-music-visualizer",
    liveUrl: "https://muon-vis.netlify.app/",
    link: '/works/project-1',
    category: 'web'
  },
  
  {
    id: 'project-2',
    title: "Muon Audio Analyzer",
    description: [
      "Node-based real-time audio analysis and visualization engine built with React Flow",
      "Real-time feature extraction including FFT, RMS, spectral centroid, and beat detection using Meyda",
      "Modular library with input, audio analysis, math, logic, custom JS script, and output nodes",
      "High-performance rendering of intensive visualizations using Three.js and react-three-fiber"
    ],
    tags: ["react", "react-flow", "meyda", "three.js", "zustand", "webgl", "audio-analysis"],
    imageUrl: "/images/projects/muon music analysis.png",
    mediaType: "image",
    category: 'web',
    link: "/works/project-2",
    githubUrl: "https://github.com/najafmohammed/Muon-Audio-Analysis"
  },
  {
    id: 'project-3',
    title: "Muon Workout Tracker",
    description: [
      "Workout tracking Flutter app",
      "Focus on UI and usability"
    ],
    tags: ["flutter", "mobile"],
    liveUrl:"https://github.com/najafmohammed/muon-workout-tracker/releases",
    imageUrl: "/images/projects/muon workout tracker.png",
    mediaType: "image",
    category: 'mobile',
    link: "/works/project-3",
    githubUrl: "https://github.com/najafmohammed/muon-workout-tracker"
  },
  {
    id: 'project-4',
    title: "Cardio AI",
    description: [
      "Flutter mobile app to predict cardiovascular disease",
      "Integrated ML prediction model in-app",
      "Firebase for auth, database, notifications, and reminders"
    ],
    tags: ["flutter", "mobile", "machine-learning", "firebase"],
    imageUrl: "/images/projects/cardio_ai.png",
    mediaType: "image",
    liveUrl:"https://github.com/najafmohammed/cardio_ai/releases",
    category: 'mobile',
    link: "/works/project-4",
    githubUrl: "https://github.com/najafmohammed/cardio_ai"
  },
  {
    id: 'project-5',
    title: "Cardio AI Admin",
    description: [
      "Flutter web admin panel for Cardio AI",
      "Manage patients, doctors, and send personalized messages",
      "Deployed as a Flutter web release"
    ],
    tags: ["flutter", "web", "admin"],
    imageUrl: "/images/projects/cardio_ai_admin.png",
    mediaType: "image",
    category: 'web',
    liveUrl:"https://cardio-ai-admin.netlify.app/#/",
    link: "/works/project-5",
    githubUrl: "https://github.com/najafmohammed/cardio_ai_admin"
  },
  
  {
    id: 'project-6',
    title: "Heart Disease Prediction",
    description: [
      "Implemented multiple ML algorithms (LogReg, SVM, RF, ANN)",
      "Highest accuracy: 90% with Random Forest",
      "Dataset: UCI Heart Disease (Kaggle)"
    ],
    tags: ["machine-learning", "python", "scikit-learn", "keras", "data-analysis"],
    imageUrl: "/images/projects/heart_disease_prediction.png",
    mediaType: "image",
    category: 'data-analysis',
    liveUrl:"https://github.com/najafmohammed/Heart-Disease-Prediction/blob/main/Heart_disease_prediction.ipynb",
    link: "/works/project-6",
    githubUrl: "https://github.com/najafmohammed/Heart-Disease-Prediction"
  },
  {
    id: 'project-7',
    title: "Kalapila",
    description: [
      "First web development project",
      "Simple JS-based website","This is soo cringe"
    ],
    tags: ["web", "javascript"],
    imageUrl: "/images/projects/kalapila.png",
    liveUrl:"https://najafmohammed.github.io/Kalapila/",
    mediaType: "image",
    category: 'web',
    link: "/works/project-7",
    githubUrl: "https://github.com/najafmohammed/Kalapila"
  },
  {
    id: 'project-8',
    title: "UX Portfolio Website",
    description: [
      "Developed a personal UX portfolio site",
      "Built in collaboration with a designer"
    ],
    tags: ["web", "ui/ux", "portfolio"],
    liveUrl:"https://ux-portfolio-mu.vercel.app/home",
    imageUrl: "/images/projects/ux_portfolio.png",
    mediaType: "image",
    category: 'web',
    link: "/works/project-8",
    githubUrl: "https://github.com/HrishiMurali/UX-Portfolio"
  },
  {
    id: 'project-9',
    title: "Parts Management System",
    description: [
      "Full-stack web application designed to manage users and inventory parts with CRUD functionality",
      "Robust backend built with FastAPI, SQLAlchemy, PostgreSQL, and Pydantic validation",
      "Responsive frontend overhaul built using React, Mantine, and TypeScript",
      "Comprehensive system logging with automated history tracking (Create, Update, Delete)",
      "Thorough unit testing with pytest isolation and frontend Jest/React Testing Library suites"
    ],
    tags: ["react", "mantine", "typescript", "fastapi", "sqlalchemy", "postgresql", "docker", "pytest", "jest"],
    imageUrl: "/images/projects/parts management.png",
    mediaType: "image",
    category: 'web',
    link: "/works/project-9",
    githubUrl: "https://github.com/najafmohammed/Parts-management-system"
  },
];

export const getProjectCategories = (): string[] => {
  const categories = projects.map((project) => project.category);
  return [...new Set(categories)];
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getFilteredProjects = (category: string): Project[] => {
  if (category === 'all') {
    return projects;
  }
  return projects.filter((project) => project.category === category);
};
