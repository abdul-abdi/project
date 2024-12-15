import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { SettingsSection } from './SettingsSection';
import { SettingsToggle } from './SettingsToggle';
import { useProjects } from '../../hooks/useProjects';

export function DisplaySettings() {
  const { settings, updateSettings } = useProjects();

  return (
    <SettingsSection title="Display Settings">
      <SettingsToggle
        label="Show completed projects"
        enabled={settings.showCompleted}
        onChange={(enabled) => updateSettings({ showCompleted: enabled })}
      />
      <SettingsToggle
        label="Dark mode"
        enabled={settings.darkMode}
        onChange={(enabled) => updateSettings({ darkMode: enabled })}
        icon={settings.darkMode ? (
          <Moon className="h-3 w-3 text-gray-600" />
        ) : (
          <Sun className="h-3 w-3 text-gray-600" />
        )}
      />
    </SettingsSection>
  );
}