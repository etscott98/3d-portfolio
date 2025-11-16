'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  progress: number;
  setAssetLoaded: (assetName: string) => void;
  setTotalAssets: (count: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadedAssets, setLoadedAssets] = useState<Set<string>>(new Set());
  const [totalAssets, setTotalAssetsState] = useState(1);
  
  const progress = (loadedAssets.size / totalAssets) * 100;
  const isLoading = loadedAssets.size < totalAssets;
  
  const setAssetLoaded = useCallback((assetName: string) => {
    setLoadedAssets((prev) => {
      const newSet = new Set(prev);
      newSet.add(assetName);
      return newSet;
    });
  }, []);
  
  const setTotalAssets = useCallback((count: number) => {
    setTotalAssetsState(count);
  }, []);
  
  return (
    <LoadingContext.Provider value={{ isLoading, progress, setAssetLoaded, setTotalAssets }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useAssetLoader() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useAssetLoader must be used within LoadingProvider');
  }
  return context;
}

