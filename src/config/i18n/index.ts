import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// biome-ignore lint/nursery/noRestrictedImports: Config file
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import ptBr from './pt-br.json';

const IS_PRODUCTION_MODE = import.meta.env.VITE_MODE === 'production';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      en,
      'pt-BR': ptBr,
    },
    fallbackLng: 'en',
    debug: !IS_PRODUCTION_MODE,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
