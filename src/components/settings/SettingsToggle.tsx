import React, { ReactNode } from 'react';
import { Toggle } from '../ui/Toggle';

interface SettingsToggleProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  icon?: ReactNode;
}

export function SettingsToggle({ label, enabled, onChange, icon }: SettingsToggleProps) {
  return (
    <label className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      <Toggle enabled={enabled} onChange={onChange} icon={icon} />
    </label>
  );
}