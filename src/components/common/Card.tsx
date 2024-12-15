import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx(
      'bg-white rounded-xl border border-gray-200 p-6',
      'transition-all duration-300 ease-in-out',
      className
    )}>
      {children}
    </div>
  );
}