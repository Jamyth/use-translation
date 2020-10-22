import * as React from "react";

import { TranslationContextProps, TranslationProviderProps } from "../../index";

const { createContext, useState, useEffect } = React;

const initialState: TranslationContextProps = {
  language: "",
  translate: () => "",
  changeLanguage: () => {},
};

export const TranslationContext = createContext<TranslationContextProps>(
  initialState
);

export const TranslationProvider = ({
  initialLanguage,
  translation,
  children,
  fonts,
}: TranslationProviderProps) => {
  const [language, setLanguage] = useState(initialLanguage ?? "");
  const [font, setFont] = useState("");

  const translate = (id: string) => {
    const languagePack = translation?.[language];
    if (!languagePack) {
      console.error(`Language Pack for ${language} is not found.`);
    }
    if (!languagePack?.[id]) {
      console.error(`Translation is not found.`);
    }

    return languagePack?.[id] ?? `TRANSLATION NOT FOUND. ERR${id}`;
  };

  const changeLanguage = (language: string) => {
    setLanguage(language);
    localStorage.reactLang = language;
  };

  useEffect(() => {
    const language = localStorage.reactLang;
    if (!language) {
      return;
    }
    setLanguage(language);
  }, []);

  useEffect(() => {
    if (fonts) {
      let newFont = fonts?.[language];
      document.body.classList.remove(font);
      document.body.classList.add(newFont);
      setFont(newFont);
    }
  }, [language]);

  return (
    <TranslationContext.Provider
      value={{
        translate,
        changeLanguage,
        language,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
