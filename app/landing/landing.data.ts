// داده‌های صفحه لندینگ آیوا

export const heroData = {
  headline: 'دستیار هوشمند برای هر وب‌سایتی',
  subheadline: 'آیوا در چند دقیقه به سایت شما وصل می‌شود، بر اساس محتوای شما آموزش می‌بیند، به فارسی و چندزبان پاسخ می‌دهد و سرنخ‌های فروش را جمع می‌کند.',
  
  cta: {
    primary: {
      text: 'شروع رایگان',
      href: '/signup',
      title: 'ثبت‌نام رایگان و شروع استفاده از آیوا'
    },
    secondary: {
      text: 'دموی زنده',
      href: '#demo',
      title: 'مشاهده دموی تعاملی آیوا'
    }
  },

  socialProof: [
    '+۲,۳۰۰ گفت‌وگو در هفته',
    'امتیاز رضایت ۴٫۷/۵',
    'میانگین زمان پاسخ < ۱ ثانیه'
  ]
};

export const howItWorksData = {
  title: 'آیوا برای چه کسب‌وکارهایی مناسب است؟',
  subtitle: 'چت‌بات هوشمند برای صنایع مختلف با کاربردهای تخصصی',
  
  tabs: {
    industries: {
      id: 'industries',
      label: 'براساس صنعت',
      badgeText: 'صنایع مختلف'
    },
    useCases: {
      id: 'useCases',
      label: 'براساس کاربرد',
      badgeText: 'کاربردها'
    }
  },
  
  industries: [
    {
      id: '1',
      title: 'خدمات حقوقی و مشاوره‌ای',
      emoji: '💼',
      description: 'پاسخ هوشمند به سوالات، ارجاع به وکلای تخصصی، جمع‌آوری اطلاعات اولیه پرونده',
      icon: 'scale',
      color: 'var(--sharp-coral)'
    },
    {
      id: '2',
      title: 'آرایش و بهداشت',
      emoji: '🧴',
      description: 'پیشنهاد محصول شخصی‌سازی‌شده، رسیدگی به سفارشات، توصیه مراقبت پوستی',
      icon: 'sparkles',
      color: 'var(--sharp-pink)'
    },
    {
      id: '3',
      title: 'فروشگاه‌های آنلاین',
      emoji: '🛍️',
      description: 'راهنمای خرید، وضعیت سفارش، سبد هوشمند، تحلیل مشتری برای افزایش فروش',
      icon: 'shopping-cart',
      color: 'var(--sharp-emerald)'
    },
    {
      id: '4', 
      title: 'مواد غذایی/رستوران‌ها',
      emoji: '🍔',
      description: 'سفارش گیری سریع، پیشنهاد برای رژیم‌ها، پیگیری وضعیت سفارش',
      icon: 'utensils',
      color: 'var(--sharp-orange)'
    },
    {
      id: '5',
      title: 'حمل‌ونقل و لجستیک',
      emoji: '🚗',
      description: 'وضعیت مرسوله، اعلام زمان‌بندی تحویل، پاسخ به سوالات مشتری',
      icon: 'truck',
      color: 'var(--sharp-cyan)'
    },
    {
      id: '6',
      title: 'خدمات مالی و بانکی',
      emoji: '💳',
      description: 'توضیح مراحل دریافت وام، مشاوره افتتاح حساب، مشاوره امور مالی',
      icon: 'credit-card',
      color: 'var(--sharp-indigo)'
    },
    {
      id: '7',
      title: 'آموزش و آموزشگاه‌ها',
      emoji: '🧠',
      description: 'راهنمای ثبت‌نام، آموزش هوشمند، حل تمرین، پاسخ به سؤالات درس، تدریس تعاملی',
      icon: 'graduation-cap',
      color: 'var(--sharp-violet)'
    },
    {
      id: '8',
      title: 'منابع انسانی و اداری',
      emoji: '🧑‍💼',
      description: 'پاسخ به سؤالات کارکنان، اعلام مرخصی، گزارش حضور، فرم‌های داخلی',
      icon: 'briefcase',
      color: 'var(--sharp-teal)'
    },
    {
      id: '9',
      title: 'سلامت و پزشکی',
      emoji: '🏥',
      description: 'غربالگری اولیه، پرسش علائم، زمان‌بندی و پیگیری نوبت',
      icon: 'heart-pulse',
      color: 'var(--sharp-crimson)'
    },
    {
      id: '10',
      title: 'املاک و مستغلات',
      emoji: '🏠',
      description: 'جستجوی ملک، فیلتر شرایط، هماهنگی بازدید',
      icon: 'home',
      color: 'var(--sharp-amber)'
    },
    {
      id: '11',
      title: 'بیمه و خدمات پس از فروش',
      emoji: '🎯',
      description: 'پاسخ به سوالات پوشش بیمه‌ای، ثبت خسارت، پیگیری وضعیت',
      icon: 'shield-check',
      color: 'var(--sharp-lime)'
    },
    {
      id: '12',
      title: 'حوزه‌های سرگرمی و محتوا',
      emoji: '🎁',
      description: 'بازی، آزمون، گفت‌وگوهای تعاملی، معرفی رویداد',
      icon: 'gift',
      color: 'var(--sharp-rose)'
    }
  ],
  
  useCases: [
    {
      id: '1',
      title: 'پشتیبانی و ارتباط با مشتری',
      titleEn: 'Customer Support',
      description: 'چت‌بات در هر ساعت پاسخگوی سوالات تکراری، وضعیت سفارش و راهنمایی کاربران است.',
      icon: 'headphones',
      color: 'var(--sharp-primary)'
    },
    {
      id: '2',
      title: 'فروش و بازاریابی',
      titleEn: 'Sales & Marketing',
      description: 'همراه خریدار از مرحله معرفی محصول تا نهایی‌سازی خرید با گفتگوهای هوشمند.',
      icon: 'trending-up',
      color: 'var(--sharp-emerald)'
    },
    {
      id: '3',
      title: 'خدمات پس از فروش',
      titleEn: 'After-Sales Service',
      description: 'بررسی گارانتی، ثبت درخواست پشتیبانی و اطلاع‌رسانی وضعیت تعمیر یا تعویض به‌صورت خودکار',
      icon: 'package-check',
      color: 'var(--sharp-orange)'
    },
    {
      id: '4',
      title: 'آموزش و راهنمایی',
      titleEn: 'Education & Guidance',
      description: 'چت‌بات می‌تواند مفاهیم آموزشی، راهنمای نرم‌افزار یا پاسخ تست‌ها را توضیح دهد.',
      icon: 'book-open',
      color: 'var(--sharp-violet)'
    },
    {
      id: '5',
      title: 'منابع انسانی و سازمانی',
      titleEn: 'HR & Internal',
      description: 'پاسخ سریع به سوالات کارکنان درباره مرخصی، حقوق، فرآیندها و فرم‌های داخلی',
      icon: 'users',
      color: 'var(--sharp-indigo)'
    },
    {
      id: '6',
      title: 'مشاوره و خدمات تخصصی',
      titleEn: 'Consulting & Expert Services',
      description: 'دریافت اطلاعات از کاربر، تحلیل نیاز و ارجاع هوشمند به مشاور یا واحد حرفه‌ای مربوطه',
      icon: 'lightbulb',
      color: 'var(--sharp-coral)'
    }
  ]
};

