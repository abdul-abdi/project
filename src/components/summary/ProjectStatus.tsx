import React from 'react';
import { Clock } from 'lucide-react';
import { Card } from '../common/Card';
import { RAGStatus } from '../../types/project';

interface ProjectStatusProps {
  byStatus: Record<RAGStatus, number>;
}

export function ProjectStatus({ byStatus }: ProjectStatusProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Project Status</h3>
        <Clock className="h-5 w-5 text-gray-500" />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">On Track</span>
          <span className="text-sm font-medium text-green-600">
            {byStatus.green}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">At Risk</span>
          <span className="text-sm font-medium text-amber-600">
            {byStatus.amber}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Critical</span>
          <span className="text-sm font-medium text-red-600">
            {byStatus.red}
          </span>
        </div>
      </div>
    </Card>
  );
}