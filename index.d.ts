import { FC, ReactNode } from 'react';

export interface TranslationProviderProps {
  initialLanguage?: string;
  translation: any;
  children: ReactNode;
}

export interface TranslationContextProps {
  language: string;
  translate: (id: string) => string;
  changeLanguage: (lang: string) => void;
}

declare const TranslationProvider: FC<TranslationProviderProps>;

export default TranslationProvider;
