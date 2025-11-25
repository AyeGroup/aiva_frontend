import { useState } from "react";

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpenItems?: string[];
  variant?: "default" | "bordered" | "separated";
  size?: "sm" | "md" | "lg";
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenItems = [],
  variant = "default",
  size = "md",
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpenItems)
  );

  const toggleItem = (itemId: string) => {
    const item = items.find((i) => i.id === itemId);
    if (item?.disabled) return;

    setOpenItems((prev) => {
      const newOpenItems = new Set(prev);

      if (newOpenItems.has(itemId)) {
        // Close this item
        newOpenItems.delete(itemId);
      } else {
        // Open this item
        if (!allowMultiple) {
          // Close all other items if multiple not allowed
          newOpenItems.clear();
        }
        newOpenItems.add(itemId);
      }

      return newOpenItems;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, itemId: string) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        toggleItem(itemId);
        break;
      case "ArrowDown":
        e.preventDefault();
        const currentIndex = items.findIndex((item) => item.id === itemId);
        const nextIndex = (currentIndex + 1) % items.length;
        const nextButton = document.getElementById(
          `accordion-trigger-${items[nextIndex].id}`
        );
        nextButton?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        const currentIndexUp = items.findIndex((item) => item.id === itemId);
        const prevIndex =
          currentIndexUp === 0 ? items.length - 1 : currentIndexUp - 1;
        const prevButton = document.getElementById(
          `accordion-trigger-${items[prevIndex].id}`
        );
        prevButton?.focus();
        break;
    }
  };

  const sizeClasses = {
    sm: {
      trigger: "px-4 py-3 text-body-small",
      content: "px-4 pb-3",
    },
    md: {
      trigger: "px-6 py-4",
      content: "px-6 pb-4",
    },
    lg: {
      trigger: "px-8 py-6",
      content: "px-8 pb-6",
    },
  };

  const getItemClasses = (index: number) => {
    const baseClasses = "bg-bg-surface overflow-hidden";

    const variantClasses = {
      default: `
        ${index === 0 ? "rounded-t-xl" : ""}
        ${index === items.length - 1 ? "rounded-b-xl" : ""}
        ${index !== items.length - 1 ? "border-b border-border-soft" : ""}
      `,
      bordered: `
        border border-border-soft rounded-xl
        ${index !== items.length - 1 ? "mb-2" : ""}
      `,
      separated: `
        border border-border-soft rounded-xl
        ${index !== items.length - 1 ? "mb-4" : ""}
        shadow-sm
      `,
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  };

  const getContainerClasses = () => {
    const variantClasses = {
      default: "border border-border-soft rounded-xl shadow-sm",
      bordered: "",
      separated: "",
    };

    return variantClasses[variant];
  };

  return (
    <div className={getContainerClasses()}>
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);

        return (
          <div key={item.id} className={getItemClasses(index)}>
            {/* Trigger */}
            <button
              id={`accordion-trigger-${item.id}`}
              type="button"
              onClick={() => toggleItem(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              disabled={item.disabled}
              className={`
                w-full flex items-center justify-between text-right
                focus:outline-none focus:ring-2 focus:ring-brand-primary/20
                ${sizeClasses[size].trigger}
                ${
                  item.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-bg-soft-mint cursor-pointer"
                }
                ${isOpen ? "text-brand-primary" : "text-grey-900"}
              `}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
              title={item.title}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {item.icon && <span className="shrink-0">{item.icon}</span>}
                <span className="truncate font-medium">{item.title}</span>
              </div>

              <svg
                className={`
                  w-5 h-5 shrink-0 transition-transform duration-200
                  ${isOpen ? "rotate-180" : ""}
                  ${isOpen ? "text-brand-primary" : "text-grey-400"}
                `}
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M7.41 8.84L12 13.42l4.59-4.58L18 10.25l-6 6-6-6z" />
              </svg>
            </button>

            {/* Content */}
            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-trigger-${item.id}`}
                className={`
                  ${sizeClasses[size].content}
                  text-grey-700 border-t border-border-soft
                `}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
