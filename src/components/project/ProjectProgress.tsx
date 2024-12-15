import React from 'react';
import { formatPercentage } from '../../utils/formatters';
import clsx from 'clsx';

interface ProjectProgressProps {
  value: number;
}

export function ProjectProgress({ value }: ProjectProgressProps) {
  const progressColor = value < 30 ? 'bg-red-500' :
                       value < 70 ? 'bg-yellow-500' :
                       'bg-green-500';

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Progress</span>
        <span className="text-sm font-medium text-gray-900">{formatPercentage(value)}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full">
        <div
          className={clsx('h-full rounded-full transition-all duration-300', progressColor)}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}