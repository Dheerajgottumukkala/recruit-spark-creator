import { useState } from "react";
import { FileText, Lightbulb } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const JobDescriptionInput = ({ onJobDescriptionChange, jobDescription }: {
  onJobDescriptionChange: (value: string) => void;
  jobDescription: string;
}) => {
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacters = 5000;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCharacterCount(value.length);
    onJobDescriptionChange(value);
  };

  const sampleJobDescription = `We are seeking a Senior Software Engineer with 5+ years of experience in Python and machine learning. The role involves developing AI-powered applications using TensorFlow, working with cloud platforms (AWS/GCP), and collaborating with cross-functional teams. Location: San Francisco or Remote. Must have experience with microservices, Docker, and Kubernetes.`;

  const insertSample = () => {
    onJobDescriptionChange(sampleJobDescription);
    setCharacterCount(sampleJobDescription.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">
          <span className="gradient-text">Describe Your Perfect Candidate</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Paste your job description below or upload company documents to get started. 
          Our AI will analyze the requirements and generate optimized search prompts.
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-4xl mx-auto">
        <div className="glass-card p-6 space-y-4">
          {/* Header with Sample Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-brand-purple" />
              <label className="text-sm font-medium">Job Description</label>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={insertSample}
              className="text-xs hover:bg-secondary"
            >
              <Lightbulb className="h-3 w-3 mr-1" />
              Try Sample
            </Button>
          </div>

          {/* Textarea */}
          <div className="relative">
            <Textarea
              placeholder="Enter your job description here... (e.g., We need a software engineer with Python and machine learning skills in San Francisco with 5 years of experience)"
              value={jobDescription}
              onChange={handleChange}
              className="min-h-[200px] bg-input/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none text-base leading-relaxed"
              maxLength={maxCharacters}
            />
            
            {/* Character Counter */}
            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-2 py-1 rounded">
              {characterCount}/{maxCharacters}
            </div>
          </div>

          {/* Smart Suggestions */}
          {jobDescription && (
            <div className="border-t border-border/50 pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="h-4 w-4 text-brand-purple" />
                <span className="text-sm font-medium">AI Suggestions</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-brand-purple mb-1">Skills Detected</h4>
                  <p className="text-xs text-muted-foreground">
                    Python, Machine Learning, TensorFlow, AWS, Docker
                  </p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-brand-pink mb-1">Experience Level</h4>
                  <p className="text-xs text-muted-foreground">
                    5+ years senior level
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionInput;