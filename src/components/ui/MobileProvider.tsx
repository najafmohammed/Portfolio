'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MobileContextType {
  isMobile: boolean;
  screenWidth: number;
  screenHeight: number;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const useMobile = () => {
  const context = useContext(MobileContext);
  if (context === undefined) {
    throw new Error('useMobile must be used within a MobileProvider');
  }
  return context;
};

interface MobileProviderProps {
  children: ReactNode;
  breakpoint?: number; // Default mobile breakpoint (768px for md)
}

export const MobileProvider: React.FC<MobileProviderProps> = ({ 
  children, 
  breakpoint = 768 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenWidth(width);
      setScreenHeight(height);
      setIsMobile(width < breakpoint);
    };

    // Check on mount
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup listener
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return (
    <MobileContext.Provider value={{ isMobile, screenWidth, screenHeight }}>
      {children}
    </MobileContext.Provider>
  );
};