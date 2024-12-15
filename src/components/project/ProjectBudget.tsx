import React from 'react';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';

interface BudgetBreakdown {
  category: string;
  allocated: number;
  spent: number;
}

interface ProjectBudgetProps {
  allocated: number;
  spent: number;
  breakdown: BudgetBreakdown[];
}

export function ProjectBudget({ allocated, spent, breakdown }: ProjectBudgetProps) {
  const spentPercentage = (spent / allocated) * 100;
  const remainingBudget = allocated - spent;
  const isOverBudget = spent > allocated;

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Total Budget</div>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-900">${allocated}k</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Spent</div>
            <TrendingUp className={clsx(
              "h-5 w-5",
              isOverBudget ? "text-red-500" : "text-blue-500"
            )} />
          </div>
          <div className="mt-2">
            <div className={clsx(
              "text-2xl font-bold",
              isOverBudget ? "text-red-600" : "text-blue-600"
            )}>
              ${spent}k
            </div>
            <div className="text-sm text-gray-500">
              {spentPercentage.toFixed(1)}% of budget
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-500">Remaining</div>
            <TrendingDown className={clsx(
              "h-5 w-5",
              remainingBudget < 0 ? "text-red-500" : "text-green-500"
            )} />
          </div>
          <div className="mt-2">
            <div className={clsx(
              "text-2xl font-bold",
              remainingBudget < 0 ? "text-red-600" : "text-green-600"
            )}>
              ${Math.abs(remainingBudget)}k
            </div>
            <div className="text-sm text-gray-500">
              {remainingBudget < 0 ? 'Over budget' : 'Available'}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Budget Utilization</h3>
        <div className="relative pt-1">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>${spent}k spent</span>
            <span>${allocated}k total</span>
          </div>
          <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-100">
            <div
              className={clsx(
                "transition-all duration-500 ease-out rounded",
                spentPercentage > 90 ? "bg-red-500" :
                spentPercentage > 70 ? "bg-amber-500" :
                "bg-green-500"
              )}
              style={{ width: `${Math.min(spentPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Budget Breakdown</h3>
        <div className="space-y-4">
          {breakdown.map((item, index) => {
            const itemSpentPercentage = (item.spent / item.allocated) * 100;
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-900">{item.category}</span>
                  <span className="text-gray-500">
                    ${item.spent}k / ${item.allocated}k
                  </span>
                </div>
                <div className="overflow-hidden h-1.5 text-xs flex rounded bg-gray-100">
                  <div
                    className={clsx(
                      "transition-all duration-500 ease-out rounded",
                      itemSpentPercentage > 90 ? "bg-red-500" :
                      itemSpentPercentage > 70 ? "bg-amber-500" :
                      "bg-green-500"
                    )}
                    style={{ width: `${Math.min(itemSpentPercentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Budget Health */}
      <div className={clsx(
        "rounded-lg p-4 border",
        spentPercentage > 90 ? "bg-red-50 border-red-200" :
        spentPercentage > 70 ? "bg-amber-50 border-amber-200" :
        "bg-green-50 border-green-200"
      )}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Budget Health</h3>
            <p className="text-sm text-gray-500 mt-1">
              {spentPercentage > 90 ? "Budget critically low" :
               spentPercentage > 70 ? "Budget usage high" :
               "Budget on track"}
            </p>
          </div>
          <div className={clsx(
            "text-2xl font-bold",
            spentPercentage > 90 ? "text-red-700" :
            spentPercentage > 70 ? "text-amber-700" :
            "text-green-700"
          )}>
            {spentPercentage.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}