import { useState } from 'react';
import { BotConfig } from '../onboarding';
import { onboardingData } from '../onboarding.data';
import { Input } from '../../_components/Input/input';
import { Select } from '../../_components/Select/select';
import { Card } from '../../_components/Card/card';

interface WizardStep1Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

export function WizardStep1({ botConfig, updateConfig }: WizardStep1Props) {
  const [selectedTone, setSelectedTone] = useState(botConfig.tone);

  const handleToneChange = (toneId: string) => {
    setSelectedTone(toneId);
    updateConfig({ tone: toneId });
  };

  return (
    <div className="step-content space-y-8" dir="rtl">
      {/* Modern Header with Icon */}
      <div className="text-right mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-grey-900 mb-2">
              تنظیمات اولیه دستیار
            </h2>
            <p className="text-grey-600">
              شخصیت و ویژگی‌های پایه چت‌بات خود را تعریف کنید
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
            </div>
            <h3 className="text-grey-900">اطلاعات پایه</h3>
          </div>

          {/* Bot Name */}
          <div className="form-group">
            <label htmlFor="botName" className="block text-grey-900 mb-3">
              نام دستیار
              <span className="text-brand-primary ml-1">*</span>
            </label>
            <Input
              id="botName"
              type="text"
              value={botConfig.name}
              onChange={(e) => updateConfig({ name: e.target.value })}
              placeholder="مثال: آیوا، ربات مشاور، دستیار فروش"
              className="w-full"
            />
            <p className="text-grey-500 mt-2 text-body-small text-right">
              این نام در مکالمات و رابط کاربری نمایش داده می‌شود
            </p>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="botDescription" className="block text-grey-900 mb-3">
              توضیح مختصر (اختیاری)
            </label>
            <textarea
              id="botDescription"
              value={botConfig.description}
              onChange={(e) => updateConfig({ description: e.target.value })}
              placeholder="مثال: دستیار فروش آنلاین که به مشتریان در انتخاب محصولات کمک می‌کند"
              rows={3}
              className="w-full px-4 py-3 border border-border-soft rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none text-right"
              dir="rtl"
            />
          </div>

          {/* Language Selection */}
          <div className="form-group">
            <label className="block text-grey-900 mb-3">
              زبان پیش‌فرض
              <span className="text-brand-primary ml-1">*</span>
            </label>
            <Select
              value={botConfig.language}
              onValueChange={(value) => updateConfig({ language: value })}
              placeholder="زبان را انتخاب کنید"
            >
              {onboardingData.languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name} ({lang.native})
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Personality Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-brand-secondary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-secondary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <h3 className="text-grey-900">شخصیت و لحن گفتگو</h3>
          </div>
          
          <div className="grid gap-4">
            {onboardingData.tones.map((tone) => (
              <Card
                key={tone.id}
                className={`
                  p-5 cursor-pointer transition-all duration-300 border-2 hover:shadow-md
                  ${selectedTone === tone.id 
                    ? 'border-brand-primary bg-gradient-to-l from-brand-primary/5 to-brand-secondary/5 shadow-lg scale-[1.02]' 
                    : 'border-border-soft hover:border-brand-primary/30'
                  }
                `}
                onClick={() => handleToneChange(tone.id)}
              >
                <div className="flex items-start gap-4" dir="rtl">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-all
                    ${selectedTone === tone.id 
                      ? 'border-brand-primary bg-brand-primary shadow-md' 
                      : 'border-grey-300'
                    }
                  `}>
                    {selectedTone === tone.id && (
                      <div className="w-3 h-3 bg-white rounded-full" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="text-grey-900 font-medium">
                        {tone.name}
                      </h4>
                      {selectedTone === tone.id && (
                        <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <p className="text-grey-600 text-body-small mb-3">
                      {tone.description}
                    </p>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-grey-100">
                      <p className="text-grey-800 text-body-small italic text-right">
                        "{tone.example}"
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Info */}
        <div className="bg-gradient-to-l from-brand-primary/5 to-brand-secondary/5 rounded-2xl p-6 border border-brand-primary/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-grey-900 font-medium">مرحله بعد</h4>
          </div>
          <p className="text-grey-700 text-right">
            در مرحله بعد، پایگاه دانش چت‌بات خود را تعریف خواهید کرد تا بتواند پاسخ‌های دقیق و مفیدی به سؤالات کاربران بدهد.
          </p>
        </div>
      </div>
    </div>
  );
}