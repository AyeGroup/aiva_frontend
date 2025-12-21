import Header from "../landing/components/Header";
import Footer from "../landing/components/Footer";
 

const PolicyClient = () => (
  <section className=" mx-auto px-4 py-10 lg:p-30 leading-8 text-gray-800">
    <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center">
      قوانین و مقررات استفاده از دستیار هوشمند آیوا
    </h1>

    <p className="mb-8 text-justify">
      به وب‌سایت ما خوش آمدید. استفاده از خدمات این پلتفرم به منزله‌ی پذیرش کامل
      شرایط و قوانین زیر است. لطفاً پیش از استفاده از سرویس‌ها، این صفحه را با
      دقت مطالعه کنید.
    </p>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۱. تعاریف
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>
        <strong>سایت / پلتفرم:</strong> سامانه ارائه‌دهنده سرویس چت‌بات هوشمند.
      </li>
      <li>
        <strong>کاربر:</strong> شخص حقیقی یا حقوقی که از خدمات سایت استفاده
        می‌کند.
      </li>
      <li>
        <strong>سرویس چت‌بات:</strong> خدمات هوش مصنوعی شامل پاسخ‌گویی خودکار،
        تولید محتوا، تحلیل داده‌ها و تعامل مبتنی بر AI.
      </li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۲. شرایط استفاده از خدمات
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>کاربر موظف است اطلاعات صحیح و کامل هنگام ثبت‌نام ارائه کند.</li>
      <li>مسئولیت نگهداری حساب کاربری و رمز عبور بر عهده کاربر است.</li>
      <li>استفاده از سرویس باید مطابق قوانین جمهوری اسلامی ایران باشد.</li>
      <li>
        کاربران مجاز به استفاده از سرویس برای فعالیت‌های غیرقانونی یا مخرب
        نیستند.
      </li>
      <li>
        سایت می‌تواند در صورت مشاهده تخلف، حساب کاربر را محدود یا مسدود کند.
      </li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۳. مالکیت محتوا و داده‌ها
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>تمامی حقوق مالکیت فکری سرویس برای سایت محفوظ است.</li>
      <li>محتوای واردشده یا تولیدشده توسط کاربر متعلق به خود اوست.</li>
      <li>
        کاربر به سایت اجازه می‌دهد برای ارائه سرویس، داده‌ها را پردازش و ذخیره
        کند.
      </li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۴. محدودیت‌ها و مسئولیت‌ها
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>پاسخ‌های تولیدشده توسط هوش مصنوعی ممکن است دقیق یا کامل نباشند.</li>
      <li>
        سایت مسئولیتی نسبت به خسارات ناشی از محتوای تولیدشده توسط چت‌بات ندارد.
      </li>
      <li>کاربر باید صحت خروجی‌ها را بررسی کند.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۵. حفظ حریم خصوصی و امنیت
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>سایت متعهد است اطلاعات کاربران را محرمانه نگه دارد.</li>
      <li>جزئیات سیاست حریم خصوصی در صفحه مربوطه توضیح داده شده است.</li>
      <li>
        کاربران نباید اطلاعات حساس مانند رمزها یا اطلاعات مالی را در چت‌بات وارد
        کنند.
      </li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۶. پرداخت‌ها و اشتراک‌ها
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>برخی سرویس‌ها رایگان و برخی نیازمند پرداخت هستند.</li>
      <li>قوانین تمدید، لغو و بازگشت وجه در بخش پرداخت توضیح داده شده است.</li>
      <li>عدم پرداخت می‌تواند باعث تعلیق سرویس شود.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۷. تغییرات قوانین
    </h2>
    <p className="text-justify">
      سایت حق دارد قوانین را در هر زمان به‌روزرسانی کند. ادامه استفاده از سرویس
      به معنی پذیرش نسخه جدید قوانین است.
    </p>

    <h2 className="text-xl font-semibold mt-10 mb-3 text-gray-900">
      ۸. قطع خدمات
    </h2>
    <ul className="list-disc pr-6 space-y-2 text-justify">
      <li>مشکلات فنی</li>
      <li>ارتقا و به‌روزرسانی سیستم</li>
      <li>تخلف کاربر</li>
      <li>شرایط اضطراری</li>
    </ul>
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
