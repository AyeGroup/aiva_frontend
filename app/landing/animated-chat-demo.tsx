import { useState, useEffect } from 'react';
import aivaLogo from 'figma:asset/881b680fd0560783650ca55119bc4191e7520943.png';

interface DemoMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const demoSequence = [
  {
    question: 'سیاست مرجوعی چیست؟',
    answer: 'تا ۷ روز کاری امکان مرجوعی کالا وجود دارد. کالا باید در شرایط اولیه و با برچسب اصلی باشد.'
  },
  {
    question: 'هزینه ارسال به تهران؟',
    answer: 'برای تهران: ارسال عادی ۲۵ هزار تومان، ارسال پیشتاز ۴۵ هزار تومان. خریدهای بالای ۸۰۰ هزار تومان رایگان ارسال می‌شود.'
  },
  {
    question: 'این محصول موجود است؟',
    answer: 'بله، این محصول در انبار موجود است و آماده ارسال فوری می‌باشد.'
  },
  {
    question: 'زمان ارسال چقدر است؟',
    answer: 'ارسال عادی ۲-۳ روز کاری، ارسال پیشتاز ۲۴ ساعته در تهران و شهرهای بزرگ.'
  }
];

export function AnimatedChatDemo() {
  const [messages, setMessages] = useState<DemoMessage[]>([
    {
      id: '1',
      text: 'سلام! من آیوا هستم، دستیار هوشمند این وب‌سایت. چطور می‌تونم کمکتان کنم؟',
      sender: 'bot'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'question' | 'typing' | 'answer'>('idle');

  useEffect(() => {
    const runAnimation = async () => {
      // Wait before starting the sequence
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      while (true) {
        for (let i = 0; i < demoSequence.length; i++) {
          const { question, answer } = demoSequence[i];
          
          // Show question
          setAnimationPhase('question');
          const userMessage: DemoMessage = {
            id: `user-${Date.now()}`,
            text: question,
            sender: 'user'
          };
          setMessages(prev => [...prev, userMessage]);
          
          // Wait a bit
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          // Show typing indicator
          setAnimationPhase('typing');
          setIsTyping(true);
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Show answer
          setAnimationPhase('answer');
          setIsTyping(false);
          const botMessage: DemoMessage = {
            id: `bot-${Date.now()}`,
            text: answer,
            sender: 'bot'
          };
          setMessages(prev => [...prev, botMessage]);
          
          // Wait before next question
          await new Promise(resolve => setTimeout(resolve, 2500));
        }
        
        // Clear messages and restart
        setMessages([{
          id: '1',
          text: 'سلام! من آیوا هستم، دستیار هوشمند این وب‌سایت. چطور می‌تونم کمکتان کنم؟',
          sender: 'bot'
        }]);
        setAnimationPhase('idle');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };

    runAnimation();
  }, []);

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary p-4 text-white">
        <div className="flex items-center gap-3">

          <div>
            <div className="font-medium text-right p-[0px]">آیوا</div>
            <div className="text-xs opacity-90">دستیار هوشمند</div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="h-72 p-3 space-y-3 overflow-y-auto bg-bg-soft-mint/20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-3 py-2 text-sm ${
                message.sender === 'user'
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'bg-white text-grey-700 shadow-sm border border-border'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white text-grey-500 rounded-xl px-3 py-2 text-sm shadow-sm border border-border">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border bg-white">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
          <span>دموی زنده در حال اجرا...</span>
        </div>
      </div>
    </div>
  );
}