export const successStoriesData = {
  title: 'کسب‌وکارهایی که با آیوا اتوماسیون و رشد را تجربه کردند',
  subtitle: 'نتایج واقعی از برندهای مختلف',
  
  brands: [
    { id: 'hamiiyar', name: 'حامیار', category: 'پوشاک' },
    { id: 'aiwa', name: 'آیوا', category: 'تکنولوژی' },
    { id: 'steelbar', name: 'استیل بار', category: 'گردشگری' },
    { id: 'darya', name: 'دریا', category: 'خدمات' },
    { id: 'classic', name: 'کلاسیک', category: 'پوشاک' },
    { id: 'rayansabt', name: 'رایان ثبت', category: 'فناوری' },
    { id: 'artankala', name: 'آرتان کالا', category: 'املاک' }
  ],
  
  cases: {
    hamiiyar: {
      brand: 'حامیار',
      industry: 'پوشاک و مد آنلاین',
      stats: [
        {
          id: 'conversion',
          value: '+۱۵۰٪',
          label: 'افزایش نرخ تبدیل',
          description: 'با پاسخ‌گویی ۲۴/۷ به سوالات محصول'
        },
        {
          id: 'returns',
          value: '-۴۵٪',
          label: 'کاهش مرجوعی',
          description: 'راهنمایی دقیق سایز و انتخاب مناسب'
        },
        {
          id: 'satisfaction',
          value: '۴٫۸/۵',
          label: 'رضایت مشتریان',
          description: 'از کیفیت پاسخ‌گویی و راهنمایی'
        }
      ],
      testimonial: {
        text: 'آیوا تجربه خرید آنلاین رو برای مشتریان ما کاملاً متحول کرد. مشتریان با اطمینان بیشتری خرید می‌کنند.',
        author: 'رضا محمدی',
        role: 'مدیر فروش آنلاین',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      }
    },
    aiwa: {
      brand: 'آیوا',
      industry: 'پلتفرم چت‌بات',
      stats: [
        {
          id: 'support',
          value: '+۲۰۰٪',
          label: 'کاهش بار پشتیبانی',
          description: 'اتوماسیون پاسخ به سوالات متداول'
        },
        {
          id: 'speed',
          value: '< ۱ ثانیه',
          label: 'زمان پاسخ‌گویی',
          description: 'پاسخ فوری به تمام سوالات کاربران'
        },
        {
          id: 'leads',
          value: '+۳۲۰٪',
          label: 'افزایش لید',
          description: 'جمع‌آوری هوشمند اطلاعات کاربران'
        }
      ],
      testimonial: {
        text: 'با آیوا، پشتیبانی ما دیگه محدودیت زمانی نداره و مشتریان همیشه پاسخ می‌گیرن.',
        author: 'سارا احمدی',
        role: 'مدیر محصول',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      }
    },
    steelbar: {
      brand: 'استیل بار',
      industry: 'آژانس مسافرتی',
      stats: [
        {
          id: 'bookings',
          value: '+۱۸۵٪',
          label: 'افزایش رزرو',
          description: 'پاسخ سریع به درخواست‌های سفر'
        },
        {
          id: 'availability',
          value: '۲۴/۷',
          label: 'در دسترس‌بودن',
          description: 'پاسخ‌گویی در تمام ساعات شبانه‌روز'
        },
        {
          id: 'cost',
          value: '-۶۰٪',
          label: 'کاهش هزینه',
          description: 'صرفه‌جویی در هزینه اپراتور انسانی'
        }
      ],
      testimonial: {
        text: 'مشتریان ما دیگه منتظر ساعت کاری نمی‌مونن. آیوا همیشه آماده پاسخ‌گوییه.',
        author: 'علی کریمی',
        role: 'مدیرعامل',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      }
    },
    darya: {
      brand: 'دریا',
      industry: 'خدمات مالی',
      stats: [
        {
          id: 'automation',
          value: '+۲۵۰٪',
          label: 'اتوماسیون درخواست‌ها',
          description: 'پردازش خودکار سوالات رایج'
        },
        {
          id: 'accuracy',
          value: '۹۸٪',
          label: 'دقت پاسخ‌ها',
          description: 'پاسخ‌های دقیق و قابل اعتماد'
        },
        {
          id: 'waiting',
          value: '-۷۵٪',
          label: 'کاهش زمان انتظار',
          description: 'سرعت بالا در ارائه خدمات'
        }
      ],
      testimonial: {
        text: 'آیوا به ما کمک کرد تا خدمات بهتری با سرعت بیشتری ارائه بدیم.',
        author: 'مریم رضایی',
        role: 'مدیر خدمات مشتریان',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      }
    },
    classic: {
      brand: 'کلاسیک',
      industry: 'پوشاک کلاسیک',
      stats: [
        {
          id: 'engagement',
          value: '+۱۷۰٪',
          label: 'افزایش تعامل',
          description: 'گفت‌وگوی طولانی‌تر با مشتریان'
        },
        {
          id: 'style',
          value: '+۱۱۰٪',
          label: 'راهنمایی سبک',
          description: 'پیشنهاد ست‌های مناسب'
        },
        {
          id: 'repeat',
          value: '+۹۵٪',
          label: 'خریدهای مجدد',
          description: 'افزایش وفاداری مشتریان'
        }
      ],
      testimonial: {
        text: 'آیوا مثل یک مشاور شخصی برای هر مشتری عمل می‌کنه.',
        author: 'امیر حسینی',
        role: 'مدیر فروش',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      }
    },
    rayansabt: {
      brand: 'رایان ثبت',
      industry: 'خدمات فناوری',
      stats: [
        {
          id: 'tickets',
          value: '-۸۵٪',
          label: 'کاهش تیکت',
          description: 'حل خودکار مشکلات رایج'
        },
        {
          id: 'technical',
          value: '۹۲٪',
          label: 'پاسخ فنی',
          description: 'حل مشکلات فنی بدون نیاز به اپراتور'
        },
        {
          id: 'onboarding',
          value: '+۱۴۰٪',
          label: 'سرعت راه‌اندازی',
          description: 'کاربران جدید سریع‌تر شروع می‌کنند'
        }
      ],
      testimonial: {
        text: 'تیم پشتیبانی ما حالا روی مشکلات پیچیده تمرکز می‌کنه.',
        author: 'پوریا مهدوی',
        role: 'مدیر فنی',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop'
      }
    },
    artankala: {
      brand: 'آرتان کالا',
      industry: 'املاک و مستغلات',
      stats: [
        {
          id: 'inquiries',
          value: '+۲۲۰٪',
          label: 'افزایش استعلام',
          description: 'پاسخ به سوالات ملک ۲۴/۷'
        },
        {
          id: 'tours',
          value: '+۱۳۵٪',
          label: 'بازدیدهای برنامه‌ریزی شده',
          description: 'هماهنگی خودکار بازدید'
        },
        {
          id: 'response',
          value: '۵ دقیقه',
          label: 'زمان پاسخ اولیه',
          description: 'سریع‌تر از رقبا'
        }
      ],
      testimonial: {
        text: 'هیچ مشتری‌ای رو از دست نمی‌دیم چون آیوا همیشه آماده پاسخ‌گوییه.',
        author: 'نگار اکبری',
        role: 'مدیر فروش',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
      }
    }
  }
};

