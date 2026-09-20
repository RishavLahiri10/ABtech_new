import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import {
  Brand,
  Footer,
  AdmissionInquiryModal,
  FloatingContactButtons,
} from './components';
import { institute } from './content';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';

export default function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryConfig, setInquiryConfig] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const menuButton = useRef(null);

  // Auto popup after 8-10 seconds (e.g., 9 seconds)
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('abtech_inquiry_prompted');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setInquiryConfig({
          formName: 'Admission Inquiry',
          title: 'ADMISSION INQUIRY',
          eyebrow: 'ABTECH LEARNING SERVICES',
          subtitle: 'Get instant counselling, eligibility checks, and fee details for 2026–2027 admissions.',
          course: 'NIOS — Class 10 & 12',
        });
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

    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.pathname, location.hash]);

  function closeOnEscape(event) {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      if (menuButton.current) menuButton.current.focus();
    }
  }

  const handleOpenInquiry = (customConfig = null) => {
    setInquiryConfig(
      customConfig || {
        formName: 'Admission Inquiry',
        title: 'ADMISSION INQUIRY',
        eyebrow: 'ABTECH LEARNING SERVICES',
        subtitle: 'Get instant counselling, eligibility checks, and fee details for 2026–2027 admissions.',
        course: 'NIOS — Class 10 & 12',
      }
    );
    setInquiryOpen(true);
    setMenuOpen(false);
  };

  const niosMenuItems = [
    { label: 'NIOS About Us', to: '/services#nios' },
    {
      label: 'General Inquiries',
      action: () =>
        handleOpenInquiry({
          formName: 'NIOS General Inquiry',
          title: 'NIOS GENERAL INQUIRY',
          eyebrow: 'ABTECH LEARNING SERVICES · NIOS',
          subtitle: 'Get answers regarding NIOS Class 10 & 12 eligibility, TOC, exam cycles, and study centers.',
          course: 'NIOS — Class 10 & 12',
        }),
      hasArrow: true,
    },
    {
      label: 'Admission Form',
      action: () =>
        handleOpenInquiry({
          formName: 'NIOS Admission Form',
          title: 'NIOS ADMISSION FORM',
          eyebrow: 'ABTECH LEARNING SERVICES · NIOS',
          subtitle: 'Apply for NIOS Secondary & Senior Secondary 2026–2027 admission cycles.',
          course: 'NIOS — Class 10 & 12',
        }),
      hasArrow: true,
    },
    {
      label: 'Subject List',
      href: 'https://sdmis.nios.ac.in/static/dist/images/pdf/subjects-available/subjects-available.pdf',
      hasArrow: true,
    },
    {
      label: 'Syllabus',
      hasArrow: true,
      submenu: [
        {
          label: 'Class X Syllabus',
          href: 'https://rcpune.nios.ac.in/secondary-courses-materials',
        },
        {
          label: 'Class XII Syllabus',
          href: 'https://rcpune.nios.ac.in/senior-secondary-courses-material',
        },
      ],
    },
    {
      label: 'Download Exam Hall Ticket / Admit Card',
      href: 'https://sdmis.nios.ac.in/search/hall-ticket',
      hasArrow: true,
    },
    {
      label: 'Check NIOS Admission Status',
      href: 'https://sdmis.nios.ac.in/registration/check-admission-status',
      hasArrow: true,
    },
    {
      label: 'Check NIOS Exam Result',
      href: 'https://results.nios.ac.in/home/on-demand?type=2',
      hasArrow: true,
    },
  ];

  const bosseMenuItems = [
    { label: 'BOSSE About Us', to: '/services#bosse' },
    {
      label: 'General Inquiries',
      action: () =>
        handleOpenInquiry({
          formName: 'BOSSE General Inquiry',
          title: 'BOSSE GENERAL INQUIRY',
          eyebrow: 'ABTECH LEARNING SERVICES · BOSSE',
          subtitle: 'Get expert guidance and eligibility assessment for BOSSE Open Schooling & Skill Education.',
          course: 'BOSSE — Open Board',
        }),
      hasArrow: true,
    },
    {
      label: 'BOSSE Admission Form',
      action: () =>
        handleOpenInquiry({
          formName: 'BOSSE Admission Form',
          title: 'BOSSE ADMISSION FORM',
          eyebrow: 'ABTECH LEARNING SERVICES · BOSSE',
          subtitle: 'Direct registration, verification, and fast-track guidance for BOSSE Secondary & Sr. Secondary.',
          course: 'BOSSE — Open Board',
        }),
      hasArrow: true,
    },
    {
      label: 'Official BOSSE Portal',
      href: 'https://www.bosse.ac.in/',
      hasArrow: true,
    },
    {
      label: 'Secondary (Class 10) Info',
      href: 'https://www.bosse.ac.in/secondary/',
      hasArrow: true,
    },
    {
      label: 'Sr. Secondary (Class 12) Info',
      href: 'https://www.bosse.ac.in/senior-secondary/',
      hasArrow: true,
    },
    {
      label: 'Skill & Vocational Courses',
      href: 'https://www.bosse.ac.in/vocational-education/',
      hasArrow: true,
    },
    {
      label: 'Student Verification & Results',
      href: 'https://www.bosse.ac.in/student-verification/',
      hasArrow: true,
    },
  ];

  const ignouMenuItems = [
    { label: 'IGNOU About Us', to: '/services#ignou' },
    {
      label: 'General Inquiries',
      action: () =>
        handleOpenInquiry({
          formName: 'IGNOU General Inquiry',
          title: 'IGNOU GENERAL INQUIRY',
          eyebrow: 'ABTECH LEARNING SERVICES · IGNOU',
          subtitle: 'Inquire about IGNOU Bachelor’s, Master’s, Diploma programs, and assignment guidance.',
          course: 'IGNOU — Degree & Diploma',
        }),
      hasArrow: true,
    },
    {
      label: 'IGNOU Admission Form',
      action: () =>
        handleOpenInquiry({
          formName: 'IGNOU Admission Form',
          title: 'IGNOU ADMISSION FORM',
          eyebrow: 'ABTECH LEARNING SERVICES · IGNOU',
          subtitle: 'Admissions, re-registration, project synopsis, and exam assistance for IGNOU degrees.',
          course: 'IGNOU — Degree & Diploma',
        }),
      hasArrow: true,
    },
    {
      label: 'Official IGNOU Portal',
      href: 'https://www.ignou.ac.in/',
      hasArrow: true,
    },
    {
      label: 'Online Fresh Admission (Samarth)',
      href: 'https://ignouadmission.samarth.edu.in/',
      hasArrow: true,
    },
    {
      label: 'Online Re-Registration Portal',
      href: 'https://onlinerr.ignou.ac.in/',
      hasArrow: true,
    },
    {
      label: 'Assignments & Question Papers',
      href: 'https://webservices.ignou.ac.in/assignments/',
      hasArrow: true,
    },
    {
      label: 'Student Grade Card & Results',
      href: 'https://gradecard.ignou.ac.in/gradecard/',
      hasArrow: true,
    },
  ];

  const renderNavDropdown = (title, targetPath, items) => {
    const isServiceActive =
      location.pathname === '/services' &&
      (location.hash === targetPath.slice(targetPath.indexOf('#')) ||
        (targetPath.includes('#nios') && !location.hash));

    return (
      <div className="nav-item-dropdown" key={title}>
        <NavLink
          to={targetPath}
          className={() => (isServiceActive ? 'active' : '')}
          onClick={() => setMenuOpen(false)}
        >
          {title} <span className="dropdown-caret" aria-hidden="true">▾</span>
        </NavLink>

        <div className="nav-dropdown-menu" role="menu" aria-label={`${title} Submenu`}>
          {items.map((item, idx) => {
            if (item.submenu) {
              return (
                <div key={idx} className="dropdown-submenu-wrap">
                  <div
                    className="dropdown-menu-item dropdown-submenu-trigger"
                    role="menuitem"
                    tabIndex="0"
                  >
                    <span className="dropdown-item-text">{item.label}</span>
                    <span className="dropdown-item-arrow">›</span>
                  </div>
                  <div className="dropdown-submenu" role="menu" aria-label={`${item.label} Submenu`}>
                    {item.submenu.map((sub, sIdx) => (
                      <a
                        key={sIdx}
                        href={sub.href}
                        target="_blank"
                        rel="noreferrer"
                        className="dropdown-menu-item dropdown-submenu-item"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="dropdown-item-text">{sub.label}</span>
                        <span className="dropdown-item-arrow">›</span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

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
                  {item.hasArrow && <span className="dropdown-item-arrow">›</span>}
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
                  {item.hasArrow && <span className="dropdown-item-arrow">›</span>}
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
                {item.hasArrow && <span className="dropdown-item-arrow">›</span>}
              </Link>
            );
          })}
        </div>
      </div>
    );
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

            {renderNavDropdown('NIOS Services', '/services#nios', niosMenuItems)}
            {renderNavDropdown('BOSSE Services', '/services#bosse', bosseMenuItems)}
            {renderNavDropdown('IGNOU Services', '/services#ignou', ignouMenuItems)}

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
        onClose={() => {
          setInquiryOpen(false);
          setInquiryConfig(null);
        }}
        config={inquiryConfig}
      />

      <FloatingContactButtons />
    </>
  );
}
