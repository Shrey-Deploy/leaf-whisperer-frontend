
import { Check, AlertTriangle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

interface ResultDisplayProps {
  loading: boolean;
  result: {
    disease: string | null;
    confidence?: number;
    healthy: boolean;
    recommendations?: string[];
  } | null;
}

const ResultDisplay = ({ loading, result }: ResultDisplayProps) => {
  const { t } = useTranslations();

  if (loading) {
    return (
      <div className="result-card">
        <div className="flex flex-col items-center justify-center py-6">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-plant-green-light h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-plant-green-light rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-plant-green-light rounded"></div>
                <div className="h-4 bg-plant-green-light rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-gray-600">{t('diagnosis.analyzing')}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="result-card bg-plant-background border-dashed">
        <div className="flex flex-col items-center justify-center py-10">
          <AlertTriangle className="h-12 w-12 text-plant-green mb-3" />
          <p className="text-gray-600 text-center">
            {t('diagnosis.dropzoneText')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="result-card">
      <div className="flex items-start gap-4">
        <div className="rounded-full p-2 bg-opacity-20">
          {result.healthy ? (
            <div className="bg-green-100 rounded-full p-2">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          ) : (
            <div className="bg-amber-100 rounded-full p-2">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium">
            {result.healthy ? t('diagnosis.healthy') : result.disease}
          </h3>
          
          {result.confidence !== undefined && (
            <p className="text-sm text-gray-500 mt-1">
              {t('diagnosis.confidence')}: {Math.round(result.confidence * 100)}%
            </p>
          )}
          
          {result.recommendations && result.recommendations.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">{t('diagnosis.recommendations')}:</h4>
              <ul className="text-sm space-y-1">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-plant-green">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;

