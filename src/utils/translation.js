import React, { createContext, useContext, useState } from "react";
import MMKVStorage from "react-native-mmkv-storage";
import LocalizedStrings from "react-native-localization";
import * as RNLocalize from "react-native-localize";
import moment from "moment";
import idLocale from "moment/locale/id";
import { Localization } from "@assets";

const DEFAULT_LANGUAGE = "id";
const APP_LANGUAGE = "appLanguage";
const languages = { id: Localization.id, en: Localization.en };
const translations = new LocalizedStrings(languages);

const LocalizationContext = createContext({
  translations,
  appLanguage: DEFAULT_LANGUAGE,
  setAppLanguage: () => null,
  initializeAppLanguage: () => null,
});

export const LocalizationProvider = ({ children }) => {
  const [appLanguage, setAppLanguage] = useState(DEFAULT_LANGUAGE);

  storage = new MMKVStorage.Loader().initialize();

  const setLanguage = (language) => {
    translations.setLanguage(language);
    moment.updateLocale(language, [idLocale]);
    setAppLanguage(language);

    this.storage.setItem(APP_LANGUAGE, language);
  };

  const initializeAppLanguage = async () => {
    const storage = new MMKVStorage.Loader().initialize();

    const currentLanguage = await storage.getItem(APP_LANGUAGE);

    if (currentLanguage) {
      setLanguage(currentLanguage);
    } else {
      let localeCode = DEFAULT_LANGUAGE;
      const supportedLocaleCodes = translations.getAvailableLanguages();
      const phoneLocaleCodes = RNLocalize.getLocales().map(
        (locale) => locale.languageCode,
      );

      phoneLocaleCodes.some((code) => {
        if (supportedLocaleCodes.includes(code)) {
          localeCode = code;
          return true;
        }
      });
      setLanguage(localeCode);
    }
  };

  return (
    <LocalizationContext.Provider
      value={{
        translations,
        appLanguage,
        setAppLanguage: setLanguage,
        initializeAppLanguage,
      }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useTranslation = () => useContext(LocalizationContext);
