import React from 'react';
import { RAGStatus } from '../../types/project';
import { formatDate } from '../../utils/formatters';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import clsx from 'clsx';

interface Milestone {
  name: string;
  date: Date;
  status: RAGStatus;
}

interface ProjectScheduleProps {
  startDate: Date;
  endDate: Date;
  milestones: Milestone[];
  deviation: number;
}

export function ProjectSchedule({ startDate, endDate, milestones, deviation }: ProjectScheduleProps) {
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  const progress = Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));

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

  return (
    <div className="space-y-6">
      {/* Timeline Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Timeline Overview</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{formatDate(startDate)}</span>
            <span>{formatDate(endDate)}</span>
          </div>
          <div className="relative">
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className={clsx(
                  "absolute h-2 rounded-full transition-all duration-500",
                  deviation > 10 ? "bg-red-500" :
                  deviation > 5 ? "bg-amber-500" :
                  "bg-green-500"
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
            {milestones.map((milestone, index) => {
              const position = Math.ceil(
                ((milestone.date.getTime() - startDate.getTime()) / (endDate.getTime() - startDate.getTime())) * 100
              );
              return (
                <div
                  key={index}
                  className="absolute -mt-1 transform -translate-x-1/2"
                  style={{ left: `${position}%` }}
                >
                  <div className="relative">
                    <div 
                      className={clsx(
                        "w-3 h-3 rounded-full border-2 border-white",
                        milestone.status === 'green' && "bg-green-500",
                        milestone.status === 'amber' && "bg-amber-500",
                        milestone.status === 'red' && "bg-red-500"
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Milestones</h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={clsx(
                "flex items-center justify-between p-3 rounded-lg",
                milestone.status === 'green' && "bg-green-50",
                milestone.status === 'amber' && "bg-amber-50",
                milestone.status === 'red' && "bg-red-50"
              )}
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(milestone.status)}
                <div>
                  <div className="font-medium text-gray-900">{milestone.name}</div>
                  <div className="text-sm text-gray-500">{formatDate(milestone.date)}</div>
                </div>
              </div>
              <div className={clsx(
                "text-sm font-medium",
                milestone.status === 'green' && "text-green-700",
                milestone.status === 'amber' && "text-amber-700",
                milestone.status === 'red' && "text-red-700"
              )}>
                {milestone.status === 'green' ? 'Completed' :
                 milestone.status === 'amber' ? 'In Progress' :
                 'At Risk'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Health */}
      <div className={clsx(
        "rounded-lg p-4 border",
        deviation > 10 ? "bg-red-50 border-red-200" :
        deviation > 5 ? "bg-amber-50 border-amber-200" :
        "bg-green-50 border-green-200"
      )}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Schedule Health</h3>
            <p className="text-sm text-gray-500 mt-1">
              {deviation > 10 ? "Project is significantly behind schedule" :
               deviation > 5 ? "Project is slightly behind schedule" :
               "Project is on track"}
            </p>
          </div>
          <div className={clsx(
            "text-2xl font-bold",
            deviation > 10 ? "text-red-700" :
            deviation > 5 ? "text-amber-700" :
            "text-green-700"
          )}>
            {deviation}%
          </div>
        </div>
      </div>
    </div>
  );
}