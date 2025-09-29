import React from 'react';
import { featuresData } from './landing.data';

const iconMap: Record<string, string> = {
  globe: '🌍',
  shield: '🛡️',
  users: '👥',
  'bar-chart': '📊',
  palette: '🎨',
  plug: '🔌'
};

export function Features() {
  const { title, subtitle, features } = featuresData;

  return (
    <section 
      className="relative overflow-hidden bg-white"
      id="features" 
      aria-labelledby="features-title"
    >
      {/* Sharp & Vibrant Background */}
      <div className="absolute inset-0 pattern-grid opacity-30"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10 rounded-full morphing-shape" style={{
          background: 'var(--sharp-indigo)',
          filter: 'blur(80px)'
        }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 opacity-8 rounded-full floating-element" style={{
          background: 'var(--sharp-crimson)',
          filter: 'blur(60px)'
        }}></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 opacity-6 rounded-full" style={{
          background: 'var(--sharp-lime)',
          filter: 'blur(40px)',
          animation: 'gentle-bounce 4s ease-in-out infinite'
        }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 lg:py-32 relative z-10">
        <header className="text-center mb-20">
          {/* Creative Badge with Rainbow Effect */}
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full shadow-sm mb-8" style={{ background: '#65bcb6', border: '1px solid #65bcb6' }}>
            <div className="w-2 h-2 bg-white rounded-full morphing-shape"></div>
            <span className="text-sm font-medium text-white">ویژگی‌های پیشرفته</span>
          </div>

          <h2 
            id="features-title" 
            className="text-grey-900 mb-6"
          >
            {title}
          </h2>
          <p 
            className="text-grey-600 max-w-2xl mx-auto text-xl leading-relaxed"
          >
            {subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <article 
              key={feature.id} 
              className="group text-center"
              aria-labelledby={`feature-${feature.id}-title`}
            >
              <div className="glass-effect rounded-xl p-8 hover-lift transition-all duration-300 relative overflow-hidden">
                {/* Decorative floating elements */}
                <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-brand-primary/20 floating-element"></div>
                <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-brand-secondary/30 morphing-shape"></div>
                
                {/* Enhanced Icon with Sharp Color Palette */}
                <div className="flex items-center justify-center mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center relative ${
                    index % 3 === 0 ? 'sharp-border-alt' : 
                    index % 3 === 1 ? 'glass-effect' :
                    'hover-lift'
                  }`} style={{
                    background: index % 3 === 0 ? 'var(--sharp-coral)' :
                               index % 3 === 1 ? 'var(--sharp-cyan)' :
                               'var(--sharp-emerald)'
                  }}>
                    <span className="text-2xl relative z-10" aria-hidden="true">
                      {iconMap[feature.icon] || '⭐'}
                    </span>
                    {/* Sharp Icon glow effect */}
                    <div className="absolute inset-0 rounded-xl opacity-25 blur-sm" style={{
                      background: index % 3 === 0 ? 'var(--sharp-rose)' :
                                 index % 3 === 1 ? 'var(--sharp-teal)' :
                                 'var(--sharp-lime)'
                    }}></div>
                  </div>
                </div>

                {/* Content */}
                <h3 id={`feature-${feature.id}-title`} className="text-grey-900 mb-4 font-medium">
                  {feature.title}
                </h3>
                <p className="text-grey-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
                
                {/* Sharp hover effect indicator */}
                <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                  background: 'var(--sharp-violet)'
                }}></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}