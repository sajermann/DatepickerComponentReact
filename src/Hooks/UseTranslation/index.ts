import i18next from 'i18next';
import { useEffect } from 'react';
import { useTranslation as useTranslationOficial } from 'react-i18next';

type TUseTranslationProps = {
  lng: string;
  ns?: string;
  resources: Record<string, unknown>;
};

export function useTranslation(resources?: TUseTranslationProps[]) {
  const { t, i18n } = useTranslationOficial();
  const { language: currentLanguage } = i18next;

  useEffect(() => {
    if (!resources) return;
    // Nesting translate dont work with separate file
    for (const item of resources) {
      i18n.addResources(item.lng, item.ns || 'translations', item.resources);
    }

    changeLanguage(currentLanguage);
  }, []);

  function changeLanguage(language: string) {
    i18n.changeLanguage(language);
  }

  return { translate: t, changeLanguage, currentLanguage };
}
