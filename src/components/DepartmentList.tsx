import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import clsx from 'clsx';

export function DepartmentList() {
  const { projectsByDepartment, filters, setDepartmentFilter } = useProjects();

  const departments = Object.entries(projectsByDepartment).map(([name, projects]) => ({
    name,
    count: projects.length,
    status: projects.some(p => p.status === 'red') 
      ? 'red' 
      : projects.some(p => p.status === 'amber') 
        ? 'amber' 
        : 'green'
  }));

  return (
    <ul className="space-y-1">
      {departments.map((dept) => (
        <li key={dept.name}>
          <button
            onClick={() => setDepartmentFilter(filters.department === dept.name ? undefined : dept.name)}
            className={clsx(
              'w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors duration-200',
              filters.department === dept.name
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <div className="flex items-center">
              <ChevronRight className={clsx(
                'h-4 w-4 mr-1 transition-transform duration-200',
                filters.department === dept.name ? 'rotate-90' : ''
              )} />
              <span>{dept.name}</span>
              <span className="ml-2 text-xs text-gray-500">({dept.count})</span>
            </div>
            <div className={clsx(
              'h-2 w-2 rounded-full',
              dept.status === 'red' ? 'bg-red-500' :
              dept.status === 'amber' ? 'bg-amber-500' :
              'bg-green-500'
            )} />
          </button>
          {filters.department === dept.name && (
            <div className="ml-6 mt-1 space-y-1">
              {projectsByDepartment[dept.name].map(project => (
                <button
                  key={project.id}
                  onClick={() => {
                    // Project selection is handled by the ProjectCard component
                  }}
                  className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
                >
                  {project.name}
                </button>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}