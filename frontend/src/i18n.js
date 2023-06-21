import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import i18nBackend from "i18next-http-backend";

i18n.use(i18nBackend).use(LanguageDetector).use(initReactI18next).init({
  debug: false,
  fallbackLang: "en",
  lng: "pl",
});

// i18n.changeLanguage("pl");

export default i18n;
