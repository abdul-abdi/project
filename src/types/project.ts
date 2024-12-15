export type RAGStatus = 'red' | 'amber' | 'green';

export interface Project {
  id: string;
  name: string;
  department: string;
  owner: string;
  status: RAGStatus;
  completion: number;
  budget: {
    allocated: number;
    spent: number;
  };
  schedule: {
    start: Date;
    end: Date;
    deviation: number;
  };
  lastUpdated: Date;
  staffingStatus?: RAGStatus;
  stakeholderDetails?: {
    satisfaction: number;
    keyFeedback: string[];
  };
  scheduleDetails?: {
    milestones: Array<{
      name: string;
      date: Date;
      status: RAGStatus;
    }>;
  };
  budgetDetails?: {
    breakdown: Array<{
      category: string;
      allocated: number;
      spent: number;
    }>;
  };
  staffingDetails?: {
    required: number;
    current: number;
    risks: string[];
  };
}