export const caseStudyData = {
  title: 'یک گفت‌وگوی نیمه‌شب، یک فروش واقعی!',
  story: 'فروشگاه آنلاین‌کالا قبلاً مشکل داشت که مشتریان شبانه پاسخ نمی‌گرفتند و سفارش‌ها از دست می‌رفت. بعد از راه‌اندازی چت‌بات RagBuilder، حتی ساعت ۳ صبح هم مشتری‌ها می‌تونند سایز، رنگ و موجودی رو چک کنند.',
  stat: {
    value: '+۵۰٪',
    label: 'رشد تعامل شبانه',
    description: 'در ۳ ماه اول، تعامل شبانه ۵۰٪ افزایش پیدا کرد و رضایت مشتری به ۹۷٪ رسید.'
  },
  cta: {
    text: 'متن می‌خوام تجربه‌اش کنم',
    title: 'امتحان رایگان چت‌بات آیوا'
  },
  chatDemo: {
    initialMessage: 'سلام! XL موجوده؟',
    response: 'بله، سایز XL موجوده! 😊',
    extraInfo: 'رنگ‌های موجود: مشکی، سفید، آبی\nقیمت: ۲۳۰,۰۰۰ تومان',
    buttons: [
      { text: 'افزودن به سبد', variant: 'primary' as const },
      { text: 'مشاهده محصول', variant: 'secondary' as const }
    ],
    finalMessage: 'فروش موفق! 💚',
    timestamp: '۲:۳۰ صبح'
  }
};

