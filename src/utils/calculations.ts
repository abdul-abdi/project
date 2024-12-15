import { Project } from '../types/project';

export function calculateBudgetPercentage(spent: number, allocated: number): number {
  return (spent / allocated) * 100;
}

export function calculateScheduleDeviation(project: Project): {
  isDelayed: boolean;
  deviationText: string;
} {
  const { deviation } = project.schedule;
  const isDelayed = deviation > 0;
  const deviationText = `${Math.abs(deviation)} days ${isDelayed ? 'behind' : 'ahead'}`;
  
  return { isDelayed, deviationText };
}