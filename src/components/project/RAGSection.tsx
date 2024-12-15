import React, { ReactNode } from 'react';
import { RAGStatus } from '../../types/project';
import clsx from 'clsx';

interface RAGSectionProps {
  title: string;
  status: RAGStatus;
  description: string;
  details?: ReactNode;
}

export function RAGSection({ title, status, description, details }: RAGSectionProps) {
  return (
    <div className="p-4 border border-gray-200 rounded bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900">{title}</span>
        <div className={clsx(
          'w-4 h-4 rounded',
          status === 'red' ? 'bg-red-600' :
          status === 'amber' ? 'bg-amber-500' :
          'bg-green-600'
        )} />
      </div>
      <p className="text-sm text-gray-600">
        {description}
      </p>
      {details && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          {details}
        </div>
      )}
    </div>
  );
}