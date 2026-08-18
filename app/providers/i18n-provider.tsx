// app/providers/i18n-provider.tsx
"use client";

import { createContext, useContext } from "react";

type Dictionary = object;

const DictionaryContext = createContext<Dictionary | null>(null);

export function useDictionary() {
  const dict = useContext(DictionaryContext);
  if (!dict) {
    throw new Error("useDictionary must be used within I18nProvider");
  }
  return dict;
}

interface I18nProviderProps {
  children: React.ReactNode;
  dictionary: Dictionary;
}

export function I18nProvider({ children, dictionary }: I18nProviderProps) {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  );
}
