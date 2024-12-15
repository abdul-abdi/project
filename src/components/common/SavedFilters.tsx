import React, { useState } from 'react';
import { Bookmark, Plus, Edit2, Trash2, Save } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { Modal } from './Modal';
import { useModal } from '../../hooks/useModal';
import clsx from 'clsx';

interface SavedFilter {
  id: string;
  name: string;
  filters: Record<string, any>;
  isDefault?: boolean;
}

const defaultPresets: SavedFilter[] = [
  {
    id: 'critical',
    name: 'Critical Projects',
    filters: { status: 'red' },
    isDefault: true
  },
  {
    id: 'my-projects',
    name: 'My Projects',
    filters: { favorites: true },
    isDefault: true
  },
  {
    id: 'upcoming',
    name: 'Upcoming Deadlines',
    filters: { upcoming: true },
    isDefault: true
  }
];

export function SavedFilters() {
  const { filters, setFilters } = useProjects();
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>(defaultPresets);
  const [selectedFilter, setSelectedFilter] = useState<SavedFilter | null>(null);
  const [newFilterName, setNewFilterName] = useState('');
  const saveModal = useModal();
  const editModal = useModal();

  const handleSaveCurrentFilters = () => {
    if (!newFilterName.trim()) return;

    const newFilter: SavedFilter = {
      id: Date.now().toString(),
      name: newFilterName.trim(),
      filters: { ...filters }
    };

    setSavedFilters(prev => [...prev, newFilter]);
    setNewFilterName('');
    saveModal.close();
  };

  const handleEditFilter = (filter: SavedFilter) => {
    setSelectedFilter(filter);
    editModal.open();
  };

  const handleUpdateFilter = () => {
    if (!selectedFilter || !newFilterName.trim()) return;

    setSavedFilters(prev =>
      prev.map(f =>
        f.id === selectedFilter.id
          ? { ...f, name: newFilterName.trim() }
          : f
      )
    );
    setNewFilterName('');
    setSelectedFilter(null);
    editModal.close();
  };

  const handleDeleteFilter = (id: string) => {
    setSavedFilters(prev => prev.filter(f => f.id !== id));
  };

  const handleApplyFilter = (filter: SavedFilter) => {
    setFilters(filter.filters);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Bookmark className="h-4 w-4" />
          <span>Saved Filters</span>
        </div>
        <button
          onClick={saveModal.open}
          className="text-xs text-blue-600 hover:text-blue-700 flex items-center space-x-1"
        >
          <Plus className="h-3 w-3" />
          <span>Save Current</span>
        </button>
      </div>

      <div className="space-y-1">
        {savedFilters.map(filter => (
          <div
            key={filter.id}
            className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-gray-50 group"
          >
            <button
              onClick={() => handleApplyFilter(filter)}
              className="text-sm text-gray-700 hover:text-gray-900"
            >
              {filter.name}
            </button>
            {!filter.isDefault && (
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEditFilter(filter)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <Edit2 className="h-3 w-3" />
                </button>
                <button
                  onClick={() => handleDeleteFilter(filter.id)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Save Filter Modal */}
      <Modal
        isOpen={saveModal.isOpen}
        onClose={saveModal.close}
        title="Save Current Filters"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="filterName" className="block text-sm font-medium text-gray-700">
              Filter Name
            </label>
            <input
              type="text"
              id="filterName"
              value={newFilterName}
              onChange={(e) => setNewFilterName(e.target.value)}
              placeholder="Enter a name for this filter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={saveModal.close}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveCurrentFilters}
              disabled={!newFilterName.trim()}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-md',
                'bg-blue-600 text-white hover:bg-blue-700',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Save Filter
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Filter Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={editModal.close}
        title="Edit Filter Name"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="editFilterName" className="block text-sm font-medium text-gray-700">
              Filter Name
            </label>
            <input
              type="text"
              id="editFilterName"
              value={newFilterName}
              onChange={(e) => setNewFilterName(e.target.value)}
              placeholder="Enter a new name for this filter"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={editModal.close}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateFilter}
              disabled={!newFilterName.trim()}
              className={clsx(
                'px-4 py-2 text-sm font-medium rounded-md',
                'bg-blue-600 text-white hover:bg-blue-700',
                'disabled:opacity-50 disabled:cursor-not-allowed'
              )}
            >
              Update Filter
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 