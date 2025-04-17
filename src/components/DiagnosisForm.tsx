import { useState } from "react";
import ImageUploader from "./ImageUploader";
import PlantSelector from "./PlantSelector";
import ResultDisplay from "./ResultDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const DiagnosisForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [plantType, setPlantType] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    disease: string | null;
    confidence?: number;
    healthy: boolean;
    recommendations?: string[];
  } | null>(null);
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const simulatedResponses = [
        {
          disease: "Early Blight",
          confidence: 0.89,
          healthy: false,
          recommendations: [
            "Remove and destroy infected leaves",
            "Apply fungicide according to package directions",
            "Ensure proper spacing for air circulation",
            "Water at the base of plants to avoid wetting leaves"
          ]
        },
        {
          disease: "Late Blight",
          confidence: 0.76,
          healthy: false,
          recommendations: [
            "Remove and destroy all infected plant parts",
            "Apply copper-based fungicide",
            "Avoid overhead irrigation",
            "Maintain good drainage in the field"
          ]
        },
        {
          disease: null,
          confidence: 0.95,
          healthy: true,
          recommendations: [
            "Continue regular watering and fertilizing schedule",
            "Monitor for any changes in leaf appearance",
            "Maintain good air circulation around plants"
          ]
        }
      ];
      
      const mockResult = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
      
      setResult(mockResult);
      
      toast({
        title: t('diagnosis.results'),
        description: mockResult.healthy 
          ? t('diagnosis.healthy')
          : `${t('diagnosis.results')}: ${mockResult.disease}`,
        variant: mockResult.healthy ? "default" : "destructive",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while analyzing your plant. Please try again.",
        variant: "destructive",
      });
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
        
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">{t('diagnosis.results')}</h2>
          <ResultDisplay loading={loading} result={result} />
        </div>
      </div>
    </div>
  );
};

export default DiagnosisForm;
