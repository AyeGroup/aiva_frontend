 
export const onboardingData = {
  title: "بیایید آیوا را برای سایت شما راه‌اندازی کنیم",
  subtitle:
    "در ۶ گام ساده، دستیار هوشمند خود را بسازید و به سایت‌تان اضافه کنید.",

  steps: [
    {
      id: "setup",
      title: "تنظیمات اولیه",
      description: "نام، زبان، شخصیت دستیار را تعیین کنید",
    },
    {
      id: "appearance",
      title: "تنظیمات ظاهری",
      description: "مشخصات ظاهری دستیار را تعیین کنید",
    },
    {
      id: "knowledge",
      title: "پایگاه دانش",
      description: "اطلاعات و محتوای مربوط به کسب‌وکارتان را اضافه کنید",
    },
    {
      id: "faq",
      title: "سوالات متداول",
      description: "سوالات و پاسخ‌های رایج کسب‌وکارتان را اضافه کنید",
    },
    {
      id: "behavior",
      title: "تنظیمات پاسخ",
      description: "رفتار و قوانین پاسخ‌گویی چت‌بات را تنظیم کنید",
    },
    {
      id: "deploy",
      title: "نصب و راه‌اندازی",
      description: "کد را در سایت خود قرار دهید و شروع کنید",
    },
  ],

  languages: [
    { code: "persian", name: "فارسی", native: "فارسی", disabled: false },
    {
      code: "english",
      name: "انگلیسی (به زودی)",
      native: "English",
      disabled: true,
    },
    {
      code: "arabic",
      name: "عربی (به زودی)",
      native: "العربية",
      disabled: true,
    },
    {
      code: "turkish",
      name: "ترکی (به زودی)",
      native: "Türkçe",
      disabled: true,
    },
  ],

  tones: [
    {
      id: "دوستانه",
      name: "دوستانه",
      description: "گرم، صمیمی و قابل دسترس",
      example: "سلام! خوشحالم که می‌تونم کمکتون کنم  ",
    },
    {
      id: "حرفه‌ای",
      name: "حرفه‌ای",
      description: "رسمی، دقیق و قابل اعتماد",
      example: "با سلام. چگونه می‌توانم به شما کمک کنم؟",
    },
    {
      id: "راحت",
      name: "راحت",
      description: "غیررسمی، شوخ‌طبع و نزدیک",
      example: "سلاام! چه خبر؟ چه کار می‌تونم برات بکنم؟",
    },
    {
      id: "متخصص",
      name: "متخصص",
      description: "علمی، دقیق و مبتنی بر دانش",
      example:
        "سلام. من دستیار هوشمند شما هستم.برای تحلیل و پاسخ دقیق، سوال خود را مطرح کنید.",
    },
  ],

  colors: [
    { name: "کورال", value: "#EB6E5B", isDefault: true },
    { name: "تیل", value: "#4CA7A5" },
    { name: "عنبری", value: "#F5A623" },
    { name: "آبی", value: "#3B82F6" },
    { name: "سبز", value: "#22C55E" },
    { name: "بنفش", value: "#8B5CF6" },
    { name: "صورتی", value: "#EC4899" },
    { name: "خاکستری", value: "#6B7280" },
  ],

  knowledgeTypes: [
    {
      id: "file",
      title: "افزودن فایل",
      description: "فایل با فرمت word ٬ pdf ٬ csv",
      icon: "file-text",
      placeholder: "فایل‌های خود را اینجا بکشید یا کلیک کنید",
    },
    {
      id: "website",
      title: "افزودن لینک وب سایت",
      description: "صفحات سایت یا منابع آنلاین",
      icon: "link",
      placeholder: "https://example.com/about",
    },
    {
      id: "qa_pair",
      title: "افزودن پرسش و پاسخ",
      description: "اضافه کردن محتوا",
      icon: "type",
      placeholder: "درباره شرکت، محصولات، خدمات...",
    },
  ],

  sampleGuidlines: [
    "محصولات شما چه هستند؟",
    "ساعات کاری شما چیست؟",
    "چگونه می‌توانم سفارش دهم؟",
    "آیا ارسال رایگان دارید؟",
    "چگونه با پشتیبانی تماس بگیرم؟",
  ],

  sampleQuestions: [
    "محصولات شما چه هستند؟",
    "ساعات کاری شما چیست؟",
    "چگونه می‌توانم سفارش دهم؟",
    "آیا ارسال رایگان دارید؟",
    "چگونه با پشتیبانی تماس بگیرم؟",
  ],

  positionOptions: [
    {
      id: "bottom_right",
      name: "پایین راست",
      description: "موقعیت استاندارد و محبوب",
      preview: "br",
    },
    {
      id: "bottom_left",
      name: "پایین چپ",
      description: "مناسب سایت‌های چپ‌چین",
      preview: "bl",
    },
  ],

  sizeOptions: [
    {
      id: "small",
      name: "کوچک",
      description: "50px × 50px",
      size: "کوچک",
    },
    {
      id: "medium",
      name: "متوسط",
      description: "60px × 60px",
      size: "متوسط",
    },
    {
      id: "large",
      name: "بزرگ",
      description: "70px × 70px",
      size: "بزرگ",
    },
  ],
};
