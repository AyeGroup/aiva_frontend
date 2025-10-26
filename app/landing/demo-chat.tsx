import { Button } from '@/components/button';
import { useState } from 'react';
// import { Button } from '';

interface DemoMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

const sampleQuestions = [
  'سیاست مرجوعی چیست؟',
  'هزینه ارسال به تهران؟',
  'این محصول موجود است؟',
  'زمان ارسال چقدر است؟'
];

const botResponses: Record<string, string> = {
  'سیاست مرجوعی چیست؟': 'تا ۷ روز کاری امکان مرجوعی کالا وجود دارد. کالا باید در شرایط اولیه و با برچسب اصلی باشد.',
  'هزینه ارسال به تهران؟': 'برای تهران: ارسال عادی ۲۵ هزار تومان، ارسال پیشتاز ۴۵ هزار تومان. خریدهای بالای ۸۰۰ هزار تومان رایگان ارسال می‌شود.',
  'این محصول موجود است؟': 'بله، این محصول در انبار موجود است و آماده ارسال فوری می‌باشد.',
  'زمان ارسال چقدر است؟': 'زمان ارسال معمولی ۲-۳ روز کاری و ارسال پیشتاز ۱ روز کاری است.'
};

export function DemoChat() {
  const [messages, setMessages] = useState<DemoMessage[]>([
    {
      id: '1',
      text: 'سلام! من آیوا هستم، دستیار هوشمند این وب‌سایت. چطور می‌تونم کمکتان کنم؟',
      sender: 'bot'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  const handleQuestionClick = async (question: string) => {
    // اضافه کردن سؤال کاربر
    const userMessage: DemoMessage = {
      id: Date.now().toString(),
      text: question,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // شبیه‌سازی تأخیر پاسخ
    setTimeout(() => {
      const botMessage: DemoMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponses[question] || 'متشکرم از سؤالتان. این سؤال را برای بررسی بیشتر ثبت کردم.',
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="demo-chat bg-background rounded-lg border border-border h-96 flex flex-col">
      {/* هدر چت */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="text-primary-foreground text-sm">A</span>
        </div>
        <div>
          <div className="font-medium">آیوا</div>
          <div className="text-xs text-muted-foreground">دستیار هوشمند</div>
        </div>
        <div className="mr-auto flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-muted-foreground">آنلاین</span>
        </div>
      </div>

      {/* پیام‌ها */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-48">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-3 py-2 text-sm ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* سؤالات نمونه */}
      <div className="p-4 border-t border-border">
        <div className="relative">
          <button
            onClick={() => setQuestionsOpen(!questionsOpen)}
            className="flex items-center justify-between w-full text-xs text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
            disabled={isTyping}
          >
            <span>سؤالات نمونه</span>
            <svg 
              className={`w-4 h-4 transition-transform ${questionsOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {questionsOpen && (
            <div className="mt-2 space-y-1 animate-in slide-in-from-top-1 duration-200">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="tertiary"
                  size="sm"
                  title={`پرسیدن: ${question}`}
                  onClick={() => {
                    handleQuestionClick(question);
                    setQuestionsOpen(false);
                  }}
                  className="text-xs px-2 py-1 h-auto w-full text-right justify-start"
                  disabled={isTyping}
                >
                  {question}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}