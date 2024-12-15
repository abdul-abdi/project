import React from 'react';
import { Schedule } from '../../types/project';
import { formatDate } from '../../utils/formatters';
import clsx from 'clsx';

interface ProjectScheduleProps {
  schedule: Schedule;
}

export function ProjectSchedule({ schedule }: ProjectScheduleProps) {
  const now = new Date();
  const totalDuration = schedule.end.getTime() - schedule.start.getTime();
  const elapsed = now.getTime() - schedule.start.getTime();
  const percentage = Math.min(Math.max((elapsed / totalDuration) * 100, 0), 100);
  
  const status = schedule.deviation > 10 ? 'red' :
                schedule.deviation > 5 ? 'amber' :
                'green';

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Schedule</span>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-900">
            {formatDate(schedule.start)} - {formatDate(schedule.end)}
          </span>
          {schedule.deviation > 0 && (
            <p className="text-xs text-red-600">
              {schedule.deviation} days behind
            </p>
          )}
        </div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300',
            status === 'red' ? 'bg-red-500' :
            status === 'amber' ? 'bg-yellow-500' :
            'bg-green-500'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}