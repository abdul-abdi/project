import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { Project, RAGStatus } from '../types/project';
import { useNotifications } from './NotificationContext';
import { mockProjects } from '../data/mockProjects';

interface ProjectFilters {
  search?: string;
  status?: RAGStatus;
  department?: string;
  favorites?: boolean;
  recent?: boolean;
  upcoming?: boolean;
  completed?: boolean;
}

interface ProjectStats {
  total: number;
  byStatus: Record<RAGStatus, number>;
  byDepartment: Record<string, number>;
  recentCount: number;
  upcomingCount: number;
  completedCount: number;
}

interface ProjectState {
  projects: Project[];
  filters: ProjectFilters;
  favorites: Set<string>;
  stats: ProjectStats;
}

type ProjectAction =
  | { type: 'SET_PROJECTS'; payload: Project[] }
  | { type: 'SET_FILTERS'; payload: ProjectFilters }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'CLEAR_FILTERS' };

interface ProjectContextType extends ProjectState {
  setFilters: (filters: ProjectFilters) => void;
  clearFilters: () => void;
  toggleFavorite: (id: string) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  filteredProjects: Project[];
  projectsByDepartment: Record<string, Project[]>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
        stats: calculateStats(action.payload, state.favorites)
      };
    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
    case 'TOGGLE_FAVORITE': {
      const newFavorites = new Set(state.favorites);
      if (newFavorites.has(action.payload)) {
        newFavorites.delete(action.payload);
      } else {
        newFavorites.add(action.payload);
      }
      return {
        ...state,
        favorites: newFavorites,
        stats: calculateStats(state.projects, newFavorites)
      };
    }
    case 'UPDATE_PROJECT': {
      const projects = state.projects.map(p =>
        p.id === action.payload.id ? action.payload : p
      );
      return {
        ...state,
        projects,
        stats: calculateStats(projects, state.favorites)
      };
    }
    case 'DELETE_PROJECT': {
      const projects = state.projects.filter(p => p.id !== action.payload);
      return {
        ...state,
        projects,
        stats: calculateStats(projects, state.favorites)
      };
    }
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filters: {}
      };
    default:
      return state;
  }
}

function calculateStats(projects: Project[], favorites: Set<string>): ProjectStats {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  return {
    total: projects.length,
    byStatus: {
      red: projects.filter(p => p.status === 'red').length,
      amber: projects.filter(p => p.status === 'amber').length,
      green: projects.filter(p => p.status === 'green').length
    },
    byDepartment: projects.reduce((acc, project) => {
      acc[project.department] = (acc[project.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    recentCount: projects.filter(p => p.lastUpdated > thirtyDaysAgo).length,
    upcomingCount: projects.filter(p => {
      const daysUntilDeadline = Math.ceil(
        (p.schedule.end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
    }).length,
    completedCount: projects.filter(p => p.completion === 100).length
  };
}

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const { addNotification } = useNotifications();
  const [state, dispatch] = useReducer(projectReducer, {
    projects: [],
    filters: {},
    favorites: new Set(),
    stats: {
      total: 0,
      byStatus: { red: 0, amber: 0, green: 0 },
      byDepartment: {},
      recentCount: 0,
      upcomingCount: 0,
      completedCount: 0
    }
  });

  // Load mock data
  useEffect(() => {
    dispatch({ type: 'SET_PROJECTS', payload: mockProjects });
  }, []);

  const setFilters = useCallback((filters: ProjectFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const clearFilters = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTERS' });
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
    const project = state.projects.find(p => p.id === id);
    if (project) {
      addNotification({
        type: 'success',
        title: state.favorites.has(id) ? 'Removed from favorites' : 'Added to favorites',
        message: `${project.name} has been ${state.favorites.has(id) ? 'removed from' : 'added to'} your favorites`,
        priority: 'low',
        category: 'project'
      });
    }
  }, [state.projects, state.favorites, addNotification]);

  const updateProject = useCallback((project: Project) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: project });
    addNotification({
      type: 'info',
      title: 'Project updated',
      message: `${project.name} has been updated`,
      priority: 'medium',
      category: 'project',
      projectId: project.id
    });
  }, [addNotification]);

  const deleteProject = useCallback((id: string) => {
    const project = state.projects.find(p => p.id === id);
    if (project) {
      dispatch({ type: 'DELETE_PROJECT', payload: id });
      addNotification({
        type: 'warning',
        title: 'Project deleted',
        message: `${project.name} has been deleted`,
        priority: 'high',
        category: 'project'
      });
    }
  }, [state.projects, addNotification]);

  const filteredProjects = React.useMemo(() => {
    return state.projects.filter(project => {
      if (state.filters.search && !project.name.toLowerCase().includes(state.filters.search.toLowerCase())) {
        return false;
      }
      if (state.filters.status && project.status !== state.filters.status) {
        return false;
      }
      if (state.filters.department && project.department !== state.filters.department) {
        return false;
      }
      if (state.filters.favorites && !state.favorites.has(project.id)) {
        return false;
      }
      if (state.filters.recent) {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        if (project.lastUpdated <= thirtyDaysAgo) {
          return false;
        }
      }
      if (state.filters.upcoming) {
        const daysUntilDeadline = Math.ceil(
          (project.schedule.end.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysUntilDeadline > 30 || daysUntilDeadline <= 0) {
          return false;
        }
      }
      if (state.filters.completed && project.completion !== 100) {
        return false;
      }
      return true;
    });
  }, [state.projects, state.filters, state.favorites]);

  const projectsByDepartment = React.useMemo(() => {
    return filteredProjects.reduce((acc, project) => {
      if (!acc[project.department]) {
        acc[project.department] = [];
      }
      acc[project.department].push(project);
      return acc;
    }, {} as Record<string, Project[]>);
  }, [filteredProjects]);

  return (
    <ProjectContext.Provider
      value={{
        ...state,
        setFilters,
        clearFilters,
        toggleFavorite,
        updateProject,
        deleteProject,
        filteredProjects,
        projectsByDepartment
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
} 