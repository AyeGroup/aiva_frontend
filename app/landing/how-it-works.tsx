import { useState } from 'react';
import { howItWorksData } from './landing.data';
// import { Button } from '../_components/Button/button';
import { 
  Scale, Sparkles, ShoppingCart, UtensilsCrossed, Truck, CreditCard, 
  GraduationCap, Briefcase, Heart, Home, ShieldCheck, Gift,
  Headphones, TrendingUp, Package, BookOpen, Users, Lightbulb
} from 'lucide-react';
import { Button } from '@/components/button';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'scale': Scale,
  'sparkles': Sparkles,
  'shopping-cart': ShoppingCart,
  'utensils': UtensilsCrossed,
  'truck': Truck,
  'credit-card': CreditCard,
  'graduation-cap': GraduationCap,
  'briefcase': Briefcase,
  'heart-pulse': Heart,
  'home': Home,
  'shield-check': ShieldCheck,
  'gift': Gift,
  'headphones': Headphones,
  'trending-up': TrendingUp,
  'package-check': Package,
  'book-open': BookOpen,
  'users': Users,
  'lightbulb': Lightbulb
};

type TabType = 'industries' | 'useCases';

export function HowItWorks() {
  const { title, subtitle, tabs, industries, useCases } = howItWorksData;
  const [activeTab, setActiveTab] = useState<TabType>('industries');
  
  const currentItems = activeTab === 'industries' ? industries : useCases;
  const currentBadgeText = activeTab === 'industries' ? tabs.industries.badgeText : tabs.useCases.badgeText;

  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50" id="how-it-works" aria-labelledby="how-it-works-title">
      {/* SVG Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Wave Pattern */}
        <svg className="absolute top-0 left-0 w-full h-32 opacity-5" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M0,50 C300,100 600,0 1200,50 L1200,0 L0,0 Z" fill="#65bcb6"/>
        </svg>

        {/* Geometric Shapes */}
        <svg className="absolute top-32 left-[5%] w-20 h-20 text-[#65bcb6] opacity-5" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2"/>
        </svg>

        <svg className="absolute top-48 right-[8%] w-24 h-24 text-[#FFA18E] opacity-5" viewBox="0 0 100 100">
          <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="2" transform="rotate(45 50 50)"/>
        </svg>

        {/* Dotted Connection Lines */}
        <svg className="absolute bottom-32 left-[15%] w-48 h-2 opacity-5">
          <line x1="0" y1="1" x2="200" y2="1" stroke="#65bcb6" strokeWidth="2" strokeDasharray="4,4">
            <animate attributeName="stroke-dashoffset" from="0" to="8" dur="1s" repeatCount="indefinite"/>
          </line>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="text-center mb-16 relative">
          {/* Decorative Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-transparent to-[#65bcb6] opacity-20"></div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-[#E3F4F1] relative">
            <div className="w-2 h-2 rounded-full bg-[#65bcb6] relative">
              <div className="absolute inset-0 rounded-full bg-[#65bcb6] animate-ping"></div>
            </div>
            <span className="text-sm text-[#65bcb6]" style={{ fontWeight: '500' }}>
              {currentBadgeText}
            </span>
          </div>

          <h2 
            id="how-it-works-title" 
            className="text-[#111827] mb-6"
            style={{
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: '800',
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}
          >
            {title}
          </h2>
          <p 
            className="text-[#4B5563] max-w-2xl mx-auto"
            style={{
              fontSize: '18px',
              lineHeight: '1.6',
              fontWeight: '400'
            }}
          >
            {subtitle}
          </p>
        </header>

        {/* Tabs */}
        <div className="flex justify-center mb-12 relative" role="tablist" aria-label="انواع مشاهده">
          {/* Decorative Elements */}
          <svg className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#65bcb6] opacity-10" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2L2,7v10c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V7L12,2z"/>
          </svg>
          <svg className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6 text-[#FFA18E] opacity-10" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2L2,7v10c0,5.55,3.84,10.74,9,12c5.16-1.26,9-6.45,9-12V7L12,2z"/>
          </svg>

          <div className="inline-flex gap-1 rounded-xl p-1 bg-[#F3F4F6]">
            <button
              role="tab"
              aria-selected={activeTab === 'industries'}
              aria-controls="industries-panel"
              id="industries-tab"
              title="مشاهده براساس صنعت"
              onClick={() => setActiveTab('industries')}
              className="px-6 py-3 rounded-lg transition-all duration-200"
              style={{
                background: activeTab === 'industries' ? 'white' : 'transparent',
                color: activeTab === 'industries' ? '#111827' : '#6B7280',
                boxShadow: activeTab === 'industries' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                fontWeight: activeTab === 'industries' ? '600' : '500'
              }}
            >
              {tabs.industries.label}
            </button>
            
            <button
              role="tab"
              aria-selected={activeTab === 'useCases'}
              aria-controls="useCases-panel"
              id="useCases-tab"
              title="مشاهده براساس کاربرد"
              onClick={() => setActiveTab('useCases')}
              className="px-6 py-3 rounded-lg transition-all duration-200"
              style={{
                background: activeTab === 'useCases' ? 'white' : 'transparent',
                color: activeTab === 'useCases' ? '#111827' : '#6B7280',
                boxShadow: activeTab === 'useCases' ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                fontWeight: activeTab === 'useCases' ? '600' : '500'
              }}
            >
              {tabs.useCases.label}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div 
          role="tabpanel" 
          id={`${activeTab}-panel`}
          aria-labelledby={`${activeTab}-tab`}
          className="relative"
        >
          {/* Connection Lines SVG */}
          {activeTab === 'industries' && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5" style={{ zIndex: 0 }}>
              <line x1="25%" y1="30%" x2="50%" y2="50%" stroke="#65bcb6" strokeWidth="1" strokeDasharray="4,4"/>
              <line x1="75%" y1="30%" x2="50%" y2="50%" stroke="#65bcb6" strokeWidth="1" strokeDasharray="4,4"/>
            </svg>
          )}

          <div className={`grid gap-5 ${activeTab === 'industries' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
            {currentItems.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              
              return (
                <article 
                  key={item.id} 
                  className="text-right group relative"
                  aria-labelledby={`item-${item.id}-title`}
                  style={{
                    animation: 'fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    animationDelay: `${index * 0.06}s`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Enhanced Card */}
                  <div 
                    className="relative bg-white rounded-2xl p-6 h-full transition-all duration-300 overflow-hidden card-item"
                    style={{
                      boxShadow: `0 2px 8px -2px ${item.color}15, 0 4px 16px -4px ${item.color}08`
                    }}
                    onMouseEnter={(e) => {
                      const card = e.currentTarget;
                      card.style.transform = 'translateY(-6px)';
                      card.style.boxShadow = `0 12px 32px -8px ${item.color}30, 0 6px 20px -4px ${item.color}15`;
                      
                      const iconContainer = card.querySelector('.icon-container') as HTMLElement;
                      if (iconContainer) {
                        iconContainer.style.transform = 'scale(1.1) rotate(-5deg)';
                        iconContainer.style.background = `${item.color}18`;
                      }
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget;
                      card.style.transform = 'translateY(0)';
                      card.style.boxShadow = `0 2px 8px -2px ${item.color}15, 0 4px 16px -4px ${item.color}08`;
                      
                      const iconContainer = card.querySelector('.icon-container') as HTMLElement;
                      if (iconContainer) {
                        iconContainer.style.transform = 'scale(1) rotate(0deg)';
                        iconContainer.style.background = `${item.color}10`;
                      }
                    }}
                  >
                    {/* SVG Corner Decoration */}
                    <svg className="absolute top-0 right-0 w-16 h-16 opacity-5" viewBox="0 0 100 100">
                      <circle cx="100" cy="0" r="50" fill={item.color}/>
                    </svg>

                    {/* Subtle gradient overlay on hover */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top right, ${item.color}06, transparent 60%)`
                      }}
                    ></div>
                    
                    {/* Decorative corner accent */}
                    <div 
                      className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at top right, ${item.color}08, transparent 70%)`,
                        transform: 'translate(30%, -30%)'
                      }}
                    ></div>
                    
                    {/* Icon */}
                    <div className="mb-5 relative z-10">
                      <div 
                        className="icon-container inline-flex w-14 h-14 items-center justify-center rounded-2xl transition-all duration-300"
                        style={{
                          background: `${item.color}10`,
                          border: `2px solid ${item.color}15`,
                          boxShadow: `0 2px 8px ${item.color}10`
                        }}
                      >
                        {IconComponent && (
                          <IconComponent 
                            className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" 
                            // style={{ color: item.color }}
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <h3 
                        id={`item-${item.id}-title`} 
                        className="text-grey-900 mb-2 transition-colors duration-200 group-hover:text-grey-900"
                        style={{ fontSize: '1.063rem', fontWeight: '600', lineHeight: '1.4' }}
                      >
                        {item.title}
                      </h3>
                      {activeTab === 'useCases' && 'titleEn' in item && (
                        <p 
                          className="text-grey-500 mb-3 transition-colors duration-200"
                          style={{ fontSize: '0.813rem', fontWeight: '500', letterSpacing: '0.02em' }}
                        >
                          {item.titleEn}
                        </p>
                      )}
                      <p 
                        className="text-grey-600 leading-relaxed"
                        style={{ fontSize: '0.875rem', lineHeight: '1.7' }}
                      >
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Bottom accent line - visible on hover */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{
                        background: `linear-gradient(to right, transparent, ${item.color}, transparent)`
                      }}
                    ></div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Clean CTA */}
        <div className="text-center mt-16 relative">
          {/* Decorative Elements */}
          <svg className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-12 h-12 text-[#65bcb6] opacity-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z"/>
          </svg>

          <p className="text-grey-600 mb-5" style={{ fontSize: '0.938rem' }}>
            {activeTab === 'industries' 
              ? 'صنعت شما در لیست نبود؟ آیوا برای هر کسب‌وکاری قابل تنظیم است.' 
              : 'نیاز به راهنمایی بیشتر دارید؟ با مشاوران ما تماس بگیرید.'
            }
          </p>
          <Button
            variant="primary"
            size="md"
            title="مشاوره رایگان درباره کاربرد آیوا در کسب‌وکار شما"
            icon="arrow-right"
            iconPosition="right"
            onClick={() => {
              const demoSection = document.getElementById('demo');
              demoSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            مشاوره رایگان
          </Button>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(24px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          .card-item {
            position: relative;
          }
          
          .card-item::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 1rem;
            padding: 2px;
            background: linear-gradient(135deg, transparent, rgba(101, 188, 182, 0.1), transparent);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          }
          
          .card-item:hover::before {
            opacity: 1;
          }
        `}</style>
      </div>
    </section>
  );
}
