
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import PlantSelector from "./PlantSelector";
import ResultDisplay from "./ResultDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";
import { PredictionResult } from "@/types/diagnosis";

const DiagnosisForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [plantType, setPlantType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const { toast } = useToast();
  const { t } = useTranslations();

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    setResult(null);
  };

  const handlePlantChange = (plant: string) => {
    setPlantType(plant);
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast({
        title: t('diagnosis.uploadLabel'),
        description: t('diagnosis.dropzoneText'),
        variant: "destructive",
      });
      return;
    }

    if (!plantType) {
      toast({
        title: t('diagnosis.selectPlant'),
        description: t('diagnosis.selectPlant'),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      const response = await fetch(`http://localhost:8000/predict?plant=${plantType}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
      
      toast({
        title: t('diagnosis.results'),
        description: data.class === "healthy" 
          ? t('diagnosis.healthy')
          : `${t('diagnosis.results')}: ${data.class}`,
        variant: data.class === "healthy" ? "default" : "destructive",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while analyzing your plant. Please try again.",
        variant: "destructive",
      });
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="grid gap-6">
        <ImageUploader onImageChange={handleImageChange} />
        
        <PlantSelector onPlantChange={handlePlantChange} value={plantType} />
        
        <Button 
          onClick={handleSubmit} 
          className="analyze-btn" 
          disabled={loading || !selectedImage || !plantType}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('diagnosis.analyzing')}
            </>
          ) : (
            t('diagnosis.analyzeButton')
          )}
        </Button>
        
        {result && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-medium">{t('diagnosis.results')}</h2>
            <div className="bg-card rounded-lg border p-4">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Plant Type</dt>
                  <dd className="text-base">{result.plant}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Diagnosis</dt>
                  <dd className={`text-base font-medium ${
                    result.class === "healthy" ? "text-green-600" : "text-red-600"
                  }`}>
                    {result.class}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Confidence</dt>
                  <dd className="text-base">{(result.confidence * 100).toFixed(2)}%</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisForm;
