"use client";
import React, { useState, useEffect } from "react";
import { useBot } from "@/providers/BotProvider";
import { BotConfig } from "@/types/common";
import { ChevronDown } from "lucide-react";

interface ChatbotListProps {
  selectedBot?: BotConfig | null; // انتخاب اولیه از parent
  onSelect?: (chatbot: BotConfig | null) => void; // callback برای parent
  placeholder?: string; // متن اختیاری وقتی هیچ چت‌باتی انتخاب نشده
}

export function ChatbotList({
  selectedBot,
  onSelect,
  placeholder = "همه چت‌بات‌ها", // مقدار پیش‌فرض
}: ChatbotListProps) {
  const { bots } = useBot();
  const [isOpen, setIsOpen] = useState(false);
  const [internalSelected, setInternalSelected] = useState<BotConfig | null>(
    selectedBot || null
  );
  useEffect(() => {
    console.log("selectedBot", selectedBot);
    if (!selectedBot) {
      setInternalSelected(null);
      return;
    }

    const matchedBot = bots.find((b) => String(b.uuid).toLowerCase() === String(selectedBot.uuid).toLowerCase());

    // console.log("bots", bots);
    // console.log("matchedBot", matchedBot);
    if (matchedBot) {
      setInternalSelected(matchedBot);
    } else {
      setInternalSelected(selectedBot);
    }
  }, [selectedBot, bots]);

  const handleSelect = (chatbot: BotConfig | null) => {
    setInternalSelected(chatbot);
    setIsOpen(false);
    if (onSelect) onSelect(chatbot);
  };

  const displayName = internalSelected ? internalSelected.name : placeholder;

  return (
    <div className="chatbot-selector-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-selector-button"
        type="button"
        title="انتخاب چت‌بات"
      >
        {internalSelected && (
          <span
            className="chatbot-indicator"
            style={{ backgroundColor: internalSelected.primary_color }}
          />
        )}
        <span className="chatbot-name">{displayName}</span>
        <ChevronDown
          className={`chatbot-icon ${isOpen ? "rotate" : ""}`}
          size={18}
        />
      </button>

      {isOpen && (
        <>
          <div className="chatbot-backdrop" onClick={() => setIsOpen(false)} />

          <div className="chatbot-dropdown">
            <div className="chatbot-dropdown-header">
              <span className="text-grey-600 text-sm">چت‌بات‌های من</span>
            </div>

            <div className="chatbot-list">
              <button
                key="no-bot"
                onClick={() => handleSelect(null)}
                className={`chatbot-item ${
                  internalSelected === null ? "active" : ""
                }`}
                type="button"
                title={placeholder}
              >
                <span className="chatbot-name">{placeholder}</span>
              </button>

              {bots.map((chatbot) => (
                <button
                  key={chatbot.uuid}
                  onClick={() => handleSelect(chatbot)}
                  className={`chatbot-item ${
                    internalSelected?.uuid === chatbot.uuid ? "active" : ""
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
          </div>
        </>
      )}
    </div>
  );
}
