import { useContext } from 'react';
import { OrdineClientContext } from '@/lib/OrdineClientProvider';

export function useOrdineClient() {
  const context = useContext(OrdineClientContext);
  if (!context) {
    throw new Error('useOrdineClient must be used within an OrdineClientProvider');
  }
  return context;
}

