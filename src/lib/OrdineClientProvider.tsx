"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import OrdineClient from './OrdineClient';

interface OrdineClientContextValue {
  ordineClient: typeof OrdineClient | null;
  isInitialized: boolean;
}

export const OrdineClientContext = createContext<OrdineClientContextValue | null>(null);

interface OrdineClientProviderProps {
  children: ReactNode;
}

export function OrdineClientProvider({ children }: OrdineClientProviderProps) {
  const [ordineClient, setOrdineClient] = useState<typeof OrdineClient | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeClient = async () => {
      try {
        await OrdineClient.initialize();
        setOrdineClient(OrdineClient);
        setIsInitialized(true);
      } catch (error) {
        console.error('Error initializing OrdineClient:', error);
      }
    };

    initializeClient();
  }, []);

  return (
    <OrdineClientContext.Provider value={{ ordineClient, isInitialized }}>
      {children}
    </OrdineClientContext.Provider>
  );
}

