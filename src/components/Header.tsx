import { Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
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
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Templates
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            History
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Help
          </a>
        </nav>

        {/* User Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="hover:bg-secondary">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-secondary">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;