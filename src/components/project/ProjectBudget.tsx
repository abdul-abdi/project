import React from 'react';
import { Budget } from '../../types/project';
import { formatCurrency } from '../../utils/formatters';
import clsx from 'clsx';

interface ProjectBudgetProps {
  budget: Budget;
}

export function ProjectBudget({ budget }: ProjectBudgetProps) {
  const percentage = (budget.spent / budget.allocated) * 100;
  const status = percentage > 90 ? 'red' :
                percentage > 70 ? 'amber' :
                'green';

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">Budget</span>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-900">
            {formatCurrency(budget.spent)} / {formatCurrency(budget.allocated)}
          </span>
          {budget.forecasted && budget.forecasted > budget.allocated && (
            <p className="text-xs text-red-600">
              Forecast: {formatCurrency(budget.forecasted)}
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