import { useState } from "react";
import { Copy, Download, Share2, Eye, Code, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const GeneratedPrompts = ({ 
  jobDescription, 
  selectedPlatforms, 
  uploadedFile 
}: {
  jobDescription: string;
  selectedPlatforms: string[];
  uploadedFile: File | null;
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const { toast } = useToast();

  // Sample generated prompts based on platforms
  const prompts = {
    monster: `(Python OR "Python Developer") AND ("Machine Learning" OR ML OR AI) AND ("TensorFlow" OR "Tensor Flow") AND (AWS OR "Amazon Web Services" OR GCP OR "Google Cloud") AND ("5 years" OR "5+ years" OR "senior") AND ("San Francisco" OR "SF" OR Remote) AND (Docker OR Kubernetes OR microservices)`,
    naukri: `Python Developer, Machine Learning, TensorFlow, AWS, GCP, 5 years experience, Senior Software Engineer, San Francisco, Remote, Docker, Kubernetes, Microservices, AI Developer`,
    ceipal: `Skills: Python, Machine Learning, TensorFlow, AWS, GCP, Docker, Kubernetes | Experience: 5+ years | Location: San Francisco, Remote | Level: Senior | Keywords: AI, Microservices`
  };

  const platformNames = {
    monster: 'Monster',
    naukri: 'Naukri',
    ceipal: 'Ceipal'
  };

  const copyToClipboard = async (prompt: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(platform);
      toast({
        title: "Copied!",
        description: `${platformNames[platform as keyof typeof platformNames]} prompt copied to clipboard`,
      });
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadPrompts = () => {
    const content = selectedPlatforms
      .map(platform => `${platformNames[platform as keyof typeof platformNames]}:\n${prompts[platform as keyof typeof prompts]}\n\n`)
      .join('');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recruitment-prompts.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!jobDescription || selectedPlatforms.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3">
            <span className="gradient-text">Generated Search Prompts</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete the job description and select platforms to generate optimized search prompts.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto glass-card p-12 text-center">
          <div className="w-16 h-16 bg-muted/20 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Code className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2 text-muted-foreground">
            Ready to Generate Prompts
          </h3>
          <p className="text-sm text-muted-foreground">
            Your AI-optimized search prompts will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Your Optimized Search Prompts</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          AI-generated search prompts tailored for each platform. Copy and paste these into your 
          recruitment platforms for precise candidate searches.
        </p>
      </div>

      {/* Generation Summary */}
      <div className="max-w-5xl mx-auto glass-card p-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">{selectedPlatforms.length}</div>
            <div className="text-gray-600 font-medium">Platforms Optimized</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{jobDescription.split(' ').length}</div>
            <div className="text-gray-600 font-medium">Keywords Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{uploadedFile ? 'Enhanced' : 'Standard'}</div>
            <div className="text-gray-600 font-medium">AI Analysis Mode</div>
          </div>
        </div>
      </div>

      {/* Generated Prompts */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue={selectedPlatforms[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-8 bg-gray-100 p-2 rounded-2xl">
            {selectedPlatforms.map(platform => (
              <TabsTrigger 
                key={platform} 
                value={platform}
                className="data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md font-semibold rounded-xl transition-all duration-300"
              >
                {platformNames[platform as keyof typeof platformNames]}
              </TabsTrigger>
            ))}
          </TabsList>

          {selectedPlatforms.map(platform => (
            <TabsContent key={platform} value={platform} className="space-y-6">
              <div className="glass-card p-8">
                {/* Platform Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {platformNames[platform as keyof typeof platformNames]} Search Prompt
                  </h3>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(prompts[platform as keyof typeof prompts], platform)}
                      className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700 transition-all duration-300"
                    >
                      {copiedPrompt === platform ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copiedPrompt === platform ? 'Copied!' : 'Copy Prompt'}
                    </Button>
                  </div>
                </div>

                {/* Prompt Display */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 font-mono text-sm leading-relaxed hover:border-purple-300 transition-all duration-300">
                  <pre className="whitespace-pre-wrap break-words text-gray-800">
                    {prompts[platform as keyof typeof prompts]}
                  </pre>
                </div>

                {/* Platform Tips */}
                <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-2xl">
                  <h4 className="font-bold mb-3 flex items-center text-blue-800">
                    <Eye className="h-5 w-5 mr-3 text-blue-600" />
                    Platform-Specific Optimization Tips
                  </h4>
                  {platform === 'monster' && (
                    <p className="text-blue-700 leading-relaxed">
                      Use Boolean operators (AND, OR) and quotation marks for exact phrases. 
                      Monster supports complex search queries with parentheses for grouping terms effectively.
                    </p>
                  )}
                  {platform === 'naukri' && (
                    <p className="text-blue-700 leading-relaxed">
                      Naukri works best with comma-separated keywords. Use specific job titles 
                      and skills. Location and experience filters work better as separate filter options.
                    </p>
                  )}
                  {platform === 'ceipal' && (
                    <p className="text-blue-700 leading-relaxed">
                      Ceipal uses structured search with categories. Separate skills, experience, 
                      and location for optimal AI matching and cultural fit assessment.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-6 mt-12">
          <Button onClick={downloadPrompts} className="btn-gradient text-lg px-8 py-3 rounded-xl font-semibold">
            <Download className="h-5 w-5 mr-3" />
            Download All Prompts
          </Button>
          <Button variant="outline" className="text-lg px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 border-2">
            <Share2 className="h-5 w-5 mr-3" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPrompts;