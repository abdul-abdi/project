import React from 'react';
import { Users, AlertTriangle, UserPlus, UserMinus } from 'lucide-react';
import clsx from 'clsx';

interface ProjectStaffingProps {
  current: number;
  required: number;
  risks: string[];
}

export function ProjectStaffing({ current, required, risks }: ProjectStaffingProps) {
  const staffingPercentage = (current / required) * 100;
  const staffingGap = required - current;
  const isUnderStaffed = current < required;

  const getStaffingStatus = () => {
    if (staffingPercentage >= 90) return 'optimal';
    if (staffingPercentage >= 70) return 'adequate';
    return 'critical';
  };

  const status = getStaffingStatus();

  return (
    <div className="space-y-6">
      {/* Staffing Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Required</div>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-900">{required}</div>
            <div className="text-sm text-gray-500">team members</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Current</div>
            {isUnderStaffed ? (
              <UserMinus className="h-5 w-5 text-amber-500" />
            ) : (
              <UserPlus className="h-5 w-5 text-green-500" />
            )}
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-900">{current}</div>
            <div className="text-sm text-gray-500">team members</div>
          </div>
        </div>

        <div className={clsx(
          "bg-white rounded-lg border p-4",
          status === 'optimal' ? "border-green-200" :
          status === 'adequate' ? "border-amber-200" :
          "border-red-200"
        )}>
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Gap</div>
            <AlertTriangle className={clsx(
              "h-5 w-5",
              status === 'optimal' ? "text-green-500" :
              status === 'adequate' ? "text-amber-500" :
              "text-red-500"
            )} />
          </div>
          <div className="mt-2">
            <div className={clsx(
              "text-2xl font-bold",
              status === 'optimal' ? "text-green-600" :
              status === 'adequate' ? "text-amber-600" :
              "text-red-600"
            )}>
              {Math.abs(staffingGap)}
            </div>
            <div className="text-sm text-gray-500">
              {staffingGap > 0 ? 'positions to fill' : 'over capacity'}
            </div>
          </div>
        </div>
      </div>

      {/* Staffing Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Team Capacity</h3>
        <div className="relative pt-1">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>{current} current</span>
            <span>{required} required</span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
            <div
              className={clsx(
                "transition-all duration-500 ease-out rounded",
                status === 'optimal' ? "bg-green-500" :
                status === 'adequate' ? "bg-amber-500" :
                "bg-red-500"
              )}
              style={{ width: `${Math.min(staffingPercentage, 100)}%` }}
            />
          </div>
          <div className="text-right mt-1">
            <span className="text-xs text-gray-500">
              {staffingPercentage.toFixed(1)}% capacity
            </span>
          </div>
        </div>
      </div>

      {/* Staffing Risks */}
      {risks.length > 0 && (
        <div className={clsx(
          "rounded-lg border p-4",
          status === 'optimal' ? "bg-green-50 border-green-200" :
          status === 'adequate' ? "bg-amber-50 border-amber-200" :
          "bg-red-50 border-red-200"
        )}>
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className={clsx(
              "h-5 w-5",
              status === 'optimal' ? "text-green-500" :
              status === 'adequate' ? "text-amber-500" :
              "text-red-500"
            )} />
            <h3 className="text-sm font-medium text-gray-900">Staffing Risks</h3>
          </div>
          <ul className="space-y-2">
            {risks.map((risk, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-gray-400 mt-1">•</span>
                <span className="text-sm text-gray-600">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Staffing Health */}
      <div className={clsx(
        "rounded-lg p-4 border",
        status === 'optimal' ? "bg-green-50 border-green-200" :
        status === 'adequate' ? "bg-amber-50 border-amber-200" :
        "bg-red-50 border-red-200"
      )}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Staffing Health</h3>
            <p className="text-sm text-gray-500 mt-1">
              {status === 'optimal' ? "Team is well staffed" :
               status === 'adequate' ? "Team needs attention" :
               "Critical staffing issues"}
            </p>
          </div>
          <div className={clsx(
            "text-2xl font-bold",
            status === 'optimal' ? "text-green-700" :
            status === 'adequate' ? "text-amber-700" :
            "text-red-700"
          )}>
            {staffingPercentage.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
} 