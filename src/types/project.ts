export type RAGStatus = 'red' | 'amber' | 'green';

export interface Budget {
  allocated: number;
  spent: number;
  currency?: string;
  lastUpdated?: Date;
  forecasted?: number;
}

export interface Schedule {
  start: Date;
  end: Date;
  deviation: number;
  milestones?: Milestone[];
  actualStart?: Date;
  actualEnd?: Date;
}

export interface Milestone {
  id: string;
  name: string;
  date: Date;
  completed: boolean;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  allocation: number;
}

export interface Risk {
  id: string;
  description: string;
  impact: RAGStatus;
  probability: RAGStatus;
  mitigationPlan?: string;
  owner?: string;
  dueDate?: Date;
}

export interface Project {
  id: string;
  name: string;
  department: string;
  owner: string;
  status: RAGStatus;
  completion: number;
  budget: Budget;
  schedule: Schedule;
  lastUpdated: Date;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  staffingStatus?: RAGStatus;
  team?: TeamMember[];
  risks?: Risk[];
  tags?: string[];
  documents?: string[];
  dependencies?: string[];
}