import React, { useState } from "react";
import { User, Bot, Clock, MessageSquare } from "lucide-react";
import "@/styles/components.css";
import { convertToPersian } from "@/utils/common";
import Image from "next/image";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: string;
}

interface ChatHistoryCardProps {
  userName: string;
  userAvatar?: string;
  messages: Message[];
  unreadCount: number;
  lastActivity: string;
  onClick?: () => void;
}

export function ChatHistoryCard({
  userName,
  userAvatar,
  messages,
  unreadCount,
  lastActivity,
  onClick,
}: ChatHistoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // نمایش آخرین 3 پیام
  const displayMessages = messages.slice(-3);
  const hasMoreMessages = messages.length > 3;

  console.log("s", messages);

  return (
    <div className="chat-history-card" onClick={onClick}>
      {/* Header */}
      <div className="chat-history-header">
        <div className="user-info">
          <div className="user-avatar">
            {userAvatar ? (
              <Image src={userAvatar} width={20} height={20} alt={userName} />
            ) : (
              <User className="w-5 h-5 text-grey-500" />
            )}
          </div>
          <div className="user-details">
            <h4 className="user-name">{userName}</h4>
            <div className="chat-meta">
              <div className="last-activity">
                <Clock className="w-3 h-3" />
                <span>{lastActivity}</span>
              </div>
            </div>
          </div>
        </div>

        {unreadCount > 0 && <div className="unread-badge">{unreadCount}</div>}
      </div>

      {/* Messages Timeline */}

      {messages && messages.length > 0 && (
        <div className={`messages-timeline ${isExpanded ? "expanded" : ""}`}>
          {hasMoreMessages && !isExpanded && (
            <div className="more-messages-indicator">
              <span>+ {convertToPersian(messages.length - 3)} پیام دیگر</span>
            </div>
          )}

          {(isExpanded ? messages : displayMessages).map((message) => (
            <div key={message.id} className={`message-item ${message.type}`}>
              <div className="message-icon">
                {message.type === "user" ? (
                  <User className="w-3 h-3" />
                ) : (
                  <Bot className="w-3 h-3" />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                  {/* {message.timestamp} */}
                  {/* {new Date(message.timestamp).toLocaleTimeString()} */}
                  {new Date(message.timestamp).toLocaleTimeString("fa-IR", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Actions */}
      <div className="chat-history-footer">
        <div className="chat-stats">
          <MessageSquare className="w-4 h-4" />
          <span>{convertToPersian(messages.length)} پیام</span>
          {unreadCount > 0 && (
            <>
              <span>•</span>
              <span className="unread-text">{unreadCount} جدید</span>
            </>
          )}
        </div>

        <div className="action-buttons">
          <button
            className="expand-button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "کمتر" : "بیشتر"}
          </button>
        </div>
      </div>
    </div>
  );
}
