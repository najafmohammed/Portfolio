'use client';

import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch((err: Error) => console.log(err));
        setIsPlaying(true);
      }
    }
  };

  // Add event listener for when audio ends to repeat it
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        if (isPlaying) {
          audio.currentTime = 0; // Reset to beginning
          audio.play().catch((err: Error) => console.log(err));
        }
      };
      
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [isPlaying]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, audioRef }}>
      {children}
    </AudioContext.Provider>
  );
};