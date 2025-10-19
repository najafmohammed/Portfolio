'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { shaderExperiments } from '@/data/shaderExperiments';

export default function MuonLabsPage() {
  const [activeExperiment, setActiveExperiment] = useState<string | null>(null);
  
  const handleExperimentClick = (experimentId: string) => {
    setActiveExperiment(experimentId);
  };

  const selectedExperiment = shaderExperiments.find(
    (exp) => exp.experimentId === activeExperiment
  );

  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Muon Labs</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A playground for WebGL and shader experiments.
          </p>
        </div>

        {/* Active Shader Experiment */}
        {activeExperiment ? (
          <div className="mb-16">
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              
              {selectedExperiment && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedExperiment.title}</h2>
                  <p className="text-gray-400 mb-4">{selectedExperiment.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedExperiment.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-block rounded-full bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setActiveExperiment(null)}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center"
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
                    Back to all experiments
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {shaderExperiments.map((experiment) => (
              <div 
                key={experiment.id} 
                className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer hover:transform hover:scale-[1.02] transition-all duration-300"
                onClick={() => handleExperimentClick(experiment.experimentId)}
              >
                <div className="relative aspect-video">
                  <Image
                    src={experiment.imageUrl}
                    alt={experiment.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{experiment.title}</h3>
                    
                    <div className="flex flex-wrap gap-2">
                      {experiment.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-block rounded-full bg-purple-900/50 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-purple-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
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
