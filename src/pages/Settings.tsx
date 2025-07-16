import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Settings as SettingsIcon, User, Bell, Shield, Trash2, Save } from "lucide-react";

interface Profile {
  id: string;
  display_name: string;
  bio: string;
  avatar_url: string;
}

const Settings = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    autoSaveTemplates: true,
    shareAnalytics: false
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      setProfile(data || {
        id: '',
        display_name: user.email?.split('@')[0] || '',
        bio: '',
        avatar_url: ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user || !profile) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          display_name: profile.display_name,
          bio: profile.bio,
          avatar_url: profile.avatar_url
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
      window.location.href = '/';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Please sign in to access settings</h2>
          <Button onClick={() => window.location.href = '/auth'}>Sign In</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center animate-glow">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold gradient-text animate-fade-in">
              Settings
            </h1>
            <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Manage your account and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation */}
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="glassmorphism">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start bg-primary/10 text-primary">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Settings */}
            <Card className="glassmorphism animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your profile information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4" />
                        <div className="h-10 bg-muted rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={user.email || ''}
                        disabled
                        className="bg-muted/50"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email cannot be changed
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input
                        id="displayName"
                        value={profile?.display_name || ''}
                        onChange={(e) => setProfile(prev => prev ? {
                          ...prev,
                          display_name: e.target.value
                        } : null)}
                        placeholder="Your display name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile?.bio || ''}
                        onChange={(e) => setProfile(prev => prev ? {
                          ...prev,
                          bio: e.target.value
                        } : null)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                      />
                    </div>

                    <Button
                      onClick={saveProfile}
                      disabled={saving}
                      className="bg-gradient-primary hover:scale-105 transition-all duration-300"
                    >
                      {saving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save Changes
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="glassmorphism animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>
                  Configure how you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, emailNotifications: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, pushNotifications: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-save Templates</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically save successful searches as templates
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoSaveTemplates}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, autoSaveTemplates: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="glassmorphism animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>
                  Manage your privacy and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Share Anonymous Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Help improve Project O by sharing anonymous usage data
                    </p>
                  </div>
                  <Switch
                    checked={settings.shareAnalytics}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, shareAnalytics: checked }))
                    }
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Account Actions</h4>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        onClick={handleSignOut}
                        className="w-full justify-start"
                      >
                        Sign Out
                      </Button>
                      <Button 
                        variant="destructive" 
                        className="w-full justify-start"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;