export const comparisonData = {
  title: 'پشتیبانی سریع‌تر، ارزان‌تر و بدون خستگی؛',
  subtitle: 'پشتیبانی انسانی گران و خسته‌کننده است، اما بات آیوا همیشه آماده‌است.',
  
  comparisons: [
    {
      id: 'wait-time',
      problem: {
        title: 'تلفن روی انتظار',
        description: 'مشتری ده دقیقه منتظر میمونه تا کسی جواب بده',
        icon: 'phone'
      },
      solution: {
        title: 'پاسخ فوری',
        description: 'چت‌بات در کمتر از ۳ ثانیه پاسخ میده',
        icon: 'zap'
      }
    },
    {
      id: 'consistency',
      problem: {
        title: 'پاسخ متفاوت هر بار',
        description: 'هر پشتیبان یه جور جواب میده٬ مشتری گیج میشه',
        icon: 'users'
      },
      solution: {
        title: 'پاسخ یکنواخت و دقیق',
        description: 'همیشه همون اطلاعات صحیح، بدون تناقض',
        icon: 'message-circle'
      }
    },
    {
      id: 'cost',
      problem: {
        title: 'هزینه بالای پرسنل',
        description: 'حقوق پشتیبان از ۳ تا ۲ میلیون تومان شروع میشه',
        icon: 'dollar-sign'
      },
      solution: {
        title: 'هزینه ثابت و کم',
        description: 'پلان‌های آیوا از چند هزار تومان شروع می‌شن',
        icon: 'trending-down'
      }
    },
    {
      id: 'insurance-tax',
      problem: {
        title: 'هزینه بالای بیمه و مالیات',
        description: 'بیمه و مالیات نیروی انسانی هزینه‌های پنهان قابل‌توجهی ایجاد می‌کنه',
        icon: 'receipt'
      },
      solution: {
        title: 'بدون هزینه اضافی',
        description: 'این هزینه‌ها با پلن‌های آیوا قابل مقایسه نیست',
        icon: 'trending-down'
      }
    },
    {
      id: 'fatigue',
      problem: {
        title: 'خستگی و استرس',
        description: 'پشتیبان انسانی بعد از ساعت‌ها پاسخگویی خسته میشه',
        icon: 'user-x'
      },
      solution: {
        title: 'همیشه آماده',
        description: 'چت‌بات ۲۴/۷ با همون انرژی پاسخ می‌ده',
        icon: 'clock'
      }
    }
  ]
};

