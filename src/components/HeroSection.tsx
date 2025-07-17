import { Sparkles, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden bg-dots">
      {/* Floating Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb orb-purple w-96 h-96 top-10 left-10 animate-float"></div>
        <div className="floating-orb orb-blue w-72 h-72 bottom-20 right-16 animate-float delay-1000"></div>
        <div className="floating-orb orb-purple w-64 h-64 top-1/2 right-1/4 animate-float delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm hover:shadow-md transition-all duration-300">
          <Sparkles className="h-4 w-4 text-brand-purple animate-pulse" />
          <span className="text-sm font-semibold text-gray-700">AI-Powered Recruitment Revolution</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          <span className="shimmer-text">Revolutionize</span>{" "}
          <span className="gradient-text">Recruitment</span>
          <br />
          with Perfect{" "}
          <span className="gradient-text">AI Prompts</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium">
          Transform job descriptions into optimized search queries for Monster, Naukri, Ceipal, 
          and other platforms using advanced AI technology.
        </p>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Instant Generation</h3>
            <p className="text-gray-600 leading-relaxed">
              Transform job descriptions into optimized search prompts in seconds with AI precision
            </p>
          </div>

          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Multi-Platform</h3>
            <p className="text-gray-600 leading-relaxed">
              Perfectly optimized for Monster, Naukri, Ceipal, and other recruitment platforms
            </p>
          </div>

          <div className="glass-card p-8 text-center group hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              AI extracts key skills, experience levels, locations, and cultural requirements
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to revolutionize your recruitment process?
          </p>
          <div className="inline-flex items-center space-x-3 text-brand-purple bg-purple-50 rounded-full px-6 py-3 border border-purple-200">
            <span className="animate-bounce">↓</span>
            <span className="font-semibold">Start with your job description below</span>
            <span className="animate-bounce delay-300">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;