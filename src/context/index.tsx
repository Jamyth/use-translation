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
  initialLanguage = "en",
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
    setGlobalFont();
    localStorage.setItem("reactLang", language);
  };

  const setGlobalFont = () => {
    let newFont = fonts?.[language];
    if (!newFont) {
      return;
    }
    const classList = document.body.classList;
    if (font && classList.contains(font)) {
      classList.remove(font);
    }
    classList.add(newFont);
    setFont(newFont);
  };

  useEffect(() => {
    const language = localStorage.getItem("reactLang") || initialLanguage;
    changeLanguage(language);
  }, []);

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
