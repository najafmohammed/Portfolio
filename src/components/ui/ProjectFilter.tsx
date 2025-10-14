import React from 'react';

interface ProjectFilterProps {
  categories: string[];
  onFilterChange: (category: string) => void;
  activeCategory: string;
}

const ProjectFilter = ({ categories, onFilterChange, activeCategory }: ProjectFilterProps) => {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={() => onFilterChange('all')}
        className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
          activeCategory === 'all'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        All
      </button>
      
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
            activeCategory === category
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
