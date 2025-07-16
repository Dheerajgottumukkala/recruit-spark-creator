import { useState } from "react";
import { Building2, Globe, Users } from "lucide-react";

const platforms = [
  {
    id: 'monster',
    name: 'Monster',
    description: 'Global job board with advanced Boolean search',
    icon: Building2,
    color: 'from-purple-500 to-blue-500',
    features: ['Boolean Search', 'Skills Filter', 'Location Radius']
  },
  {
    id: 'naukri',
    name: 'Naukri',
    description: 'Leading Indian job portal with smart filters',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500', 
    features: ['Smart Search', 'Experience Filter', 'Industry Tags']
  },
  {
    id: 'ceipal',
    name: 'Ceipal',
    description: 'AI-powered talent management platform',
    icon: Users,
    color: 'from-cyan-500 to-teal-500',
    features: ['AI Matching', 'Skill Assessment', 'Cultural Fit']
  }
];

const PlatformSelector = ({ selectedPlatforms, onPlatformChange }: {
  selectedPlatforms: string[];
  onPlatformChange: (platforms: string[]) => void;
}) => {
  const togglePlatform = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      onPlatformChange(selectedPlatforms.filter(id => id !== platformId));
    } else {
      onPlatformChange([...selectedPlatforms, platformId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">
          <span className="gradient-text">Choose Target Platforms</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the recruitment platforms where you'll be searching. Our AI will optimize 
          the search prompts for each platform's specific syntax and features.
        </p>
      </div>

      {/* Platform Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selectedPlatforms.includes(platform.id);
          
          return (
            <div
              key={platform.id}
              className={`platform-card ${isSelected ? 'selected' : ''}`}
              onClick={() => togglePlatform(platform.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                  isSelected 
                    ? 'bg-primary border-primary' 
                    : 'border-muted-foreground'
                }`}>
                  {isSelected && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
              <p className="text-muted-foreground text-sm mb-4">{platform.description}</p>

              <div className="space-y-2">
                <h4 className="text-sm font-medium">Key Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {platform.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-secondary/50 px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {isSelected && (
                <div className="mt-4 pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-2 text-sm text-primary">
                    <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                    <span>Selected for optimization</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedPlatforms.length > 0 && (
        <div className="max-w-4xl mx-auto glass-card p-6">
          <h3 className="font-semibold mb-3">
            Selected Platforms ({selectedPlatforms.length})
          </h3>
          <div className="flex flex-wrap gap-3">
            {selectedPlatforms.map(platformId => {
              const platform = platforms.find(p => p.id === platformId);
              return platform ? (
                <div 
                  key={platformId}
                  className="flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1"
                >
                  <platform.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{platform.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlatformSelector;