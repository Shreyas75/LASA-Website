import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function AccordionItem({ item, onClose }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const hasChildren = item.children && item.children.length > 0;

  const isActive = hasChildren
    ? item.children.some((child) => location.pathname === child.path) ||
      location.pathname === item.path
    : location.pathname === item.path;

  if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        onClick={onClose}
        className={({ isActive: active }) =>
          `block px-6 py-4 text-[15px] font-medium border-b border-lasa-200 transition-colors duration-150 ${
            active
              ? 'text-lasa-600 font-bold bg-lasa-100'
              : 'text-lasa-500 hover:text-lasa-600 hover:bg-lasa-100'
          }`
        }
      >
        {item.label}
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        className={`flex items-center justify-between w-full px-6 py-4 text-[15px] font-medium border-b border-lasa-200 transition-colors duration-150 ${
          isActive
            ? 'text-lasa-600 font-bold bg-lasa-100'
            : 'text-lasa-500 hover:text-lasa-600 hover:bg-lasa-100'
        }`}
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
      >
        {item.label}
        <svg
          className={`w-4 h-4 text-lasa-500 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="bg-lasa-200/60 py-1">
          {item.children.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              onClick={onClose}
              className={({ isActive: active }) =>
                `block px-8 py-3 text-[14px] transition-colors duration-150 ${
                  active
                    ? 'text-lasa-600 font-bold'
                    : 'text-lasa-500 hover:text-lasa-600'
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MobileMenu({ isOpen, onClose, navLinks }) {
  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-lasa-600/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Top Dropdown Menu */}
      <nav
        className={`fixed top-0 left-0 z-50 w-full max-h-screen flex flex-col bg-white border-b border-lasa-200 shadow-2xl transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-lasa-200">
          <span className="text-sm font-semibold text-lasa-600 tracking-wide uppercase">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-lasa-500 hover:text-lasa-600 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <div className="py-2 overflow-y-auto flex-1">
          {navLinks.map((item) => (
            <AccordionItem key={item.path} item={item} onClose={onClose} />
          ))}
        </div>
      </nav>
    </>
  );
}
