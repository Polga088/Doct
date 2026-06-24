export interface FinancialMetrics {
  totalBudget: number;
  spent: number;
  currency: string;
}

export interface Project {
  id: string;
  name: string;
  status: string;
  totalBudget: number;
  spent: number;
  currency: string;
  deadline?: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  status: string;
  syncProgress: number; // 0 to 100
  projectId: string;
  project: Project;
  createdAt: string;
  updatedAt: string;
}
