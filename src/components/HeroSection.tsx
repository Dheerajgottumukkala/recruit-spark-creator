import { Sparkles, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [animationStage, setAnimationStage] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimationStage(1), 300);
    return () => clearTimeout(timer);
  }, []);

  const titleWords = ["Revolutionize", "Recruitment", "with", "Perfect", "AI", "Prompts"];

  return (
    <section className="relative pt-24 pb-16 overflow-hidden bg-dots animate-breathing-bg">
      {/* Enhanced Floating Background Orbs with Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb orb-purple w-96 h-96 top-10 left-10 animate-float-enhanced"></div>
        <div className="floating-orb orb-blue w-72 h-72 bottom-20 right-16 animate-float-enhanced delay-1000"></div>
        <div className="floating-orb orb-purple w-64 h-64 top-1/2 right-1/4 animate-float-enhanced delay-2000"></div>
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-brand-purple/20 rounded-full animate-float-particle`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Gradient Overlay with Animation */}
        <div className="absolute inset-0 bg-gradient-shifting opacity-30"></div>
      </div>

      <div className="relative container mx-auto px-6 text-center">
        {/* Badge with Enhanced Animation */}
        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-8 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 animate-slide-up opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
          <Sparkles className="h-4 w-4 text-brand-purple animate-pulse-glow" />
          <span className="text-sm font-semibold text-gray-700">AI-Powered Recruitment Revolution</span>
        </div>

        {/* Main Section Heading */}
        <h2 className="text-lg font-semibold text-purple-700 mb-4 opacity-0 animate-fade-up [animation-delay:200ms] [animation-fill-mode:forwards]">
          AI-Powered Recruitment Platform
        </h2>

        {/* Animated Main Headline */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          {titleWords.map((word, index) => {
            const isGradientWord = word === "Recruitment" || word === "AI" || word === "Prompts";
            const delay = 400 + (index * 200); // Start after section heading
            
            return (
              <span
                key={index}
                className={`inline-block animate-word-reveal ${
                  isGradientWord ? 'gradient-text animate-glow-text' : 'shimmer-text'
                }`}
                style={{ 
                  animationDelay: `${delay}ms`,
                  animationFillMode: 'backwards'
                }}
              >
                {word}
                {index === 1 && <br />}
                {index < titleWords.length - 1 && index !== 1 && " "}
              </span>
            );
          })}
        </h1>

        {/* Subtitle with Delayed Animation */}
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-12 leading-relaxed font-medium opacity-0 animate-fade-up [animation-delay:1.4s] [animation-fill-mode:forwards]">
          Transform job descriptions into optimized search queries for Monster, Naukri, Ceipal, 
          and other platforms using advanced AI technology.
        </p>

        {/* Enhanced Features Grid with 3D Effects */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <div className="glass-card-3d p-8 text-center group opacity-0 animate-card-reveal [animation-delay:1.6s] [animation-fill-mode:forwards]">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Zap className="h-8 w-8 text-white group-hover:animate-pulse-glow transition-all duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-brand-purple transition-colors duration-300">Instant Generation</h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              Transform job descriptions into optimized search prompts in seconds with AI precision
            </p>
          </div>

          <div className="glass-card-3d p-8 text-center group opacity-0 animate-card-reveal [animation-delay:1.8s] [animation-fill-mode:forwards]">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Sparkles className="h-8 w-8 text-white group-hover:animate-pulse-glow transition-all duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-brand-purple transition-colors duration-300">Multi-Platform</h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              Perfectly optimized for Monster, Naukri, Ceipal, and other recruitment platforms
            </p>
          </div>

          <div className="glass-card-3d p-8 text-center group opacity-0 animate-card-reveal [animation-delay:2.0s] [animation-fill-mode:forwards]">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
              <Zap className="h-8 w-8 text-white group-hover:animate-pulse-glow transition-all duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-brand-purple transition-colors duration-300">Smart Analysis</h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
              AI extracts key skills, experience levels, locations, and cultural requirements
            </p>
          </div>
        </div>

        {/* Enhanced CTA with Ripple Effect */}
        <div className="text-center opacity-0 animate-fade-up [animation-delay:2.2s] [animation-fill-mode:forwards]">
          <p className="text-gray-600 mb-6 text-lg">
            Ready to revolutionize your recruitment process?
          </p>
          <div className="inline-flex items-center space-x-3 text-brand-purple bg-purple-50 rounded-full px-6 py-3 border border-purple-200 hover:bg-purple-100 hover:border-purple-300 hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden">
            <span className="animate-bounce-enhanced">↓</span>
            <span className="font-semibold relative z-10">Start with your job description below</span>
            <span className="animate-bounce-enhanced delay-300">↓</span>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 bg-brand-purple/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;