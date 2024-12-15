import React from 'react';
import clsx from 'clsx';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

export function Tabs({ 
  tabs, 
  activeTab, 
  onChange, 
  variant = 'default' 
}: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav 
        className="-mb-px flex space-x-4" 
        aria-label="Tabs"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => onChange(tab.id)}
              className={clsx(
                "group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-sm font-medium text-center focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                {
                  // Default variant
                  'default': {
                    'text-gray-500 hover:text-gray-700 border-b-2': true,
                    'border-transparent': !isActive,
                    'border-blue-500 text-blue-600': isActive,
                  },
                  // Pills variant
                  'pills': {
                    'rounded-md transition-colors duration-200': true,
                    'text-gray-500 hover:text-gray-700 hover:bg-gray-50': !isActive,
                    'bg-blue-50 text-blue-600': isActive,
                  },
                  // Underline variant
                  'underline': {
                    'text-gray-500 hover:text-gray-700': true,
                    'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:transition-transform after:duration-200': true,
                    'after:bg-blue-500 after:transform after:scale-x-0 group-hover:after:scale-x-100': !isActive,
                    'text-blue-600 after:bg-blue-500 after:transform after:scale-x-100': isActive,
                  },
                }[variant]
              )}
            >
              <div className="flex items-center justify-center space-x-2">
                {tab.icon && <span className="h-5 w-5">{tab.icon}</span>}
                <span>{tab.label}</span>
              </div>

              {/* Active indicator animation */}
              <span
                className={clsx(
                  "absolute inset-x-0 bottom-0 h-0.5 transition-transform duration-200",
                  isActive ? "transform scale-x-100" : "transform scale-x-0"
                )}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </nav>
    </div>
  );
}

interface TabPanelProps {
  id: string;
  active: boolean;
  children: React.ReactNode;
}

export function TabPanel({ id, active, children }: TabPanelProps) {
  if (!active) return null;

  return (
    <div
      role="tabpanel"
      id={`${id}-panel`}
      aria-labelledby={`${id}-tab`}
      className="animate-fade-in py-4"
    >
      {children}
    </div>
  );
} 