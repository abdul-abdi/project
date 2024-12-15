import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Filter, Calendar, User, Building } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { Tooltip } from './Tooltip';
import { SavedFilters } from './SavedFilters';
import clsx from 'clsx';

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const { filters, setFilters } = useProjects();
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(filters.search || '');
  const advancedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (advancedRef.current && !advancedRef.current.contains(event.target as Node)) {
        setIsAdvancedOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearSearch = () => {
    setLocalSearch('');
    setFilters({ ...filters, search: '' });
  };

  const handleSearchChange = (value: string) => {
    setLocalSearch(value);
    // Debounce the actual filter update
    const timeoutId = setTimeout(() => {
      setFilters({ ...filters, search: value });
    }, 300);
    return () => clearTimeout(timeoutId);
  };

  const advancedFilters = [
    {
      id: 'recent',
      label: 'Recently Updated',
      icon: Calendar,
      active: filters.recent
    },
    {
      id: 'upcoming',
      label: 'Upcoming Deadlines',
      icon: Calendar,
      active: filters.upcoming
    },
    {
      id: 'favorites',
      label: 'Favorites Only',
      icon: User,
      active: filters.favorites
    }
  ];

  return (
    <div className={clsx('relative', className)} ref={advancedRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search projects..."
          value={localSearch}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={clsx(
            'pl-10 pr-20 py-2 border border-gray-300 rounded-md',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
            'w-full transition-all duration-200'
          )}
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {localSearch && (
            <button
              onClick={clearSearch}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <Tooltip content="Advanced filters">
            <button
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={clsx(
                'text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100',
                isAdvancedOpen && 'bg-gray-100 text-gray-600'
              )}
            >
              <Filter className="h-4 w-4" />
            </button>
          </Tooltip>
        </div>
      </div>

      {/* Advanced Search Panel */}
      {isAdvancedOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">Quick Filters</div>
              <div className="grid grid-cols-2 gap-3">
                {advancedFilters.map(({ id, label, icon: Icon, active }) => (
                  <button
                    key={id}
                    onClick={() => setFilters({ ...filters, [id]: !filters[id as keyof typeof filters] })}
                    className={clsx(
                      'flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors',
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-medium text-gray-500 mb-2">Status Filters</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters({ status: 'red' })}
                  className="px-2 py-1 text-xs rounded bg-red-50 text-red-700 hover:bg-red-100"
                >
                  Critical Projects
                </button>
                <button
                  onClick={() => setFilters({ status: 'amber' })}
                  className="px-2 py-1 text-xs rounded bg-amber-50 text-amber-700 hover:bg-amber-100"
                >
                  At Risk Projects
                </button>
                <button
                  onClick={() => setFilters({ status: 'green' })}
                  className="px-2 py-1 text-xs rounded bg-green-50 text-green-700 hover:bg-green-100"
                >
                  On Track Projects
                </button>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <SavedFilters />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 