export const pricingData = {
  title: 'پلنی که با کسب‌وکارت همساز باشه انتخاب کن',
  subtitle: 'از رایگان شروع کن یا با پلن‌های حرفه‌ای، کسب‌وکارت رو به سطح جدیدی ببر',
  
  plans: [
    {
      id: 'free',
      name: 'رایگان',
      nameEn: 'Free',
      description: '',
      price: '۰',
      period: 'ماه',
      features: [
        '۵۰ پیام ماهانه',
        'اتصال وب‌سایت به سایت',
        'ورود با ایمیل یا OTP',
        'منابع دانش پیشرفته'
      ],
      disabledFeatures: [
        'کدنگاری عمومی',
        'پیام‌رسان‌ها'
      ],
      cta: 'شروع رایگان',
      popular: false
    },
    {
      id: 'basic',
      name: 'پایه',
      nameEn: 'Basic',
      description: '',
      price: '۷۵۰,۰۰۰',
      period: 'ماه',
      features: [
        '۱۰۰۰ پیام ماهانه',
        'ابزاری اختصاصی چت‌بات',
        'آپلود تا ۱۰ فایل / PDF/Word/Excel/CSV',
        'داشبورد مدیریت چندمنبعتر',
        'آمار پایه',
        'گزارش مصرف Credit/دینار/ماهانه'
      ],
      disabledFeatures: [
        'کدنگاری عمومی',
        'پیام‌رسان‌ها'
      ],
      cta: 'ارتقاء به پایه',
      popular: false
    },
    {
      id: 'medium',
      name: 'متوسط',
      nameEn: 'Medium',
      description: '',
      price: '۱,۸۵۰,۰۰۰',
      period: 'ماه',
      features: [
        '۳۰۰۰ پیام ماهانه',
        'تعیین رفتار چت‌بات',
        'کدنگاری عمومی',
        'اتصال به پیام‌رسان‌ها (واتساپ، تلگرام، اینستاگرام)',
        'آپلود تا ۵۰ فایل',
        'آنالیتیکس پیشرفته',
        'یکپار همگی'
      ],
      disabledFeatures: [],
      cta: 'پلن محبوب کسب‌وکارها',
      popular: true
    },
    {
      id: 'advance',
      name: 'پیشرفته',
      nameEn: 'Advance',
      description: '',
      price: '۶,۵۵۵,۰۰۰',
      period: 'ماه',
      features: [
        '۱۰۰۰۰ پیام ماهانه',
        'انتخاب مدل GPT 4o (سانتاکس)',
        'اتصال به Google Drive/ و Dropbox',
        'اتصال به CRM',
        'امکان خرید اشتراک برای کاربران',
        'گزارش مصرف Credit/دینار/ماهانه',
        'کنترل نقش کاربران',
        'پشتیبانی تلفنی اختصاصی'
      ],
      disabledFeatures: [],
      cta: 'شروع با امکانات کامل',
      popular: false
    },
    {
      id: 'enterprise',
      name: 'توافقی',
      nameEn: 'Enterprise',
      description: '',
      price: 'سفارشی',
      period: '',
      features: [
        'پیام نامحدود و منابع دانش نامحدود',
        'API اختصاصی و اتوماسیون (Zapier، Make)',
        'امنیت پیشرفته و رمزنگاری سازمانی',
        'آموزش و Onboarding اختصاصی',
        'SLA 99.95%',
        'مشاوره پیاده‌سازی و مدیر موفقیت مشتری'
      ],
      disabledFeatures: [],
      cta: 'تماس با مشاور',
      popular: false
    }
  ],
  
  faq: [
    {
      question: 'معیار شمارش گفت‌وگو چیست؟',
      answer: 'هر گفت‌وگو یک جلسه ۳۰ دقیقه‌ای با کاربر محسوب می‌شود که شامل چندین پیام می‌تواند باشد.'
    },
    {
      question: 'اگر از حد مصرف بیشتر شود چه می‌شود؟',
      answer: 'به ازای هر ۱۰۰ گفت‌وگو اضافی مبلغ مشخصی محاسبه می‌شود. بدون قطع سرویس.'
    },
    {
      question: 'آیا می‌توان پلن را تغییر داد؟',
      answer: 'بله، در هر زمان می‌توانید ارتقاء یا کاهش پلن دهید. تغییرات از دوره بعدی اعمال می‌شود.'
    }
  ]
};

