"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationProvider = exports.TranslationContext = void 0;
const React = require("react");
const { createContext, useState, useEffect } = React;
const initialState = {
    language: "",
    translate: () => "",
    changeLanguage: () => { },
};
exports.TranslationContext = createContext(initialState);
exports.TranslationProvider = ({ initialLanguage = "en", translation, children, fonts, }) => {
    const [language, setLanguage] = useState(initialLanguage !== null && initialLanguage !== void 0 ? initialLanguage : "");
    const [font, setFont] = useState("");
    const translate = (id) => {
        var _a;
        const languagePack = translation === null || translation === void 0 ? void 0 : translation[language];
        if (!languagePack) {
            console.error(`Language Pack for ${language} is not found.`);
        }
        if (!(languagePack === null || languagePack === void 0 ? void 0 : languagePack[id])) {
            console.error(`Translation is not found.`);
        }
        return (_a = languagePack === null || languagePack === void 0 ? void 0 : languagePack[id]) !== null && _a !== void 0 ? _a : `TRANSLATION NOT FOUND. ERR${id}`;
    };
    const changeLanguage = (language) => {
        setLanguage(language);
        setGlobalFont();
        localStorage.setItem("reactLang", language);
    };
    const setGlobalFont = () => {
        let newFont = fonts === null || fonts === void 0 ? void 0 : fonts[language];
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
    return (React.createElement(exports.TranslationContext.Provider, { value: {
            translate,
            changeLanguage,
            language,
        } }, children));
};
//# sourceMappingURL=index.js.map