import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: isLogin ? "Welcome back!" : "Account created!",
          description: isLogin 
            ? "You have successfully signed in." 
            : "Please check your email for verification.",
        });
        if (isLogin) {
          navigate('/');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-30" />
      
      <Card className="w-full max-w-md glassmorphism border-border/50 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center animate-glow">
            <span className="text-white font-bold text-2xl">O</span>
          </div>
          <div>
            <CardTitle className="text-2xl gradient-text">
              {isLogin ? "Welcome Back" : "Join Project O"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isLogin 
                ? "Sign in to access your recruitment tools" 
                : "Create an account to get started"
              }
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300"
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? <LogIn className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                  {isLogin ? "Sign In" : "Sign Up"}
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;