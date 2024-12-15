import React from 'react';
import { Gauge, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../common/Card';
import { RAGStatus } from '../../types/project';
import clsx from 'clsx';

interface HealthData {
  name: string;
  value: number;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  change?: number;
}

interface PortfolioHealthProps {
  byStatus: Record<RAGStatus, number>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as HealthData;
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            Projects: <span className="font-medium">{data.value}</span>
          </p>
          {data.trend && (
            <div className="flex items-center space-x-1 text-xs">
              {data.trend === 'up' ? (
                <TrendingUp className="h-3 w-3 text-red-500" />
              ) : data.trend === 'down' ? (
                <TrendingDown className="h-3 w-3 text-green-500" />
              ) : null}
              <span className={clsx(
                "font-medium",
                data.trend === 'up' ? "text-red-500" :
                data.trend === 'down' ? "text-green-500" :
                "text-gray-500"
              )}>
                {data.change}% from last month
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center space-x-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export function PortfolioHealth({ byStatus }: PortfolioHealthProps) {
  const total = Object.values(byStatus).reduce((sum, value) => sum + value, 0);
  
  const healthData: HealthData[] = [
    { 
      name: 'Critical', 
      value: byStatus.red, 
      color: '#EF4444',
      trend: 'down',
      change: 15
    },
    { 
      name: 'At Risk', 
      value: byStatus.amber, 
      color: '#F59E0B',
      trend: 'up',
      change: 8
    },
    { 
      name: 'On Track', 
      value: byStatus.green, 
      color: '#10B981',
      trend: 'stable',
      change: 0
    },
  ];

  const getHealthScore = () => {
    if (total === 0) return 100;
    return Math.round(((byStatus.green * 100) + (byStatus.amber * 50)) / total);
  };

  const healthScore = getHealthScore();

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Portfolio Health</h3>
          <p className="text-sm text-gray-500 mt-1">Overall project status distribution</p>
        </div>
        <div className={clsx(
          "px-3 py-1 rounded-full text-sm font-medium",
          healthScore >= 80 ? "bg-green-100 text-green-800" :
          healthScore >= 60 ? "bg-amber-100 text-amber-800" :
          "bg-red-100 text-red-800"
        )}>
          {healthScore}% Healthy
        </div>
      </div>

      <div className="relative h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={healthData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              startAngle={90}
              endAngle={450}
            >
              {healthData.map((entry, index) => (
                <Cell 
                  key={index} 
                  fill={entry.color}
                  className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <Gauge className="h-6 w-6 text-gray-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-gray-900">{total}</div>
          <div className="text-xs text-gray-500">Total Projects</div>
        </div>
      </div>

      {/* Trends */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
        {healthData.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl font-bold" style={{ color: item.color }}>
              {item.value}
            </div>
            <div className="text-sm text-gray-500">{item.name}</div>
            {item.trend && (
              <div className="flex items-center justify-center mt-1 text-xs">
                {item.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-red-500 mr-1" />
                ) : item.trend === 'down' ? (
                  <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                ) : null}
                <span className={clsx(
                  "font-medium",
                  item.trend === 'up' ? "text-red-500" :
                  item.trend === 'down' ? "text-green-500" :
                  "text-gray-500"
                )}>
                  {item.change}%
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}