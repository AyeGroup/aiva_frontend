import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";
import {
  LoginTopLef2,
  LoginTopLeft,
  LoginTopLeft3,
  LoginTopRight,
} from "@/public/icons/AppIcons";

const PolicyClient = () => (
  <section className="relative mx-auto px-4 py-10 lg:p-30 leading-8 text-gray-800">
    <div className="absolute left-8 top-32 transform -translate-y-1/2 w-72 h-72 opacity-15">
      <LoginTopRight />
    </div>
    <div className="absolute top-1/5 left-54 w-32 h-32 opacity-20">
      <LoginTopLeft />
    </div>
    <div className="absolute top-1/3 left-16 w-40 h-40 opacity-15">
      <LoginTopLef2 />
    </div>
    <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-24 h-32 opacity-25">
      <LoginTopLeft3 />
    </div>
    <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
      قوانین و مقررات استفاده از سرویس آیوا
    </h1>
    <p className="mb-8 text-justify">
      با ثبت‌نام در سرویس آیوا و انتخاب گزینه «با قوانین و مقررات موافقم»، شما
      به‌طور کامل و بدون قید و شرط مفاد این شرایط را می‌پذیرید.
    </p>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۱. آیوا چیست
    </h2>

    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        آیوا یک
        <strong> پلتفرم نرم‌افزاری ابزارمحور (Tool-based SaaS)</strong> است که
        امکان ساخت، مدیریت و استقرار دستیارهای هوشمند را فراهم می‌کند.
      </li>
      <li>
        کلیه پاسخ‌های تولیدشده توسط بات‌ها
        <ul>
          <li>
            ✓ به صورت <strong>خودکار</strong>{" "}
          </li>
          <li>
            ✓ بر اساس <strong>داده‌های ارائه‌شده توسط کاربر</strong>{" "}
          </li>
          <li>✓ و بدون نظارت انسانی مستقیم آیوا</li>
        </ul>
        تولید می‌شوند.
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۲. پذیرش ریسک استفاده از هوش مصنوعی
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        کاربر آگاه است که خروجی مدل‌های هوش مصنوعی ممکن است{" "}
        <strong>نادقیق، ناقص، قدیمی یا گمراه‌کننده باشد.</strong>{" "}
      </li>
      <li>
        کاربر متعهد می‌شود پیش از استفاده عملی، تجاری، حقوقی، پزشکی یا مالی از
        خروجی بات،
        <strong>صحت آن را بررسی کند.</strong>{" "}
      </li>

      <li>
        آیوا هیچ تضمینی در خصوص صحت، جامعیت یا مناسب‌بودن پاسخ‌ها برای هدف خاص
        نمی‌دهد.
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۳. حساب کاربری و مسئولیت استفاده
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        مسئولیت کلیه فعالیت‌های انجام‌شده از طریق حساب کاربری، صرف‌نظر از شخص
        استفاده‌کننده،
        <strong>کاملاً بر عهده کاربر</strong> است.
      </li>

      <li>
        هرگونه استفاده غیرمجاز، اشتباه کاربری، یا دسترسی غیرمجاز، مسئولیتش متوجه
        کاربر است.
      </li>
      <li>آیوا تعهدی نسبت به جبران خسارات ناشی از خطاهای کاربر ندارد.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۴. داده‌ها و محتوای بارگذاری‌شده
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        کاربر اعلام و تضمین می‌کند که مالک قانونی داده‌ها است یا مجوز لازم برای
        استفاده از آن‌ها را دارد.
      </li>
      <li>
        آیوا مالک داده‌های کاربر نیست، اما مسئول{" "}
        <strong>صحت، کامل‌بودن یا قانونی‌بودن آن‌ها نیز نیست.</strong>{" "}
      </li>
      <li>
        کاربر صراحتاً می‌پذیرد که اگر به دلیل داده‌های او، شکایت، ادعا یا خسارتی
        علیه آیوا مطرح شود، <strong>مسئول جبران کامل آن خواهد بود.</strong>{" "}
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۵. موارد استفاده ممنوع (خط قرمزها)
    </h2>
    <div>کاربر حق ندارد از آیوا برای موارد زیر استفاده کند: </div>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li> ارائه تجویز پزشکی، حقوقی یا مالی </li>
      <li> جمع‌آوری داده‌های حساس اشخاص بدون رضایت</li>
      <li> فعالیت‌های مجرمانه، فریب‌کارانه یا ناقض قوانین</li>
      <li> آموزش یا پاسخ‌دهی مغایر با قوانین کشور</li>
      <li> ارسال هرزنامه یا سوءاستفاده از زیرساخت</li>
    </ul>
    <div>
      آیوا در صورت تشخیص تخلف،
      <strong>حق تعلیق یا حذف حساب بدون اطلاع قبلی را</strong> دارد.
    </div>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۶. پرداخت، پلن‌ها و عدم بازگشت وجه
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        تمام پرداخت‌ها نهایی و غیرقابل استرداد هستند، مگر در مواردی که آیوا
        صراحتاً اعلام کند.
      </li>
      <li>تغییر پلن، ارتقا یا کاهش منابع بر اساس تعرفه روز محاسبه می‌شود.</li>
      <li>آیوا مسئول عدم استفاده کاربر از ظرفیت پلن خریداری‌شده نیست.</li>
      <li>در صورت تنزل پلن مبلغ به مشتری استرداد نمی‌شود.</li>
    </ul>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۷. دسترس‌پذیری و SLA
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        آیوا تلاش می‌کند سرویس پایدار ارائه دهد، اما{" "}
        <strong>وقفه، خطا یا اختلال ممکن است رخ دهد.</strong>{" "}
      </li>
      <li>
        قطعی‌های ناشی از اینترنت، زیرساخت ابری، APIهای خارجی، خارج از مسئولیت
        آیوا است.
      </li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۸. سلب مسئولیت
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        آیوا در هیچ شرایطی مسئول
        <ul className="list-none pr-6 space-y-2 text-justify">
          <li>- زیان مالی مستقیم یا غیرمستقیم</li>
          <li>- از دست رفتن درآمد، مشتری یا فرصت تجاری</li>
          <li>- ادعاهای اشخاص ثالث علیه کاربر</li>
          <li>- خسارت‌های ناشی از تصمیم‌گیری بر اساس خروجی چت‌بات</li>
          <li>- آسیب به اعتبار یا برند کسب‌وکار کاربر</li>
        </ul>
        نخواهد بود.
      </li>
      <li>ارتقا و به‌روزرسانی سیستم</li>
      <li>تخلف کاربر</li>

      <li>شرایط اضطراری</li>
    </ul>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۹. تعلیق و قطع سرویس
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        آیوا اختیار دارد در هر زمان و به تشخیص خود، در صورت
        <ul className="list-none pr-6 space-y-2 text-justify">
          <li>- نقض قوانین</li>
          <li>- ریسک حقوقی یا فنی</li>
          <li>- سوءاستفاده از سرویس</li>
          <li>- دستور مراجع قانونی</li>
        </ul>
        دسترسی کاربر را <strong>به‌طور موقت یا دائم قطع کند.</strong>{" "}
      </li>
      <li>
        در چنین مواردی، کاربر حق هیچ‌گونه مطالبه خسارت یا بازگشت وجهی نخواهد
        داشت.
      </li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۱۰. خاتمه حساب کاربری
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        کاربر می‌تواند هر زمان حساب خود را لغو کند، اما:{" "}
        <ul className="list-none pr-6 space-y-2 text-justify">
          <li>- هزینه پرداخت‌شده بازگردانده نمی‌شود</li>
          <li>- مسئولیت آثار استفاده قبلی همچنان با کاربر باقی می‌ماند</li>
        </ul>
      </li>
      <li>
        آیوا پس از خاتمه حساب،
        <strong>الزامی به نگهداری داده‌ها ندارد</strong> و ممکن است آن‌ها را حذف
        کند.
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۱۱. تغییر سرویس و شرایط
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        آیوا حق دارد در هر زمان قابلیت‌ها، پلن‌ها، محدودیت‌ها، تعرفه‌ها، یا حتی
        کل سرویس را تغییر دهد یا متوقف کند.
      </li>
      <li>
        تغییرات اساسی از طریق وب‌سایت یا پنل اطلاع‌رسانی می‌شود و ادامه استفاده
        کاربر به معنای پذیرش آن است.
      </li>
    </ul>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۱۲. قوانین حاکم و مرجع حل اختلاف
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        این قرارداد تحت حاکمیت <strong>قوانین جمهوری اسلامی ایران</strong> تنظیم
        شده است. 
      </li>
      <li>
        مرجع صالح رسیدگی به هرگونه اختلاف،
        <strong>دادگاه‌های صالح شهر تهران</strong> خواهد بود.
      </li>
      <li>کاربر حق اعتراض به صلاحیت محلی را از خود سلب می‌کند.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۱۳. استقلال بندها
    </h2>
    <div>
      در صورت بی‌اعتباری هر بند از این شرایط، سایر بندها{" "}
      <strong>کماکان معتبر و لازم‌الاجرا</strong> باقی خواهند ماند.
    </div>
    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۱۴. نسخه حاکم
    </h2>
    <div>
      این نسخه از قوانین، تنها نسخه معتبر است و هر متن، مکاتبه یا توافق شفاهی
      قبلی، فاقد اثر حقوقی خواهد بود مگر اینکه به‌صورت کتبی و امضاشده توسط آیوا
      باشد.
    </div>
  </section>
);

export default function Contact() {
  return (
    <main id="contact" className="landing-page">
      <Header />
      <PolicyClient />
      <Footer />
    </main>
  );
}
