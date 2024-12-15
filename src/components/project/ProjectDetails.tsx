import React from 'react';
import { Project } from '../../types/project';
import { Badge } from '../common/Badge';
import { RAGSection } from './RAGSection';
import { ProjectActions } from './ProjectActions';
import { formatDate } from '../../utils/formatters';

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
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
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Overview</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
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
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">RAG Status Details</h3>
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
              <RAGSection 
                title="Schedule/Roadmap" 
                status={project.schedule.deviation > 10 ? 'red' : project.schedule.deviation > 5 ? 'amber' : 'green'}
                description={`Timeline: ${formatDate(project.schedule.start)} - ${formatDate(project.schedule.end)}`}
                details={
                  <div className="mt-2 space-y-2">
                    {scheduleDetails.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{milestone.name}</span>
                        <Badge status={milestone.status} size="sm" />
                      </div>
                    ))}
                  </div>
                }
              />
              <RAGSection 
                title="Budget" 
                status={project.budget.spent / project.budget.allocated > 0.9 ? 'red' : 
                       project.budget.spent / project.budget.allocated > 0.7 ? 'amber' : 'green'}
                description={`Total: $${project.budget.spent}k / $${project.budget.allocated}k`}
                details={
                  <div className="mt-2 space-y-2">
                    {budgetDetails.breakdown.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>{item.category}</span>
                        <span>${item.spent}k / ${item.allocated}k</span>
                      </div>
                    ))}
                  </div>
                }
              />
              <RAGSection 
                title="Staffing" 
                status={project.staffingStatus || 'amber'}
                description={`Team Size: ${staffingDetails.current}/${staffingDetails.required} members`}
                details={
                  <ul className="mt-2 space-y-1">
                    {staffingDetails.risks.map((risk, index) => (
                      <li key={index} className="text-sm">• {risk}</li>
                    ))}
                  </ul>
                }
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <ProjectActions project={project} />
        </div>
      </div>
    </div>
  );
}