
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguageStore } from "@/store/languageStore";

export const LanguageSelector = () => {
  const { currentLanguage, languages, setLanguage } = useLanguageStore();

  return (
    <Select value={currentLanguage.code} onValueChange={setLanguage}>
      <SelectTrigger className="w-[140px] bg-white">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue placeholder="Language" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            {language.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
