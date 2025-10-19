'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectFilter from '@/components/ui/ProjectFilter';
import { projects, getProjectCategories } from '@/data/projects';

export default function WorksPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = getProjectCategories();
  
  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const handleFilterChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Works</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of projects spanning web development, interactive experiences, 
            and creative coding experiments.
          </p>
        </div>

        <ProjectFilter 
          categories={categories} 
          onFilterChange={handleFilterChange} 
          activeCategory={activeCategory} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-medium mb-4">No projects found</h3>
            <p className="text-gray-400 mb-8">
              No projects match the selected category. Try selecting a different category.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              View All Projects
            </button>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
