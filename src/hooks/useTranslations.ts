
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/locales/translations";

type TranslationsType = typeof translations.en;

export const useTranslations = () => {
  const { currentLanguage } = useLanguageStore();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[currentLanguage.code as keyof typeof translations];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k as keyof typeof result];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    if (typeof result !== 'string') {
      console.warn(`Translation result is not a string for key: ${key}`);
      return key;
    }
    
    return result;
  };

  return { t };
};
