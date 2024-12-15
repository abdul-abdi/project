import React from 'react';
import clsx from 'clsx';

interface ProjectProgressProps {
  value: number;
  size?: 'sm' | 'md' | 'lg';
}

export function ProjectProgress({ value, size = 'md' }: ProjectProgressProps) {
  return (
    <div className="relative pt-1">
      <div className={clsx(
        "overflow-hidden rounded-full bg-blue-100",
        {
          'h-1': size === 'sm',
          'h-2': size === 'md',
          'h-3': size === 'lg',
        }
      )}>
        <div
          className={clsx(
            "transition-all duration-500 ease-out rounded-full",
            value >= 90 ? 'bg-green-500' :
            value >= 70 ? 'bg-blue-500' :
            value >= 50 ? 'bg-amber-500' :
            'bg-red-500'
          )}
          style={{
            width: `${value}%`,
            height: '100%',
            transition: 'width 1s ease-in-out',
          }}
        />
      </div>
      <div className="flex items-center justify-between text-xs mt-1">
        <div className={clsx(
          "font-medium",
          value >= 90 ? 'text-green-600' :
          value >= 70 ? 'text-blue-600' :
          value >= 50 ? 'text-amber-600' :
          'text-red-600'
        )}>
          {value}% Complete
        </div>
        <div className="text-gray-500">
          {value < 100 && `${100 - value}% Remaining`}
        </div>
      </div>
    </div>
  );
}