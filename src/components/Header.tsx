import React from 'react';
import { Settings, User, Search, X, Bell } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useModal } from '../hooks/useModal';
import { Modal } from './common/Modal';
import { SettingsModal } from './modals/SettingsModal';
import clsx from 'clsx';

export function Header() {
  const { filters, setFilters } = useProjects();
  const settingsModal = useModal();
  const notificationsModal = useModal();
  const profileModal = useModal();

  const clearSearch = () => {
    setFilters({ ...filters, search: '' });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold text-gray-900">RAG Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={filters.search || ''}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className={clsx(
                'pl-10 pr-8 py-2 border border-gray-300 rounded-md',
                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                'w-64 transition-all duration-200'
              )}
            />
            {filters.search && (
              <button
                onClick={clearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <button 
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={notificationsModal.open}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <button 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={settingsModal.open}
          >
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          
          <button 
            className="flex items-center space-x-2 hover:bg-gray-100 rounded-full p-1 transition-colors duration-200"
            onClick={profileModal.open}
          >
            <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </button>
        </div>
      </div>

      <SettingsModal isOpen={settingsModal.isOpen} onClose={settingsModal.close} />

      <Modal
        isOpen={notificationsModal.isOpen}
        onClose={notificationsModal.close}
        title="Notifications"
      >
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-red-600">Critical Update</span>
              <span className="text-xs text-gray-500">2 min ago</span>
            </div>
            <p className="text-sm text-gray-600">Project "Website Redesign" status changed to Critical</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-amber-600">Warning</span>
              <span className="text-xs text-gray-500">1 hour ago</span>
            </div>
            <p className="text-sm text-gray-600">Budget threshold exceeded for "Mobile App Development"</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={profileModal.isOpen}
        onClose={profileModal.close}
        title="Profile"
      >
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">John Doe</h3>
              <p className="text-sm text-gray-500">Project Manager</p>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md text-left transition-colors duration-200">
              View Profile
            </button>
            <button className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md text-left transition-colors duration-200">
              Account Settings
            </button>
            <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md text-left transition-colors duration-200">
              Sign Out
            </button>
          </div>
        </div>
      </Modal>
    </header>
  );
}