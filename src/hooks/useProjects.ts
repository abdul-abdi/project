import { useState, useMemo } from 'react';
import { Project, RAGStatus } from '../types/project';
import { mockProjects } from '../data/mockProjects';
import { isRecentlyUpdated, isUpcomingDeadline } from '../utils/dateUtils';

type FilterOptions = {
  status?: RAGStatus;
  department?: string;
  search?: string;
  favorites?: boolean;
  showCompleted?: boolean;
  recent?: boolean;
  upcoming?: boolean;
};

export function useProjects() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [settings, setSettings] = useState({
    showCompleted: false,
    darkMode: false,
    emailNotifications: true,
    pushNotifications: true
  });

  const toggleFavorite = (projectId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(projectId)) {
        newFavorites.delete(projectId);
      } else {
        newFavorites.add(projectId);
      }
      return newFavorites;
    });
  };

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      if (!settings.showCompleted && project.completion === 100) {
        return false;
      }
      if (filters.status && project.status !== filters.status) {
        return false;
      }
      if (filters.department && project.department !== filters.department) {
        return false;
      }
      if (filters.favorites && !favorites.has(project.id)) {
        return false;
      }
      if (filters.recent && !isRecentlyUpdated(project.lastUpdated, 7)) {
        return false;
      }
      if (filters.upcoming && !isUpcomingDeadline(project.schedule.end, 30)) {
        return false;
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          project.name.toLowerCase().includes(searchLower) ||
          project.owner.toLowerCase().includes(searchLower) ||
          project.department.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });
  }, [filters, favorites, settings.showCompleted]);

  const projectsByDepartment = useMemo(() => {
    const departments: Record<string, Project[]> = {};
    filteredProjects.forEach(project => {
      if (!departments[project.department]) {
        departments[project.department] = [];
      }
      departments[project.department].push(project);
    });
    return departments;
  }, [filteredProjects]);

  const stats = useMemo(() => {
    const total = filteredProjects.length;
    const byStatus = filteredProjects.reduce(
      (acc, project) => {
        acc[project.status]++;
        return acc;
      },
      { red: 0, amber: 0, green: 0 } as Record<RAGStatus, number>
    );

    const totalBudget = filteredProjects.reduce(
      (sum, project) => sum + project.budget.allocated,
      0
    );
    const spentBudget = filteredProjects.reduce(
      (sum, project) => sum + project.budget.spent,
      0
    );

    const recentCount = mockProjects.filter(p => isRecentlyUpdated(p.lastUpdated, 7)).length;
    const upcomingCount = mockProjects.filter(p => isUpcomingDeadline(p.schedule.end, 30)).length;

    return {
      total,
      byStatus,
      budgetUtilization: (spentBudget / totalBudget) * 100,
      recentCount,
      upcomingCount
    };
  }, [filteredProjects]);

  const clearFilters = () => {
    setFilters({});
  };

  const setDepartmentFilter = (department: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      department,
      favorites: false
    }));
  };

  const toggleFavoritesFilter = () => {
    setFilters(prev => ({
      ...prev,
      favorites: !prev.favorites,
      department: undefined
    }));
  };

  return {
    projects: filteredProjects,
    projectsByDepartment,
    stats,
    filters,
    setFilters,
    favorites,
    toggleFavorite,
    settings,
    updateSettings,
    clearFilters,
    setDepartmentFilter,
    toggleFavoritesFilter
  };
}