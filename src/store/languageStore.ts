
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = {
  code: string;
  name: string;
};

const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ta", name: "தமிழ்" },
  { code: "bn", name: "বাংলা" },
  { code: "kn", name: "ಕನ್ನಡ" }
];

type LanguageStore = {
  currentLanguage: Language;
  setLanguage: (code: string) => void;
  languages: Language[];
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLanguage: SUPPORTED_LANGUAGES[0],
      languages: SUPPORTED_LANGUAGES,
      setLanguage: (code) => {
        const language = SUPPORTED_LANGUAGES.find(lang => lang.code === code);
        if (language) {
          set({ currentLanguage: language });
        }
      }
    }),
    {
      name: 'language-storage'
    }
  )
);
