import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SummaryCards } from './components/SummaryCards';
import { ProjectGrid } from './components/ProjectGrid';
import { NotificationProvider } from './contexts/NotificationContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { NotificationManager } from './components/notifications/NotificationManager';

function App() {
  return (
    <NotificationProvider>
      <ProjectProvider>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          
          <div className="flex-1 flex flex-col">
            <Header />
            
            <main className="flex-1 overflow-auto p-6">
              <SummaryCards />
              
              <div className="mb-6">
                <ProjectGrid />
              </div>
            </main>
          </div>

          <NotificationManager />
        </div>
      </ProjectProvider>
    </NotificationProvider>
  );
}

export default App;