import { useState } from 'react';
import { BotConfig } from '../onboarding';
import { onboardingData } from '../onboarding.data';
import { Card } from '../../_components/Card/card';
import { Button } from '../../_components/Button/button';
import { Input } from '../../_components/Input/input';
import { MessageSquare, Send, Bot, User, RefreshCw, CheckCircle2 } from 'lucide-react';

interface WizardStep4Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

interface ChatMessage {
  id: string;
  type: 'bot' | 'user';
  content: string;
  timestamp: Date;
}

export function WizardStep4({ botConfig, updateConfig }: WizardStep4Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: botConfig.welcomeMessage,
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSample, setSelectedSample] = useState('');

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(message);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();

    // Check if we have relevant knowledge
    for (const knowledge of botConfig.knowledge) {
      if (knowledge.type === 'faq' && knowledge.content) {
        // Simple keyword matching
        const content = knowledge.content.toLowerCase();
        if (content.includes(message) || message.includes(knowledge.title.toLowerCase())) {
          return knowledge.content.split('\n').find(line => line.startsWith('پاسخ:'))?.substring(5) || 
                 knowledge.content;
        }
      }
      
      if (knowledge.type === 'text' && knowledge.content) {
        const content = knowledge.content.toLowerCase();
        if (content.includes(message) || message.includes(knowledge.title.toLowerCase())) {
          return `بر اساس اطلاعات موجود: ${knowledge.content.substring(0, 200)}${knowledge.content.length > 200 ? '...' : ''}`;
        }
      }
    }

    // Common responses
    if (message.includes('سلام') || message.includes('خداحافظ')) {
      return 'سلام! خوشحالم که صحبت می‌کنیم. چطور می‌تونم کمکتون کنم؟';
    }

    if (message.includes('محصول') || message.includes('خدمات')) {
      return 'متأسفانه اطلاعات کاملی درباره محصولات در دسترس نیست. لطفاً این اطلاعات را در بخش پایگاه دانش اضافه کنید.';
    }

    if (message.includes('قیمت') || message.includes('هزینه')) {
      return 'برای اطلاع از قیمت‌ها و هزینه‌ها، لطفاً با تیم فروش تماس بگیرید یا این اطلاعات را در پایگاه دانش اضافه کنید.';
    }

    if (message.includes('تماس') || message.includes('پشتیبانی')) {
      return 'برای تماس با پشتیبانی، اطلاعات تماس را در پایگاه دانش اضافه کنید تا بتوانم آن را ارائه دهم.';
    }

    // Fallback response
    return botConfig.fallbackMessage;
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        type: 'bot',
        content: botConfig.welcomeMessage,
        timestamp: new Date()
      }
    ]);
  };

  const sendSampleQuestion = (question: string) => {
    setSelectedSample(question);
    sendMessage(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fa-IR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="step-content space-y-8" dir="rtl">
      {/* Modern Header with Icon */}
      <div className="text-right mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-success to-brand-secondary rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-grey-900 mb-2">
              تست و آزمایش دستیار
            </h2>
            <p className="text-grey-600">
              چت‌بات خود را امتحان کنید و کیفیت پاسخ‌ها را ارزیابی کنید
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Sample Questions */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-grey-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-primary" />
              سؤالات نمونه
            </h3>
            <p className="text-grey-600 text-body-small mb-4">
              یکی از سؤالات زیر را امتحان کنید:
            </p>
            
            <div className="space-y-2">
              {onboardingData.sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="tertiary"
                  size="small"
                  className="w-full justify-start text-right"
                  onClick={() => sendSampleQuestion(question)}
                  disabled={isTyping}
                >
                  {question}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-bg-soft-mint">
            <h4 className="text-grey-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-success" />
              نکات آزمایش
            </h4>
            <ul className="space-y-2 text-grey-700 text-body-small">
              <li className="flex items-start gap-2">
                <span className="text-success font-medium">•</span>
                سؤالات مختلف مربوط به کسب‌وکارتان بپرسید
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-medium">•</span>
                بررسی کنید دستیار چه موقع نمی‌تواند پاسخ دهد
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-medium">•</span>
                در صورت نیاز، اطلاعات بیشتری اضافه کنید
              </li>
              <li className="flex items-start gap-2">
                <span className="text-success font-medium">•</span>
                لحن و سبک پاسخ‌ها را بررسی کنید
              </li>
            </ul>
          </Card>
        </div>

        {/* Center Column - Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden h-[600px] flex flex-col">
            {/* Chat Header */}
            <div 
              className="p-4 border-b border-border-soft flex items-center justify-between"
              style={{ backgroundColor: `${botConfig.color}15` }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                  style={{ backgroundColor: botConfig.color }}
                >
                  {botConfig.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-grey-900">{botConfig.name}</h3>
                  <span className="text-success text-body-small flex items-center gap-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    آنلاین
                  </span>
                </div>
              </div>
              
              <Button
                variant="tertiary"
                size="small"
                onClick={resetChat}
                className="flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                شروع مجدد
              </Button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-grey-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-md ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'bot' ? 'text-white' : 'bg-grey-300'
                    }`}
                    style={{ 
                      backgroundColor: message.type === 'bot' ? botConfig.color : undefined 
                    }}>
                      {message.type === 'bot' ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    
                    <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-3 rounded-lg max-w-xs break-words ${
                        message.type === 'bot' 
                          ? 'text-white' 
                          : 'bg-white text-grey-900 border border-border-soft'
                      }`}
                      style={{ 
                        backgroundColor: message.type === 'bot' ? botConfig.color : undefined 
                      }}>
                        <p className="text-body-small leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-grey-500 text-xs mt-1">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-md">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                      style={{ backgroundColor: botConfig.color }}
                    >
                      <Bot className="w-4 h-4" />
                    </div>
                    <div 
                      className="p-3 rounded-lg text-white"
                      style={{ backgroundColor: botConfig.color }}
                    >
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border-soft bg-white">
              <div className="flex gap-3">
                <Input
                  type="text"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="پیام خود را بنویسید..."
                  className="flex-1"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isTyping) {
                      sendMessage(currentMessage);
                    }
                  }}
                  disabled={isTyping}
                />
                <Button
                  variant="primary"
                  onClick={() => sendMessage(currentMessage)}
                  disabled={!currentMessage.trim() || isTyping}
                  className="px-6"
                  style={{ backgroundColor: botConfig.color }}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Results Summary */}
      <Card className="p-6 bg-bg-soft-rose border-brand-primary/20 border">
        <h3 className="text-grey-900 mb-4">خلاصه نتایج آزمایش</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-6 h-6 text-brand-primary" />
            </div>
            <h4 className="text-grey-900 mb-2">تعداد مکالمات</h4>
            <p className="text-kpi text-brand-primary">{messages.length}</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 text-success" />
            </div>
            <h4 className="text-grey-900 mb-2">پایگاه دانش</h4>
            <p className="text-kpi text-success">{botConfig.knowledge.length} مورد</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-brand-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bot className="w-6 h-6 text-brand-secondary" />
            </div>
            <h4 className="text-grey-900 mb-2">آمادگی نصب</h4>
            <p className="text-kpi text-brand-secondary">
              {botConfig.knowledge.length > 0 ? '✓' : '!'}
            </p>
          </div>
        </div>

        {botConfig.knowledge.length === 0 && (
          <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <p className="text-warning text-body-small text-center">
              ⚠️ توصیه می‌شود حداقل چند مورد اطلاعات در پایگاه دانش اضافه کنید تا دستیار بتواند پاسخ‌های بهتری ارائه دهد
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}