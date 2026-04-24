export default function HamburgerIcon({ isOpen }) {
  return (
    <div className="relative w-6 h-5 flex flex-col justify-between">
      <span
        className={`block h-0.5 w-full bg-lasa-500 rounded-full transition-all duration-300 origin-center ${
          isOpen ? 'rotate-45 translate-y-[9px]' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-lasa-500 rounded-full transition-all duration-300 ${
          isOpen ? 'opacity-0 scale-x-0' : ''
        }`}
      />
      <span
        className={`block h-0.5 w-full bg-lasa-500 rounded-full transition-all duration-300 origin-center ${
          isOpen ? '-rotate-45 -translate-y-[9px]' : ''
        }`}
      />
    </div>
  );
}
