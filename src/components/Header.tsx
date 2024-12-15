import React from 'react';
import { SearchBar } from './common/SearchBar';
import { SavedFilters } from './common/SavedFilters';
import { KeyboardShortcuts } from './common/KeyboardShortcuts';
import { NotificationBell } from './notifications/NotificationBell';
import { Settings, User } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';

export function Header() {
  const { filters, setFilters } = useProjects();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/logo.svg"
                alt="Project Management"
              />
            </div>
            <div className="hidden md:block flex-1 mx-8">
              <SearchBar
                value={filters.search || ''}
                onChange={(search) => setFilters({ ...filters, search })}
                placeholder="Search projects..."
                data-search-input
              />
            </div>
            <div className="hidden lg:block">
              <SavedFilters />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <KeyboardShortcuts />
            <NotificationBell />
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <div className="border-l border-gray-200 h-6 mx-2" />
            <button
              className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <span className="hidden sm:inline-block font-medium">John Doe</span>
            </button>
          </div>
        </div>
        <div className="md:hidden py-2">
          <SearchBar
            value={filters.search || ''}
            onChange={(search) => setFilters({ ...filters, search })}
            placeholder="Search projects..."
            data-search-input
          />
        </div>
      </div>
    </header>
  );
}