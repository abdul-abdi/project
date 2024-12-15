import React from 'react';
import { FolderTree, Star, Layout, AlertTriangle, Clock, CheckCircle, TrendingUp, Calendar } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { DepartmentList } from './DepartmentList';
import clsx from 'clsx';

export function Sidebar() {
  const { filters, clearFilters, toggleFavoritesFilter, favorites, stats, setFilters } = useProjects();
  const showingFavorites = filters.favorites;

  const views = [
    {
      id: 'all',
      name: 'All Projects',
      icon: Layout,
      action: clearFilters,
      isActive: !filters.status && !filters.department && !filters.favorites,
      count: stats.total
    },
    {
      id: 'critical',
      name: 'Critical Projects',
      icon: AlertTriangle,
      action: () => setFilters({ status: 'red' }),
      isActive: filters.status === 'red',
      count: stats.byStatus.red,
      variant: 'red'
    },
    {
      id: 'at-risk',
      name: 'At Risk Projects',
      icon: TrendingUp,
      action: () => setFilters({ status: 'amber' }),
      isActive: filters.status === 'amber',
      count: stats.byStatus.amber,
      variant: 'amber'
    },
    {
      id: 'on-track',
      name: 'On Track',
      icon: CheckCircle,
      action: () => setFilters({ status: 'green' }),
      isActive: filters.status === 'green',
      count: stats.byStatus.green,
      variant: 'green'
    },
    {
      id: 'recent',
      name: 'Recently Updated',
      icon: Clock,
      action: () => setFilters({ recent: true }),
      isActive: filters.recent,
      count: stats.recentCount
    },
    {
      id: 'upcoming',
      name: 'Upcoming Deadlines',
      icon: Calendar,
      action: () => setFilters({ upcoming: true }),
      isActive: filters.upcoming,
      count: stats.upcomingCount
    }
  ];

  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 h-screen">
      <div className="p-4">
        <nav className="space-y-8">
          <div>
            <div className="flex items-center px-2 mb-2">
              <FolderTree className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Departments</span>
            </div>
            <DepartmentList />
          </div>

          <div>
            <div className="flex items-center px-2 mb-2">
              <Star className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Favorites</span>
            </div>
            <button
              onClick={toggleFavoritesFilter}
              className={clsx(
                'w-full flex items-center justify-between px-2 py-2 text-sm rounded-md transition-colors duration-200',
                showingFavorites
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <span>Favorite Projects</span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                {favorites.size}
              </span>
            </button>
          </div>

          <div>
            <div className="flex items-center px-2 mb-2">
              <Layout className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Views</span>
            </div>
            <ul className="space-y-1">
              {views.map((view) => (
                <li key={view.id}>
                  <button
                    onClick={view.action}
                    className={clsx(
                      'w-full text-left px-2 py-2 text-sm rounded-md transition-colors duration-200',
                      view.isActive
                        ? view.variant
                          ? `bg-${view.variant}-50 text-${view.variant}-700`
                          : 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <view.icon className="h-4 w-4 mr-2" />
                        <span>{view.name}</span>
                      </div>
                      <span className={clsx(
                        'text-xs px-2 py-0.5 rounded-full',
                        view.variant
                          ? `bg-${view.variant}-100 text-${view.variant}-700`
                          : 'bg-gray-200 text-gray-700'
                      )}>
                        {view.count}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}