import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Star, Calendar, Filter } from 'lucide-react';
import { useProjects } from '../../hooks/useProjects';
import { Project, RAGStatus } from '../../types/project';
import { Tooltip } from '../common/Tooltip';
import clsx from 'clsx';

interface FilterSuggestion {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
  priority: 'high' | 'medium' | 'low';
}

interface FilterInsight {
  label: string;
  value: string | number;
  trend?: {
    direction: 'up' | 'down' | 'stable';
    value: number;
  };
  status?: RAGStatus;
}

export function FilterInsights() {
  const { projects, filters, setFilters } = useProjects();

  const insights: FilterInsight[] = useMemo(() => {
    const totalProjects = projects.length;
    const filteredProjects = projects.filter(project => {
      if (filters.status && project.status !== filters.status) return false;
      if (filters.department && project.department !== filters.department) return false;
      if (filters.favorites && !filters.favorites) return false;
      return true;
    });

    const criticalProjects = filteredProjects.filter(p => p.status === 'red').length;
    const atRiskProjects = filteredProjects.filter(p => p.status === 'amber').length;
    const onTrackProjects = filteredProjects.filter(p => p.status === 'green').length;

    const avgCompletion = Math.round(
      filteredProjects.reduce((sum, p) => sum + p.completion, 0) / filteredProjects.length
    );

    const upcomingDeadlines = filteredProjects.filter(p => {
      const daysUntilDeadline = Math.ceil((p.schedule.end.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDeadline <= 30;
    }).length;

    return [
      {
        label: 'Filtered Projects',
        value: `${filteredProjects.length} of ${totalProjects}`,
        trend: {
          direction: filteredProjects.length > totalProjects / 2 ? 'up' : 'down',
          value: Math.round((filteredProjects.length / totalProjects) * 100)
        }
      },
      {
        label: 'Critical Projects',
        value: criticalProjects,
        status: 'red',
        trend: {
          direction: criticalProjects > filteredProjects.length * 0.2 ? 'up' : 'down',
          value: Math.round((criticalProjects / filteredProjects.length) * 100)
        }
      },
      {
        label: 'Average Completion',
        value: `${avgCompletion}%`,
        status: avgCompletion > 70 ? 'green' : avgCompletion > 40 ? 'amber' : 'red'
      },
      {
        label: 'Upcoming Deadlines',
        value: upcomingDeadlines,
        trend: {
          direction: upcomingDeadlines > filteredProjects.length * 0.3 ? 'up' : 'down',
          value: upcomingDeadlines
        }
      }
    ];
  }, [projects, filters]);

  const suggestions: FilterSuggestion[] = useMemo(() => {
    const result: FilterSuggestion[] = [];

    // Add suggestions based on current filters and project states
    if (!filters.status && projects.some(p => p.status === 'red')) {
      result.push({
        id: 'critical',
        label: 'View Critical Projects',
        description: 'There are projects requiring immediate attention',
        icon: AlertCircle,
        action: () => setFilters({ ...filters, status: 'red' }),
        priority: 'high'
      });
    }

    if (!filters.upcoming && projects.some(p => {
      const daysUntilDeadline = Math.ceil((p.schedule.end.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDeadline <= 30;
    })) {
      result.push({
        id: 'upcoming',
        label: 'Check Upcoming Deadlines',
        description: 'Several projects have deadlines within 30 days',
        icon: Calendar,
        action: () => setFilters({ ...filters, upcoming: true }),
        priority: 'medium'
      });
    }

    // Add more contextual suggestions
    if (Object.keys(filters).length > 2) {
      result.push({
        id: 'save',
        label: 'Save Current Filters',
        description: 'Create a preset from your current filter combination',
        icon: Star,
        action: () => {/* This will be handled by SavedFilters component */},
        priority: 'low'
      });
    }

    return result;
  }, [projects, filters, setFilters]);

  if (!insights.length && !suggestions.length) return null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="space-y-4">
        {/* Insights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className={clsx(
                'p-3 rounded-lg',
                insight.status === 'red' && 'bg-red-50',
                insight.status === 'amber' && 'bg-amber-50',
                insight.status === 'green' && 'bg-green-50',
                !insight.status && 'bg-gray-50'
              )}
            >
              <div className="text-sm text-gray-500">{insight.label}</div>
              <div className="mt-1 flex items-center justify-between">
                <div className={clsx(
                  'text-lg font-semibold',
                  insight.status === 'red' && 'text-red-700',
                  insight.status === 'amber' && 'text-amber-700',
                  insight.status === 'green' && 'text-green-700',
                  !insight.status && 'text-gray-900'
                )}>
                  {insight.value}
                </div>
                {insight.trend && (
                  <div className="flex items-center text-sm">
                    {insight.trend.direction === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : insight.trend.direction === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    ) : null}
                    <span className={clsx(
                      'ml-1',
                      insight.trend.direction === 'up' && 'text-red-600',
                      insight.trend.direction === 'down' && 'text-green-600'
                    )}>
                      {insight.trend.value}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center space-x-2 mb-3">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">Suggested Actions</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {suggestions.map(suggestion => (
                <button
                  key={suggestion.id}
                  onClick={suggestion.action}
                  className={clsx(
                    'flex items-center space-x-3 p-3 rounded-lg text-left transition-colors',
                    'border border-gray-200 hover:border-gray-300 hover:bg-gray-50',
                    suggestion.priority === 'high' && 'bg-red-50 border-red-200 hover:bg-red-100 hover:border-red-300',
                    suggestion.priority === 'medium' && 'bg-amber-50 border-amber-200 hover:bg-amber-100 hover:border-amber-300'
                  )}
                >
                  <suggestion.icon className={clsx(
                    'h-5 w-5',
                    suggestion.priority === 'high' && 'text-red-500',
                    suggestion.priority === 'medium' && 'text-amber-500',
                    suggestion.priority === 'low' && 'text-gray-400'
                  )} />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{suggestion.label}</div>
                    <div className="text-xs text-gray-500">{suggestion.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 