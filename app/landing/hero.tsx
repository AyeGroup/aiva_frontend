// import { Button } from '../_components/Button/button';
import { heroData } from './landing.data';
import { AnimatedChatDemo } from './animated-chat-demo';

type PageType = 'landing' | 'signup' | 'dashboard' | 'consultation';

interface HeroProps {
  onNavigate: (page: PageType) => void;
}

export function Hero( ) {
  const { headline, subheadline, cta, socialProof } = heroData;

  return (
    <section 
      className="hero-section relative overflow-hidden bg-white min-h-screen flex items-center" 
      aria-labelledby="hero-headline"
    >
      {/* Decorative SVG Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#65bcb6" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Floating Geometric Shapes */}
        <svg className="absolute top-20 right-[10%] w-24 h-24 text-[#65bcb6] opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="currentColor">
            <animate attributeName="cy" values="50;45;50" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>

        <svg className="absolute top-40 right-[25%] w-16 h-16 text-[#FFA18E] opacity-10" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" fill="currentColor" transform="rotate(45 50 50)">
            <animateTransform attributeName="transform" type="rotate" from="45 50 50" to="405 50 50" dur="20s" repeatCount="indefinite" />
          </rect>
        </svg>

        <svg className="absolute bottom-32 left-[15%] w-20 h-20 text-[#b07cc6] opacity-10" viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="currentColor">
            <animate attributeName="points" values="50,10 90,90 10,90;50,15 90,85 10,85;50,10 90,90 10,90" dur="5s" repeatCount="indefinite" />
          </polygon>
        </svg>

        {/* Dotted Pattern */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#65bcb6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* Curved Lines */}
        <svg className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-5" viewBox="0 0 600 400" fill="none">
          <path d="M0,200 Q150,100 300,200 T600,200" stroke="#65bcb6" strokeWidth="2" fill="none">
            <animate attributeName="d" values="M0,200 Q150,100 300,200 T600,200;M0,200 Q150,300 300,200 T600,200;M0,200 Q150,100 300,200 T600,200" dur="8s" repeatCount="indefinite" />
          </path>
          <path d="M0,250 Q150,150 300,250 T600,250" stroke="#FFA18E" strokeWidth="2" fill="none">
            <animate attributeName="d" values="M0,250 Q150,150 300,250 T600,250;M0,250 Q150,350 300,250 T600,250;M0,250 Q150,150 300,250 T600,250" dur="10s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      {/* Gradient Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5 rounded-full" style={{
        background: '#65bcb6',
        filter: 'blur(100px)',
        transform: 'translate(30%, -30%)'
      }}></div>
      
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-5 rounded-full" style={{
        background: '#FFA18E',
        filter: 'blur(100px)',
        transform: 'translate(-30%, 30%)'
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* محتوای متنی */}
          <div className="space-y-8 text-right relative">
            {/* Decorative Element */}
            <div className="absolute -right-4 top-0 w-1 h-32 bg-gradient-to-b from-[#65bcb6] to-transparent opacity-20"></div>

            {/* Modern Badge */}
            <div className="inline-flex items-center gap-2 bg-[#E3F4F1] px-4 py-2 rounded-full relative">
              <div className="w-2 h-2 rounded-full bg-[#65bcb6] relative">
                <div className="absolute inset-0 rounded-full bg-[#65bcb6] animate-ping"></div>
              </div>
              <span className="text-sm" style={{ color: '#65bcb6', fontWeight: '500' }}>جدیدترین فناوری هوش مصنوعی</span>
            </div>

            <header className="space-y-6">
              <h1 
                id="hero-headline"
                className="leading-tight text-[#111827]"
                style={{ 
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  lineHeight: '1.15',
                  fontWeight: '800',
                  letterSpacing: '-0.02em'
                }}
              >
                {headline}
              </h1>
              <p 
                className="text-[#4B5563] max-w-xl"
                style={{ 
                  fontSize: '20px',
                  lineHeight: '1.6',
                  fontWeight: '400'
                }}
              >
                {subheadline}
              </p>
            </header>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>بیش از ۱۰۰۰ کسب‌وکار فعال</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>راه‌اندازی در کمتر از ۵ دقیقه</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>پشتیبانی ۲۴/۷</span>
              </div>
            </div>
          </div>

          {/* Demo Section */}
          <div className="relative">
            {/* Decorative Circles Behind */}
            <div className="absolute -top-8 -left-8 w-64 h-64 rounded-full border-2 border-[#65bcb6] opacity-10"></div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-full border-2 border-[#FFA18E] opacity-10"></div>

            {/* Floating SVG Icons */}
            <svg className="absolute -top-6 -right-6 w-12 h-12 text-[#65bcb6] opacity-20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="3s" repeatCount="indefinite" />
              </path>
            </svg>

            <svg className="absolute -bottom-4 -left-4 w-10 h-10 text-[#FFA18E] opacity-20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 10V3L4 14h7v7l9-11h-7z">
                <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2s" repeatCount="indefinite" />
              </path>
            </svg>

            <div className="relative bg-white border border-[#E5E7EB] p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Status Badge */}
              <div className="absolute -top-3 -right-3 bg-[#65bcb6] text-white px-4 py-2 rounded-lg shadow-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-sm" style={{ fontWeight: '600' }}>دموی زنده</span>
                </div>
              </div>

              <AnimatedChatDemo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
