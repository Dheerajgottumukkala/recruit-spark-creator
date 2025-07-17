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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Describe Your Perfect Candidate</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Paste your job description below or upload company documents. Our AI will analyze 
          requirements and generate platform-optimized search prompts.
        </p>
      </div>

      {/* Input Section */}
      <div className="max-w-5xl mx-auto">
        <div className="glass-card p-8 space-y-6">
          {/* Header with Sample Button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <label className="text-lg font-semibold text-gray-900">Job Description</label>
                <p className="text-sm text-gray-500">Paste your requirements or use our sample</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={insertSample}
              className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-300"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              Try Sample
            </Button>
          </div>

          {/* Textarea */}
          <div className="relative">
            <Textarea
              placeholder="Enter your job description here... (e.g., We need a software engineer with Python and machine learning skills in San Francisco with 5 years of experience)"
              value={jobDescription}
              onChange={handleChange}
              className="min-h-[240px] input-glow border-2 border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-300 resize-none text-base leading-relaxed font-medium placeholder:text-gray-400"
              maxLength={maxCharacters}
            />
            
            {/* Character Counter */}
            <div className="absolute bottom-4 right-4 text-sm text-gray-500 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200 shadow-sm">
              <span className={characterCount > maxCharacters * 0.9 ? 'text-orange-600 font-semibold' : ''}>{characterCount}</span>
              <span className="text-gray-400">/{maxCharacters}</span>
            </div>
          </div>

          {/* Smart Suggestions */}
          {jobDescription && (
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Lightbulb className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-lg font-semibold text-gray-900">AI Analysis Preview</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 hover:bg-purple-100 transition-all duration-300">
                  <h4 className="text-sm font-bold text-purple-700 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Skills Detected
                  </h4>
                  <p className="text-sm text-gray-700 font-medium">
                    Python, Machine Learning, TensorFlow, AWS, Docker, Kubernetes
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 hover:bg-blue-100 transition-all duration-300">
                  <h4 className="text-sm font-bold text-blue-700 mb-2 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Experience Level
                  </h4>
                  <p className="text-sm text-gray-700 font-medium">
                    5+ years senior level position
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