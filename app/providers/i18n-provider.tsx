// app/providers/i18n-provider.tsx
"use client";

import { createContext, useContext } from 'react';

const DictionaryContext = createContext<Record<string, any> | null>(null);

export function useDictionary() {
  const dict = useContext(DictionaryContext);
  if (!dict) {
    throw new Error('useDictionary must be used within I18nProvider');
  }
  return dict;
}

interface I18nProviderProps {
  children: React.ReactNode;
  dictionary: Record<string, any>;
}

export function I18nProvider({ children, dictionary }: I18nProviderProps) {

  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}