import React from 'react';
import { ArrowUpDown, Calendar, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';

type SortField = 'name' | 'lastUpdated' | 'completion' | 'budget' | 'deadline';
type SortDirection = 'asc' | 'desc';

interface ProjectSortProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField, direction: SortDirection) => void;
}

interface SortOption {
  field: SortField;
  label: string;
  icon: React.ElementType;
}

export function ProjectSort({ sortField, sortDirection, onSort }: ProjectSortProps) {
  const sortOptions: SortOption[] = [
    { field: 'name', label: 'Name', icon: ArrowUpDown },
    { field: 'lastUpdated', label: 'Last Updated', icon: Clock },
    { field: 'completion', label: 'Progress', icon: TrendingUp },
    { field: 'budget', label: 'Budget', icon: DollarSign },
    { field: 'deadline', label: 'Deadline', icon: Calendar },
  ];

  const handleSort = (field: SortField) => {
    const newDirection = field === sortField
      ? sortDirection === 'asc' ? 'desc' : 'asc'
      : 'asc';
    onSort(field, newDirection);
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Sort by:</span>
      <div className="flex items-center space-x-1">
        {sortOptions.map(({ field, label, icon: Icon }) => (
          <Tooltip
            key={field}
            content={`Sort by ${label} ${
              field === sortField
                ? sortDirection === 'asc'
                  ? '(ascending)'
                  : '(descending)'
                : ''
            }`}
          >
            <button
              onClick={() => handleSort(field)}
              className={clsx(
                'p-1.5 rounded-md text-sm font-medium flex items-center space-x-1',
                'transition-colors duration-200',
                field === sortField
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
              {field === sortField && (
                <div
                  className={clsx(
                    'transform transition-transform duration-200',
                    sortDirection === 'desc' ? 'rotate-180' : ''
                  )}
                >
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              )}
            </button>
          </Tooltip>
        ))}
      </div>
    </div>
  );
} 