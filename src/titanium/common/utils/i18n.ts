import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';
import getEnv from './env'
import { I18nConfiguration } from 'types';

export const createI18NClient = async(lng: string = 'en-US'): Promise<I18nConfiguration> => {
  await i18n
    .use(ICU)
    .use(Backend)
    .use(initReactI18next)
    .init({
      lng,
      fallbackLng: 'en-US',
      keySeparator: false,
      backend: {
        crossDomain: true,
        loadPath: `${getEnv('LOCALE_PUBLIC_URL')}/locales/{{lng}}/app.json`
      },
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      react: {
        useSuspense: false
      },
    });

  return {
    changeLanguage: ({ language }) => i18n.changeLanguage(language)
  };
}


export const configureI18n = async(app) => {
  const { language } = await app.atlasSdk.i18n.getConfig();
  const { changeLanguage } = await createI18NClient(language);
  app.atlasSdk.i18n.onSwitchLanguage(changeLanguage);
}
