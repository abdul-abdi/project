import React, { useState } from 'react';
import { Project, Risk, TeamMember } from '../../types/project';
import { Tabs, Tab } from '../common/Tabs';
import { ProjectProgress } from './ProjectProgress';
import { ProjectBudget } from './ProjectBudget';
import { ProjectSchedule } from './ProjectSchedule';
import { RAGSection } from './RAGSection';
import { formatDate, formatRelativeTime, formatCurrency } from '../../utils/formatters';
import { Calendar, Users, FileText, AlertTriangle, Link2, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTeamMember = (member: TeamMember) => (
    <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          {member.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-gray-900">{member.name}</p>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
      </div>
      <span className="text-sm text-gray-500">{member.allocation}%</span>
    </div>
  );

  const renderRisk = (risk: Risk) => (
    <div key={risk.id} className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <p className="font-medium text-gray-900">{risk.description}</p>
          {risk.owner && (
            <p className="text-sm text-gray-500">Owner: {risk.owner}</p>
          )}
        </div>
        <div className="flex space-x-2">
          <span className={clsx(
            "px-2 py-1 text-xs font-medium rounded-full",
            risk.impact === 'red' ? 'bg-red-100 text-red-800' :
            risk.impact === 'amber' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          )}>
            Impact: {risk.impact.toUpperCase()}
          </span>
          <span className={clsx(
            "px-2 py-1 text-xs font-medium rounded-full",
            risk.probability === 'red' ? 'bg-red-100 text-red-800' :
            risk.probability === 'amber' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          )}>
            Probability: {risk.probability.toUpperCase()}
          </span>
        </div>
      </div>
      {risk.mitigationPlan && (
        <p className="text-sm text-gray-600 mt-2">
          <strong>Mitigation:</strong> {risk.mitigationPlan}
        </p>
      )}
      {risk.dueDate && (
        <p className="text-sm text-gray-500 mt-1">
          Due: {formatDate(risk.dueDate)}
        </p>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
            {project.priority && (
              <span className={clsx(
                "px-2 py-1 text-xs font-medium rounded-full",
                project.priority === 'high' ? 'bg-red-100 text-red-800' :
                project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              )}>
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
              </span>
            )}
          </div>
          <p className="text-gray-500">
            Last updated {formatRelativeTime(project.lastUpdated)}
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Edit Project
        </button>
      </div>

      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tab value="overview" label="Overview" />
        <Tab value="timeline" label="Timeline" />
        <Tab value="team" label="Team" />
        <Tab value="risks" label="Risks" />
        <Tab value="documents" label="Documents" />
      </Tabs>

      <div className="space-y-6">
        {activeTab === 'overview' && (
          <>
            {project.description && (
              <div className="prose max-w-none">
                <p>{project.description}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <RAGSection title="Status Overview">
                <ProjectProgress value={project.completion} />
                <div className="mt-4 space-y-4">
                  <ProjectBudget budget={project.budget} />
                  <ProjectSchedule schedule={project.schedule} />
                </div>
              </RAGSection>

              <RAGSection title="Key Metrics">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">Timeline</span>
                    </div>
                    <span className="font-medium">
                      {formatDate(project.schedule.start)} - {formatDate(project.schedule.end)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Users className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-gray-600">Team Size</span>
                    </div>
                    <span className="font-medium">{project.team?.length || 0} members</span>
                  </div>
                  {project.dependencies && project.dependencies.length > 0 && (
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Link2 className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-600">Dependencies</span>
                      </div>
                      <span className="font-medium">{project.dependencies.length}</span>
                    </div>
                  )}
                </div>
              </RAGSection>
            </div>
          </>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            {project.schedule.milestones?.map((milestone) => (
              <div key={milestone.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                <div className={clsx(
                  "w-4 h-4 rounded-full mr-4",
                  milestone.completed ? "bg-green-500" : "bg-gray-300"
                )} />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{milestone.name}</h4>
                  {milestone.description && (
                    <p className="text-sm text-gray-500">{milestone.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatDate(milestone.date)}</p>
                  <p className="text-sm text-gray-500">{formatRelativeTime(milestone.date)}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="space-y-4">
            {project.team?.map(renderTeamMember)}
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            {project.risks?.map(renderRisk)}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            {project.documents?.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-gray-900">{doc}</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}