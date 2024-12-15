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
      allocated: 100000,
      spent: 65000,
      forecasted: 95000,
      currency: 'USD',
      lastUpdated: new Date('2024-03-15')
    },
    schedule: {
      start: new Date('2024-01-01'),
      end: new Date('2024-06-30'),
      deviation: 0,
      milestones: [
        {
          id: 'm1',
          name: 'Design Phase',
          date: new Date('2024-02-15'),
          completed: true,
          description: 'Complete all design mockups and get stakeholder approval'
        },
        {
          id: 'm2',
          name: 'Development Phase',
          date: new Date('2024-04-30'),
          completed: false,
          description: 'Implement all approved designs and features'
        }
      ]
    },
    lastUpdated: new Date('2024-03-15'),
    description: 'Complete overhaul of the company website with modern design and improved user experience.',
    priority: 'high',
    staffingStatus: 'amber',
    team: [
      {
        id: 't1',
        name: 'Sarah Johnson',
        role: 'Lead Designer',
        department: 'Design',
        allocation: 100
      },
      {
        id: 't2',
        name: 'Mike Brown',
        role: 'Senior Developer',
        department: 'Engineering',
        allocation: 80
      }
    ],
    risks: [
      {
        id: 'r1',
        description: 'Resource constraints may impact delivery timeline',
        impact: 'red',
        probability: 'amber',
        mitigationPlan: 'Requesting additional resources from other teams',
        owner: 'John Smith',
        dueDate: new Date('2024-03-30')
      }
    ],
    tags: ['website', 'design', 'frontend'],
    documents: [
      'Project Charter.pdf',
      'Design Specifications.doc',
      'Technical Architecture.pdf'
    ],
    dependencies: ['Authentication Service', 'Content Management System']
  },
  {
    id: '2',
    name: 'Mobile App Development',
    department: 'Engineering',
    owner: 'Lisa Chen',
    status: 'amber',
    completion: 45,
    budget: {
      allocated: 200000,
      spent: 100000,
      currency: 'USD',
      lastUpdated: new Date('2024-03-14')
    },
    schedule: {
      start: new Date('2024-02-01'),
      end: new Date('2024-08-31'),
      deviation: 5,
      milestones: [
        {
          id: 'm1',
          name: 'Requirements Gathering',
          date: new Date('2024-03-01'),
          completed: true
        },
        {
          id: 'm2',
          name: 'Beta Release',
          date: new Date('2024-06-30'),
          completed: false
        }
      ]
    },
    lastUpdated: new Date('2024-03-14'),
    priority: 'medium',
    staffingStatus: 'green',
    team: [
      {
        id: 't1',
        name: 'David Wilson',
        role: 'Mobile Developer',
        department: 'Engineering',
        allocation: 100
      }
    ],
    tags: ['mobile', 'ios', 'android'],
    documents: ['Technical Spec.pdf', 'API Documentation.md']
  }
];

export function getProjectById(id: string): Project | undefined {
  return mockProjects.find(project => project.id === id);
}