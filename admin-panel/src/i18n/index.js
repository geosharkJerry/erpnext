import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './zh.json';
import vi from './vi.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('lang') || 'zh' : 'zh';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      vi: { translation: vi },
    },
    lng: savedLang,
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
