import React from 'react';
import { Calendar } from 'lucide-react';
import { Project } from '../../types/project';
import { formatDate } from '../../utils/formatters';
import { calculateScheduleDeviation } from '../../utils/calculations';
import clsx from 'clsx';

interface ProjectScheduleProps {
  project: Project;
}

export function ProjectSchedule({ project }: ProjectScheduleProps) {
  const { isDelayed, deviationText } = calculateScheduleDeviation(project);
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          <span>Schedule</span>
        </div>
        <span className={clsx(
          'font-medium',
          isDelayed ? 'text-red-600' : 'text-green-600'
        )}>
          {deviationText}
        </span>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>Start: {formatDate(project.schedule.start)}</span>
        <span>End: {formatDate(project.schedule.end)}</span>
      </div>
    </div>
  );
}