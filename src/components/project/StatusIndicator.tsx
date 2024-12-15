import React from 'react';
import clsx from 'clsx';
import { Tooltip } from '../common/Tooltip';
import { RAGStatus } from '../../types/project';

interface StatusIndicatorProps {
  label: string;
  status: RAGStatus;
  tooltipContent?: React.ReactNode;
}

export function StatusIndicator({ label, status, tooltipContent }: StatusIndicatorProps) {
  const indicator = (
    <div 
      className={clsx(
        "p-3 rounded-lg border transition-all duration-200",
        "hover:shadow-md cursor-help",
        status === 'red' && "bg-red-50 border-red-200",
        status === 'amber' && "bg-amber-50 border-amber-200",
        status === 'green' && "bg-green-50 border-green-200"
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{label}</span>
        <span 
          className={clsx(
            "h-2.5 w-2.5 rounded-full",
            status === 'red' && "bg-red-500",
            status === 'amber' && "bg-amber-500",
            status === 'green' && "bg-green-500"
          )}
        />
      </div>
    </div>
  );

  if (tooltipContent) {
    return (
      <Tooltip content={tooltipContent} position="bottom">
        {indicator}
      </Tooltip>
    );
  }

  return indicator;
}