import React from 'react';
import { RAGStatus } from '../../types/project';
import clsx from 'clsx';

interface StatusIndicatorProps {
  label: string;
  status: RAGStatus;
  onClick?: () => void;
}

export function StatusIndicator({ label, status, onClick }: StatusIndicatorProps) {
  return (
    <div 
      className="p-3 border border-gray-200 rounded bg-white cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className={clsx(
          'w-4 h-4 rounded',
          status === 'red' ? 'bg-red-600' :
          status === 'amber' ? 'bg-amber-500' :
          'bg-green-600'
        )} />
      </div>
    </div>
  );
}