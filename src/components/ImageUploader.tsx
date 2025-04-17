import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, X } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

interface ImageUploaderProps {
  onImageChange: (file: File | null) => void;
}

const ImageUploader = ({ onImageChange }: ImageUploaderProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslations();

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Validate file is an image
    if (!file.type.match('image.*')) {
      alert('Please upload an image file');
      return;
    }
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImagePreview(e.target.result as string);
        onImageChange(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    onImageChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('diagnosis.uploadLabel')}
      </label>
      
      {!imagePreview ? (
        <div
          className={`drop-zone ${dragActive ? 'active' : ''}`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="h-12 w-12 text-plant-green mb-3" />
          <p className="text-center mb-2">
            <span className="font-medium">{t('diagnosis.dropzoneText')}</span>
          </p>
          <p className="text-sm text-gray-500">{t('diagnosis.fileTypes')}</p>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden border border-border">
          <img src={imagePreview} alt="Leaf preview" className="w-full h-64 object-contain" />
          <button
            onClick={() => {
              setImagePreview(null);
              onImageChange(null);
              if (inputRef.current) {
                inputRef.current.value = '';
              }
            }}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
            aria-label="Remove image"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
