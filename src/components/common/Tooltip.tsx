import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  delay = 200 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<number>();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updatePosition = (target: HTMLElement) => {
    if (!tooltipRef.current) return;

    const targetRect = target.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        y = targetRect.top - tooltipRect.height - 8;
        break;
      case 'bottom':
        x = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
        y = targetRect.bottom + 8;
        break;
      case 'left':
        x = targetRect.left - tooltipRect.width - 8;
        y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        break;
      case 'right':
        x = targetRect.right + 8;
        y = targetRect.top + (targetRect.height - tooltipRect.height) / 2;
        break;
    }

    // Keep tooltip within viewport
    x = Math.max(8, Math.min(x, window.innerWidth - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, window.innerHeight - tooltipRect.height - 8));

    setCoords({ x, y });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    updatePosition(target);
    showTooltip();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const clonedChild = React.cloneElement(children, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: hideTooltip,
    onFocus: handleMouseEnter,
    onBlur: hideTooltip,
  });

  return (
    <>
      {clonedChild}
      {isVisible && createPortal(
        <div
          ref={tooltipRef}
          className={clsx(
            "fixed z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg",
            "animate-fade-in pointer-events-none select-none whitespace-nowrap",
            "after:content-[''] after:absolute after:border-4 after:border-transparent",
            position === 'top' && "after:top-full after:left-1/2 after:-ml-1 after:border-t-gray-900",
            position === 'bottom' && "after:bottom-full after:left-1/2 after:-ml-1 after:border-b-gray-900",
            position === 'left' && "after:left-full after:top-1/2 after:-mt-1 after:border-l-gray-900",
            position === 'right' && "after:right-full after:top-1/2 after:-mt-1 after:border-r-gray-900"
          )}
          style={{
            transform: `translate(${Math.round(coords.x)}px, ${Math.round(coords.y)}px)`,
          }}
        >
          {content}
        </div>,
        document.body
      )}
    </>
  );
} 