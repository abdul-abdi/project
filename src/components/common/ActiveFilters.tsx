import React from 'react';
import { X } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import clsx from 'clsx';

interface FilterBadgeProps {
  label: string;
  onRemove: () => void;
  variant?: 'default' | 'red' | 'amber' | 'green';
}

function FilterBadge({ label, onRemove, variant = 'default' }: FilterBadgeProps) {
  return (
    <span className={clsx(
      'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
      variant === 'default' && 'bg-gray-100 text-gray-700',
      variant === 'red' && 'bg-red-100 text-red-700',
      variant === 'amber' && 'bg-amber-100 text-amber-700',
      variant === 'green' && 'bg-green-100 text-green-700'
    )}>
      {label}
      <button
        onClick={onRemove}
        className={clsx(
          'ml-1 p-0.5 rounded-full hover:bg-gray-200 transition-colors',
          variant === 'red' && 'hover:bg-red-200',
          variant === 'amber' && 'hover:bg-amber-200',
          variant === 'green' && 'hover:bg-green-200'
        )}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

export function ActiveFilters() {
  const { filters, setFilters, clearFilters } = useProjects();

  if (!Object.values(filters).some(Boolean)) {
    return null;
  }

  const removeFilter = (key: keyof typeof filters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'red': return 'red';
      case 'amber': return 'amber';
      case 'green': return 'green';
      default: return 'default';
    }
  };

  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="text-sm text-gray-500">Active filters:</div>
      <div className="flex flex-wrap gap-2">
        {filters.search && (
          <FilterBadge
            label={`Search: "${filters.search}"`}
            onRemove={() => removeFilter('search')}
          />
        )}
        {filters.status && (
          <FilterBadge
            label={`Status: ${filters.status === 'red' ? 'Critical' : 
                            filters.status === 'amber' ? 'At Risk' : 
                            'On Track'}`}
            onRemove={() => removeFilter('status')}
            variant={getStatusVariant(filters.status)}
          />
        )}
        {filters.department && (
          <FilterBadge
            label={`Department: ${filters.department}`}
            onRemove={() => removeFilter('department')}
          />
        )}
        {filters.recent && (
          <FilterBadge
            label="Recently Updated"
            onRemove={() => removeFilter('recent')}
          />
        )}
        {filters.upcoming && (
          <FilterBadge
            label="Upcoming Deadlines"
            onRemove={() => removeFilter('upcoming')}
          />
        )}
        {filters.favorites && (
          <FilterBadge
            label="Favorites Only"
            onRemove={() => removeFilter('favorites')}
          />
        )}
        {Object.values(filters).some(Boolean) && (
          <button
            onClick={clearFilters}
            className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
} 