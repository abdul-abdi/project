import React from 'react';
import { MoreVertical, User, Star, Calendar, Tags, AlertTriangle } from 'lucide-react';
import { Project } from '../types/project';
import { Card } from './common/Card';
import { ProjectDetails } from './project/ProjectDetails';
import { Modal } from './common/Modal';
import { StatusIndicator } from './project/StatusIndicator';
import { formatDate, formatCurrency } from '../utils/formatters';
import { useProjects } from '../hooks/useProjects';
import { useModal } from '../hooks/useModal';
import clsx from 'clsx';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { favorites, toggleFavorite } = useProjects();
  const detailsModal = useModal();
  const actionsModal = useModal();
  const isFavorite = favorites.has(project.id);

  const ragStatuses = {
    stakeholder: project.status,
    schedule: project.schedule.deviation > 10 ? 'red' : project.schedule.deviation > 5 ? 'amber' : 'green',
    budget: project.budget.spent / project.budget.allocated > 0.9 ? 'red' : 
           project.budget.spent / project.budget.allocated > 0.7 ? 'amber' : 'green',
    staffing: project.staffingStatus || 'amber'
  };

  const daysRemaining = Math.ceil((project.schedule.end.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysRemaining < 0;
  const hasHighRisks = project.risks?.some(risk => risk.impact === 'red' && risk.probability === 'red');

  return (
    <>
      <Card 
        className={clsx(
          "bg-white border transition-all duration-200 hover:shadow-md",
          isOverdue ? "border-red-200" : "border-gray-200"
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-medium text-gray-900 truncate">{project.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(project.id);
                }}
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <Star className={clsx('h-4 w-4', isFavorite && 'fill-yellow-500 text-yellow-500')} />
              </button>
              {project.priority === 'high' && (
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                  High Priority
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <User className="h-4 w-4 mr-2" />
              <span className="truncate">{project.owner}</span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <span className={clsx(isOverdue && "text-red-500")}>
                  {isOverdue ? `${Math.abs(daysRemaining)} days overdue` : `${daysRemaining} days remaining`}
                </span>
              </div>
              {project.tags && project.tags.length > 0 && (
                <div className="flex items-center">
                  <Tags className="h-3 w-3 mr-1" />
                  <span className="truncate">{project.tags.join(', ')}</span>
                </div>
              )}
              {hasHighRisks && (
                <div className="flex items-center text-red-500">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>High Risk</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">
              {formatDate(project.lastUpdated)}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                actionsModal.open();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2" onClick={() => detailsModal.open()}>
            <StatusIndicator label="Stakeholder" status={ragStatuses.stakeholder} />
            <StatusIndicator label="Schedule" status={ragStatuses.schedule} />
            <StatusIndicator label="Budget" status={ragStatuses.budget} />
            <StatusIndicator label="Staffing" status={ragStatuses.staffing} />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Budget</span>
              <span className="font-medium">
                {formatCurrency(project.budget.spent)} / {formatCurrency(project.budget.allocated)}
              </span>
            </div>
            <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={clsx(
                  "h-full rounded-full",
                  ragStatuses.budget === 'red' ? 'bg-red-500' :
                  ragStatuses.budget === 'amber' ? 'bg-yellow-500' : 'bg-green-500'
                )}
                style={{ width: `${(project.budget.spent / project.budget.allocated) * 100}%` }}
              />
            </div>
          </div>
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

      <Modal
        isOpen={actionsModal.isOpen}
        onClose={actionsModal.close}
        title="Project Actions"
        size="sm"
      >
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
            Edit Project
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
            Add Risk
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
            Update Status
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
            View Timeline
          </button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg text-red-600">
            Archive Project
          </button>
        </div>
      </Modal>
    </>
  );
}