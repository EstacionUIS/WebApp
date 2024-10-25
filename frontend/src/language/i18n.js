import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Function helper for importing
const resources = {};

Object.entries(
  import.meta.glob('../../public/locales/**/*.json', { eager: true }))
    .forEach(([key, value]) => {
    try {
      const [, language, namespace] = key.split('/').slice(-3);

    // Initialize the language object if it doesn't exist
    if (!resources[language]) {
      resources[language] = {};
    }

    // Add the namespace to the language object
    resources[language][namespace.replace('.json', '')] = value.default; 

    } catch (error) {
      console.error(`Error processing translation file ${key}:`, error);
    }
});

// Namespaces
const namespaces = ['system', 'routes', 'languages', 'home', 'station'
];

// Formatting of dates and values
const formating = (value, format, lng) => {
  if(format === 'uppercase') return value.toUpperCase();
  if(format instanceof Date) return new Intl.DateTimeFormat(lng).format(value);
  return value
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Default language: English
    fallbackLng: 'en',
    // Namespaces for different files
    ns: namespaces,
    resources,
    interpolation: {
      escapeValue: false,
      // Handle international formating
      format: formating
    },
  });

export default i18n;
