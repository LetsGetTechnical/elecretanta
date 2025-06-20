'use client';

import { createContext, useContext } from 'react';
import useLocalStorage from '@/hooks/useLocalStorage';

export const SnowOverlayContext = createContext({
  isSnowing: false,
  toggleSnowSetting: () => {},
});

export const SnowOverlayProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSnowing, setIsSnowing] = useLocalStorage<boolean>('isSnowing', true);

  const toggleSnowSetting = () => {
    const newValue = !isSnowing;
    setIsSnowing(newValue);
    if (typeof window !== 'undefined') {
      setIsSnowing(newValue);
    }
  };
  const value = {
    isSnowing,
    toggleSnowSetting,
  };
  return (
    <SnowOverlayContext.Provider value={value}>
      {children}
    </SnowOverlayContext.Provider>
  );
};

export const useSnowOverlay = () => {
  const context = useContext(SnowOverlayContext);
  if (context === undefined) {
    throw new Error('useSnow must be used within a SnowOverlayProvider');
  }
  return context;
};
