import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Search, Clock, Copy, Trash2, ExternalLink } from "lucide-react";

interface SearchHistory {
  id: string;
  job_description: string;
  platforms: string[];
  generated_prompts: any;
  created_at: string;
}

const History = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('search_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch search history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteHistoryItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('search_history')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "History item deleted successfully",
      });
      fetchHistory();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete history item",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const filteredHistory = history.filter(item =>
    item.job_description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Please sign in to view history</h2>
          <Button onClick={() => window.location.href = '/auth'}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold gradient-text animate-fade-in">
            Search History
          </h1>
          <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Review your previous job search prompts and results
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* History List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded" />
                    <div className="h-3 bg-muted rounded w-5/6" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => (
              <Card 
                key={item.id} 
                className="group hover:shadow-lg transition-all duration-300 glassmorphism animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleString()}
                        </span>
                      </div>
                      <CardDescription className="text-sm line-clamp-2">
                        {item.job_description}
                      </CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteHistoryItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Platforms used */}
                  <div className="flex flex-wrap gap-2">
                    {item.platforms.map(platform => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>

                  {/* Generated prompts */}
                  <div className="space-y-3">
                    {Object.entries(item.generated_prompts || {}).map(([platform, prompt]) => (
                      <div key={platform} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{platform} Search Prompt:</h4>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(prompt as string)}
                              className="text-xs"
                            >
                              <Copy className="w-3 h-3 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-md p-3 border border-border/50">
                          <code className="text-xs text-muted-foreground break-all">
                            {prompt as string}
                          </code>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      onClick={() => {
                        toast({
                          title: "Reuse Search",
                          description: "Job description applied to current search",
                        });
                      }}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Reuse
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredHistory.length === 0 && !loading && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Clock className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? "No matching history found" : "No search history yet"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm 
                ? "Try adjusting your search terms" 
                : "Start creating job search prompts to build your history"
              }
            </p>
            {!searchTerm && (
              <Button onClick={() => window.location.href = '/'} className="bg-gradient-primary">
                Create Your First Search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;