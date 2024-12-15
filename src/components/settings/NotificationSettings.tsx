import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsToggle } from './SettingsToggle';
import { useProjects } from '../../hooks/useProjects';

export function NotificationSettings() {
  const { settings, updateSettings } = useProjects();

  return (
    <SettingsSection title="Notifications">
      <SettingsToggle
        label="Email notifications"
        enabled={settings.emailNotifications}
        onChange={(enabled) => updateSettings({ emailNotifications: enabled })}
      />
      <SettingsToggle
        label="Push notifications"
        enabled={settings.pushNotifications}
        onChange={(enabled) => updateSettings({ pushNotifications: enabled })}
      />
    </SettingsSection>
  );
}