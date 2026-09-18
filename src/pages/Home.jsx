import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< Updated upstream
import { ContactStrip, StudentReviews } from '../components';
=======
import { ContactStrip, TestimonialSlider } from '../components';
>>>>>>> Stashed changes
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
            <p className="eyebrow hero-eyebrow">
              <span className="short-line" /> ADMISSION GUIDANCE &amp; COUNSELLING · KOLKATA
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

            <div className="actions">
              <button
                className="button button-maroon"
                type="button"
                onClick={onOpenInquiry}
              >
                Inquire Now <span aria-hidden="true">↗</span>
              </button>
              <Link className="button button-outline-maroon" to="/services">
                Explore Services →
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
                  onClick={onOpenInquiry}
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

      {/* Testimonials Slider Section */}
      <section className="container section testimonials-section-wrap">
        <div className="section-heading-center">
          <p className="eyebrow">SUCCESS STORIES &amp; EXPERIENCES</p>
          <h2>A Fresh Start Can Change Everything</h2>
          <p className="lede-center">
            Inspiring journeys of students who continued their education and secured admissions with ABTECH.
          </p>
        </div>

        <TestimonialSlider />
      </section>


      <StudentReviews />

      <ContactStrip onOpenInquiry={onOpenInquiry} />
    </>
  );
}
