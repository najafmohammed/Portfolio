'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAudio } from '@/components/ui/AudioProvider';

interface HeaderProps {
  isHomePage?: boolean;
}

const Header = ({ isHomePage = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isPlaying, toggleAudio, audioRef } = useAudio();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-600 ${menuOpen
          ? 'bg-transparent'
          : isScrolled
            ? 'bg-black/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
    >
      <audio ref={audioRef} src="/audio/lofi.mp3" />


      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl font-bold transition-colors ${isScrolled || !isHomePage ? 'text-white' : 'text-black'
            } hover:text-gray-300`}
        >
          Najaf Mohammed
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Home', 'Works', 'Muon Labs'].map((label) => (
            <Link
              key={label}
              href={label === 'Home' ? '/' : `/${label.toLowerCase().replace(' ', '-')}`}
              className={`transition-colors ${isScrolled || !isHomePage ? 'text-white' : 'text-black'
                } hover:text-neutral-100`}
            >
              {label}
            </Link>
          ))}

          {/* Audio toggle */}
          <button
            onClick={toggleAudio}
            className={`p-2 rounded-full transition-all duration-300 ${isScrolled || !isHomePage
                ? 'text-white'
                : ' text-black'
              }`}
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${(isScrolled || !isHomePage) ? 'text-white' : 'text-black'}`}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm flex justify-end"
            onClick={() => setMenuOpen(false)}
          >
            <nav
              className="relative w-72 bg-gray-900 h-full p-8 flex flex-col gap-6 transform translate-x-0 animate-slideIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-5 right-5 text-gray-400 hover:text-white"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {['Home', 'Works', 'Muon Labs'].map((label) => (
                <Link
                  key={label}
                  href={label === 'Home' ? '/' : `/${label.toLowerCase().replace(' ', '-')}`}
                  className="text-white text-lg py-2"
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              <button
                onClick={() => {
                  toggleAudio();
                  setMenuOpen(false);
                }}
                className="flex items-center gap-3 text-white text-lg py-2"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
                <span>{isPlaying ? 'Pause Audio' : 'Play Audio'}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
