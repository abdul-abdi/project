import React from 'react';
import { Clock, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { Card } from '../common/Card';
import { RAGStatus } from '../../types/project';
import clsx from 'clsx';

interface ProjectStatusProps {
  byStatus: Record<RAGStatus, number>;
  recentChanges?: {
    status: RAGStatus;
    change: number;
  }[];
}

export function ProjectStatus({ 
  byStatus,
  recentChanges = [
    { status: 'red', change: -2 },
    { status: 'amber', change: 1 },
    { status: 'green', change: 1 },
  ]
}: ProjectStatusProps) {
  const total = Object.values(byStatus).reduce((sum, value) => sum + value, 0);

  const getStatusIcon = (status: RAGStatus) => {
    switch (status) {
      case 'green':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'amber':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'red':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusText = (status: RAGStatus) => {
    switch (status) {
      case 'green':
        return 'On Track';
      case 'amber':
        return 'At Risk';
      case 'red':
        return 'Critical';
    }
  };

  const getChangeIndicator = (change: number) => {
    if (change === 0) return null;
    const isPositive = change > 0;
    if (isPositive) {
      return (
        <span className="text-xs font-medium text-green-600">
          +{change} new
        </span>
      );
    }
    return (
      <span className="text-xs font-medium text-red-600">
        {change} resolved
      </span>
    );
  };

  const getStatusPercentage = (status: RAGStatus) => {
    return total === 0 ? 0 : Math.round((byStatus[status] / total) * 100);
  };

  const statuses: RAGStatus[] = ['green', 'amber', 'red'];

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Project Status</h3>
          <p className="text-sm text-gray-500 mt-1">Current project distribution</p>
        </div>
        <div className="flex items-center space-x-1 text-gray-500">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{total} total</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Status Distribution */}
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden flex">
          {statuses.map((status) => (
            <div
              key={status}
              className={clsx(
                'transition-all duration-300',
                status === 'green' && 'bg-green-500',
                status === 'amber' && 'bg-amber-500',
                status === 'red' && 'bg-red-500'
              )}
              style={{ width: `${getStatusPercentage(status)}%` }}
            />
          ))}
        </div>

        {/* Status Details */}
        <div className="space-y-4">
          {statuses.map((status) => {
            const change = recentChanges?.find(c => c.status === status)?.change || 0;
            return (
              <div
                key={status}
                className={clsx(
                  "p-3 rounded-lg",
                  status === 'green' && "bg-green-50",
                  status === 'amber' && "bg-amber-50",
                  status === 'red' && "bg-red-50"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(status)}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900">
                          {getStatusText(status)}
                        </span>
                        {getChangeIndicator(change)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getStatusPercentage(status)}% of projects
                      </div>
                    </div>
                  </div>
                  <div className={clsx(
                    "text-2xl font-bold",
                    status === 'green' && "text-green-600",
                    status === 'amber' && "text-amber-600",
                    status === 'red' && "text-red-600"
                  )}>
                    {byStatus[status]}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="pt-4 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-2">
            <button className="px-3 py-2 text-xs font-medium text-center text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
              View On Track
            </button>
            <button className="px-3 py-2 text-xs font-medium text-center text-white bg-amber-500 rounded-md hover:bg-amber-600 transition-colors">
              View At Risk
            </button>
            <button className="px-3 py-2 text-xs font-medium text-center text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors">
              View Critical
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}