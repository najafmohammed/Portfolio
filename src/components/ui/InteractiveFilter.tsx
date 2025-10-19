'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface ShaderFilterProps {
  tags: string[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

const ShaderFilter = ({ tags, selectedTag, onSelectTag }: ShaderFilterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeButton = containerRef.current?.querySelector('.active-tag-button');
    if (activeButton && activeBgRef.current) {
      gsap.to(activeBgRef.current, {
        x: (activeButton as HTMLElement).offsetLeft,
        width: (activeButton as HTMLElement).offsetWidth,
        duration: 0.3,
        ease: 'power3.inOut',
      });
    }
  }, [selectedTag, tags]);

  return (
    <div ref={containerRef} className="relative mb-12 flex items-center justify-center p-1 bg-gray-900 rounded-full">
      <div ref={activeBgRef} className="absolute left-0 top-0 h-full bg-indigo-600 rounded-full z-0" />
      {['All', ...tags].map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className={`relative z-10 px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
            selectedTag === tag ? 'text-white active-tag-button' : 'text-gray-400 hover:text-white'
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default ShaderFilter; 