import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';
import en from './en.json';
import ptBr from './pt-br.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(i18nextPlugin)
  .init({
    // we init with resources
    resources: {
      en,
      'pt-BR': ptBr,
    },
    fallbackLng: 'en',
    debug: true,

    // have a common namespace used around the full app
    ns: ['translations'],
    defaultNS: 'translations',

    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
