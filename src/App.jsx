import { useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Brand, Footer } from './components';
import { institute } from './content';
import Home from './pages/Home';
import About from './pages/About';
import Admissions from './pages/Admissions';
import Courses from './pages/Courses';
import Contact from './pages/Contact';
import { StudentProvider, useStudent } from './accounts/StudentContext';
import AccountModal from './accounts/AccountModal';
import StudentDashboard from './accounts/StudentDashboard';
import './accounts/accounts.css';

export default function App() {
  return (
    <StudentProvider>
      <Site />
    </StudentProvider>
  );
}

function Site() {
  const [accountOpen, setAccountOpen] = useState(false);
  const { student } = useStudent();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const previousPath = useRef(location.pathname);
  const menuButton = useRef(null);
  useEffect(() => {
    setMenuOpen(false);
    const name = location.pathname.slice(1) || 'Home';
    document.title = `${name.charAt(0).toUpperCase() + name.slice(1)} | ${institute.fullName}`;
    if (previousPath.current !== location.pathname) {
      window.scrollTo(0, 0);
      document.getElementById('main').focus();
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  function closeOnEscape(event) {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      menuButton.current.focus();
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <div className="container">
          <span>NIOS admission guidance · Kolkata</span>
          <Link to="/contact">Have a question? Get in touch ↗</Link>
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
            {['Home', 'About', 'Admissions', 'Courses', 'Contact'].map(
              (name) => (
                <NavLink
                  key={name}
                  to={name === 'Home' ? '/' : `/${name.toLowerCase()}`}
                  end
                >
                  {name}
                </NavLink>
              )
            )}
            <Link className="button small-button" to="/admissions">
              Start your journey ↗
            </Link>
            {student ? (
              <NavLink className="button account-nav" to="/dashboard">
                Dashboard
              </NavLink>
            ) : (
              <button
                className="button account-nav"
                onClick={() => setAccountOpen(true)}
              >
                Student login
              </button>
            )}
          </nav>
        </div>
      </header>
      <main id="main" tabIndex="-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/dashboard"
            element={<StudentDashboard onLogin={() => setAccountOpen(true)} />}
          />
          <Route
            path="*"
            element={
              <section className="container section">
                <h1>Page not found</h1>
                <Link className="button" to="/">
                  Return home
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
      {accountOpen && (
        <AccountModal
          onClose={() => setAccountOpen(false)}
          onSuccess={() => {
            setAccountOpen(false);
            navigate('/dashboard');
          }}
        />
      )}
    </>
  );
}