export const trustData = {
  title: 'امنیت و اعتماد',
  subtitle: 'داده‌های شما با بالاترین استانداردهای امنیتی محافظت می‌شود',
  
  features: [
    {
      title: 'داده‌های شما متعلق به خودتان',
      description: 'معماری پایگاه داده جداگانه تضمین می‌کند دانش کسب‌وکار، مکالمات مشتریان و اسناد حساس شما کاملاً جدا و امن باقی بمانند',
      icon: 'lock'
    },
    {
      title: 'کنترل کامل دسترسی‌ها',
      description: 'مجوزهای تیمی به شما اجازه می‌دهد دقیقاً مشخص کنید چه کسانی می‌توانند بخش‌های مختلف چت‌بات را مشاهده، ویرایش یا مدیریت کنند',
      icon: 'shield-check'
    },
    {
      title: 'امن برای وب‌سایت شما',
      description: 'ویجت قابل نصب ما به صورت ایمن یکپارچه می‌شود، بدون اینکه امنیت سایت یا حریم خصوصی بازدیدکنندگان شما را به خطر بیندازد',
      icon: 'key'
    },
    {
      title: 'استانداردهای امنیتی سازمانی',
      description: 'APIهای امن و احراز هویت قوی، هر تعامل از آپلود تا مکالمه را محافظت می‌کند',
      icon: 'database'
    }
  ]
};

