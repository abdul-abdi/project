import React from 'react';
import { Calendar, Users, AlertTriangle, MessageSquare, FileText, Share2 } from 'lucide-react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../common/Modal';
import { Project } from '../../types/project';

interface ProjectActionsProps {
  project: Project;
}

export function ProjectActions({ project }: ProjectActionsProps) {
  const timelineModal = useModal();
  const teamModal = useModal();
  const riskModal = useModal();
  const commentsModal = useModal();

  return (
    <>
      <div className="space-y-2">
        <button 
          onClick={timelineModal.open}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
        >
          <Calendar className="h-4 w-4 mr-2" />
          <span>View Timeline</span>
        </button>
        <button 
          onClick={teamModal.open}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
        >
          <Users className="h-4 w-4 mr-2" />
          <span>Team Members</span>
        </button>
        <button 
          onClick={riskModal.open}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          <span>Risk Register</span>
        </button>
        <button 
          onClick={commentsModal.open}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          <span>Comments</span>
        </button>
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
          <FileText className="h-4 w-4 mr-2" />
          <span>Documents</span>
        </button>
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
          <Share2 className="h-4 w-4 mr-2" />
          <span>Share</span>
        </button>
      </div>

      <Modal
        isOpen={timelineModal.isOpen}
        onClose={timelineModal.close}
        title="Project Timeline"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Timeline</h3>
              <p className="text-sm text-gray-500">Project duration: {project.schedule.start.toLocaleDateString()} - {project.schedule.end.toLocaleDateString()}</p>
            </div>
          </div>
          <div className="border-l-2 border-gray-200 pl-4 space-y-6">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white" />
              <div>
                <p className="text-sm font-medium text-gray-900">Project Start</p>
                <p className="text-xs text-gray-500">{project.schedule.start.toLocaleDateString()}</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 h-4 w-4 rounded-full bg-blue-500 border-2 border-white" />
              <div>
                <p className="text-sm font-medium text-gray-900">Current Progress</p>
                <p className="text-xs text-gray-500">{project.completion}% Complete</p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 h-4 w-4 rounded-full bg-gray-300 border-2 border-white" />
              <div>
                <p className="text-sm font-medium text-gray-900">Project End</p>
                <p className="text-xs text-gray-500">{project.schedule.end.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={teamModal.isOpen}
        onClose={teamModal.close}
        title="Team Members"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Project Team</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">Add Member</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">JD</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Project Manager</p>
                </div>
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-700">Remove</button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={riskModal.isOpen}
        onClose={riskModal.close}
        title="Risk Register"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Project Risks</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700">Add Risk</button>
          </div>
          <div className="space-y-3">
            <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-red-700">High Risk</span>
                <span className="text-xs text-red-600">Added 2 days ago</span>
              </div>
              <p className="text-sm text-red-600">Resource constraints may impact delivery timeline</p>
            </div>
            <div className="p-3 border border-amber-200 bg-amber-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-amber-700">Medium Risk</span>
                <span className="text-xs text-amber-600">Added 5 days ago</span>
              </div>
              <p className="text-sm text-amber-600">Potential budget overrun in Q3</p>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={commentsModal.isOpen}
        onClose={commentsModal.close}
        title="Comments"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Project Comments</h3>
          </div>
          <div className="space-y-4">
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JD</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">John Doe</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-gray-600">Latest progress update: We've completed the initial phase ahead of schedule.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <textarea
              placeholder="Add a comment..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="mt-2 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}