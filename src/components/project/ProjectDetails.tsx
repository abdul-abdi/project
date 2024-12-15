import React, { useState } from 'react';
import { Project } from '../../types/project';
import { Tabs, TabPanel } from '../common/Tabs';
import { RAGSection } from './RAGSection';
import { ProjectProgress } from './ProjectProgress';
import { ProjectSchedule } from './ProjectSchedule';
import { ProjectBudget } from './ProjectBudget';
import { ProjectStaffing } from './ProjectStaffing';
import { 
  BarChart3, 
  Calendar, 
  Users, 
  DollarSign,
  MessageSquare,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar /> },
    { id: 'budget', label: 'Budget', icon: <DollarSign /> },
    { id: 'team', label: 'Team', icon: <Users /> },
  ];

  const stakeholderDetails = project.stakeholderDetails || {
    satisfaction: 85,
    keyFeedback: ['Positive engagement from key stakeholders', 'Regular updates appreciated']
  };

  const scheduleDetails = project.scheduleDetails || {
    milestones: [
      { name: 'Planning', date: new Date(), status: 'green' },
      { name: 'Development', date: new Date(), status: project.schedule.deviation > 5 ? 'amber' : 'green' }
    ]
  };

  const budgetDetails = project.budgetDetails || {
    breakdown: [
      { category: 'Development', allocated: project.budget.allocated * 0.6, spent: project.budget.spent * 0.6 },
      { category: 'Testing', allocated: project.budget.allocated * 0.4, spent: project.budget.spent * 0.4 }
    ]
  };

  const staffingDetails = project.staffingDetails || {
    required: 10,
    current: 8,
    risks: ['Need additional senior developers', 'High demand period approaching']
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-blue-600"><Clock className="h-5 w-5" /></span>
            <span className="text-sm font-medium text-blue-600">{project.completion}%</span>
          </div>
          <div className="mt-2">
            <div className="text-sm text-gray-500">Progress</div>
            <ProjectProgress value={project.completion} />
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-green-600"><CheckCircle2 className="h-5 w-5" /></span>
            <span className="text-sm font-medium text-green-600">
              {scheduleDetails.milestones.filter(m => m.status === 'green').length}
            </span>
          </div>
          <div className="mt-2">
            <div className="text-sm text-gray-500">Completed Milestones</div>
          </div>
        </div>
        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-amber-600"><AlertCircle className="h-5 w-5" /></span>
            <span className="text-sm font-medium text-amber-600">{project.schedule.deviation}%</span>
          </div>
          <div className="mt-2">
            <div className="text-sm text-gray-500">Schedule Deviation</div>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-purple-600"><MessageSquare className="h-5 w-5" /></span>
            <span className="text-sm font-medium text-purple-600">{stakeholderDetails.satisfaction}%</span>
          </div>
          <div className="mt-2">
            <div className="text-sm text-gray-500">Stakeholder Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs 
        tabs={tabs} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
        variant="pills" 
      />

      {/* Tab Panels */}
      <TabPanel id="overview" active={activeTab === 'overview'}>
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-4">Project Information</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-sm text-gray-500">Department</div>
                <div className="font-medium text-gray-900">{project.department}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Owner</div>
                <div className="font-medium text-gray-900">{project.owner}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Last Updated</div>
                <div className="font-medium text-gray-900">{formatDate(project.lastUpdated)}</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <RAGSection 
              title="Stakeholder Satisfaction" 
              status={project.status}
              description={`Satisfaction Level: ${stakeholderDetails.satisfaction}%`}
              details={
                <ul className="mt-2 space-y-1">
                  {stakeholderDetails.keyFeedback.map((feedback, index) => (
                    <li key={index} className="text-sm">• {feedback}</li>
                  ))}
                </ul>
              }
            />
          </div>
        </div>
      </TabPanel>

      <TabPanel id="schedule" active={activeTab === 'schedule'}>
        <ProjectSchedule 
          startDate={project.schedule.start}
          endDate={project.schedule.end}
          milestones={scheduleDetails.milestones}
          deviation={project.schedule.deviation}
        />
      </TabPanel>

      <TabPanel id="budget" active={activeTab === 'budget'}>
        <ProjectBudget 
          allocated={project.budget.allocated}
          spent={project.budget.spent}
          breakdown={budgetDetails.breakdown}
        />
      </TabPanel>

      <TabPanel id="team" active={activeTab === 'team'}>
        <ProjectStaffing 
          current={staffingDetails.current}
          required={staffingDetails.required}
          risks={staffingDetails.risks}
        />
      </TabPanel>
    </div>
  );
}