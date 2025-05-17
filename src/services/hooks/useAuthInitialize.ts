// src/hooks/useAuthInitialize.ts
import useAuthStore from '@/src/stores/useAuthStore';
import { useEffect, useRef } from 'react';

export function useAuthInitialize() {
  const initialize = useAuthStore((state) => state.initialize);
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    // Evite inicializar mais de uma vez
    if (hasInitialized.current) return;
    
    hasInitialized.current = true;
    initialize();
  }, [initialize]);
}