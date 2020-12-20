import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import i18nextReactNative from 'i18next-react-native-language-detector';
import fr_FR from '@/locales/fr-FR.json';
import en_US from '@/locales/en-US.json';

const resources = {
  'fr-FR': {translation: fr_FR},
  'en-US': {translation: en_US},
  en: {translation: en_US},
};

i18n
  // .use(i18nextReactNative)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'fr-FR',
    lng: 'fr-FR',
    // have a common namespace used around the full app
    // ns: ['common'],
    // defaultNS: 'common',

    debug: false,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
