import React from 'react';
import { formatPercentage } from '../../utils/formatters';

interface ProjectProgressProps {
  completion: number;
}

export function ProjectProgress({ completion }: ProjectProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Progress</span>
        <span>{formatPercentage(completion)}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${completion}%` }}
        />
      </div>
    </div>
  );
}