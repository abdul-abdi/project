import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, Target } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import { Card } from '../common/Card';
import clsx from 'clsx';

interface TotalProjectsProps {
  total: number;
  trend?: {
    data: number[];
    change: number;
    target?: number;
  };
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-medium text-gray-900">
          Week {payload[0].payload.week}
        </p>
        <p className="text-sm text-gray-600">
          Projects: <span className="font-medium">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export function TotalProjects({ 
  total, 
  trend = {
    data: [42, 45, 48, 46, 49, total],
    change: 8,
    target: 55
  }
}: TotalProjectsProps) {
  const chartData = trend.data.map((value, index) => ({
    week: index + 1,
    value
  }));

  const isIncreasing = trend.change > 0;
  const changePercentage = Math.abs(trend.change);
  const progressToTarget = trend.target ? Math.round((total / trend.target) * 100) : null;

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Total Projects</h3>
          <p className="text-sm text-gray-500 mt-1">Active projects in portfolio</p>
        </div>
        <BarChart2 className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-6">
        {/* Total with Trend */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-gray-900">{total}</div>
            <div className="flex items-center mt-1 space-x-2">
              {isIncreasing ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={clsx(
                "text-sm font-medium",
                isIncreasing ? "text-green-600" : "text-red-600"
              )}>
                {isIncreasing ? '+' : '-'}{changePercentage}% from last month
              </span>
            </div>
          </div>

          {trend.target && (
            <div className="text-right">
              <div className="text-sm text-gray-500">Target</div>
              <div className="text-lg font-semibold text-gray-900">{trend.target}</div>
            </div>
          )}
        </div>

        {/* Progress to Target */}
        {progressToTarget !== null && (
          <div>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>Progress to target</span>
              </div>
              <span className="font-medium">{progressToTarget}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={clsx(
                  'h-full rounded-full transition-all duration-300',
                  progressToTarget >= 100 ? 'bg-green-500' :
                  progressToTarget >= 75 ? 'bg-blue-500' :
                  'bg-amber-500'
                )}
                style={{ width: `${Math.min(progressToTarget, 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Trend Chart */}
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="week" 
                tick={{ fontSize: 12, fill: '#6B7280' }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="text-center">
            <div className="text-sm text-gray-500">Avg. Projects</div>
            <div className="text-lg font-semibold text-gray-900">
              {Math.round(trend.data.reduce((a, b) => a + b, 0) / trend.data.length)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-500">Growth Rate</div>
            <div className={clsx(
              "text-lg font-semibold",
              isIncreasing ? "text-green-600" : "text-red-600"
            )}>
              {isIncreasing ? '+' : '-'}{changePercentage}%
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}