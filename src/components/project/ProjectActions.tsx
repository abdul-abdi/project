import React, { useState } from 'react';
import {
  MoreHorizontal,
  Edit2,
  Trash2,
  Share2,
  Star,
  Clock,
  AlertCircle,
  CheckCircle,
  Archive,
  Copy
} from 'lucide-react';
import { Project, RAGStatus } from '../../types/project';
import { useProjects } from '../../hooks/useProjects';
import { Modal } from '../common/Modal';
import { useModal } from '../../hooks/useModal';
import { Tooltip } from '../common/Tooltip';
import clsx from 'clsx';

interface ProjectActionsProps {
  project: Project;
  placement?: 'card' | 'details';
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
  color?: string;
  disabled?: boolean;
  tooltip?: string;
}

export function ProjectActions({ project, placement = 'card' }: ProjectActionsProps) {
  const { favorites, toggleFavorite } = useProjects();
  const [showActions, setShowActions] = useState(false);
  const deleteModal = useModal();
  const archiveModal = useModal();
  const shareModal = useModal();

  const isFavorite = favorites.has(project.id);

  const handleStatusChange = (status: RAGStatus) => {
    // This would be handled by your project update logic
    console.log(`Changing status to ${status}`);
  };

  const handleDelete = () => {
    // This would be handled by your project deletion logic
    console.log('Deleting project');
    deleteModal.close();
  };

  const handleArchive = () => {
    // This would be handled by your project archival logic
    console.log('Archiving project');
    archiveModal.close();
  };

  const handleShare = () => {
    // This would be handled by your project sharing logic
    console.log('Sharing project');
    shareModal.close();
  };

  const handleDuplicate = () => {
    // This would be handled by your project duplication logic
    console.log('Duplicating project');
  };

  const quickActions: QuickAction[] = [
    {
      id: 'favorite',
      label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites',
      icon: Star,
      onClick: () => toggleFavorite(project.id),
      color: isFavorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400',
      tooltip: isFavorite ? 'Remove from favorites' : 'Add to favorites'
    },
    {
      id: 'status',
      label: 'Change Status',
      icon: project.status === 'red' ? AlertCircle :
            project.status === 'amber' ? Clock :
            CheckCircle,
      onClick: () => setShowActions(true),
      color: project.status === 'red' ? 'text-red-500' :
             project.status === 'amber' ? 'text-amber-500' :
             'text-green-500',
      tooltip: 'Change project status'
    },
    {
      id: 'edit',
      label: 'Edit Project',
      icon: Edit2,
      onClick: () => {/* This would open the edit modal */},
      tooltip: 'Edit project details'
    }
  ];

  const menuActions = [
    {
      id: 'share',
      label: 'Share Project',
      icon: Share2,
      onClick: shareModal.open,
      divider: false
    },
    {
      id: 'duplicate',
      label: 'Duplicate Project',
      icon: Copy,
      onClick: handleDuplicate,
      divider: true
    },
    {
      id: 'archive',
      label: 'Archive Project',
      icon: Archive,
      onClick: archiveModal.open,
      divider: false
    },
    {
      id: 'delete',
      label: 'Delete Project',
      icon: Trash2,
      onClick: deleteModal.open,
      divider: false,
      danger: true
    }
  ];

  return (
    <>
      <div className="relative">
        {/* Quick Actions */}
        {placement === 'card' ? (
          <div className="flex items-center space-x-1">
            {quickActions.map(action => (
              <Tooltip key={action.id} content={action.tooltip}>
                <button
                  onClick={action.onClick}
                  className={clsx(
                    'p-1 rounded-full hover:bg-gray-100 transition-colors',
                    action.color || 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <action.icon className="h-4 w-4" />
                </button>
              </Tooltip>
            ))}
            <Tooltip content="More actions">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </Tooltip>
          </div>
        ) : (
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
        )}

        {/* Actions Menu */}
        {showActions && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            {menuActions.map((action, index) => (
              <React.Fragment key={action.id}>
                <button
                  onClick={() => {
                    setShowActions(false);
                    action.onClick();
                  }}
                  className={clsx(
                    'w-full px-4 py-2 text-sm text-left flex items-center space-x-2',
                    'hover:bg-gray-50 transition-colors',
                    action.danger && 'text-red-600 hover:bg-red-50'
                  )}
                >
                  <action.icon className="h-4 w-4" />
                  <span>{action.label}</span>
                </button>
                {action.divider && <div className="my-1 border-t border-gray-100" />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modals */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        title="Delete Project"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this project? This action cannot be undone.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={deleteModal.close}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
            >
              Delete Project
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={archiveModal.isOpen}
        onClose={archiveModal.close}
        title="Archive Project"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Archive this project? It can be restored later from the archives.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={archiveModal.close}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleArchive}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Archive Project
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={shareModal.isOpen}
        onClose={shareModal.close}
        title="Share Project"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="shareEmail" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="shareEmail"
              placeholder="Enter email address"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Permission Level
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
              <option value="view">View Only</option>
              <option value="edit">Can Edit</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={shareModal.close}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Share
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}