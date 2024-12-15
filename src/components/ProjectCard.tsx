import React from 'react';
import { Project } from '../types/project';
import { StatusIndicator } from './project/StatusIndicator';
import { ProjectActions } from './project/ProjectActions';
import { formatCurrency, formatDate } from '../utils/formatters';
import { ProgressBar } from './common/ProgressBar';
import { Tooltip } from './common/Tooltip';
import clsx from 'clsx';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const isOverBudget = project.budget.spent > project.budget.allocated;
  const isLateDelivery = new Date() > project.schedule.end;
  const daysUntilDeadline = Math.ceil(
    (project.schedule.end.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-lg border border-gray-200 p-4 space-y-4 transition-all duration-200',
        'hover:shadow-md hover:border-gray-300',
        onClick && 'cursor-pointer'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {project.name}
            </h3>
            <StatusIndicator status={project.status} />
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
        </div>
        <ProjectActions project={project} placement="card" />
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{project.completion}%</span>
          </div>
          <ProgressBar
            progress={project.completion}
            status={project.status}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Tooltip content={`${formatCurrency(project.budget.spent)} of ${formatCurrency(project.budget.allocated)}`}>
            <div>
              <div className="text-sm text-gray-600 mb-1">Budget</div>
              <div className={clsx(
                'font-medium',
                isOverBudget ? 'text-red-600' : 'text-gray-900'
              )}>
                {Math.round((project.budget.spent / project.budget.allocated) * 100)}%
              </div>
            </div>
          </Tooltip>

          <Tooltip content={formatDate(project.schedule.end)}>
            <div>
              <div className="text-sm text-gray-600 mb-1">Deadline</div>
              <div className={clsx(
                'font-medium',
                isLateDelivery ? 'text-red-600' : 
                daysUntilDeadline <= 7 ? 'text-amber-600' : 
                'text-gray-900'
              )}>
                {isLateDelivery ? 'Overdue' :
                 daysUntilDeadline === 0 ? 'Today' :
                 daysUntilDeadline === 1 ? 'Tomorrow' :
                 `${daysUntilDeadline} days`}
              </div>
            </div>
          </Tooltip>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div>
            {project.department}
          </div>
          <div>
            Updated {formatDate(project.lastUpdated, 'relative')}
          </div>
        </div>
      </div>
    </div>
  );
}