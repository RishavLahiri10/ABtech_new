import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Brand, Footer, AdmissionInquiryModal } from './components';
import { institute } from './content';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

export default function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const menuButton = useRef(null);

  // Auto popup after 8-10 seconds (e.g., 9 seconds)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('abtech_inquiry_prompted');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setInquiryOpen(true);
        sessionStorage.setItem('abtech_inquiry_prompted', 'true');
      }, 9000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    let routeName = location.pathname.slice(1) || 'Home';
    if (routeName === '') routeName = 'Home';
    else routeName = routeName.charAt(0).toUpperCase() + routeName.slice(1);

    document.title = `${routeName} | ${institute.fullName}`;

    if (previousPath.current !== location.pathname) {
      window.scrollTo(0, 0);
      const mainEl = document.getElementById('main');
      if (mainEl) mainEl.focus();
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);

  function closeOnEscape(event) {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      if (menuButton.current) menuButton.current.focus();
    }
  }

  const handleOpenInquiry = () => {
    setInquiryOpen(true);
    setMenuOpen(false);
  };

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="topbar">
        <div className="container topbar-container">
          <span className="topbar-tagline">
            ★ NIOS · BOSSE · IGNOU · COLLEGE ADMISSIONS · CAREER COUNSELLING · KOLKATA
          </span>
          <div className="topbar-links">
            <button
              type="button"
              className="topbar-btn"
              onClick={handleOpenInquiry}
            >
              Get Admission Guidance ↗
            </button>
          </div>
        </div>
      </div>

      <header onKeyDown={closeOnEscape}>
        <div className="container nav-wrap">
          <Brand />

          <button
            ref={menuButton}
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close ✕' : 'Menu ☰'}
          </button>

          <nav
            id="navigation"
            className={menuOpen ? 'open' : ''}
            aria-label="Main navigation"
          >
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/about" end onClick={() => setMenuOpen(false)}>
              About
            </NavLink>

            {/* Services with Hover Dropdown Menu */}
            <div
              className="nav-item-dropdown"
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
            >
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive || location.pathname.startsWith('/services') ? 'active' : ''
                }
                onClick={() => setMenuOpen(false)}
              >
                Services <span className="dropdown-caret" aria-hidden="true">▾</span>
              </NavLink>

              <div className="nav-dropdown-menu" role="menu" aria-label="Services Submenu">
                {[
                  { label: 'NIOS About Us', to: '/services#nios' },
                  { label: 'General Inquiries', to: '/contact' },
                  { label: 'Admission', to: '/services#nios' },
                  { label: 'Admission Form', action: handleOpenInquiry },
                  { label: 'Subject List', to: '/services#nios' },
                  { label: 'Syllabus', to: '/services#nios' },
                  { label: 'Question Paper', to: '/services#nios' },
                  {
                    label: 'Download Exam Hall Ticket / Admit Card',
                    href: 'https://sdmis.nios.ac.in/',
                  },
                  {
                    label: 'Check NIOS Admission Status',
                    href: 'https://sdmis.nios.ac.in/home/check-admission-status',
                  },
                  {
                    label: 'Check NIOS Exam Result',
                    href: 'https://results.nios.ac.in/home/on-demand?type=2',
                  },
                ].map((item, idx) => {
                  if (item.action) {
                    return (
                      <button
                        key={idx}
                        type="button"
                        className="dropdown-menu-item"
                        role="menuitem"
                        onClick={() => {
                          setMenuOpen(false);
                          item.action();
                        }}
                      >
                        <span className="dropdown-item-text">{item.label}</span>
                        <span className="dropdown-item-arrow" aria-hidden="true">›</span>
                      </button>
                    );
                  }

                  if (item.href) {
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="dropdown-menu-item"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="dropdown-item-text">{item.label}</span>
                        <span className="dropdown-item-arrow" aria-hidden="true">›</span>
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={idx}
                      to={item.to}
                      className="dropdown-menu-item"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="dropdown-item-text">{item.label}</span>
                      <span className="dropdown-item-arrow" aria-hidden="true">›</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <NavLink to="/contact" end onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>

            <button
              className="button button-header-cta"
              type="button"
              onClick={handleOpenInquiry}
            >
              Inquire Now <span aria-hidden="true">↗</span>
            </button>
          </nav>
        </div>
      </header>

      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home onOpenInquiry={handleOpenInquiry} />} />
          <Route path="/about" element={<About onOpenInquiry={handleOpenInquiry} />} />
          <Route path="/services" element={<Services onOpenInquiry={handleOpenInquiry} />} />
          <Route path="/courses" element={<Navigate to="/services" replace />} />
          <Route path="/admissions" element={<Navigate to="/services" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <section className="container section not-found-section">
                <h1>Page not found</h1>
                <p>The page you requested could not be found.</p>
                <Link className="button button-maroon" to="/">
                  Return Home
                </Link>
              </section>
            }
          />
        </Routes>
      </main>

      <Footer />

      <AdmissionInquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
      />
    </>
  );
}
