import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Chatbot {
  id: string;
  name: string;
  color: string;
}

const chatbots: Chatbot[] = [
  { id: '1', name: '@goldenshop', color: '#FFD700' },
  { id: '2', name: '@techstore', color: '#4A90E2' },
  { id: '3', name: '@fashionhub', color: '#E94B8A' },
  { id: '4', name: '@foodcorner', color: '#F97316' },
  { id: '5', name: '@bookshop', color: '#8B5CF6' },
];

export function ChatbotSelector() {
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot>(chatbots[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (chatbot: Chatbot) => {
    setSelectedChatbot(chatbot);
    setIsOpen(false);
  };

  return (
    <div className="chatbot-selector-container">
      {/* Current Selection */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-selector-button"
        type="button"
        title="انتخاب چت‌بات"
      >
        <span 
          className="chatbot-indicator"
          style={{ backgroundColor: selectedChatbot.color }}
        />
        <span className="chatbot-name">{selectedChatbot.name}</span>
        <ChevronDown 
          className={`chatbot-icon ${isOpen ? 'rotate' : ''}`}
          size={18}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="chatbot-backdrop"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="chatbot-dropdown">
            <div className="chatbot-dropdown-header">
              <span className="text-grey-600 text-sm">چت‌بات‌های من</span>
            </div>
            
            <div className="chatbot-list">
              {chatbots.map((chatbot) => (
                <button
                  key={chatbot.id}
                  onClick={() => handleSelect(chatbot)}
                  className={`chatbot-item ${
                    selectedChatbot.id === chatbot.id ? 'active' : ''
                  }`}
                  type="button"
                  title={`انتخاب ${chatbot.name}`}
                >
                  <span 
                    className="chatbot-indicator"
                    style={{ backgroundColor: chatbot.color }}
                  />
                  <span className="chatbot-name">{chatbot.name}</span>
                  {selectedChatbot.id === chatbot.id && (
                    <svg 
                      className="check-icon" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>

            <div className="chatbot-dropdown-footer">
              <button
                className="add-chatbot-button"
                type="button"
                title="افزودن چت‌بات جدید"
              >
                <svg 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"/>
                  <line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                <span>افزودن چت‌بات جدید</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
