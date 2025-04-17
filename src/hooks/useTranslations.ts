
import { useLanguageStore } from "@/store/languageStore";
import { translations } from "@/locales/translations";

export const useTranslations = () => {
  const { currentLanguage } = useLanguageStore();
  
  const t = (key: string) => {
    const keys = key.split('.');
    let result = translations[currentLanguage.code as keyof typeof translations];
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k as keyof typeof result];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    return result as string;
  };

  return { t };
};

