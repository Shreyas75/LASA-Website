import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants/navLinks';
import logoHires from '/logo-hires.png';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-lasa-200 pt-16 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 lg:gap-16 mb-12">
          {/* Logo & Intro */}
          <div className="flex flex-col items-start text-left">
            <Link to="/">
              <img src={logoHires} alt="LASA Foundation Logo" className="w-32 mb-4" />
            </Link>
            <p className="text-lasa-500 text-sm leading-relaxed max-w-xs">
              A charitable organization dedicated to community service based on Truth, Non-violence, Peace, Love, and Right Conduct.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-lasa-600 mb-6">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-left">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-lasa-500 hover:text-lasa-600 transition-colors font-medium text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start">
            <h3 className="text-lg font-bold text-lasa-600 mb-6">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-sm text-lasa-500 font-medium">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-lasa-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-left leading-relaxed">
                  40 Old Ferry Road,<br />Lowell, MA 01854
                </span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-lasa-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+19787104012" className="hover:text-lasa-600 transition-colors">
                  +1 (978) 710 4012
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-lasa-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@lasane.org" className="hover:text-lasa-600 transition-colors">
                  info@lasane.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between pt-8 border-t border-lasa-200/60 gap-6 md:gap-4">
          <p className="text-xs font-medium text-lasa-500/80 text-center md:text-left">
            © 2025 LASA Foundation Inc. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 text-xs font-medium text-lasa-500/80">
            <Link to="/legal" className="hover:text-lasa-600 transition-colors">Legal</Link>
            <Link to="/privacy-policy" className="hover:text-lasa-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms-and-conditions" className="hover:text-lasa-600 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
