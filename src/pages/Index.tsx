import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import JobDescriptionInput from "@/components/JobDescriptionInput";
import FileUpload from "@/components/FileUpload";
import PlatformSelector from "@/components/PlatformSelector";
import GenerateButton from "@/components/GenerateButton";
import GeneratedPrompts from "@/components/GeneratedPrompts";

const Index = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showResults, setShowResults] = useState(false);

  const canGenerate = jobDescription.trim().length > 0 && selectedPlatforms.length > 0;

  const handleGenerate = () => {
    setShowResults(true);
    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="space-y-20 pb-20">
        <HeroSection />
        
        <section className="container mx-auto px-6">
          <JobDescriptionInput 
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
          />
        </section>

        <section className="container mx-auto px-6">
          <FileUpload onFileUpload={setUploadedFile} />
        </section>

        <section className="container mx-auto px-6">
          <PlatformSelector 
            selectedPlatforms={selectedPlatforms}
            onPlatformChange={setSelectedPlatforms}
          />
        </section>

        <section className="container mx-auto px-6">
          <GenerateButton 
            canGenerate={canGenerate}
            onGenerate={handleGenerate}
          />
        </section>

        {showResults && (
          <section id="results" className="container mx-auto px-6">
            <GeneratedPrompts 
              jobDescription={jobDescription}
              selectedPlatforms={selectedPlatforms}
              uploadedFile={uploadedFile}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold">O</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Project O - Revolutionizing recruitment with AI
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Project O. Powered by advanced AI technology.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
