import { useState, useRef, useEffect } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}

interface TabsProps {
  tabs: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Tabs({
  tabs,
  defaultTab,
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  fullWidth = false
}: TabsProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTab || defaultTab || tabs[0]?.id || ''
  );
  
  const tabsRef = useRef<HTMLDivElement>(null);
  const [focusedTabIndex, setFocusedTabIndex] = useState(0);

  const currentActiveTab = activeTab || internalActiveTab;
  const activeTabContent = tabs.find(tab => tab.id === currentActiveTab)?.content;

  const handleTabChange = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab?.disabled) return;
    
    setInternalActiveTab(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string, index: number) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        const nextIndex = (index + 1) % tabs.length;
        const nextTab = tabs[nextIndex];
        if (!nextTab.disabled) {
          setFocusedTabIndex(nextIndex);
          handleTabChange(nextTab.id);
        }
        break;
        
      case 'ArrowLeft':
        e.preventDefault();
        const prevIndex = index === 0 ? tabs.length - 1 : index - 1;
        const prevTab = tabs[prevIndex];
        if (!prevTab.disabled) {
          setFocusedTabIndex(prevIndex);
          handleTabChange(prevTab.id);
        }
        break;
        
      case 'Home':
        e.preventDefault();
        const firstTab = tabs.find(tab => !tab.disabled);
        if (firstTab) {
          const firstIndex = tabs.indexOf(firstTab);
          setFocusedTabIndex(firstIndex);
          handleTabChange(firstTab.id);
        }
        break;
        
      case 'End':
        e.preventDefault();
        const lastTab = tabs.slice().reverse().find(tab => !tab.disabled);
        if (lastTab) {
          const lastIndex = tabs.indexOf(lastTab);
          setFocusedTabIndex(lastIndex);
          handleTabChange(lastTab.id);
        }
        break;
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-body-small',
    md: 'px-4 py-3',
    lg: 'px-6 py-4'
  };

  const getTabClasses = (tab: TabItem, index: number) => {
    const isActive = tab.id === currentActiveTab;
    const isFocused = index === focusedTabIndex;
    
    const baseClasses = `
      relative flex items-center gap-2 focus:outline-none
      ${sizeClasses[size]}
      ${fullWidth ? 'flex-1 justify-center' : ''}
      ${tab.disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'cursor-pointer hover:bg-bg-soft-mint'
      }
    `;

    const variantClasses = {
      default: `
        border-b-2 rounded-t-lg
        ${isActive 
          ? 'border-brand-primary bg-bg-surface text-brand-primary' 
          : 'border-transparent text-grey-600 hover:text-grey-900'
        }
        ${isFocused ? 'ring-2 ring-brand-primary/20' : ''}
      `,
      pills: `
        rounded-xl
        ${isActive 
          ? 'bg-brand-primary text-white shadow-sm' 
          : 'text-grey-600 hover:text-grey-900'
        }
        ${isFocused ? 'ring-2 ring-brand-primary/20' : ''}
      `,
      underline: `
        border-b-2 pb-3
        ${isActive 
          ? 'border-brand-primary text-brand-primary' 
          : 'border-transparent text-grey-600 hover:text-grey-900 hover:border-grey-300'
        }
        ${isFocused ? 'ring-2 ring-brand-primary/20' : ''}
      `
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  };

  const getTabListClasses = () => {
    const baseClasses = `
      flex border-b border-border-soft
      ${fullWidth ? 'w-full' : 'w-auto'}
    `;

    const variantClasses = {
      default: 'bg-bg-soft-mint rounded-t-xl',
      pills: 'bg-bg-soft-mint rounded-xl p-1 gap-1',
      underline: 'bg-transparent'
    };

    return `${baseClasses} ${variantClasses[variant]}`;
  };

  return (
    <div className="w-full">
      {/* Tab List */}
      <div
        ref={tabsRef}
        role="tablist"
        className={getTabListClasses()}
        aria-orientation="horizontal"
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            aria-selected={tab.id === currentActiveTab}
            tabIndex={tab.id === currentActiveTab ? 0 : -1}
            disabled={tab.disabled}
            className={getTabClasses(tab, index)}
            onClick={() => handleTabChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
            title={tab.label}
          >
            {tab.icon && (
              <span className="flex-shrink-0">
                {tab.icon}
              </span>
            )}
            
            <span className="truncate">
              {tab.label}
            </span>
            
            {tab.badge && (
              <span className="
                bg-brand-secondary text-white text-caption
                px-2 py-1 rounded-full min-w-[20px] h-5
                flex items-center justify-center flex-shrink-0
              ">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Panel */}
      <div
        role="tabpanel"
        id={`panel-${currentActiveTab}`}
        aria-labelledby={`tab-${currentActiveTab}`}
        tabIndex={0}
        className="mt-4 focus:outline-none"
      >
        {activeTabContent}
      </div>
    </div>
  );
}