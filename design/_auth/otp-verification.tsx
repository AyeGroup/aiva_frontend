import { useState, useRef, useEffect } from 'react';
import { Button } from '../_components/Button/button';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { persianToEnglish, englishToPersian } from '../../utils/number-utils';
import { ArrowLeft } from 'lucide-react';
// import aivaLogo from "/logo.png";
import './login.css';

type PageType = 'landing' | 'signup' | 'dashboard' | 'consultation' | 'demo' | 'chatbot-management' | 'tickets' | 'login' | 'otp-verification';

interface OTPVerificationProps {
  onNavigate: (page: PageType) => void;
  phoneNumber?: string;
  email?: string;
}

export function OTPVerification({ onNavigate, phoneNumber, email }: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(120); // 2 minutes
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    // Convert Persian digits to English
    const englishValue = persianToEnglish(value);
    
    // Only allow digits
    if (englishValue && !/^\d$/.test(englishValue)) return;
    
    const newOtp = [...otp];
    newOtp[index] = englishValue;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (englishValue && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && index === 5) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    // Convert Persian to English first, then filter digits
    const englishText = persianToEnglish(pastedText);
    const pastedData = englishText.replace(/\D/g, '').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpCode?: string) => {
    const codeToVerify = otpCode || otp.join('');
    
    if (codeToVerify.length !== 6) {
      setError('لطفاً کد ۶ رقمی را کامل وارد کنید');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock verification - در واقعیت باید با سرور چک شود
      if (codeToVerify === '123456') {
        // If user exists, go to dashboard
        onNavigate('dashboard');
      } else if (codeToVerify === '111111') {
        // If new user, go to onboarding
        onNavigate('signup');
      } else {
        setError('کد وارد شده صحیح نیست. لطفاً مجدداً تلاش کنید.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError('خطایی رخ داده است. لطفاً مجدداً تلاش کنید.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setCountdown(120);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      
      // Show success message
      setError('');
    } catch (error) {
      setError('خطا در ارسال مجدد کد. لطفاً چند لحظه دیگر تلاش کنید.');
    } finally {
      setIsResending(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const contactInfo = phoneNumber || email;
  const contactType = phoneNumber ? 'شماره موبایل' : 'ایمیل';

  return (
    <main className="min-h-screen bg-bg-app" dir="rtl">
      <div
        className="min-h-screen bg-white overflow-hidden relative"
        style={{
          fontFamily: "Vazirmatn, sans-serif",
        }}
      >
        {/* Header Content */}
        <div className="relative z-50 w-full p-2 pb-0">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              {/* Logo - Right Side */}
              <div className="flex items-center gap-3">
                <ImageWithFallback
                  src="/logo.png"
                  alt="آیوا"
                  className="w-20 h-20 object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-grey-900 font-semibold text-xl text-right font-bold text-[24px]">
                    آیوا
                  </span>
                  <p
                    className="text-grey-500"
                    style={{
                      fontSize: "var(--text-body-small)",
                      lineHeight: "var(--text-body-small-lh)",
                    }}
                  >
                    دستیار هوشمند کسب و کار تو
                  </p>
                </div>
              </div>

              {/* Header Actions - Left Side */}
              <div className="flex items-center gap-3"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top Left - Geometric Pattern */}
          <div className="absolute top-28 left-12 w-32 h-32 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 128 128" fill="none">
              <circle cx="20" cy="20" r="8" fill="#65BCB6" />
              <circle cx="60" cy="20" r="6" fill="#FFA18E" />
              <circle cx="100" cy="20" r="4" fill="#65BCB6" />
              <circle cx="40" cy="60" r="8" fill="#FFA18E" />
              <circle cx="80" cy="60" r="6" fill="#65BCB6" />
              <circle cx="20" cy="100" r="6" fill="#65BCB6" />
              <circle cx="100" cy="100" r="8" fill="#FFA18E" />
            </svg>
          </div>

          {/* Top Right - Flowing Curves */}
          <div className="absolute top-20 right-16 w-40 h-40 opacity-15">
            <svg width="100%" height="100%" viewBox="0 0 160 160" fill="none">
              <path
                d="M20 140 Q80 20 140 80 Q100 120 60 100 Q40 140 20 140Z"
                fill="#65BCB6"
              />
              <path
                d="M40 120 Q100 40 120 100 Q80 140 40 120Z"
                fill="#FFA18E"
                opacity="0.7"
              />
            </svg>
          </div>

          {/* Center Left - Tech Elements */}
          <div className="absolute left-8 top-1/2 transform -translate-y-1/2 w-24 h-32 opacity-25">
            <svg width="100%" height="100%" viewBox="0 0 96 128" fill="none">
              {/* Chat bubbles */}
              <rect
                x="10"
                y="10"
                width="60"
                height="20"
                rx="10"
                fill="#65BCB6"
              />
              <rect
                x="20"
                y="40"
                width="50"
                height="16"
                rx="8"
                fill="#FFA18E"
              />
              <rect
                x="15"
                y="70"
                width="55"
                height="18"
                rx="9"
                fill="#65BCB6"
              />

              {/* Connection lines */}
              <line
                x1="40"
                y1="30"
                x2="45"
                y2="40"
                stroke="#65BCB6"
                strokeWidth="2"
                opacity="0.6"
              />
              <line
                x1="45"
                y1="56"
                x2="42"
                y2="70"
                stroke="#FFA18E"
                strokeWidth="2"
                opacity="0.6"
              />
            </svg>
          </div>

          {/* Bottom Left - Modern Grid Pattern */}
          <div
            className="absolute bottom-28 left-16 w-28 h-28 rounded-2xl p-3 opacity-20"
            style={{ backgroundColor: "#65BCB6" }}
          >
            <div className="grid grid-cols-3 gap-2 h-full">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`rounded-lg ${
                    i % 2 === 0 ? "bg-white" : "bg-white/60"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Center Right - AI Assistant Illustration */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-72 h-72 opacity-15">
            <svg width="100%" height="100%" viewBox="0 0 288 288" fill="none">
              {/* AI Brain/Network */}
              <circle cx="144" cy="120" r="40" fill="#65BCB6" opacity="0.3" />
              <circle cx="144" cy="120" r="25" fill="#65BCB6" opacity="0.5" />
              <circle cx="144" cy="120" r="12" fill="#65BCB6" />

              {/* Network connections */}
              <circle cx="100" cy="80" r="8" fill="#FFA18E" />
              <circle cx="188" cy="80" r="8" fill="#FFA18E" />
              <circle cx="120" cy="180" r="8" fill="#FFA18E" />
              <circle cx="168" cy="180" r="8" fill="#FFA18E" />

              <line
                x1="144"
                y1="108"
                x2="100"
                y2="88"
                stroke="#65BCB6"
                strokeWidth="2"
                opacity="0.6"
              />
              <line
                x1="144"
                y1="108"
                x2="188"
                y2="88"
                stroke="#65BCB6"
                strokeWidth="2"
                opacity="0.6"
              />
              <line
                x1="144"
                y1="132"
                x2="120"
                y2="172"
                stroke="#65BCB6"
                strokeWidth="2"
                opacity="0.6"
              />
              <line
                x1="144"
                y1="132"
                x2="168"
                y2="172"
                stroke="#65BCB6"
                strokeWidth="2"
                opacity="0.6"
              />

              {/* Data flow particles */}
              <circle cx="122" cy="94" r="3" fill="#FFA18E" opacity="0.8" />
              <circle cx="166" cy="94" r="3" fill="#FFA18E" opacity="0.8" />
              <circle cx="132" cy="156" r="3" fill="#FFA18E" opacity="0.8" />
              <circle cx="156" cy="156" r="3" fill="#FFA18E" opacity="0.8" />
            </svg>
          </div>

          {/* Bottom Right - Layered Shapes */}
          <div className="absolute bottom-20 right-24 w-20 h-24 opacity-20">
            <div
              className="absolute inset-0 rounded-2xl transform rotate-12"
              style={{ backgroundColor: "#65BCB6" }}
            ></div>
            <div className="absolute inset-2 bg-white rounded-xl transform -rotate-6"></div>
            <div
              className="absolute inset-4 rounded-lg transform rotate-3"
              style={{ backgroundColor: "#FFA18E" }}
            ></div>
          </div>

          {/* Floating Elements */}
          <div
            className="absolute top-40 left-1/4 w-3 h-3 rounded-full opacity-40"
            style={{ backgroundColor: "#65BCB6" }}
          ></div>
          <div
            className="absolute bottom-40 right-1/3 w-4 h-4 rounded-full opacity-30"
            style={{ backgroundColor: "#FFA18E" }}
          ></div>
          <div
            className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full opacity-50"
            style={{ backgroundColor: "#65BCB6" }}
          ></div>
          <div
            className="absolute top-1/4 left-2/3 w-3 h-3 rounded-full opacity-35"
            style={{ backgroundColor: "#FFA18E" }}
          ></div>

          {/* Subtle Gradient Overlays */}
          <div
            className="absolute top-0 left-0 w-1/3 h-1/3 rounded-full opacity-5"
            style={{
              background:
                "radial-gradient(circle, #65BCB6 0%, transparent 70%)",
            }}
          ></div>
          <div
            className="absolute bottom-0 right-0 w-1/2 h-1/2 rounded-full opacity-5"
            style={{
              background:
                "radial-gradient(circle, #FFA18E 0%, transparent 70%)",
            }}
          ></div>
        </div>

        {/* Main Content */}
        <div
          className="relative z-10 flex items-center justify-center p-2 pt-4 pb-16"
          style={{ minHeight: "calc(100vh - 120px)" }}
        >
          <div className="w-full max-w-md">
            {/* OTP Card */}
            <div className="bg-white rounded-2xl p-4 shadow-lg border border-grey-200">
              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-grey-900 mb-3">تأیید کد امنیتی</h1>
                <p className="text-grey-600 leading-relaxed">
                  کد ۶ رقمی ارسال شده به {contactType}
                  <span className="font-medium text-brand-primary mx-1">
                    {contactInfo}
                  </span>
                  را وارد کنید
                </p>
              </div>

              {/* OTP Input */}
              <div className="mb-6">
                <div
                  className="flex flex-row-reverse gap-3 justify-center mb-4"
                  onPaste={handlePaste}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`
                      w-12 h-12 text-center text-xl font-semibold rounded-xl border-2
                      ${
                        error
                          ? "border-danger bg-danger/5 text-danger focus:ring-2 focus:ring-danger/20 focus:shadow-lg focus:shadow-danger/10"
                          : digit
                          ? "border-brand-primary bg-brand-primary/5 text-brand-primary focus:ring-2 focus:ring-brand-primary/20 focus:shadow-lg focus:shadow-brand-primary/15"
                          : "border-grey-200 bg-white text-grey-700 focus:border-brand-primary focus:bg-brand-primary/5 focus:ring-2 focus:ring-brand-primary/20 focus:shadow-lg focus:shadow-brand-primary/10"
                      }
                      transition-all duration-200 focus:outline-none
                    `}
                      disabled={isLoading}
                      autoFocus={index === 0}
                    />
                  ))}
                </div>

                {error && (
                  <div className="text-danger text-sm text-center bg-danger/10 border border-danger/20 rounded-xl p-3">
                    {error}
                  </div>
                )}
              </div>

              {/* Verify Button */}
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleVerify()}
                disabled={isLoading || otp.some((digit) => digit === "")}
                className="w-full mb-6"
              >
                {isLoading ? "در حال تأیید..." : "تأیید کد"}
              </Button>

              {/* Resend Code */}
              <div className="text-center">
                {countdown > 0 ? (
                  <p className="text-grey-500 text-sm">
                    ارسال مجدد کد در{" "}
                    <span className="font-medium text-brand-primary">
                      {formatTime(countdown)}
                    </span>
                  </p>
                ) : (
                  <button
                    onClick={handleResendCode}
                    disabled={isResending}
                    className="text-brand-primary text-sm font-medium hover:text-brand-secondary transition-colors disabled:opacity-50"
                  >
                    {isResending ? "در حال ارسال..." : "ارسال مجدد کد"}
                  </button>
                )}
              </div>
            </div>

            {/* Back to Login */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => onNavigate("login")}
                className="text-grey-600 hover:text-grey-800 text-sm font-medium transition-colors flex items-center gap-2"
              >
                بازگشت
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}