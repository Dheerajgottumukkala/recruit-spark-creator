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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Choose Target Platforms</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Select the recruitment platforms where you'll be searching. Our AI will optimize 
          the search prompts for each platform's specific syntax and features.
        </p>
      </div>

      {/* Platform Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const isSelected = selectedPlatforms.includes(platform.id);
          
          return (
            <div
              key={platform.id}
              className={`platform-card cursor-pointer transition-all duration-300 ${
                isSelected ? 'selected ring-2 ring-purple-400 ring-offset-2' : 'hover:shadow-xl'
              }`}
              onClick={() => togglePlatform(platform.id)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${platform.color} flex items-center justify-center shadow-lg`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className={`w-6 h-6 rounded-full border-3 transition-all duration-300 ${
                  isSelected 
                    ? 'bg-purple-500 border-purple-500 shadow-lg' 
                    : 'border-gray-300 hover:border-purple-400'
                }`}>
                  {isSelected && (
                    <div className="w-full h-full rounded-full bg-white scale-50 flex items-center justify-center">
                      <span className="text-purple-500 text-xs font-bold">✓</span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3 text-gray-900">{platform.name}</h3>
              <p className="text-gray-600 text-base mb-6 leading-relaxed">{platform.description}</p>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Key Features</h4>
                <div className="flex flex-wrap gap-2">
                  {platform.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-gray-100 border border-gray-200 px-3 py-1 rounded-full font-medium text-gray-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {isSelected && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="font-semibold text-green-700">Selected for optimization</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selection Summary */}
      {selectedPlatforms.length > 0 && (
        <div className="max-w-5xl mx-auto glass-card p-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Selected Platforms ({selectedPlatforms.length})
          </h3>
          <div className="flex flex-wrap gap-4">
            {selectedPlatforms.map(platformId => {
              const platform = platforms.find(p => p.id === platformId);
              return platform ? (
                <div 
                  key={platformId}
                  className="flex items-center space-x-3 bg-purple-50 border border-purple-200 rounded-xl px-4 py-3 hover:bg-purple-100 transition-all duration-300"
                >
                  <platform.icon className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-purple-700">{platform.name}</span>
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
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