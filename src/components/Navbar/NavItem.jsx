import { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';

export default function NavItem({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  // Check if this item or any of its children match the current route
  const isActive = hasChildren
    ? item.children.some((child) => location.pathname === child.path) ||
      location.pathname === item.path
    : location.pathname === item.path;

  // Close dropdown on click outside
  useEffect(() => {
    if (!hasChildren) return;

    const handleMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [hasChildren]);

  // Close dropdown on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    },
    [isOpen]
  );

  if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        className={({ isActive: active }) =>
          `relative px-5 py-3 text-[17px] font-semibold tracking-wider transition-all duration-200 ${
            active
              ? 'text-lasa-600 font-bold after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-lasa-600 after:rounded-full'
              : 'text-lasa-500 hover:text-lasa-600'
          }`
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        className={`relative flex items-center gap-1 px-5 py-3 text-[17px] font-semibold tracking-wider transition-all duration-200 ${
          isActive
            ? 'text-lasa-600 font-bold after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:bg-lasa-600 after:rounded-full'
            : 'text-lasa-500 hover:text-lasa-600'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {item.label}
        <svg
          className={`w-3.5 h-3.5 text-lasa-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && <DropdownMenu items={item.children} />}
    </div>
  );
}
