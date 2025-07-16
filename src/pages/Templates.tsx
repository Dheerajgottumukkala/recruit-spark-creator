import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, Star, Clock, Users, Trash2 } from "lucide-react";

interface Template {
  id: string;
  name: string;
  description: string;
  job_description: string;
  platforms: string[];
  is_public: boolean;
  created_at: string;
}

const Templates = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
    job_description: "",
    platforms: [] as string[],
    is_public: false
  });

  useEffect(() => {
    fetchTemplates();
  }, [user]);

  const fetchTemplates = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('templates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTemplate = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('templates')
        .insert([{
          ...newTemplate,
          user_id: user.id
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template created successfully",
      });

      setShowCreateDialog(false);
      setNewTemplate({
        name: "",
        description: "",
        job_description: "",
        platforms: [],
        is_public: false
      });
      fetchTemplates();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create template",
        variant: "destructive",
      });
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('templates')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Template deleted successfully",
      });
      fetchTemplates();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete template",
        variant: "destructive",
      });
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const platformOptions = ['Monster', 'Naukri', 'Ceipal'];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Please sign in to access templates</h2>
          <Button onClick={() => window.location.href = '/auth'}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold gradient-text animate-fade-in">
              Search Templates
            </h1>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Save and reuse your job search configurations
            </p>
          </div>

          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary hover:scale-105 transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Template</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Senior Developer Template"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Brief description of this template"
                  />
                </div>
                <div>
                  <Label htmlFor="job_description">Job Description</Label>
                  <Textarea
                    id="job_description"
                    value={newTemplate.job_description}
                    onChange={(e) => setNewTemplate(prev => ({ ...prev, job_description: e.target.value }))}
                    placeholder="Enter the job description template..."
                    rows={5}
                  />
                </div>
                <div>
                  <Label>Platforms</Label>
                  <div className="flex gap-2 mt-2">
                    {platformOptions.map(platform => (
                      <Button
                        key={platform}
                        variant={newTemplate.platforms.includes(platform) ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          const platforms = newTemplate.platforms.includes(platform)
                            ? newTemplate.platforms.filter(p => p !== platform)
                            : [...newTemplate.platforms, platform];
                          setNewTemplate(prev => ({ ...prev, platforms }));
                        }}
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button onClick={createTemplate} className="w-full">
                  Create Template
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template, index) => (
              <Card 
                key={template.id} 
                className="group hover:shadow-lg hover:scale-[1.02] transition-all duration-300 glassmorphism animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {template.name}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {template.is_public && <Star className="w-4 h-4 text-yellow-500" />}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTemplate(template.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {template.job_description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {template.platforms.map(platform => (
                      <Badge key={platform} variant="secondary" className="text-xs">
                        {platform}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(template.created_at).toLocaleDateString()}
                    </div>
                    {template.is_public && (
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Public
                      </div>
                    )}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={() => {
                      // Here you would implement using the template
                      toast({
                        title: "Template Selected",
                        description: "Template applied to current search",
                      });
                    }}
                  >
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredTemplates.length === 0 && !loading && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Create your first template to get started"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowCreateDialog(true)} className="bg-gradient-primary">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Template
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Templates;