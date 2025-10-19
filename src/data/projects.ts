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
    title: "UX Portfolio Website",
    description: [
      "Developed a personal UX portfolio site",
      "Built in collaboration with a designer"
    ],
    tags: ["web", "ui/ux", "portfolio"],
    imageUrl: "/images/projects/ux_portfolio.png",
    mediaType: "image",
    category: 'web',
    link: "/works/project-2",
    githubUrl: "https://github.com/HrishiMurali/UX-Portfolio"
  },
  {
    id: 'project-3',
    title: "Muon Workout Tracker",
    description: [
      "Workout tracking Flutter app",
      "Focus on UI and usability"
    ],
    tags: ["flutter", "mobile"],
    imageUrl: "/images/projects/muon workout tracker.png",
    mediaType: "image",
    category: 'mobile',
    link: "/works/project-3",
    githubUrl: "https://github.com/najafmohammed/muon-workout-tracker"
  },
  {
    id: 'project-4',
    title: "Kalapila",
    description: [
      "First web development project",
      "Simple JS-based website","This is soo cringe"
    ],
    tags: ["web", "javascript"],
    imageUrl: "/images/projects/kalapila.png",
    mediaType: "image",
    category: 'web',
    link: "/works/project-4",
    githubUrl: "https://github.com/najafmohammed/Kalapila"
  },
  {
    id: 'project-5',
    title: "Cardio AI",
    description: [
      "Flutter mobile app to predict cardiovascular disease",
      "Integrated ML prediction model in-app",
      "Firebase for auth, database, notifications, and reminders"
    ],
    tags: ["flutter", "mobile", "machine-learning", "firebase"],
    imageUrl: "/images/projects/cardio_ai.png",
    mediaType: "image",
    category: 'mobile',
    link: "/works/project-5",
    githubUrl: "https://github.com/najafmohammed/cardio_ai"
  },
  {
    id: 'project-6',
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
    link: "/works/project-6",
    githubUrl: "https://github.com/najafmohammed/cardio_ai_admin"
  },
  
  {
    id: 'project-7',
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
    link: "/works/project-7",
    githubUrl: "https://github.com/najafmohammed/Heart-Disease-Prediction"
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
