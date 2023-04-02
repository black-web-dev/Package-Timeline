import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import de from './locales/de.json'

const resources = {
  en: {
    translations: en,
  },
  de: {
    translations: de,
  },
}

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources,
    debug: false,
    ns: ['translations'],
    interpolation: {
      escapeValue: false,
    },
  })

i18n.languages = ['en', 'de']

export default i18n
