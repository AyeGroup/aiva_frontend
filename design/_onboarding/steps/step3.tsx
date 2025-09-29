import { useState } from 'react';
import { BotConfig } from '../onboarding';
import { onboardingData } from '../onboarding.data';
import { Card } from '../../_components/Card/card';
import { Button } from '../../_components/Button/button';
import { Input } from '../../_components/Input/input';
import { Upload, Palette, MessageSquare, Settings } from 'lucide-react';

interface WizardStep3Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep3({ botConfig, updateConfig }: WizardStep3Props) {
  const [selectedColor, setSelectedColor] = useState(botConfig.color);
  const [selectedPosition, setSelectedPosition] = useState(botConfig.branding.position);
  const [selectedSize, setSelectedSize] = useState(botConfig.branding.size);

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    updateConfig({ color });
  };

  const handlePositionChange = (position: 'bottom-right' | 'bottom-left') => {
    setSelectedPosition(position);
    updateConfig({ 
      branding: { 
        ...botConfig.branding, 
        position 
      } 
    });
  };

  const handleSizeChange = (size: 'small' | 'medium' | 'large') => {
    setSelectedSize(size);
    updateConfig({ 
      branding: { 
        ...botConfig.branding, 
        size 
      } 
    });
  };

  const getSizeInPx = (size: string) => {
    switch (size) {
      case 'small': return 50;
      case 'medium': return 60;
      case 'large': return 70;
      default: return 60;
    }
  };

  return (
    <div className="step-content space-y-8" dir="rtl">
      {/* Modern Header with Icon */}
      <div className="text-right mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-brand-tertiary to-brand-primary rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 4V2C7 1.45 7.45 1 8 1S9 1.55 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.55 17 2V4H18C19.1 4 20 4.9 20 6V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V6C4 4.9 4.9 4 6 4H7M6 20H18V10H6V20M8 12H16V14H8V12M8 16H13V18H8V16Z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-grey-900 mb-2">
              شخصی‌سازی ظاهر
            </h2>
            <p className="text-grey-600">
              برند و هویت بصری چت‌بات خود را طراحی کنید
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Customization Options */}
        <div className="space-y-8">
          {/* Color Selection */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-grey-900">رنگ اصلی</h3>
                <p className="text-grey-600 text-body-small">رنگ دکمه چت و عناصر اصلی</p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              {onboardingData.colors.map((colorOption) => (
                <button
                  key={colorOption.value}
                  onClick={() => handleColorChange(colorOption.value)}
                  className={`
                    relative w-full aspect-square rounded-lg transition-all duration-200
                    ${selectedColor === colorOption.value 
                      ? 'ring-2 ring-grey-400 ring-offset-2 scale-105' 
                      : 'hover:scale-105'
                    }
                  `}
                  style={{ backgroundColor: colorOption.value }}
                  title={colorOption.name}
                >
                  {selectedColor === colorOption.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </Card>

          {/* Position Selection */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-brand-secondary" />
              </div>
              <div>
                <h3 className="text-grey-900">موقعیت نمایش</h3>
                <p className="text-grey-600 text-body-small">محل قرارگیری دکمه چت در سایت</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {onboardingData.positionOptions.map((position) => (
                <button
                  key={position.id}
                  onClick={() => handlePositionChange(position.id as any)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200 text-right
                    ${selectedPosition === position.id
                      ? 'border-brand-secondary bg-bg-soft-mint'
                      : 'border-border-soft hover:border-brand-secondary/50'
                    }
                  `}
                >
                  <h4 className="text-grey-900 mb-1">{position.name}</h4>
                  <p className="text-grey-600 text-body-small">{position.description}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Size Selection */}
          <Card className="p-6">
            <h3 className="text-grey-900 mb-4">اندازه دکمه چت</h3>
            
            <div className="space-y-3">
              {onboardingData.sizeOptions.map((sizeOption) => (
                <button
                  key={sizeOption.id}
                  onClick={() => handleSizeChange(sizeOption.id as any)}
                  className={`
                    w-full p-4 rounded-lg border-2 transition-all duration-200 text-right
                    flex items-center justify-between
                    ${selectedSize === sizeOption.id
                      ? 'border-brand-tertiary bg-bg-soft-rose'
                      : 'border-border-soft hover:border-brand-tertiary/50'
                    }
                  `}
                >
                  <div>
                    <h4 className="text-grey-900 mb-1">{sizeOption.name}</h4>
                    <p className="text-grey-600 text-body-small">{sizeOption.description}</p>
                  </div>
                  <div 
                    className="rounded-full flex items-center justify-center text-white font-medium"
                    style={{ 
                      backgroundColor: selectedColor,
                      width: `${getSizeInPx(sizeOption.id) / 2}px`,
                      height: `${getSizeInPx(sizeOption.id) / 2}px`,
                      fontSize: `${getSizeInPx(sizeOption.id) / 4}px`
                    }}
                  >
                    💬
                  </div>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column - Messages & Preview */}
        <div className="space-y-8">
          {/* Custom Messages */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-brand-tertiary/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-brand-tertiary" />
              </div>
              <div>
                <h3 className="text-grey-900">پیام‌های سفارشی</h3>
                <p className="text-grey-600 text-body-small">پیام‌هایی که دستیار نمایش می‌دهد</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label htmlFor="welcomeMessage" className="block text-grey-900 mb-2">
                  پیام خوش‌آمدگویی
                  <span className="text-brand-primary mr-1">*</span>
                </label>
                <textarea
                  id="welcomeMessage"
                  value={botConfig.welcomeMessage}
                  onChange={(e) => updateConfig({ welcomeMessage: e.target.value })}
                  placeholder="سلام! چطور می‌تونم کمکتون کنم؟"
                  rows={3}
                  className="w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                />
                <p className="text-grey-500 mt-1 text-body-small">
                  اولین پیامی که کاربران می‌بینند
                </p>
              </div>

              <div>
                <label htmlFor="fallbackMessage" className="block text-grey-900 mb-2">
                  پیام عدم درک سؤال
                </label>
                <textarea
                  id="fallbackMessage"
                  value={botConfig.fallbackMessage}
                  onChange={(e) => updateConfig({ fallbackMessage: e.target.value })}
                  placeholder="متأسفانه نمی‌تونم پاسخ این سؤال رو بدم. لطفاً با پشتیبانی تماس بگیرید."
                  rows={3}
                  className="w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                />
                <p className="text-grey-500 mt-1 text-body-small">
                  زمانی که دستیار نمی‌تواند پاسخ دهد
                </p>
              </div>
            </div>
          </Card>

          {/* Logo Upload */}
          <Card className="p-6">
            <h3 className="text-grey-900 mb-4">لوگو (اختیاری)</h3>
            
            <div className="border-2 border-dashed border-grey-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-grey-400 mx-auto mb-3" />
              <p className="text-grey-600 mb-3">
                لوگو یا آواتار دستیار را آپلود کنید
              </p>
              <Button variant="secondary" size="small">
                انتخاب فایل
              </Button>
              <p className="text-grey-500 mt-2 text-body-small">
                فرمت‌های PNG، JPG یا SVG - حداکثر ۲ مگابایت
              </p>
            </div>
          </Card>

          {/* Live Preview */}
          <Card className="p-6 bg-gradient-to-br from-bg-surface to-grey-50">
            <h3 className="text-grey-900 mb-4">پیش‌نمایش زنده</h3>
            
            {/* Chat Widget Preview */}
            <div className="relative bg-white rounded-lg p-4 shadow-md min-h-[300px] border">
              {/* Chat Header */}
              <div className="flex items-center gap-3 pb-3 border-b border-grey-200">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: selectedColor }}
                >
                  {botConfig.branding.logo ? (
                    <img src={botConfig.branding.logo} alt="Logo" className="w-8 h-8 rounded-full" />
                  ) : (
                    botConfig.name.charAt(0)
                  )}
                </div>
                <div>
                  <h4 className="text-grey-900 font-medium">{botConfig.name}</h4>
                  <span className="text-success text-body-small">آنلاین</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="py-4 space-y-3">
                <div className="flex justify-start">
                  <div 
                    className="max-w-xs p-3 rounded-lg text-white text-body-small"
                    style={{ backgroundColor: selectedColor }}
                  >
                    {botConfig.welcomeMessage}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="max-w-xs p-3 rounded-lg bg-grey-200 text-grey-900 text-body-small">
                    محصولات شما چه هستند؟
                  </div>
                </div>

                <div className="flex justify-start">
                  <div 
                    className="max-w-xs p-3 rounded-lg text-white text-body-small"
                    style={{ backgroundColor: selectedColor }}
                  >
                    با توجه به اطلاعاتی که در پایگاه دانش من موجود است، ما محصولات مختلفی ارائه می‌دهیم...
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t border-grey-200 pt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="پیام خود را بنویسید..."
                    className="flex-1 px-3 py-2 border border-grey-300 rounded-lg text-body-small"
                    disabled
                  />
                  <button
                    className="px-4 py-2 rounded-lg text-white text-body-small"
                    style={{ backgroundColor: selectedColor }}
                    disabled
                  >
                    ارسال
                  </button>
                </div>
              </div>

              {/* Chat Button Position Demo */}
              <div 
                className={`
                  absolute w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white font-medium cursor-pointer
                  ${selectedPosition === 'bottom-right' ? 'bottom-4 left-4' : 'bottom-4 right-4'}
                `}
                style={{ 
                  backgroundColor: selectedColor,
                  width: `${getSizeInPx(selectedSize)}px`,
                  height: `${getSizeInPx(selectedSize)}px`,
                  fontSize: `${getSizeInPx(selectedSize) / 3}px`
                }}
              >
                💬
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}