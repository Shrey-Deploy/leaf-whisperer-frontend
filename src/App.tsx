
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Leaf } from "lucide-react";
import Index from "./pages/Index";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { LanguageSelector } from "./components/LanguageSelector";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-border sticky top-0 bg-white z-10">
            <div className="container mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <a href="/" className="flex items-center space-x-2">
                  <Leaf className="h-6 w-6 text-plant-green" />
                  <h1 className="text-xl font-semibold text-gray-900">Plant Diagnoser</h1>
                </a>
                <nav className="hidden sm:block">
                  <a href="/about" className="text-gray-600 hover:text-plant-green">About</a>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
