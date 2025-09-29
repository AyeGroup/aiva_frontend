// داده‌های ویزارد آنبوردینگ آیوا

export const onboardingData = {
  title: 'بیایید آیوا را برای سایت شما راه‌اندازی کنیم',
  subtitle: 'در ۵ گام ساده، دستیار هوشمند خود را بسازید و به سایت‌تان اضافه کنید.',
  
  steps: [
    {
      id: 'setup',
      title: 'تنظیمات اولیه',
      description: 'نام، زبان و شخصیت دستیار را تعیین کنید'
    },
    {
      id: 'knowledge',
      title: 'پایگاه دانش',
      description: 'اطلاعات و محتوای مربوط به کسب‌وکارتان را اضافه کنید'
    },
    {
      id: 'customization',
      title: 'شخصی‌سازی',
      description: 'ظاهر و پیام‌های دستیار را مطابق برند خود تنظیم کنید'
    },
    {
      id: 'test',
      title: 'تست و آزمایش',
      description: 'دستیار را آزمایش کنید و پاسخ‌ها را بررسی کنید'
    },
    {
      id: 'deploy',
      title: 'نصب و راه‌اندازی',
      description: 'کد را در سایت خود قرار دهید و شروع کنید'
    }
  ],

  languages: [
    { code: 'fa', name: 'فارسی', native: 'فارسی' },
    { code: 'en', name: 'انگلیسی', native: 'English' },
    { code: 'ar', name: 'عربی', native: 'العربية' },
    { code: 'tr', name: 'ترکی', native: 'Türkçe' },
    { code: 'de', name: 'آلمانی', native: 'Deutsch' },
    { code: 'fr', name: 'فرانسوی', native: 'Français' }
  ],

  tones: [
    { 
      id: 'friendly', 
      name: 'دوستانه', 
      description: 'گرم، صمیمی و قابل دسترس',
      example: 'سلام! خوشحالم که می‌تونم کمکتون کنم 😊'
    },
    { 
      id: 'professional', 
      name: 'حرفه‌ای', 
      description: 'رسمی، دقیق و قابل اعتماد',
      example: 'با سلام. چگونه می‌توانم به شما کمک کنم؟'
    },
    { 
      id: 'casual', 
      name: 'راحت', 
      description: 'غیررسمی، شوخ‌طبع و نزدیک',
      example: 'سلاام! چه خبر؟ چی می‌تونم برات بکنم؟'
    },
    { 
      id: 'expert', 
      name: 'متخصص', 
      description: 'علمی، دقیق و مبتنی بر دانش',
      example: 'با توجه به سؤال شما، پاسخ دقیق این موضوع عبارت است از...'
    }
  ],

  colors: [
    { name: 'کورال', value: '#EB6E5B', isDefault: true },
    { name: 'تیل', value: '#4CA7A5' },
    { name: 'عنبری', value: '#F5A623' },
    { name: 'آبی', value: '#3B82F6' },
    { name: 'سبز', value: '#22C55E' },
    { name: 'بنفش', value: '#8B5CF6' },
    { name: 'صورتی', value: '#EC4899' },
    { name: 'خاکستری', value: '#6B7280' }
  ],

  knowledgeTypes: [
    {
      id: 'faq',
      title: 'سؤالات متداول',
      description: 'سؤالات و پاسخ‌های رایج کسب‌وکارتان',
      icon: 'help-circle',
      placeholder: 'سؤال: محصول شما چیست؟\nپاسخ: ما یک...'
    },
    {
      id: 'document',
      title: 'آپلود فایل',
      description: 'PDF، Word، یا فایل‌های متنی',
      icon: 'file-text',
      placeholder: 'فایل‌های خود را اینجا بکشید یا کلیک کنید'
    },
    {
      id: 'url',
      title: 'آدرس وب',
      description: 'صفحات سایت یا منابع آنلاین',
      icon: 'link',
      placeholder: 'https://example.com/about'
    },
    {
      id: 'text',
      title: 'متن آزاد',
      description: 'اطلاعات مستقیم درباره کسب‌وکار',
      icon: 'type',
      placeholder: 'درباره شرکت، محصولات، خدمات...'
    }
  ],

  sampleQuestions: [
    'محصولات شما چه هستند؟',
    'ساعات کاری شما چیست؟',
    'چگونه می‌توانم سفارش دهم؟',
    'آیا ارسال رایگان دارید؟',
    'چگونه با پشتیبانی تماس بگیرم؟'
  ],

  positionOptions: [
    { 
      id: 'bottom-right', 
      name: 'پایین راست', 
      description: 'موقعیت استاندارد و محبوب',
      preview: 'br'
    },
    { 
      id: 'bottom-left', 
      name: 'پایین چپ', 
      description: 'مناسب سایت‌های چپ‌چین',
      preview: 'bl'
    }
  ],

  sizeOptions: [
    { 
      id: 'small', 
      name: 'کوچک', 
      description: '50px × 50px',
      size: 'کوچک'
    },
    { 
      id: 'medium', 
      name: 'متوسط', 
      description: '60px × 60px',
      size: 'متوسط'
    },
    { 
      id: 'large', 
      name: 'بزرگ', 
      description: '70px × 70px',
      size: 'بزرگ'
    }
  ]
};