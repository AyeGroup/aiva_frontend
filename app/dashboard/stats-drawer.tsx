import { useEffect, useState } from 'react';
import { X, Zap, Crown, Star, Building2 } from 'lucide-react';

interface StatsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StatsDrawer({ isOpen, onClose }: StatsDrawerProps) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Close drawer on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const convertToPersian = (text: string | number): string => {
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    
    let result = text.toString();
    for (let i = 0; i < englishDigits.length; i++) {
      result = result.replace(new RegExp(englishDigits[i], 'g'), persianDigits[i]);
    }
    return result;
  };

  // قیمت‌های پلن‌ها
  const plans = {
    basic: {
      monthly: 299000,
      yearly: 2868000 // 299000 * 12 * 0.8 (20% تخفیف)
    },
    professional: {
      monthly: 799000,
      yearly: 7670000 // 799000 * 12 * 0.8
    },
    advanced: {
      monthly: 1990000,
      yearly: 19104000 // 1990000 * 12 * 0.8
    }
  };

  const formatPrice = (price: number): string => {
    return convertToPersian(price.toLocaleString('en-US'));
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`stats-drawer-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside 
        className={`stats-drawer ${isOpen ? 'open' : ''}`}
        role="complementary"
        aria-label="پنل پلن‌های پیشنهادی"
      >
        {/* Header */}
        <header className="stats-drawer-header">
          <div>
            <h2>پلن‌های پیشنهادی</h2>
            <p className="stats-drawer-subtitle">انتخاب بهترین پلن برای نیازهای شما</p>
          </div>
          <button
            onClick={onClose}
            className="stats-drawer-close"
            title="بستن پنل"
            aria-label="بستن پنل پلن‌ها"
          >
            <X size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="stats-drawer-content">
          {/* Billing Period Toggle */}
          <div className="billing-toggle-wrapper">
            <button
              type="button"
              className={`billing-toggle-option ${billingPeriod === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('monthly')}
              title="نمایش قیمت ماهانه"
            >
              ماهانه
            </button>
            <button
              type="button"
              className={`billing-toggle-option ${billingPeriod === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingPeriod('yearly')}
              title="نمایش قیمت سالانه"
            >
              سالانه
              <span className="billing-toggle-badge">{convertToPersian('20')}٪ تخفیف</span>
            </button>
          </div>

          {/* Plans Section */}
          <section className="stats-section" aria-labelledby="plans-heading">
            <h3 id="plans-heading" className="section-title">تمام پلن‌ها</h3>
            
            <div className="plans-compact">
              {/* Plan 1 - Basic */}
              <div className="plan-compact-card">
                <div className="plan-compact-header">
                  <div className="plan-compact-icon" style={{ background: 'var(--bg-soft-peach)' }}>
                    <Zap size={16} style={{ color: 'var(--brand-secondary)' }} />
                  </div>
                  <div>
                    <h4 className="plan-compact-name">پایه</h4>
                    <p className="plan-compact-price">{formatPrice(plans.basic[billingPeriod])} تومان</p>
                  </div>
                </div>
                <ul className="plan-compact-features">
                  <li>{convertToPersian('5,000')} پیام در ماه</li>
                  <li>سه چت‌بات فعال</li>
                  <li>پشتیبانی اولویت‌دار</li>
                  <li>گزارش‌گیری پایه</li>
                </ul>
                <button className="plan-compact-button text-center">انتخاب پلن</button>
              </div>

              {/* Plan 2 - Professional - Featured */}
              <div className="plan-compact-card featured">
                <div className="plan-compact-badge">محبوب</div>
                <div className="plan-compact-header">
                  <div className="plan-compact-icon" style={{ background: 'var(--bg-soft-mint)' }}>
                    <Crown size={16} style={{ color: 'var(--brand-primary)' }} />
                  </div>
                  <div>
                    <h4 className="plan-compact-name">حرفه‌ای</h4>
                    <p className="plan-compact-price">{formatPrice(plans.professional[billingPeriod])} تومان</p>
                  </div>
                </div>
                <ul className="plan-compact-features">
                  <li>{convertToPersian('20,000')} پیام در ماه</li>
                  <li>ده چت‌بات فعال</li>
                  <li>پشتیبانی ۲۴/۷</li>
                  <li>گزارش‌گیری پیشرفته</li>
                </ul>
                <button className="plan-compact-button primary text-center">انتخاب پلن</button>
              </div>

              {/* Plan 3 - Advanced */}
              <div className="plan-compact-card">
                <div className="plan-compact-header">
                  <div className="plan-compact-icon" style={{ background: 'var(--bg-soft-lavender)' }}>
                    <Star size={16} style={{ color: 'var(--brand-accent)' }} />
                  </div>
                  <div>
                    <h4 className="plan-compact-name">پیشرفته</h4>
                    <p className="plan-compact-price">{formatPrice(plans.advanced[billingPeriod])} تومان</p>
                  </div>
                </div>
                <ul className="plan-compact-features">
                  <li>{convertToPersian('100,000')} پیام در ماه</li>
                  <li>نامحدود چت‌بات</li>
                  <li>پشتیبانی اختصاصی</li>
                  <li>تحلیل هوش مصنوعی</li>
                </ul>
                <button className="plan-compact-button text-center">انتخاب پلن</button>
              </div>

              {/* Plan 4 - Enterprise */}
              <div className="plan-compact-card">
                <div className="plan-compact-header">
                  <div className="plan-compact-icon" style={{ background: '#FFF4E6' }}>
                    <Building2 size={16} style={{ color: '#FF9800' }} />
                  </div>
                  <div>
                    <h4 className="plan-compact-name">سازمانی</h4>
                    <p className="plan-compact-price">تماس برای مشاوره</p>
                  </div>
                </div>
                <ul className="plan-compact-features">
                  <li>پیام نامحدود</li>
                  <li>چت‌بات نامحدود</li>
                  <li>مدیر اختصاصی</li>
                  <li>راه‌حل سفارشی</li>
                </ul>
                <button className="plan-compact-button text-center">تماس با ما</button>
              </div>
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}