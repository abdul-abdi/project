import { Project } from '../types/project';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    department: 'Engineering',
    owner: 'John Smith',
    status: 'green',
    completion: 75,
    budget: {
      allocated: 100,
      spent: 65
    },
    schedule: {
      start: new Date('2024-01-01'),
      end: new Date('2024-06-30'),
      deviation: 0
    },
    lastUpdated: new Date('2024-03-15')
  },
  {
    id: '2',
    name: 'Mobile App Development',
    department: 'Engineering',
    owner: 'Sarah Johnson',
    status: 'amber',
    completion: 45,
    budget: {
      allocated: 200,
      spent: 100
    },
    schedule: {
      start: new Date('2024-02-01'),
      end: new Date('2024-08-31'),
      deviation: 5
    },
    lastUpdated: new Date('2024-03-14')
  },
  {
    id: '3',
    name: 'Data Migration',
    department: 'Engineering',
    owner: 'Mike Brown',
    status: 'red',
    completion: 30,
    budget: {
      allocated: 150,
      spent: 100
    },
    schedule: {
      start: new Date('2024-01-15'),
      end: new Date('2024-05-15'),
      deviation: 15
    },
    lastUpdated: new Date('2024-03-13')
  },
  {
    id: '4',
    name: 'Email Campaign',
    department: 'Marketing',
    owner: 'Lisa Chen',
    status: 'green',
    completion: 90,
    budget: {
      allocated: 50,
      spent: 45
    },
    schedule: {
      start: new Date('2024-02-15'),
      end: new Date('2024-04-15'),
      deviation: -2
    },
    lastUpdated: new Date('2024-03-15')
  },
  {
    id: '5',
    name: 'Sales Analytics Platform',
    department: 'Sales',
    owner: 'David Wilson',
    status: 'red',
    completion: 15,
    budget: {
      allocated: 300,
      spent: 100
    },
    schedule: {
      start: new Date('2024-03-01'),
      end: new Date('2024-09-30'),
      deviation: 10
    },
    lastUpdated: new Date('2024-03-14')
  }
];