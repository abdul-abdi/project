import React from 'react';
import { DollarSign } from 'lucide-react';
import clsx from 'clsx';
import { Project } from '../../types/project';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { calculateBudgetPercentage } from '../../utils/calculations';

interface ProjectBudgetProps {
  project: Project;
}

export function ProjectBudget({ project }: ProjectBudgetProps) {
  const { spent, allocated } = project.budget;
  const percentage = calculateBudgetPercentage(spent, allocated);
  const isOverBudget = percentage > 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>Budget</span>
        </div>
        <span className={clsx(
          'font-medium',
          isOverBudget ? 'text-red-600' : 'text-gray-900'
        )}>
          {formatCurrency(spent)}/{formatCurrency(allocated)}
        </span>
      </div>
      
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={clsx(
            'h-full rounded-full transition-all duration-300',
            isOverBudget ? 'bg-red-500' : 'bg-green-500'
          )}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      
      <div className="text-xs text-right">
        <span className={clsx(
          'font-medium',
          isOverBudget ? 'text-red-600' : 'text-gray-600'
        )}>
          {formatPercentage(percentage)} utilized
        </span>
      </div>
    </div>
  );
}