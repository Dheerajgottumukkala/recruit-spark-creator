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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">
          <span className="gradient-text">Your Optimized Search Prompts</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          AI-generated search prompts tailored for each platform. Copy and paste these into your 
          recruitment platforms for precise candidate searches.
        </p>
      </div>

      {/* Generation Summary */}
      <div className="max-w-4xl mx-auto glass-card p-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-purple">{selectedPlatforms.length}</div>
            <div className="text-sm text-muted-foreground">Platforms</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-brand-pink">{jobDescription.split(' ').length}</div>
            <div className="text-sm text-muted-foreground">Keywords Analyzed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{uploadedFile ? 'Yes' : 'No'}</div>
            <div className="text-sm text-muted-foreground">Company Data</div>
          </div>
        </div>
      </div>

      {/* Generated Prompts */}
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue={selectedPlatforms[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
            {selectedPlatforms.map(platform => (
              <TabsTrigger 
                key={platform} 
                value={platform}
                className="data-[state=active]:bg-gradient-primary data-[state=active]:text-white"
              >
                {platformNames[platform as keyof typeof platformNames]}
              </TabsTrigger>
            ))}
          </TabsList>

          {selectedPlatforms.map(platform => (
            <TabsContent key={platform} value={platform} className="space-y-4">
              <div className="glass-card p-6">
                {/* Platform Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">
                    {platformNames[platform as keyof typeof platformNames]} Search Prompt
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(prompts[platform as keyof typeof prompts], platform)}
                      className="hover:bg-secondary"
                    >
                      {copiedPrompt === platform ? (
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4 mr-2" />
                      )}
                      {copiedPrompt === platform ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>
                </div>

                {/* Prompt Display */}
                <div className="bg-muted/20 rounded-lg p-4 font-mono text-sm leading-relaxed border border-border/50">
                  <pre className="whitespace-pre-wrap break-words">
                    {prompts[platform as keyof typeof prompts]}
                  </pre>
                </div>

                {/* Platform Tips */}
                <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-brand-purple" />
                    Platform-Specific Tips
                  </h4>
                  {platform === 'monster' && (
                    <p className="text-sm text-muted-foreground">
                      Use Boolean operators (AND, OR) and quotation marks for exact phrases. 
                      Monster supports complex search queries with parentheses for grouping.
                    </p>
                  )}
                  {platform === 'naukri' && (
                    <p className="text-sm text-muted-foreground">
                      Naukri works best with comma-separated keywords. Use specific job titles 
                      and skills. Location and experience filters work better as separate filters.
                    </p>
                  )}
                  {platform === 'ceipal' && (
                    <p className="text-sm text-muted-foreground">
                      Ceipal uses structured search with categories. Separate skills, experience, 
                      and location for better AI matching and cultural fit assessment.
                    </p>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button onClick={downloadPrompts} className="btn-gradient">
            <Download className="h-4 w-4 mr-2" />
            Download All Prompts
          </Button>
          <Button variant="outline" className="hover:bg-secondary">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GeneratedPrompts;