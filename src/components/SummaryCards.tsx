import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { PortfolioHealth } from './summary/PortfolioHealth';
import { BudgetStatus } from './summary/BudgetStatus';
import { ProjectStatus } from './summary/ProjectStatus';
import { TotalProjects } from './summary/TotalProjects';

export function SummaryCards() {
  const { stats } = useProjects();
  
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <PortfolioHealth byStatus={stats.byStatus} />
      <BudgetStatus budgetUtilization={stats.budgetUtilization} />
      <ProjectStatus byStatus={stats.byStatus} />
      <TotalProjects total={stats.total} />
    </div>
  );
}