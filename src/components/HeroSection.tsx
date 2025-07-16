import { Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-purple/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-pink/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-primary opacity-10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-card/50 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-8">
          <Sparkles className="h-4 w-4 text-brand-purple" />
          <span className="text-sm font-medium">AI-Powered Recruitment Revolution</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Transform{" "}
          <span className="gradient-text">Job Descriptions</span>
          <br />
          Into Perfect{" "}
          <span className="gradient-text">Search Prompts</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Project O uses advanced AI to convert your job requirements into optimized search queries for 
          Monster, Naukri, Ceipal, and other recruitment platforms.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Instant Generation</h3>
            <p className="text-sm text-muted-foreground">
              Transform descriptions into search prompts in seconds
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Multi-Platform</h3>
            <p className="text-sm text-muted-foreground">
              Optimized for Monster, Naukri, Ceipal, and more
            </p>
          </div>

          <div className="glass-card p-6 text-center">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2">Smart Analysis</h3>
            <p className="text-sm text-muted-foreground">
              AI extracts key skills, locations, and requirements
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Ready to revolutionize your recruitment process?
          </p>
          <div className="inline-flex items-center space-x-2 text-sm text-brand-purple">
            <span>↓</span>
            <span className="font-medium">Start with your job description below</span>
            <span>↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;