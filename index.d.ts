import { FC, ReactNode } from "react";

export interface Translation {
  [key: string]: Dictionary;
}

export interface Dictionary {
  [id: string]: string;
}

export interface TranslationProviderProps {
  initialLanguage?: string;
  translation: Translation;
  children: ReactNode;
  fonts?: { [key: string]: string };
}

export interface TranslationContextProps {
  language: string;
  translate: (id: string) => string;
  changeLanguage: (lang: string) => void;
}

export declare const TranslationProvider: FC<TranslationProviderProps>;

export declare const useTranslate: () => TranslationContextProps;

export default TranslationProvider;
