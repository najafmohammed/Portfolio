import Link from "next/link";
import Image from "next/image";
import Scene from "@/components/three/Scene";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import FollowCursor from "@/components/ui/Cursor";

export default function Home() {
  // Get featured projects for the homepage
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {<FollowCursor />}
      {/* Hero Section with Three.js Scene */}
      <Scene />

      <section id="about" className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-gray-400 leading-relaxed">
              I’m a full-stack developer with 3.5+ years of experience building scalable web systems, who thrives at the intersection of <span className="text-white">software engineering, creative coding, and AI</span>.
              I build <span className="text-white">scalable web systems</span> and <span className="text-white">experimental, interactive interfaces</span>, always pushing technology beyond “functional” — it has to <span className="text-white">feel</span> good too.
            </p>

            <p className="text-gray-400 leading-relaxed mt-4">
              I stay on the <span className="text-white">bleeding edge of tech</span>, exploring LLMs, generative tools, and intelligent interfaces.
            </p>

            <p className="text-gray-400 leading-relaxed mt-4">
              TL;DR — Driven by curiosity, fueled by music, and hopelessly attracted to shiny new tech.
            </p>

          </div>

          <div className="md:w-1/2 flex flex-col items-center">
            <a
              href="https://spotify-github-profile.kittinanx.com/api/view?uid=31ug3hobtbmx5vxfz743glp3ri6i&redirect=true"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Image
                src="https://spotify-github-profile.kittinanx.com/api/view?uid=31ug3hobtbmx5vxfz743glp3ri6i&cover_image=true&theme=default&show_offline=true&background_color=121212&interchange=false&profanity=false&bar_color=1183ee&bar_color_cover=false"
                alt="Spotify Profile Widget"
                className="rounded-lg shadow-lg"
              />
            </a>
            <p className="text-gray-500 text-sm mt-2 text-center">
              <a
                href="https://open.spotify.com/user/31ug3hobtbmx5vxfz743glp3ri6i"
                className="hover:text-green-400 transition-colors"
                target="_blank"
              >
                Follow me on Spotify →
              </a>
            </p>
          </div>
        </div>
      </section>


      {/* Works Section */}
      <section id="works" className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Highlighted Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A selection of my recent projects and experiments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/works"
              className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
            >
              View All Projects
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Muon Labs Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Muon Labs</h2>
              <p className="text-gray-400 mb-6">
                A playground for WebGL and shader experiments. Explore the possibilities of
                real-time graphics programming and creative coding with GLSL shaders.
              </p>
              <Link
                href="/muon-labs"
                className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Visit Muon Labs
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
            <div className="relative rounded-lg overflow-hidden bg-gradient-to-br flex items-center justify-center w-full h-[250px] md:h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/videos/perlin_2D.gif"
                  alt="Perlin Noise 2D Visualization"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                  unoptimized={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
