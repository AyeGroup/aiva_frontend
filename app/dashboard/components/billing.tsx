"use client"
import React, { useState } from 'react';
import { Card } from '@/components/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Check, Download, CreditCard } from 'lucide-react';

 
interface Plan {
  id: string;
  name: string;
  price: string;
  priceMonthly?: string;
  description: string;
  features: string[];
  recommended?: boolean;
  color: string;
  current?: boolean;
}

interface PurchaseHistory {
  id: string;
  date: string;
  plan: string;
  amount: string;
  status: 'success' | 'failed' | 'pending';
  invoiceUrl?: string;
}

export function Billing( ) {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const router=useRouter()
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'رایگان',
      price: '۰',
      description: 'برای شروع و آزمایش',
      color: '#9B59B6',
      features: [
        'تا ۱۰۰ پیام در ماه',
        'یک چت‌بات',
        'پشتیبانی ایمیلی',
        'گزارش‌های پایه'
      ]
    },
    {
      id: 'starter',
      name: 'استارتر',
      price: billingPeriod === 'monthly' ? '۲۹۹,۰۰۰' : '۲,۸۷۰,۰۰۰',
      priceMonthly: billingPeriod === 'yearly' ? '۲۳۹,۰۰۰' : undefined,
      description: 'برای کسب‌وکارهای کوچک',
      color: '#3498DB',
      features: [
        'تا ۵,۰۰۰ پیام در ماه',
        'تا ۳ چت‌بات',
        'پشتیبانی ایمیلی و چت',
        'گزارش‌های پیشرفته',
        'قابلیت سفارشی‌سازی ظاهر',
        'یکپارچگی با ابزارهای محبوب'
      ]
    },
    {
      id: 'pro',
      name: 'حرفه‌ای',
      price: billingPeriod === 'monthly' ? '۷۹۹,۰۰۰' : '۷,۶۷۰,۰۰۰',
      priceMonthly: billingPeriod === 'yearly' ? '۶۳۹,۰۰۰' : undefined,
      description: 'برای کسب‌وکارهای در حال رشد',
      color: '#65bcb6',
      recommended: true,
      current: true,
      features: [
        'تا ۲۰,۰۰۰ پیام در ماه',
        'تا ۱۰ چت‌بات',
        'پشتیبانی ۲۴/۷',
        'گزارش‌های تحلیلی پیشرفته',
        'سفارشی‌سازی کامل',
        'API دسترسی',
        'آموزش هوش مصنوعی اختصاصی',
        'ادغام با CRM'
      ]
    },
    {
      id: 'enterprise',
      name: 'سازمانی',
      price: 'تماس بگیرید',
      description: 'برای سازمان‌های بزرگ',
      color: '#FFA18E',
      features: [
        'پیام نامحدود',
        'چت‌بات نامحدود',
        'مدیر اختصاصی',
        'پشتیبانی اولویت‌دار',
        'سفارشی‌سازی کامل',
        'قرارداد SLA',
        'آموزش تیم',
        'استقرار اختصاصی'
      ]
    }
  ];

  const purchaseHistory: PurchaseHistory[] = [
    {
      id: 'INV-2024-001',
      date: '۱۴۰۳/۰۹/۱۵',
      plan: 'حرفه‌ای - سالانه',
      amount: '۷,۶۷۰,۰۰۰ تومان',
      status: 'success',
      invoiceUrl: '#'
    },
    {
      id: 'INV-2024-002',
      date: '۱۴۰۳/۰۸/۱۵',
      plan: 'استارتر - ماهانه',
      amount: '۲۹۹,۰۰۰ تومان',
      status: 'success',
      invoiceUrl: '#'
    },
    {
      id: 'INV-2024-003',
      date: '۱۴۰۳/۰۷/۲۰',
      plan: 'حرفه‌ای - ماهانه',
      amount: '۷۹۹,۰۰۰ تومان',
      status: 'failed',
    },
    {
      id: 'INV-2024-004',
      date: '۱۴۰۳/۰۷/۱۵',
      plan: 'استارتر - ماهانه',
      amount: '۲۹۹,۰۰۰ تومان',
      status: 'success',
      invoiceUrl: '#'
    }
  ];

  const handlePlanPurchase = (planId: string, planName: string) => {
    if (planId === 'enterprise') {
      toast.info('لطفاً با تیم فروش ما تماس بگیرید');
    } else if (planId === 'free') {
      toast.info('شما در حال حاضر از پلن رایگان استفاده می‌کنید');
    } else {
      // Navigate to checkout page
      const plan = plans.find(p => p.id === planId);
      if (plan) {
        router.push('/pay/checkout' );
        // Store selected plan in localStorage for checkout page
        localStorage.setItem('selectedPlan', JSON.stringify({
          ...plan,
          billingPeriod
        }));
      }
    }
  };

  const getStatusBadge = (status: PurchaseHistory['status']) => {
    const styles = {
      success: 'bg-green-50 text-green-700 border-green-200',
      failed: 'bg-red-50 text-red-700 border-red-200',
      pending: 'bg-yellow-50 text-yellow-700 border-yellow-200'
    };

    const labels = {
      success: 'موفق',
      failed: 'ناموفق',
      pending: 'در انتظار'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen flex bg-grey-50" dir="rtl">
      {/* <Sidebar onNavigate={onNavigate} currentPage="billing" /> */}
      
      <main className="flex-1 p-8" role="main">
        <header className="mb-8">
          <h1 className="text-grey-900 mb-2 text-right">مدیریت مالی</h1>
          <p className="text-grey-600 text-right">مدیریت اشتراک و مشاهده سوابق پرداخت</p>
        </header>

        {/* Current Plan Section */}
        <section className="mb-8" aria-labelledby="current-plan-heading">
          <h2 id="current-plan-heading" className="text-grey-900 mb-4 text-right">پلن فعلی</h2>
          <Card className="p-6" 
          // style={{ 
          //   background: 'linear-gradient(135deg, rgba(101, 188, 182, 0.1) 0%, rgba(101, 188, 182, 0.05) 100%)',
          //   borderColor: '#65bcb6'
          // }}
          
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: '#65bcb6' }}
                >
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-grey-900 mb-1 text-right">پلن حرفه‌ای</h3>
                  <p className="text-grey-600">اشتراک سالانه - تا ۱۴۰۴/۰۹/۱۵</p>
                  <p className="text-grey-500 text-sm mt-1">۱۵,۲۳۰ پیام از ۲۰,۰۰۰ استفاده شده</p>
                </div>
              </div>
              <div className="text-left">
                <p className="text-grey-900 mb-1">۶۳۹,۰۰۰ تومان / ماه</p>
                <p className="text-grey-500 text-sm">صورتحساب بعدی: ۱۴۰۴/۰۹/۱۵</p>
              </div>
            </div>
          </Card>
        </section>

        {/* Billing Period Toggle */}
        <section className="mb-8" aria-labelledby="plans-heading">
          <div className="flex flex-col items-center text-center mb-[90px] mt-[0px] mr-[0px] ml-[0px]">
            <h2 id="plans-heading" className="text-grey-900 mb-3">پلن مناسب خود را انتخاب کنید</h2>
            <p className="text-grey-600 mb-6">با پلن‌های متنوع ما، بهترین گزینه برای کسب‌وکار خود را پیدا کنید</p>
            
            <div className="flex items-center gap-3 bg-gradient-to-br from-grey-50 to-white rounded-3xl p-1.5 border-2 border-grey-200 shadow-sm">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-3 rounded-2xl transition-all duration-300 ${
                  billingPeriod === 'monthly'
                    ? 'bg-gradient-to-br from-brand-primary to-[#4da9a3] text-white shadow-lg scale-105'
                    : 'text-grey-600 hover:text-grey-900 hover:bg-grey-100'
                }`}
                title="پرداخت ماهانه"
              >
                پرداخت ماهانه
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-6 py-3 rounded-2xl transition-all duration-300 flex items-center gap-2 ${
                  billingPeriod === 'yearly'
                    ? 'bg-gradient-to-br from-brand-primary to-[#4da9a3] text-white shadow-lg scale-105'
                    : 'text-grey-600 hover:text-grey-900 hover:bg-grey-100'
                }`}
                title="پرداخت سالانه"
              >
                <span>پرداخت سالانه</span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-brand-secondary text-white shadow-sm">
                  ۲۰٪ تخفیف
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative group ${
                  plan.recommended ? 'lg:scale-105 lg:-mt-4 lg:mb-4' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center z-10">
                    <div
                      className="px-5 py-2 rounded-full text-white shadow-lg animate-pulse"
                      style={{ 
                        background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)` 
                      }}
                    >
                      ⭐ پیشنهاد ویژه
                    </div>
                  </div>
                )}

                <Card
                  className={`p-8 relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    plan.recommended 
                      ? 'border-3 shadow-xl' 
                      : 'hover:border-grey-300'
                  }`}
                  // style={{
                  //   borderColor: plan.recommended ? plan.color : undefined,
                  //   background: plan.recommended 
                  //     ? `linear-gradient(135deg, ${plan.color}05 0%, white 100%)`
                  //     : undefined
                  // }}
                >
                  {plan.current && (
                    <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-green-500 text-white shadow-lg">
                      ✓ فعلی
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div
                      className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-6 group-hover:scale-110"
                      style={{ 
                        background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}cc 100%)` 
                      }}
                    >
                      <div className="text-white">
                        {plan.id === 'free' && '🎁'}
                        {plan.id === 'starter' && '🚀'}
                        {plan.id === 'pro' && '💎'}
                        {plan.id === 'enterprise' && '👑'}
                      </div>
                    </div>
                  </div>

                  {/* Plan Name & Description */}
                  <div className="text-center mb-6">
                    <h3 className="text-grey-900 mb-2">{plan.name}</h3>
                    <p className="text-grey-600 text-sm">{plan.description}</p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8 pb-6 border-b border-grey-200">
                    {plan.id !== 'enterprise' ? (
                      <>
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                          <span 
                            className="text-grey-900"
                            style={{ 
                              fontSize: plan.id === 'free' ? '2.5rem' : '3rem',
                              fontWeight: '700',
                              background: plan.recommended 
                                ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}aa 100%)`
                                : undefined,
                              WebkitBackgroundClip: plan.recommended ? 'text' : undefined,
                              WebkitTextFillColor: plan.recommended ? 'transparent' : undefined
                            }}
                          >
                            {plan.price}
                          </span>
                          {plan.id !== 'free' && (
                            <span className="text-grey-500">تومان</span>
                          )}
                        </div>
                        {plan.id !== 'free' && (
                          <p className="text-grey-500 text-sm">
                            {billingPeriod === 'monthly' ? 'هر ماه' : 'هر سال'}
                          </p>
                        )}
                        {plan.priceMonthly && (
                          <p className="text-brand-primary text-sm mt-2">
                            💰 صرفه‌جویی: {parseInt(plan.price.replace(/,/g, '')) - parseInt(plan.priceMonthly.replace(/,/g, '')) * 12} تومان
                          </p>
                        )}
                      </>
                    ) : (
                      <div>
                        <span 
                          className="text-grey-900"
                          style={{ fontSize: '2rem' }}
                        >
                          {plan.price}
                        </span>
                        <p className="text-grey-500 text-sm mt-2">قیمت‌گذاری اختصاصی</p>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-3 text-grey-700 text-sm transition-all hover:translate-x-1"
                      >
                        <div 
                          className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ backgroundColor: `${plan.color}20` }}
                        >
                          <Check 
                            className="w-4 h-4" 
                            style={{ color: plan.color }}
                          />
                        </div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanPurchase(plan.id, plan.name)}
                    disabled={plan.current}
                    title={`خرید پلن ${plan.name}`}
                    className={`w-full py-4 rounded-2xl transition-all duration-300 text-center relative overflow-hidden group/btn ${
                      plan.current
                        ? 'bg-grey-200 text-grey-500 cursor-not-allowed'
                        : 'text-white shadow-lg hover:shadow-2xl hover:scale-105 transform'
                    }`}
                    style={{
                      background: !plan.current
                        ? `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`
                        : undefined
                    }}
                  >
                    {!plan.current && (
                      <div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-700"
                      />
                    )}
                    <span className="relative z-10">
                      {plan.current 
                        ? '✓ پلن فعلی شما' 
                        : plan.id === 'enterprise' 
                        ? '📞 تماس با فروش' 
                        : '🛒 انتخاب و خرید'}
                    </span>
                  </button>
                </Card>
              </div>
            ))}
          </div>

          {/* Bottom Info */}
          <div className="mt-10 text-center">
            <p className="text-grey-600 text-sm">
              تمامی پلن‌ها شامل پشتیبانی فارسی و به‌روزرسانی‌های رایگان می‌باشند
            </p>
            <p className="text-grey-500 text-xs mt-2">
              امکان تغییر یا لغو اشتراک در هر زمان
            </p>
          </div>
        </section>

        {/* Purchase History */}
        <section aria-labelledby="history-heading">
          <h2 id="history-heading" className="text-grey-900 mb-4 text-right">سوابق خرید</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-grey-200 bg-grey-50">
                    <th className="text-right px-6 py-4 text-grey-900">شماره فاکتور</th>
                    <th className="text-right px-6 py-4 text-grey-900">تاریخ</th>
                    <th className="text-right px-6 py-4 text-grey-900">پلن</th>
                    <th className="text-right px-6 py-4 text-grey-900">مبلغ</th>
                    <th className="text-right px-6 py-4 text-grey-900">وضعیت</th>
                    <th className="text-right px-6 py-4 text-grey-900">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseHistory.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-grey-100 hover:bg-grey-50 transition-colors">
                      <td className="px-6 py-4 text-grey-900">{purchase.id}</td>
                      <td className="px-6 py-4 text-grey-600">{purchase.date}</td>
                      <td className="px-6 py-4 text-grey-900">{purchase.plan}</td>
                      <td className="px-6 py-4 text-grey-900">{purchase.amount}</td>
                      <td className="px-6 py-4">{getStatusBadge(purchase.status)}</td>
                      <td className="px-6 py-4">
                        {purchase.status === 'success' && purchase.invoiceUrl && (
                          <button
                            onClick={() => toast.success('دانلود فاکتور شروع شد')}
                            className="flex items-center gap-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                            title="دانلود فاکتور"
                          >
                            <Download className="w-4 h-4" />
                            <span>دانلود</span>
                          </button>
                        )}
                        {purchase.status === 'failed' && (
                          <button
                            onClick={() => toast.info('در حال انتقال به درگاه پرداخت...')}
                            className="text-brand-secondary hover:text-brand-secondary/80 transition-colors"
                            title="پرداخت مجدد"
                          >
                            پرداخت مجدد
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      </main>

      {/* <Toaster position="top-center" dir="rtl" /> */}
    </div>
  );
}
