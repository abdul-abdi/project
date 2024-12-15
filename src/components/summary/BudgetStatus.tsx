import React from 'react';
import { DollarSign } from 'lucide-react';
import clsx from 'clsx';
import { Card } from '../common/Card';
import { formatPercentage } from '../../utils/formatters';

interface BudgetStatusProps {
  budgetUtilization: number;
}

export function BudgetStatus({ budgetUtilization }: BudgetStatusProps) {
  const isOverBudget = budgetUtilization > 100;

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Budget Status</h3>
        <DollarSign className="h-5 w-5 text-gray-500" />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Overall Spend</span>
            <span>{formatPercentage(budgetUtilization)}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-300',
                isOverBudget ? 'bg-red-500' : 'bg-blue-500'
              )}
              style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}