import React from 'react';
import { MoreVertical, User, Star } from 'lucide-react';
import { Project } from '../types/project';
import { Card } from './common/Card';
import { ProjectDetails } from './project/ProjectDetails';
import { Modal } from './common/Modal';
import { StatusIndicator } from './project/StatusIndicator';
import { formatDate } from '../utils/formatters';
import { useProjects } from '../hooks/useProjects';
import { useModal } from '../hooks/useModal';
import clsx from 'clsx';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { favorites, toggleFavorite } = useProjects();
  const detailsModal = useModal();
  const isFavorite = favorites.has(project.id);

  const ragStatuses = {
    stakeholder: project.status,
    schedule: project.schedule.deviation > 10 ? 'red' : project.schedule.deviation > 5 ? 'amber' : 'green',
    budget: project.budget.spent / project.budget.allocated > 0.9 ? 'red' : 
           project.budget.spent / project.budget.allocated > 0.7 ? 'amber' : 'green',
    staffing: project.staffingStatus || 'amber'
  };

  return (
    <>
      <Card className="bg-white border border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-medium text-gray-900">{project.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(project.id);
                }}
                className="text-gray-400"
              >
                <Star className={clsx('h-4 w-4', isFavorite && 'fill-yellow-500 text-yellow-500')} />
              </button>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <User className="h-4 w-4 mr-2" />
              <span>{project.owner}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {formatDate(project.lastUpdated)}
            </span>
            <button className="text-gray-400">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2" onClick={() => detailsModal.open()}>
          <StatusIndicator label="Stakeholder" status={ragStatuses.stakeholder} />
          <StatusIndicator label="Schedule" status={ragStatuses.schedule} />
          <StatusIndicator label="Budget" status={ragStatuses.budget} />
          <StatusIndicator label="Staffing" status={ragStatuses.staffing} />
        </div>
      </Card>

      <Modal
        isOpen={detailsModal.isOpen}
        onClose={detailsModal.close}
        title={project.name}
        size="lg"
      >
        <ProjectDetails project={project} />
      </Modal>
    </>
  );
}