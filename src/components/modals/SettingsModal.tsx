import React from 'react';
import { Modal } from '../common/Modal';
import { DisplaySettings } from '../settings/DisplaySettings';
import { NotificationSettings } from '../settings/NotificationSettings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Settings"
    >
      <div className="space-y-8">
        <DisplaySettings />
        <NotificationSettings />
      </div>
    </Modal>
  );
}