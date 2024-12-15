import React from 'react';
import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon?: React.ReactNode;
}

export function Toggle({ enabled, onChange, icon }: ToggleProps) {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={clsx(
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      )}
    >
      <span
        className={clsx(
          'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
          enabled ? 'translate-x-6' : 'translate-x-1',
          'flex items-center justify-center'
        )}
      >
        {icon}
      </span>
    </Switch>
  );
}