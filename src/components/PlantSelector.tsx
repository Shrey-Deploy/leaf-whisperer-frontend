
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlantSelectorProps {
  onPlantChange: (plantType: string) => void;
  value: string;
}

const PLANT_TYPES = [
  { value: "", label: "Select a plant type" },
  { value: "tomato", label: "Tomato" },
  { value: "potato", label: "Potato" },
  { value: "bell_pepper", label: "Bell Pepper" },
  { value: "corn", label: "Corn" },
  { value: "rice", label: "Rice" },
  { value: "wheat", label: "Wheat" },
  { value: "soybean", label: "Soybean" },
  { value: "cotton", label: "Cotton" },
  { value: "apple", label: "Apple" },
  { value: "grape", label: "Grape" },
];

const PlantSelector = ({ onPlantChange, value }: PlantSelectorProps) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select plant type
      </label>
      <Select value={value} onValueChange={onPlantChange}>
        <SelectTrigger className="w-full bg-white border-input">
          <SelectValue placeholder="Select a plant type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {PLANT_TYPES.map((plant) => (
              <SelectItem key={plant.value} value={plant.value}>
                {plant.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PlantSelector;
