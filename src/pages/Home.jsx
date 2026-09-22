import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ContactStrip, StudentReviews } from '../components';
import { highlights, services } from '../content';

export default function Home({ onOpenInquiry }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getServiceCourse = (id) => {
    switch (id) {
      case 'nios':
        return 'NIOS — Class 10 & 12';
      case 'bosse':
        return 'BOSSE — Open Board';
      case 'ignou':
        return 'IGNOU — Degree & Diploma';
      case 'college-admissions':
        return 'Guidance College Admissions';
      case 'career-counselling':
        return 'Career Counselling';
      default:
        return 'NIOS — Class 10 & 12';
    }
  };

  return (
    <>
      {/* Hero Section with Parallax Elements */}
      <section className="hero parallax-hero-wrapper">
        <div
          className="parallax-bg-element parallax-orb-1"
          style={{ transform: `translate3d(0, ${scrollY * 0.18}px, 0)` }}
          aria-hidden="true"
        />
        <div
          className="parallax-bg-element parallax-orb-2"
          style={{ transform: `translate3d(0, ${scrollY * -0.12}px, 0)` }}
          aria-hidden="true"
        />

        <div className="container hero-grid">
          <div className="hero-content">
            <p className="eyebrow">
              ADMISSION GUIDANCE &amp; COUNSELLING · BARRACKPORE
            </p>
            <h1 className="hero-title">
              Your Education.
              <br />
              Your Career.
              <br />
              <span className="hero-highlight">Your Success Story.</span>
            </h1>
            <p className="lede">
              Official guidance for <strong>NIOS</strong>, <strong>BOSSE</strong>, <strong>IGNOU</strong>, <strong>College Admissions</strong>, and <strong>Career Counselling</strong> in Kolkata. Step back into education and achieve your ambitions with expert support.
            </p>

            <div className="actions hero-actions-wrap">
              <button
                className="button button-maroon button-hero-inquire"
                type="button"
                style={{
                  transform: `translate3d(0, ${scrollY * -0.06}px, 0)`,
                }}
                onClick={() =>
                  onOpenInquiry({
                    formName: 'Admission Inquiry',
                    title: 'ADMISSION INQUIRY',
                    eyebrow: 'ABTECH LEARNING SERVICES',
                    subtitle: 'Get instant counselling, eligibility checks, and fee details for 2026–2027 admissions.',
                    course: 'NIOS — Class 10 & 12',
                  })
                }
              >
                Inquire Now <span aria-hidden="true">↗</span>
              </button>

              <Link
                className="button button-outline-maroon button-hero-explore"
                to="/services"
                style={{
                  transform: `translate3d(0, ${scrollY * 0.04}px, 0)`,
                }}
              >
                Explore NIOS Services →
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Recognized Boards &amp; Unis</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1-on-1</span>
                <span className="stat-label">Expert Mentorship</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">Full</span>
                <span className="stat-label">TMA &amp; Project Support</span>
              </div>
            </div>
          </div>

          <div
            className="hero-picture parallax-card"
            style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
          >
            <div className="hero-logo-banner">
              <img
                src="/logo.png"
                alt="ABTECH Educational & Learning Services Logo"
                className="hero-brand-img"
              />
              <div className="hero-banner-text">
                <strong>ABTECH Educational &amp; Learning Services</strong>
                <span>Kolkata Centre for Open Schooling &amp; University Admissions</span>
              </div>
            </div>

            <div className="picture-note">
              <span className="note-icon" aria-hidden="true">
                ↗
              </span>
              <div>
                <strong>Every learner deserves a clear path forward.</strong>
                <span>Let’s discover your customized academic roadmap today.</span>
              </div>
            </div>

            {/* Mini Icons Row below the Note Box */}
            <div className="hero-affiliations-container">
              <div className="hero-affiliations-header">
                <span className="hero-affiliations-divider-line" aria-hidden="true"></span>
                <span className="hero-affiliations-title">RECOGNIZED BOARDS &amp; UNIVERSITIES</span>
                <span className="hero-affiliations-divider-line" aria-hidden="true"></span>
              </div>
              <div className="hero-affiliations-grid">
                <Link
                  to="/services#nios"
                  className="affiliation-mini-card"
                  title="NIOS - National Institute of Open Schooling"
                >
                  <div className="affiliation-icon-wrapper">
                    <img
                      src="/logos/nios.svg"
                      alt="NIOS - National Institute of Open Schooling"
                      className="affiliation-mini-icon"
                    />
                  </div>
                  <div className="affiliation-meta">
                    <span className="affiliation-name">NIOS</span>
                    <span className="affiliation-desc">Class 10 &amp; 12</span>
                  </div>
                </Link>

                <Link
                  to="/services#bosse"
                  className="affiliation-mini-card"
                  title="BOSSE - Board of Open Schooling & Skill Education"
                >
                  <div className="affiliation-icon-wrapper">
                    <img
                      src="/logos/bosse.svg"
                      alt="BOSSE - Board of Open Schooling & Skill Education"
                      className="affiliation-mini-icon"
                    />
                  </div>
                  <div className="affiliation-meta">
                    <span className="affiliation-name">BOSSE</span>
                    <span className="affiliation-desc">Open &amp; Skill</span>
                  </div>
                </Link>

                <Link
                  to="/services#ignou"
                  className="affiliation-mini-card"
                  title="IGNOU - Indira Gandhi National Open University"
                >
                  <div className="affiliation-icon-wrapper">
                    <img
                      src="/logos/ignou.svg"
                      alt="IGNOU - Indira Gandhi National Open University"
                      className="affiliation-mini-icon"
                    />
                  </div>
                  <div className="affiliation-meta">
                    <span className="affiliation-name">IGNOU</span>
                    <span className="affiliation-desc">UG &amp; PG Degrees</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="container section relative-section">
        <div
          className="parallax-bg-pattern"
          style={{ transform: `translate3d(0, ${(scrollY - 400) * 0.08}px, 0)` }}
          aria-hidden="true"
        />

        <div className="section-heading">
          <div>
            <p className="eyebrow">OUR SPECIALIZATIONS</p>
            <h2>Comprehensive Educational &amp; Career Services</h2>
          </div>
          <Link className="button button-outline-maroon" to="/services">
            View All 5 Services →
          </Link>
        </div>

        <div className="home-services-grid">
          {services.map((s, idx) => (
            <div
              className="home-service-card"
              key={s.id}
              style={{
                transform: `translate3d(0, ${Math.max(0, (scrollY - 300) * (idx % 2 === 0 ? -0.02 : 0.02))}px, 0)`,
              }}
            >
              <div className="home-service-badge">{s.badge}</div>
              <h3 className="home-service-title">{s.shortName}</h3>
              <p className="home-service-subtitle">{s.title}</p>
              <p className="home-service-desc">{s.description}</p>
              <div className="home-service-action">
                <button
                  type="button"
                  className="card-text-link"
                  onClick={() =>
                    onOpenInquiry({
                      formName: `${s.shortName} Inquiry`,
                      title: `${s.shortName.toUpperCase()} INQUIRY`,
                      eyebrow: `ABTECH LEARNING SERVICES · ${s.shortName}`,
                      subtitle: `Get customized counselling and details for ${s.title}.`,
                      course: getServiceCourse(s.id),
                    })
                  }
                >
                  Inquire Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Parallax Full-Width Feature Section */}
      <section className="parallax-feature-strip">
        <div
          className="parallax-feature-bg"
          style={{ transform: `translate3d(0, ${(scrollY - 900) * 0.15}px, 0)` }}
          aria-hidden="true"
        />
        <div className="container parallax-feature-content">
          <p className="parallax-eyebrow">ACCELERATE YOUR ACADEMIC PROGRESS</p>
          <h2 className="parallax-title">
            Flexible Education. Recognized Certifications. Zero Gaps.
          </h2>
          <p className="parallax-text">
            Whether you are completing 10th or 12th through NIOS/BOSSE, earning distance degrees with IGNOU, or aiming for direct college admissions, our counselors make every step transparent and stress-free.
          </p>
          <div className="parallax-actions">
            <button
              className="button button-white"
              type="button"
              onClick={onOpenInquiry}
            >
              Get Free Admission Guidance ↗
            </button>
            <Link className="button button-outline-white" to="/services">
              View All Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="trust-section">
        <div className="container trust-grid">
          {highlights.map(([number, title, text]) => (
            <article key={number} className="trust-item">
              <span className="number">{number}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Student Reviews Section */}
      <StudentReviews />

      <ContactStrip onOpenInquiry={onOpenInquiry} />
    </>
  );
}
