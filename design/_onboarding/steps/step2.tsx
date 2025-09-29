import { useState } from 'react';
import { BotConfig } from '../onboarding';
import { onboardingData } from '../onboarding.data';
import { Card } from '../../_components/Card/card';
import { Button } from '../../_components/Button/button';
import { Input } from '../../_components/Input/input';
import { Plus, FileText, Link, HelpCircle, Type, Trash2, Upload } from 'lucide-react';

interface WizardStep2Props {
  botConfig: BotConfig;
  updateConfig: (updates: Partial<BotConfig>) => void;
}

interface KnowledgeItem {
  id: string;
  type: 'faq' | 'document' | 'url' | 'text';
  title: string;
  content?: string;
  url?: string;
}

export function WizardStep2({ botConfig, updateConfig }: WizardStep2Props) {
  const [selectedType, setSelectedType] = useState<string>('');
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<KnowledgeItem>>({});

  const getIcon = (type: string) => {
    switch (type) {
      case 'faq': return HelpCircle;
      case 'document': return FileText;
      case 'url': return Link;
      case 'text': return Type;
      default: return Type;
    }
  };

  const startAdding = (type: string) => {
    setSelectedType(type);
    setIsAdding(true);
    setNewItem({ type: type as any, title: '', content: '' });
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setSelectedType('');
    setNewItem({});
  };

  const saveItem = () => {
    if (newItem.title && (newItem.content || newItem.url)) {
      const item: KnowledgeItem = {
        id: Date.now().toString(),
        type: newItem.type as any,
        title: newItem.title,
        content: newItem.content,
        url: newItem.url
      };

      updateConfig({
        knowledge: [...botConfig.knowledge, item]
      });

      cancelAdding();
    }
  };

  const removeItem = (id: string) => {
    updateConfig({
      knowledge: botConfig.knowledge.filter(item => item.id !== id)
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file and get content
      setNewItem(prev => ({
        ...prev,
        title: file.name,
        content: `محتوای فایل ${file.name} (در نسخه واقعی، محتوا از فایل استخراج می‌شود)`
      }));
    }
  };

  return (
    <div className="step-content space-y-8" dir="rtl">
      {/* Modern Header with Icon */}
      <div className="text-right mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-tr from-brand-secondary to-brand-primary rounded-2xl flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-grey-900 mb-2">
              پایگاه دانش دستیار
            </h2>
            <p className="text-grey-600">
              اطلاعات و محتوای کسب‌وکار خود را برای پاسخ‌های دقیق‌تر اضافه کنید
            </p>
          </div>
        </div>
      </div>

      {/* Knowledge Type Selection */}
      {!isAdding && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {onboardingData.knowledgeTypes.map((type) => {
            const IconComponent = getIcon(type.id);
            
            return (
              <Card
                key={type.id}
                className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-2 border-border-soft hover:border-brand-primary/50 group"
                onClick={() => startAdding(type.id)}
              >
                <div className="text-right">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7 text-brand-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-grey-900 mb-1 font-medium">
                        {type.title}
                      </h3>
                      <p className="text-grey-600 text-body-small">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-l from-brand-primary/5 to-brand-secondary/5 rounded-xl p-4 group-hover:from-brand-primary/10 group-hover:to-brand-secondary/10 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-grey-700 text-sm">شروع کنید</span>
                      <div className="flex items-center gap-2 text-brand-primary">
                        <Plus className="w-4 h-4" />
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add New Item Form */}
      {isAdding && (
        <Card className="p-6 border-2 border-brand-primary/20 bg-bg-soft-rose">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-grey-900">
              {onboardingData.knowledgeTypes.find(t => t.id === selectedType)?.title}
            </h3>
            <Button
              variant="tertiary"
              size="small"
              onClick={cancelAdding}
            >
              انصراف
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-grey-900 mb-2">
                عنوان
                <span className="text-brand-primary mr-1">*</span>
              </label>
              <Input
                type="text"
                value={newItem.title || ''}
                onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                placeholder="عنوان مناسب برای این محتوا"
                className="w-full"
              />
            </div>

            {selectedType === 'faq' && (
              <div>
                <label className="block text-grey-900 mb-2">
                  سؤال و پاسخ
                  <span className="text-brand-primary mr-1">*</span>
                </label>
                <textarea
                  value={newItem.content || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="سؤال: محصولات شما چه هستند؟
پاسخ: ما انواع مختلفی از محصولات ارائه می‌دهیم شامل..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            )}

            {selectedType === 'text' && (
              <div>
                <label className="block text-grey-900 mb-2">
                  محتوا
                  <span className="text-brand-primary mr-1">*</span>
                </label>
                <textarea
                  value={newItem.content || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="اطلاعات مفصل درباره کسب‌وکار، محصولات، خدمات یا سایر موضوعات مرتبط..."
                  rows={8}
                  className="w-full px-4 py-3 border border-border-soft rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors resize-none"
                />
              </div>
            )}

            {selectedType === 'url' && (
              <div>
                <label className="block text-grey-900 mb-2">
                  آدرس وب
                  <span className="text-brand-primary mr-1">*</span>
                </label>
                <Input
                  type="url"
                  value={newItem.url || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com/about"
                  className="w-full"
                />
                <p className="text-grey-500 mt-2 text-body-small">
                  محتوای این صفحه به‌صورت خودکار استخراج و به دانش دستیار اضافه خواهد شد
                </p>
              </div>
            )}

            {selectedType === 'document' && (
              <div>
                <label className="block text-grey-900 mb-2">
                  آپلود فایل
                </label>
                <div className="border-2 border-dashed border-grey-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-grey-400 mx-auto mb-4" />
                  <p className="text-grey-600 mb-4">
                    فایل خود را اینجا بکشید یا کلیک کنید
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                    انتخاب فایل
                  </Button>
                  <p className="text-grey-500 mt-2 text-body-small">
                    پشتیبانی از فرمت‌های PDF، Word و متن ساده
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button variant="tertiary" onClick={cancelAdding}>
              انصراف
            </Button>
            <Button 
              variant="primary" 
              onClick={saveItem}
              disabled={!newItem.title || (!newItem.content && !newItem.url)}
            >
              ذخیره
            </Button>
          </div>
        </Card>
      )}

      {/* Existing Knowledge Items */}
      {botConfig.knowledge.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-grey-900">
            دانش اضافه شده ({botConfig.knowledge.length})
          </h3>
          
          <div className="space-y-3">
            {botConfig.knowledge.map((item) => {
              const IconComponent = getIcon(item.type);
              
              return (
                <Card key={item.id} className="p-4 border border-border-soft">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-8 h-8 bg-brand-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-brand-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-grey-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-grey-600 text-body-small mb-2">
                          {onboardingData.knowledgeTypes.find(t => t.id === item.type)?.title}
                        </p>
                        {item.content && (
                          <p className="text-grey-500 text-body-small truncate">
                            {item.content.length > 100 
                              ? `${item.content.substring(0, 100)}...` 
                              : item.content}
                          </p>
                        )}
                        {item.url && (
                          <p className="text-brand-primary text-body-small truncate">
                            {item.url}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="tertiary"
                      size="small"
                      onClick={() => removeItem(item.id)}
                      className="text-danger hover:bg-danger/10 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Empty State */}
      {botConfig.knowledge.length === 0 && !isAdding && (
        <Card className="p-8 text-center border-2 border-dashed border-grey-300">
          <div className="w-16 h-16 bg-grey-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-grey-400" />
          </div>
          <h3 className="text-grey-900 mb-2">
            هنوز دانشی اضافه نشده است
          </h3>
          <p className="text-grey-600 max-w-md mx-auto mb-6">
            برای شروع، یکی از انواع محتوا را انتخاب کنید و اطلاعات مربوط به کسب‌وکار خود را اضافه کنید
          </p>
        </Card>
      )}

      {/* Tips */}
      <Card className="p-6 bg-bg-soft-mint border-brand-secondary/20 border">
        <h4 className="text-grey-900 mb-3 flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-sm">💡</span>
          </div>
          نکات مفید
        </h4>
        <ul className="space-y-2 text-grey-700 text-body-small">
          <li className="flex items-start gap-2">
            <span className="text-brand-secondary font-medium">•</span>
            هرچه اطلاعات بیشتری اضافه کنید، دستیار پاسخ‌های دقیق‌تری می‌دهد
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-secondary font-medium">•</span>
            سؤالات متداول مشتریان را حتماً اضافه کنید
          </li>
          <li className="flex items-start gap-2">
            <span className="text-brand-secondary font-medium">•</span>
            می‌توانید بعد از راه‌اندازی نیز اطلاعات جدید اضافه کنید
          </li>
        </ul>
      </Card>
    </div>
  );
}