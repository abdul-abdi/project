import React from 'react';
import clsx from 'clsx';
import { Filter } from 'lucide-react';
import { RAGStatus } from '../types/project';
import { Badge } from './common/Badge';

interface ProjectFiltersProps {
  onFilterChange: (status?: RAGStatus) => void;
  activeFilter?: RAGStatus;
}

const filters: { label: string; value: RAGStatus }[] = [
  { label: 'On Track', value: 'green' },
  { label: 'At Risk', value: 'amber' },
  { label: 'Critical', value: 'red' },
];

export function ProjectFilters({ onFilterChange, activeFilter }: ProjectFiltersProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center text-gray-600">
        <Filter className="h-5 w-5 mr-2" />
        <span className="text-sm font-medium">Filter by status:</span>
      </div>
      
      <div className="flex space-x-2">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(activeFilter === value ? undefined : value)}
            className={clsx(
              'px-3 py-1.5 rounded-full text-sm transition-colors duration-200',
              activeFilter === value
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            )}
          >
            <Badge status={value} label={label} size="sm" />
          </button>
        ))}
      </div>
    </div>
  );
}