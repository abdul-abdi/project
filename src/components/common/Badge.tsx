import React from 'react';
import { RAGStatus } from '../../types/project';
import clsx from 'clsx';

interface BadgeProps {
  status: RAGStatus;
  label?: string;
  size?: 'sm' | 'md';
}

const statusConfig: Record<RAGStatus, { bg: string; text: string; ring: string }> = {
  red: { bg: 'bg-red-100', text: 'text-red-700', ring: 'ring-red-600' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', ring: 'ring-amber-600' },
  green: { bg: 'bg-green-100', text: 'text-green-700', ring: 'ring-green-600' }
};

export function Badge({ status, label, size = 'md' }: BadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={clsx(
      'inline-flex items-center rounded-full ring-1 ring-opacity-30',
      config.bg,
      config.text,
      config.ring,
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-0.5 text-sm'
    )}>
      <span className={clsx(
        'mr-1 h-1.5 w-1.5 rounded-full',
        status === 'red' ? 'bg-red-600' :
        status === 'amber' ? 'bg-amber-600' :
        'bg-green-600'
      )} />
      {label || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}