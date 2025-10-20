import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const artworks = [
  { id: 'artwork-1', title: "Hinata", imageUrl: "/images/artwork/hinata.png" },
  { id: 'artwork-2', title: "Toji", imageUrl: "/images/artwork/toji.jpg" },
  { id: 'artwork-3', title: "Fubuki", imageUrl: "/images/artwork/fubuki.jpg" },
];

export default function ArtworkGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [fullscreen, setFullscreen] = useState<null | typeof artworks[0]>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const cells = Array.from(gridRef.current.querySelectorAll('.art-grid-cell'));
    cells.forEach((cell, i) => {
      cell.classList.add('opacity-0', 'scale-95');
      setTimeout(() => {
        cell.classList.remove('opacity-0', 'scale-95');
        cell.classList.add('opacity-100', 'scale-100');
      }, 140 * i);
    });
  }, []);

  // ESC to close modal
  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fullscreen]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div
        ref={gridRef}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl w-full px-5 py-16"
      >
        {artworks.map((art, i) => (
          <div
            key={art.id}
            className="art-grid-cell transition-all duration-700 ease-[cubic-bezier(.2,1,.3,1)] opacity-0 scale-95 rounded-xl overflow-hidden shadow-lg bg-neutral-900 cursor-pointer"
            style={{ transitionDelay: `${i * 140}ms` }}
            onClick={() => setFullscreen(art)}
          >
            <Image
              src={art.imageUrl}
              alt={art.title}
              className="w-full h-64 object-cover object-center pointer-events-none select-none"
              draggable={false}
            />
            <div className="p-4 text-white text-lg text-center font-semibold"
                 style={{
                   background: 'linear-gradient(to top, rgba(15,15,15,0.54) 70%, transparent 100%)'
                 }}>
              {art.title}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen modal overlay */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          style={{ animation: 'fadeIn .18s both' }}
          onClick={() => setFullscreen(null)}
        >
          <div
            className="relative w-full max-w-3xl transition-transform duration-500"
            style={{
              animation: 'zoomIn .28s both'
            }}
            onClick={e => e.stopPropagation()}
          >
            <Image
              src={fullscreen.imageUrl}
              alt={fullscreen.title}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              style={{
                boxShadow: '0 8px 32px #0006'
              }}
            />
            <div className="py-6 text-center text-white text-2xl font-bold"
              style={{ background: 'linear-gradient(to top, rgba(34,34,34,0.3), transparent 80%)' }}>
              {fullscreen.title}
            </div>
            <button
              className="absolute top-3 right-5 text-3xl text-white hover:text-gray-400"
              onClick={() => setFullscreen(null)}
              aria-label="Close"
              tabIndex={0}
            >×</button>
          </div>
          <style jsx global>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes zoomIn { from { transform: scale(.93); opacity: 0 } to { transform: scale(1); opacity: 1 } }
            .art-grid-cell {
              opacity: 0;
              transform: scale(.95);
            }
            .art-grid-cell.opacity-100 {
              opacity: 1;
              transform: scale(1);
            }
          `}</style>
        </div>
      )}
    </div>
  );
}