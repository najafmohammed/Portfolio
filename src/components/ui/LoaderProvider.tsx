'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import Loader from "./Loader";

interface LoaderContextType {
  showLoader: (cb?: () => void) => void;
  hideLoader: (cb?: () => void) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function useLoader() {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error("useLoader must be used within LoaderProvider");
  return ctx;
}

export const LoaderProvider = ({
  children,
  initialVisible = false,
}: {
  children: React.ReactNode;
  initialVisible?: boolean;
}) => {
  const [visible, setVisible] = useState(initialVisible);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cb, setCb] = useState<(() => void) | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Show loader (optionally run cb after shown)
  const showLoader = useCallback((cb?: () => void) => {
    setVisible(true);
    if (cb) setCb(() => cb);
  }, []);

  // Hide loader (optionally run cb after hidden)
  const hideLoader = useCallback((cb?: () => void) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setVisible(false);
    if (cb) cb();
    setCb(null);
  }, []);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {visible && <Loader />}
      {children}
    </LoaderContext.Provider>
  );
};
