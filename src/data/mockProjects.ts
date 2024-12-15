import { Project } from '../types/project';

const departments = [
  'Engineering',
  'Marketing',
  'Sales',
  'Product',
  'Design',
  'Operations'
];

const projectNames = [
  'Website Redesign',
  'Mobile App Development',
  'Cloud Migration',
  'Data Analytics Platform',
  'Customer Portal',
  'Security Audit',
  'Infrastructure Upgrade',
  'Brand Refresh',
  'Sales Dashboard',
  'API Integration'
];

function generateMockProject(index: number): Project {
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 60));
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30 + Math.floor(Math.random() * 60));

  const allocated = 50000 + Math.floor(Math.random() * 200000);
  const spent = allocated * (0.4 + Math.random() * 0.8);
  const completion = Math.floor(Math.random() * 100);
  
  const status: Project['status'] = 
    completion < 30 ? 'red' :
    completion < 70 ? 'amber' :
    'green';

  return {
    id: `proj-${index + 1}`,
    name: `${projectNames[index % projectNames.length]} ${Math.floor(index / projectNames.length) + 1}`,
    department: departments[index % departments.length],
    owner: `Project Manager ${index + 1}`,
    status,
    completion,
    budget: {
      allocated,
      spent
    },
    schedule: {
      start: startDate,
      end: endDate,
      deviation: Math.floor(Math.random() * 20)
    },
    lastUpdated: new Date(now.getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
    staffingStatus: Math.random() > 0.7 ? 'red' : Math.random() > 0.4 ? 'amber' : 'green',
    stakeholderDetails: {
      satisfaction: Math.floor(Math.random() * 100),
      keyFeedback: [
        'Good progress',
        'Communication needs improvement',
        'Quality meets expectations'
      ]
    },
    scheduleDetails: {
      milestones: [
        {
          name: 'Planning',
          date: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000),
          status: 'green'
        },
        {
          name: 'Development',
          date: new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000),
          status: status
        },
        {
          name: 'Testing',
          date: new Date(endDate.getTime() - 14 * 24 * 60 * 60 * 1000),
          status: 'amber'
        }
      ]
    },
    budgetDetails: {
      breakdown: [
        {
          category: 'Personnel',
          allocated: allocated * 0.6,
          spent: spent * 0.6
        },
        {
          category: 'Tools & Software',
          allocated: allocated * 0.2,
          spent: spent * 0.2
        },
        {
          category: 'Other',
          allocated: allocated * 0.2,
          spent: spent * 0.2
        }
      ]
    },
    staffingDetails: {
      required: 5 + Math.floor(Math.random() * 10),
      current: 3 + Math.floor(Math.random() * 8),
      risks: [
        'Key skills gap',
        'High turnover risk',
        'Training needed'
      ]
    }
  };
}

export const mockProjects: Project[] = Array.from({ length: 30 }, (_, i) => generateMockProject(i));