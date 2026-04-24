import { NavLink } from 'react-router-dom';

export default function DropdownMenu({ items }) {
  return (
    <div className="absolute top-full left-0 pt-2">
      <ul
        className="min-w-[200px] bg-white/95 backdrop-blur-lg border border-lasa-200 rounded-xl shadow-[0_8px_32px_rgba(57,88,134,0.15)] py-2 origin-top"
        style={{
          animation: 'dropdown 200ms ease-out',
        }}
      >
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block py-3.5 text-[15px] font-semibold transition-colors duration-150 ${
                  isActive
                    ? 'text-lasa-600 bg-lasa-100 font-bold border-l-2 border-lasa-600 pl-[18px] pr-5'
                    : 'text-lasa-500 hover:text-lasa-600 hover:bg-lasa-100 px-5'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
