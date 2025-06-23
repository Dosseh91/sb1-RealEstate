import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// We will import the translations as we create them
// For now, we'll define them here and move them to JSON files in the next step
const resources = {
  en: {
    translation: {
      // Navbar
      "Home": "Home",
      "Listings": "Listings",
      "Categories": "Categories",
      "SearchPlaceholder": "Search listings...",
      "SignIn": "Sign in",
      "Register": "Register",
      // Add other keys here
    }
  },
  fr: {
    translation: {
      // Navbar
      "Home": "Accueil",
      "Listings": "Annonces",
      "Categories": "Catégories",
      "SearchPlaceholder": "Rechercher des annonces...",
      "SignIn": "Connexion",
      "Register": "S'inscrire",
      // Add other keys here
    }
  },
  de: {
    translation: {
        // Navbar
        "Home": "Startseite",
        "Listings": "Angebote",
        "Categories": "Kategorien",
        "SearchPlaceholder": "Angebote suchen...",
        "SignIn": "Anmelden",
        "Register": "Registrieren",
        // Add other keys here
    }
  }
};


i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Init i18next
  .init({
    resources,
    fallbackLng: 'en', // Use English if the detected language is not available
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
    detection: {
      // Order and from where user language should be detected
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    }
  });

export default i18n;
