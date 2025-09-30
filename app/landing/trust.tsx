import React from 'react';
import { trustData } from './landing.data';

const iconMap: Record<string, string> = {
  lock: '🔒',
  'shield-check': '✅',
  key: '🔑',
  database: '💾'
};

export function Trust() {
  const { title, subtitle, features } = trustData;

  return (
    <section className="py-16 md:py-24" id="security" aria-labelledby="trust-title">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h2 id="trust-title" className="text-3xl md:text-4xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            // تعریف رنگ‌های مختلف برای هر آیکون
            const colors = ['#FF8970', '#78E2E2', '#FFCE4D', '#4460F7'];
            const backgroundColor = colors[index % colors.length];
            
            return (
              <article 
                key={index}
                className="text-center p-6 rounded-lg border border-border bg-[rgba(255,255,255,1)] hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                aria-labelledby={`trust-feature-${index}-title`}
              >
                {/* آیکون */}
                <div className="mb-4 bg-[rgba(0,0,0,0)]">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor, opacity: 0.15 }}>
                    <span className="text-2xl" aria-hidden="true">
                      {iconMap[feature.icon] || '🛡️'}
                    </span>
                  </div>
                </div>

                {/* محتوا */}
                <h3 id={`trust-feature-${index}-title`} className="mb-3" style={{ color: backgroundColor }}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* گواهینامه‌ها و استانداردها */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 p-6 bg-muted/50 rounded-lg border border-border">
            <div className="text-center">
              <div className="text-lg font-medium">ISO 27001</div>
              <div className="text-xs text-muted-foreground">گواهی امنیت</div>
            </div>
            <div className="w-px h-8 bg-border" aria-hidden="true"></div>
            <div className="text-center">
              <div className="text-lg font-medium">GDPR</div>
              <div className="text-xs text-muted-foreground">حریم خصوصی</div>
            </div>
            <div className="w-px h-8 bg-border" aria-hidden="true"></div>
            <div className="text-center">
              <div className="text-lg font-medium">SOC 2</div>
              <div className="text-xs text-muted-foreground">ممیزی امنیتی</div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-4 max-w-lg mx-auto">
            آیوا با بالاترین استانداردهای امنیتی و حریم خصوصی جهان مطابقت دارد.
            داده‌های شما هرگز با اشخاص ثالث به اشتراک گذاشته نمی‌شود.
          </p>
        </div>
      </div>
    </section>
  );
}