export const faqData = {
  title: 'سؤالات پرتکرار',
  subtitle: 'پاسخ‌های سریع برای سؤالاتی که ممکنه داشته باشید',
  
  questions: [
    {
      id: 'technical-knowledge',
      icon: 'help-circle',
      question: 'آیا نیاز به دانش فنی دارم؟',
      answer: 'خیر، رابط کاربری RagBuilder طوری طراحی شده که بدون هیچ دانش فنی بتوانید چت‌بات خود رو بسازید.'
    },
    {
      id: 'setup-time',
      icon: 'clock',
      question: 'چقدر طول می‌کشه تا راه‌اندازی بشه؟',
      answer: 'کمتر از ۳۰ دقیقه! فقط فایل‌هایی آپلود کن، تنظیمات رو انجام بده و چت‌بات آماده‌ست.'
    },
    {
      id: 'data-security',
      icon: 'shield',
      question: 'اطلاعات من امن هست؟',
      answer: 'بله، تمام داده‌ها با رمزنگاری پیشرفته در سرورهای امن ذخیره می‌شوند و فقط شما به اون‌ها دسترسی دارید.'
    },
    {
      id: 'messenger-integration',
      icon: 'zap',
      question: 'آیا می‌تونم با پیام‌رسان‌ها متصلش کنم؟',
      answer: 'در پلن‌های متوسط و بالاتر، می‌تونید به واتساپ، تلگرام و اینستاگرام متصل کنید.'
    },
    {
      id: 'multiple-chatbots',
      icon: 'users',
      question: 'آیا می‌تونم چندین چت‌بات بسازم؟',
      answer: 'بله، بسته به پلن انتخابی، می‌تونید چند چت‌بات مختلف برای بخش‌های مختلف کسب‌وکارتون بسازید.'
    },
    {
      id: 'file-formats',
      icon: 'file-text',
      question: 'چه فرمت‌هایی رو پشتیبانی می‌کنه؟',
      answer: 'PDF, Word, Excel, CSV ساده، می‌تونید محتوای وب‌سایت خودتون رو هم اضافه کنید.'
    }
  ]
};

export const ctaData = {
  title: 'آماده شروع هستید؟',
  subtitle: 'آیوا را رایگان امتحان کنید و تفاوت را در همان روز اول احساس کنید',
  
  cta: {
    primary: {
      text: 'شروع رایگان',
      href: '/signup',
      title: 'ثبت‌نام رایگان و شروع استفاده از آیوا'
    },
    secondary: {
      text: 'مشاوره رایگان',
      href: '/consultation',
      title: 'دریافت مشاوره رایگان از کارشناسان آیوا'
    }
  },
  
  features: [
    'بدون نیاز به کارت اعتباری',
    'نصب در کمتر از ۵ دقیقه',
    'پشتیبانی ۲۴/۷'
  ]
};
