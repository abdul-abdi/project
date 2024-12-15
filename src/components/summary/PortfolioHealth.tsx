import React from 'react';
import { Gauge } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../common/Card';
import { RAGStatus } from '../../types/project';

interface HealthData {
  name: string;
  value: number;
  color: string;
}

interface PortfolioHealthProps {
  byStatus: Record<RAGStatus, number>;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm">
          <span className="font-medium">{payload[0].name}</span>: {payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

export function PortfolioHealth({ byStatus }: PortfolioHealthProps) {
  const healthData: HealthData[] = [
    { name: 'Critical', value: byStatus.red, color: '#EF4444' },
    { name: 'At Risk', value: byStatus.amber, color: '#F59E0B' },
    { name: 'On Track', value: byStatus.green, color: '#10B981' },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Portfolio Health</h3>
        <Gauge className="h-5 w-5 text-gray-500" />
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={healthData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {healthData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}