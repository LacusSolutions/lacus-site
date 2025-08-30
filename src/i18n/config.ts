import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import ptTranslations from './locales/pt.json';

const resources = {
  en: {
    translation: enTranslations,
  },
  pt: {
    translation: ptTranslations,
  },
};

// Custom language detector that considers Portuguese-speaking countries
const customLanguageDetector = {
  name: 'customLanguageDetector',
  lookup() {
    // Get browser language
    const browserLang = navigator.language || navigator.languages?.[0];
    
    // Portuguese-speaking countries/regions
    const portugueseRegions = [
      'pt', 'pt-BR', 'pt-PT', 'pt-AO', 'pt-MZ', 'pt-CV', 'pt-GW', 'pt-ST', 'pt-TL'
    ];
    
    // Check if user is from Portuguese-speaking region
    if (browserLang && portugueseRegions.some(region => 
      browserLang.toLowerCase().startsWith(region.toLowerCase())
    )) {
      return 'pt';
    }
    
    // Default to English for rest of the world
    return 'en';
  },
  cacheUserLanguage() {
    // Optional: Cache the language selection
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    detection: {
      order: ['customLanguageDetector', 'localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },
  });

// Register custom detector
i18n.services.languageDetector.addDetector(customLanguageDetector);

export default i18n;