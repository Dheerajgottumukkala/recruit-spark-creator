import { useState } from "react";
import { Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const GenerateButton = ({ 
  canGenerate, 
  onGenerate 
}: { 
  canGenerate: boolean; 
  onGenerate: () => void; 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!canGenerate) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onGenerate();
    setIsGenerating(false);
  };

  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto space-y-6">
        {isGenerating ? (
          <div className="space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="h-10 w-10 text-white animate-spin" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">AI is Analyzing...</h3>
              <p className="text-muted-foreground text-sm">
                Processing job requirements and optimizing search prompts
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Extracting keywords</span>
                <span>✓</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Analyzing requirements</span>
                <span>✓</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Optimizing for platforms</span>
                <span className="animate-pulse">⏳</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Button
              onClick={handleGenerate}
              disabled={!canGenerate}
              size="lg"
              className={`btn-gradient text-lg px-8 py-6 h-auto ${
                !canGenerate ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Zap className="h-5 w-5 mr-2" />
              Generate Search Prompts
            </Button>
            
            {!canGenerate && (
              <p className="text-sm text-muted-foreground">
                Please add a job description and select at least one platform
              </p>
            )}
            
            {canGenerate && (
              <p className="text-sm text-muted-foreground">
                Ready to generate AI-optimized search prompts
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateButton;