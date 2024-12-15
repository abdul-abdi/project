import React, { useState, useMemo } from 'react';
import { ProjectFilters } from './ProjectFilters';
import { ActiveFilters } from './common/ActiveFilters';
import { ProjectSort } from './common/ProjectSort';
import { DepartmentView } from './department/DepartmentView';
import { FilterInsights } from './analytics/FilterInsights';
import { useProjects } from '../hooks/useProjects';
import { FolderOpen } from 'lucide-react';
import { Project } from '../types/project';

type SortField = 'name' | 'lastUpdated' | 'completion' | 'budget' | 'deadline';
type SortDirection = 'asc' | 'desc';

export function ProjectGrid() {
  const { projects, filters, setFilters, projectsByDepartment } = useProjects();
  const [sortField, setSortField] = useState<SortField>('lastUpdated');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedDepartments, setExpandedDepartments] = useState<Set<string>>(new Set());
  
  // Group projects by department if no specific department is selected
  const groupedProjects = filters.department 
    ? { [filters.department]: projectsByDepartment[filters.department] || [] }
    : projectsByDepartment;

  const totalProjects = Object.values(groupedProjects).reduce(
    (sum, projects) => sum + projects.length,
    0
  );

  const sortProjects = (projects: Project[]) => {
    return [...projects].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'lastUpdated':
          comparison = a.lastUpdated.getTime() - b.lastUpdated.getTime();
          break;
        case 'completion':
          comparison = a.completion - b.completion;
          break;
        case 'budget':
          comparison = (a.budget.spent / a.budget.allocated) - (b.budget.spent / b.budget.allocated);
          break;
        case 'deadline':
          comparison = a.schedule.end.getTime() - b.schedule.end.getTime();
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const sortedGroupedProjects = useMemo(() => {
    const sorted: Record<string, Project[]> = {};
    Object.entries(groupedProjects).forEach(([department, projects]) => {
      sorted[department] = sortProjects(projects);
    });
    return sorted;
  }, [groupedProjects, sortField, sortDirection]);

  const handleSort = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const toggleDepartment = (department: string) => {
    setExpandedDepartments(prev => {
      const next = new Set(prev);
      if (next.has(department)) {
        next.delete(department);
      } else {
        next.add(department);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedDepartments(new Set(Object.keys(sortedGroupedProjects)));
  };

  const collapseAll = () => {
    setExpandedDepartments(new Set());
  };

  const hasActiveFilters = Object.values(filters).some(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-500 mt-1">
            {totalProjects} project{totalProjects !== 1 ? 's' : ''} found
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={expandAll}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Expand All
            </button>
            <span className="text-gray-300">|</span>
            <button
              onClick={collapseAll}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Collapse All
            </button>
          </div>
          <ProjectSort
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <ProjectFilters
            activeFilter={filters.status}
            onFilterChange={(status) => setFilters({ ...filters, status })}
          />
        </div>
      </div>

      <ActiveFilters />
      
      {/* Show insights when filters are active */}
      {hasActiveFilters && <FilterInsights />}
      
      <div className="space-y-4">
        {Object.entries(sortedGroupedProjects).map(([department, departmentProjects]) => (
          <DepartmentView
            key={department}
            department={department}
            projects={departmentProjects}
            isExpanded={expandedDepartments.has(department)}
            onToggle={() => toggleDepartment(department)}
          />
        ))}
        
        {Object.keys(sortedGroupedProjects).length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
            <FolderOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              {filters.search 
                ? "No projects match your search criteria. Try adjusting your search terms."
                : "No projects match your current filters. Try adjusting or clearing your filters."}
            </p>
            <button
              onClick={() => setFilters({})}
              className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}