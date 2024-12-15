import React from 'react';
import clsx from 'clsx';

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export function Tabs({ value, onChange, children }: TabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return null;
          const isActive = child.props.value === value;
          
          return React.cloneElement(child as React.ReactElement<TabProps>, {
            isActive,
            onClick: () => onChange(child.props.value)
          });
        })}
      </nav>
    </div>
  );
}

interface TabComponentProps extends TabProps {
  isActive?: boolean;
  onClick?: () => void;
}

export function Tab({ label, icon, isActive, onClick }: TabComponentProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm',
        isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
} 