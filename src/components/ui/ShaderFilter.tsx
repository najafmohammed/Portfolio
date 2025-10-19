export interface ShaderExperiment {
  id: string;
  title: string;
  description: string[];
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
    description: [
      "3D Perlin noise visualization",
      "Built with Three.js and GLSL"
    ],
    tags: ["three.js", "glsl", "shader"],
    imageUrl: "/images/shaders/perlin-3d.png",
    githubUrl: "https://github.com/najafmohammed/Perlin-3d",
    liveUrl: "https://perlin-3d.vercel.app",
    shaderUrl: "/shaders/perlin-3d"
  },
  {
    id: 'shader-2',
    experimentId: 'perlin-2d',
    title: "Perlin 2D",
    description: [
      "2D Perlin noise visualization",
      "Shader-based grid distortion experiment"
    ],
    tags: ["three.js", "glsl", "shader"],
    imageUrl: "/videos/perlin_2D.gif",
    githubUrl: "https://github.com/najafmohammed/Perlin-2d",
    liveUrl: "https://perlin-2d.vercel.app",
    shaderUrl: "/shaders/perlin-2d"
  },
];

export const getShaderExperimentById = (id: string): ShaderExperiment | undefined => {
  return shaderExperiments.find((experiment) => experiment.id === id);
};
