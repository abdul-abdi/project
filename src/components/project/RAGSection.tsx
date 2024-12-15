import React from 'react';

export interface RAGSectionProps {
  title: string;
  children: React.ReactNode;
}

export function RAGSection({ title, children }: RAGSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}