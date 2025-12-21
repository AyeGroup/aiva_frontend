"use client";
import React, { useState, useEffect } from "react";
import { useBot } from "@/providers/BotProvider";
import { BotConfig } from "@/types/common";
import { ChevronDown } from "lucide-react";
import PageLoader from "@/components/pageLoader";

export function ChatbotSelector() {
  const { bots, currentBot, setCurrentBot } = useBot();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<BotConfig | null>(
    null
  );

  useEffect(() => {
    if (currentBot) {
      setSelectedChatbot(currentBot);
      // console.log("currentBot: ",currentBot.name);
    }
  }, [currentBot]);

  const handleSelect = (chatbot: BotConfig) => {
    setSelectedChatbot(chatbot);
    setCurrentBot(chatbot);
    setIsOpen(false);
  };

  if (!currentBot && bots.length === 0) {
    return <PageLoader />;
  }
  if (!selectedChatbot) return null;

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
          style={{ backgroundColor: selectedChatbot.primary_color }}
        />
        <span className="chatbot-name">{selectedChatbot.name}</span>
        <ChevronDown
          className={`chatbot-icon ${isOpen ? "rotate" : ""}`}
          size={18}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="chatbot-backdrop" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="chatbot-dropdown">
            <div className="chatbot-dropdown-header">
              <span className="text-grey-600 text-sm">چت‌بات‌های من</span>
            </div>

            <div className="chatbot-list">
              {bots.map((chatbot) => (
                <button
                  key={chatbot.uuid}
                  onClick={() => handleSelect(chatbot)}
                  className={`chatbot-item ${
                    selectedChatbot.uuid === chatbot.uuid ? "active" : ""
                  }`}
                  type="button"
                  title={`انتخاب ${chatbot.name}`}
                >
                  <span
                    className="chatbot-indicator"
                    style={{ backgroundColor: chatbot.primary_color }}
                  />
                  <span className="chatbot-name">{chatbot.name}</span>
                </button>
              ))}
            </div>

            <div className="chatbot-dropdown-footer">
              <button
                className="add-chatbot-button"
                type="button"
                title="افزودن چت‌بات جدید"
                onClick={() => {
                  // مثلا می‌توانید به صفحه onboarding بروید
                  window.location.href = "/dashboard?tab=onboarding&id=new";
                }}
              >
                <span>افزودن چت‌بات جدید</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
