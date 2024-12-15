import React from 'react';
import { RAGStatus } from '../../types/project';
import clsx from 'clsx';

interface StatusIndicatorProps {
  label: string;
  status: RAGStatus;
}

export function StatusIndicator({ label, status }: StatusIndicatorProps) {
  return (
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
      <span className="text-sm text-gray-600">{label}</span>
      <div className={clsx(
        'w-3 h-3 rounded-full',
        status === 'red' ? 'bg-red-500' :
        status === 'amber' ? 'bg-yellow-500' :
        'bg-green-500'
      )} />
    </div>
  );
}