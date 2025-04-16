
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import PlantSelector from "./PlantSelector";
import ResultDisplay from "./ResultDisplay";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    // Reset results when changing image
    setResult(null);
  };

  const handlePlantChange = (plant: string) => {
    setPlantType(plant);
    // Reset results when changing plant type
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      toast({
        title: "Image required",
        description: "Please upload an image of your plant leaf",
        variant: "destructive",
      });
      return;
    }

    if (!plantType) {
      toast({
        title: "Plant type required",
        description: "Please select a plant type",
        variant: "destructive",
      });
      return;
    }

    // Simulated API call
    setLoading(true);
    
    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // This is where you would normally send the data to a backend
      // For now, we'll just simulate a response
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
      
      // Randomly select a response
      const mockResult = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
      
      setResult(mockResult);
      
      toast({
        title: "Analysis complete",
        description: mockResult.healthy 
          ? "Your plant appears to be healthy!" 
          : `Detected: ${mockResult.disease}`,
        variant: mockResult.healthy ? "default" : "destructive",
      });
      
    } catch (error) {
      toast({
        title: "Analysis failed",
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
              Analyzing...
            </>
          ) : (
            "Analyze Plant"
          )}
        </Button>
        
        <div className="mt-6">
          <h2 className="text-lg font-medium mb-3">Diagnosis Results</h2>
          <ResultDisplay loading={loading} result={result} />
        </div>
      </div>
    </div>
  );
};

export default DiagnosisForm;
