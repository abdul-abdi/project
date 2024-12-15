import React, { useEffect, useState } from 'react';
import { Command } from 'lucide-react';
import { Modal } from './Modal';
import { useProjects } from '../../hooks/useProjects';

interface ShortcutGroup {
  label: string;
  shortcuts: {
    keys: string[];
    description: string;
  }[];
}

export function KeyboardShortcuts() {
  const [showModal, setShowModal] = useState(false);
  const { setFilters, filters } = useProjects();

  const shortcutGroups: ShortcutGroup[] = [
    {
      label: 'Navigation',
      shortcuts: [
        { keys: ['?'], description: 'Show keyboard shortcuts' },
        { keys: ['g', 'h'], description: 'Go to Home' },
        { keys: ['g', 'f'], description: 'Go to Favorites' },
        { keys: ['g', 'a'], description: 'Go to Archive' },
        { keys: ['Esc'], description: 'Close modal / Clear search' }
      ]
    },
    {
      label: 'Project Actions',
      shortcuts: [
        { keys: ['n'], description: 'New project' },
        { keys: ['f'], description: 'Search projects' },
        { keys: ['s'], description: 'Save current view' },
        { keys: ['r'], description: 'Refresh projects' }
      ]
    },
    {
      label: 'Filters',
      shortcuts: [
        { keys: ['1'], description: 'Show all projects' },
        { keys: ['2'], description: 'Show critical projects' },
        { keys: ['3'], description: 'Show on-track projects' },
        { keys: ['4'], description: 'Show completed projects' }
      ]
    },
    {
      label: 'Views',
      shortcuts: [
        { keys: ['v', 'g'], description: 'Grid view' },
        { keys: ['v', 'l'], description: 'List view' },
        { keys: ['v', 'b'], description: 'Board view' },
        { keys: ['v', 't'], description: 'Timeline view' }
      ]
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key) {
        case '?':
          setShowModal(true);
          break;
        case 'Escape':
          setShowModal(false);
          setFilters({ ...filters, search: '' });
          break;
        case 'f':
          if (!event.ctrlKey && !event.metaKey) {
            event.preventDefault();
            // Focus search input
            const searchInput = document.querySelector<HTMLInputElement>('[data-search-input]');
            searchInput?.focus();
          }
          break;
        case '1':
          setFilters({});
          break;
        case '2':
          setFilters({ ...filters, status: 'red' });
          break;
        case '3':
          setFilters({ ...filters, status: 'green' });
          break;
        case '4':
          setFilters({ ...filters, completed: true });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filters, setFilters]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Keyboard shortcuts"
      >
        <Command className="h-5 w-5" />
      </button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Keyboard Shortcuts"
      >
        <div className="space-y-6">
          {shortcutGroups.map((group, index) => (
            <div key={index}>
              <h3 className="text-sm font-medium text-gray-900 mb-3">{group.label}</h3>
              <div className="space-y-2">
                {group.shortcuts.map((shortcut, shortcutIndex) => (
                  <div
                    key={shortcutIndex}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-600">{shortcut.description}</span>
                    <div className="flex items-center space-x-2">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={keyIndex}>
                          <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded shadow-sm">
                            {key}
                          </kbd>
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-gray-400">then</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="mt-6 text-sm text-gray-500">
            <p>Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded shadow-sm">?</kbd> anywhere to show this help dialog</p>
          </div>
        </div>
      </Modal>
    </>
  );
} 