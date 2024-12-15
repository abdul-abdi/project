import React from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SummaryCards } from './components/SummaryCards';
import { ProjectGrid } from './components/ProjectGrid';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 overflow-auto p-6">
          <SummaryCards />
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Projects</h2>
            <ProjectGrid />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;