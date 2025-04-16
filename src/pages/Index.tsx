
import DiagnosisForm from "@/components/DiagnosisForm";
import { Leaf } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-plant-background">
      <header className="border-b border-border">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-plant-green" />
            <h1 className="text-xl font-semibold text-gray-900">Plant Diagnoser</h1>
          </div>
          <div>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-plant-green"
            >
              About
            </a>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
              Diagnose Plant Diseases with AI
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload a photo of your plant leaf and get instant diagnosis. 
              Our tool helps farmers identify diseases early and take appropriate action.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 sm:p-8">
            <DiagnosisForm />
          </div>
          
          <div className="mt-12 text-center text-sm text-gray-500">
            <p>
              For educational purposes only. Results should be verified by agricultural experts.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="border-t border-border mt-12 py-6">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-1 mb-4 sm:mb-0">
              <Leaf className="h-4 w-4 text-plant-green" />
              <span className="text-sm text-gray-600">Plant Diagnoser &copy; 2025</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-sm text-gray-600 hover:text-plant-green">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-plant-green">Terms of Service</a>
              <a href="#" className="text-sm text-gray-600 hover:text-plant-green">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
