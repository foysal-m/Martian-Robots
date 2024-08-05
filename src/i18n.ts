// src/i18n.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "./locales/robot.json";
// Import other translations if needed

i18n
  .use(initReactI18next) // Pass the i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      // Add other languages here if needed
    },
    lng: "en", // Default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // React already safe from XSS
    },
  });

export default i18n;
