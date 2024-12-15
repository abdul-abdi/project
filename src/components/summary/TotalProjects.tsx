import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card } from '../common/Card';

interface TotalProjectsProps {
  total: number;
}

export function TotalProjects({ total }: TotalProjectsProps) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Total Projects</h3>
        <TrendingUp className="h-5 w-5 text-gray-500" />
      </div>
      <div className="flex items-center justify-center h-24">
        <span className="text-4xl font-bold text-gray-900">{total}</span>
      </div>
    </Card>
  );
}