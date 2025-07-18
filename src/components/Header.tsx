import { Settings, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-all duration-300" 
          onClick={() => handleNavClick('/')}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center animate-glow">
            <span className="text-white font-bold text-xl">O</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold gradient-text">Project O</h1>
            <p className="text-xs text-muted-foreground">AI Recruitment Search</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => handleNavClick('/')}
            className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
          >
            Dashboard
          </button>
          <button 
            onClick={() => handleNavClick('/templates')}
            className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
          >
            Templates
          </button>
          <button 
            onClick={() => handleNavClick('/history')}
            className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
          >
            History
          </button>
          <button 
            onClick={() => handleNavClick('/help')}
            className="text-sm font-medium hover:text-primary transition-all duration-300 hover:scale-105"
          >
            Help
          </button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          {user ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-secondary hover:scale-110 transition-all duration-300"
                onClick={() => handleNavClick('/settings')}
              >
                <Settings className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-secondary hover:scale-110 transition-all duration-300"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => handleNavClick('/auth')}
              className="bg-gradient-primary hover:scale-105 transition-all duration-300"
            >
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;