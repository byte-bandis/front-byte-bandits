import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cookies from "js-cookie";
import enTranslations from "../locales/en/enTranslation.json";
import esTranslations from "../locales/es/esTranslation.json";

const languageCookie = Cookies.get("iCraftYou-locale") || "en";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    es: {
      translation: esTranslations,
    },
  },
  lng: languageCookie,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },

  detection: {
    order: ["cookie"],
    caches: ["cookie"],
  },
});

i18n.on("languageChanged", (lng) => {
  Cookies.set("iCraftYou-locale", lng, { expires: 365 });
});

export default i18n;
