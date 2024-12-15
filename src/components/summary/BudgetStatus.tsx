import React from 'react';
import { DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import clsx from 'clsx';
import { Card } from '../common/Card';
import { formatPercentage } from '../../utils/formatters';

interface BudgetStatusProps {
  budgetUtilization: number;
  monthlyTrend?: number[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900">
          Month {payload[0].payload.month}
        </p>
        <p className="text-sm text-gray-600">
          Utilization: <span className="font-medium">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export function BudgetStatus({ budgetUtilization, monthlyTrend = [] }: BudgetStatusProps) {
  const isOverBudget = budgetUtilization > 100;
  const isNearLimit = budgetUtilization > 85;

  // If no monthly trend provided, generate sample data
  const trendData = monthlyTrend.length > 0 ? monthlyTrend : [65, 70, 75, 72, 78, budgetUtilization];
  
  const chartData = trendData.map((value, index) => ({
    month: index + 1,
    value
  }));

  const getStatusColor = (value: number) => {
    if (value > 100) return 'red';
    if (value > 85) return 'amber';
    return 'blue';
  };

  const currentTrend = trendData[trendData.length - 1] - trendData[trendData.length - 2];
  const projectedValue = budgetUtilization + (currentTrend * 2);

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Budget Status</h3>
          <p className="text-sm text-gray-500 mt-1">Overall budget utilization</p>
        </div>
        <div className={clsx(
          "px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1",
          isOverBudget ? "bg-red-100 text-red-800" :
          isNearLimit ? "bg-amber-100 text-amber-800" :
          "bg-blue-100 text-blue-800"
        )}>
          <DollarSign className="h-4 w-4" />
          <span>{formatPercentage(budgetUtilization)}</span>
        </div>
      </div>

      {/* Budget Progress */}
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Current Utilization</span>
            <span className={clsx(
              "font-medium",
              isOverBudget ? "text-red-600" :
              isNearLimit ? "text-amber-600" :
              "text-blue-600"
            )}>
              {formatPercentage(budgetUtilization)}
            </span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-300',
                isOverBudget ? 'bg-red-500' :
                isNearLimit ? 'bg-amber-500' :
                'bg-blue-500'
              )}
              style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
            />
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="h-32 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.value > 100 ? '#EF4444' :
                      entry.value > 85 ? '#F59E0B' :
                      '#3B82F6'
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <TrendingUp className={clsx(
                  "h-4 w-4",
                  currentTrend > 0 ? "text-red-500" : "text-green-500"
                )} />
                <span className="text-sm font-medium text-gray-900">
                  {Math.abs(currentTrend)}% {currentTrend > 0 ? 'increase' : 'decrease'} from last month
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Projected next month: {formatPercentage(projectedValue)}
              </p>
            </div>
            {(isOverBudget || isNearLimit) && (
              <div className="flex items-center space-x-1 text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {isOverBudget ? 'Over budget' : 'Near limit'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}