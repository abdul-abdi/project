import React from 'react';
import { Project, RAGStatus } from '../../types/project';
import { ChevronRight, Users, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import { ProjectCard } from '../ProjectCard';
import { Tooltip } from '../common/Tooltip';
import clsx from 'clsx';

interface DepartmentViewProps {
  department: string;
  projects: Project[];
  isExpanded: boolean;
  onToggle: () => void;
}

interface DepartmentStats {
  total: number;
  byStatus: Record<RAGStatus, number>;
  completion: number;
  upcomingDeadlines: number;
  teamSize: number;
}

export function DepartmentView({ department, projects, isExpanded, onToggle }: DepartmentViewProps) {
  const stats: DepartmentStats = {
    total: projects.length,
    byStatus: projects.reduce(
      (acc, project) => {
        acc[project.status]++;
        return acc;
      },
      { red: 0, amber: 0, green: 0 } as Record<RAGStatus, number>
    ),
    completion: projects.reduce((sum, project) => sum + project.completion, 0) / projects.length,
    upcomingDeadlines: projects.filter(p => {
      const daysUntilDeadline = Math.ceil((p.schedule.end.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDeadline <= 30;
    }).length,
    teamSize: projects.reduce((sum, project) => sum + (project.staffingDetails?.current || 0), 0)
  };

  const getStatusColor = (status: RAGStatus) => {
    switch (status) {
      case 'red': return 'text-red-600 bg-red-50';
      case 'amber': return 'text-amber-600 bg-amber-50';
      case 'green': return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-white">
        <button
          onClick={onToggle}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <ChevronRight 
              className={clsx(
                'h-5 w-5 text-gray-400 transition-transform duration-200',
                isExpanded && 'transform rotate-90'
              )} 
            />
            <div className="text-left">
              <h3 className="text-lg font-medium text-gray-900">{department}</h3>
              <p className="text-sm text-gray-500">
                {stats.total} project{stats.total !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Department Stats */}
            <div className="flex items-center space-x-4">
              <Tooltip content="Team Size">
                <div className="flex items-center space-x-1 text-gray-500">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{stats.teamSize}</span>
                </div>
              </Tooltip>

              <Tooltip content="Average Completion">
                <div className="flex items-center space-x-1 text-gray-500">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm">{Math.round(stats.completion)}%</span>
                </div>
              </Tooltip>

              <Tooltip content="Upcoming Deadlines">
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">{stats.upcomingDeadlines}</span>
                </div>
              </Tooltip>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center space-x-2">
              {(['red', 'amber', 'green'] as RAGStatus[]).map(status => (
                stats.byStatus[status] > 0 && (
                  <Tooltip
                    key={status}
                    content={`${stats.byStatus[status]} ${
                      status === 'red' ? 'Critical' :
                      status === 'amber' ? 'At Risk' :
                      'On Track'
                    }`}
                  >
                    <div className={clsx(
                      'px-2 py-1 rounded-full text-xs font-medium',
                      getStatusColor(status)
                    )}>
                      {stats.byStatus[status]}
                    </div>
                  </Tooltip>
                )
              ))}
            </div>
          </div>
        </button>
      </div>

      {/* Projects Grid */}
      {isExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No projects found in this department</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 