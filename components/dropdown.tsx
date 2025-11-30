import { useState, useRef, useEffect } from "react";

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  error?: string;
  label?: string;
}

export function Dropdown({
  options,
  value,
  placeholder = "انتخاب کنید",
  onChange,
  disabled = false,
  searchable = false,
  clearable = false,
  error,
  label,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const toggleDropdown = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setSearchQuery("");
    setFocusedIndex(-1);
  };

  const selectOption = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchQuery("");
    buttonRef.current?.focus();
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setIsOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case "Enter":
      case "Space":
        if (!isOpen) {
          setIsOpen(true);
        } else if (focusedIndex >= 0) {
          selectOption(filteredOptions[focusedIndex].value);
        }
        e.preventDefault();
        break;

      case "Escape":
        setIsOpen(false);
        buttonRef.current?.focus();
        break;

      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        e.preventDefault();
        break;

      case "ArrowUp":
        if (isOpen) {
          setFocusedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        e.preventDefault();
        break;
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      {label && <label className="block text-grey-700">{label}</label>}

      <div ref={dropdownRef} className="relative">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={`
            w-full flex items-center justify-between
            bg-bg-surface border-2 rounded-xl p-4
            text-right focus:outline-none
            ${
              disabled
                ? "opacity-50 cursor-not-allowed border-grey-200"
                : isOpen
                ? "border-brand-primary"
                : error
                ? "border-danger hover:border-danger/70"
                : "border-border-soft hover:border-grey-400"
            }
            ${
              error
                ? "focus:border-danger focus:ring-danger/20"
                : "focus:border-brand-primary focus:ring-brand-primary/20"
            }
            focus:ring-4
          `}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? "dropdown-label" : undefined}
          title={placeholder}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {selectedOption?.icon && (
              <span className="shrink-0">{selectedOption.icon}</span>
            )}
            <span
              className={`truncate ${
                selectedOption ? "text-grey-900" : "text-grey-500"
              }`}
            >
              {selectedOption?.label || placeholder}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {clearable && value && !disabled && (
              <button
                type="button"
                onClick={clearSelection}
                className="p-1 rounded hover:bg-grey-100 text-grey-400 hover:text-grey-600"
                title="پاک کردن انتخاب"
                aria-label="پاک کردن انتخاب"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </svg>
              </button>
            )}

            <svg
              className={`w-5 h-5 text-grey-400 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" />
            </svg>
          </div>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-bg-surface border border-border-soft rounded-xl shadow-md max-h-60 overflow-hidden">
            {searchable && (
              <div className="p-3 border-b border-border-soft">
                <input
                  type="text"
                  placeholder="جستجو..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 border border-border-soft rounded-lg focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20"
                />
              </div>
            )}

            <ul
              ref={listRef}
              role="listbox"
              className="py-1 overflow-y-auto max-h-48"
            >
              {filteredOptions.length === 0 ? (
                <li className="px-4 py-3 text-grey-500 text-center">
                  موردی یافت نشد
                </li>
              ) : (
                filteredOptions.map((option, index) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() =>
                        !option.disabled && selectOption(option.value)
                      }
                      disabled={option.disabled}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 text-right
                        ${
                          option.disabled
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-bg-soft-mint cursor-pointer"
                        }
                        ${focusedIndex === index ? "bg-bg-soft-mint" : ""}
                        ${
                          value === option.value
                            ? "bg-brand-primary/10 text-brand-primary font-medium"
                            : "text-grey-900"
                        }
                      `}
                      role="option"
                      aria-selected={value === option.value}
                    >
                      {option.icon && (
                        <span className="shrink-0">{option.icon}</span>
                      )}
                      <span className="flex-1 truncate">{option.label}</span>
                      {value === option.value && (
                        <svg
                          className="w-5 h-5 text-brand-primary shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <p className="text-danger text-body-small" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
