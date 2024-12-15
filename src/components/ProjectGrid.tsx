import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectFilters } from './ProjectFilters';
import { useProjects } from '../hooks/useProjects';

export function ProjectGrid() {
  const { projects, filters, setFilters, projectsByDepartment } = useProjects();
  
  // Group projects by department if no specific department is selected
  const groupedProjects = filters.department 
    ? { [filters.department]: projectsByDepartment[filters.department] || [] }
    : projectsByDepartment;

  return (
    <div>
      <ProjectFilters
        activeFilter={filters.status}
        onFilterChange={(status) => setFilters({ ...filters, status })}
      />
      
      {Object.entries(groupedProjects).map(([department, departmentProjects]) => (
        <div key={department} className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{department}</h3>
          <div className="grid grid-cols-3 gap-6">
            {departmentProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          {departmentProjects.length === 0 && (
            <div className="text-center py-6">
              <p className="text-gray-500">No projects in this department match your criteria.</p>
            </div>
          )}
        </div>
      ))}
      
      {Object.keys(groupedProjects).length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {filters.search 
              ? "No projects match your search criteria."
              : "No projects match your filters."}
          </p>
        </div>
      )}
    </div>
  );
}