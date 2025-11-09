"use client";
import React, { useState, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const COLORS = ["#e19f87", "#65bcb6", "#b07cc6", "#f9c74f", "#52d4a0"];

interface SelectorItem {
  value: string;
  label: string;
  id?: string;
}

interface GenericSelectorProps {
  items: SelectorItem[];
  selectedValue: string;
  onSelect: (value: string) => void;
  labelKey?: keyof SelectorItem;
  valueKey?: keyof SelectorItem;
  disabled?: boolean;
  showIndicator?: boolean;
  initialOpen?: boolean;
  headerTitle?: string;
}

export function GenericSelector({
  items,
  selectedValue,
  onSelect,
  labelKey = "label",
  valueKey = "value",
  disabled = false,
  showIndicator = true,
  initialOpen = false,
  headerTitle = "انتخاب‌ها",
}: GenericSelectorProps) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const currentItem = useMemo(() => {
    return items.find(
      (item) => item[valueKey as keyof SelectorItem] === selectedValue
    );
  }, [items, selectedValue, valueKey]);

  const currentItemIndex = useMemo(() => {
    return items.findIndex(
      (item) => item[valueKey as keyof SelectorItem] === selectedValue
    );
  }, [items, selectedValue, valueKey]);

  const currentItemColor =
    currentItemIndex !== -1
      ? COLORS[currentItemIndex % COLORS.length]
      : undefined;

  if (!currentItem) {
    return (
      <div className="p-2 bg-yellow-100 border border-yellow-400 text-yellow-800">
        {/* ⚠️ خطا: مقدار انتخاب شده ('{selectedValue}') در لیست آیتم‌ها یافت نشد. */}
      </div>
    );
  }

  const handleSelect = (item: SelectorItem) => {
    const itemValue = item[valueKey as keyof SelectorItem] as string;
    onSelect(itemValue);
    setIsOpen(false);
  };

  return (
    <div className="chatbot-selector-container">
      {/* Current Selection Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-selector-button"
        type="button"
        title={`انتخاب ${currentItem.label}`}
      >
        {showIndicator && currentItemColor && (
          <span
            className="chatbot-indicator"
            style={{ backgroundColor: currentItemColor }}
          />
        )}
        <span className="chatbot-name">{currentItem.label}</span>
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
              <span className="text-grey-600 text-sm">{headerTitle}</span>
            </div>

            <div className="chatbot-list">
              {items.map((item, index) => {
                const isActive =
                  item[valueKey as keyof SelectorItem] === selectedValue;
                const itemColor = showIndicator
                  ? COLORS[index % COLORS.length]
                  : undefined;

                return (
                  <button
                    key={item.value || item.id || index.toString()}
                    onClick={() => handleSelect(item)}
                    className={`chatbot-item ${isActive ? "active" : ""}`}
                    disabled={disabled}
                    type="button"
                    title={`انتخاب ${item.label}`}
                  >
                    {showIndicator && itemColor && (
                      <span
                        className="chatbot-indicator"
                        style={{ backgroundColor: itemColor }}
                      />
                    )}
                    <span className="chatbot-name">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
