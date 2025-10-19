export interface ShaderExperiment {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  experimentId: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  shaderUrl: string;
}

export const shaderExperiments: ShaderExperiment[] = [
  {
    id: 'shader-1',
    experimentId: 'perlin-3d',
    title: "Perlin 3D",
    description: "A 3D Perlin noise visualization.",
    tags: ["three.js", "glsl", "shader"],
    imageUrl: "/videos/perlin_3D.gif",
    githubUrl: "https://github.com/najafmohammed/Perlin-3d",
    shaderUrl: "/shaders/perlin-3d"
  },
  {
    id: 'shader-2',
    experimentId: 'perlin-2d',
    title: "Perlin 2D",
    description: "A 2D Perlin noise visualization.",
    tags: ["three.js", "glsl", "shader"],
    imageUrl: "/videos/perlin_2D.gif",
    githubUrl: "https://github.com/najafmohammed/Perlin-2d",
    shaderUrl: "/shaders/perlin-2d"
  },
  {
    id: 'shader-3',
    experimentId: 'muon-music-visualizer',
    title: "Muon Music Visualizer",
    description: "Music visualizer using 3.js.",
    tags: ["three.js", "audio", "shader"],
    imageUrl: "/videos/muon_music.gif",
    githubUrl: "https://github.com/najafmohammed/muon-music-visualizer",
    shaderUrl: "/shaders/muon-music"
  }
];

export const getShaderExperimentById = (id: string): ShaderExperiment | undefined => {
  return shaderExperiments.find((experiment) => experiment.id === id);
};
