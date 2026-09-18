import { Link } from 'react-router-dom';
import { ContactStrip } from '../components';
import { highlights, services } from '../content';

export default function Home({ onOpenInquiry }) {
  return (
    <>
      <section className="hero">
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

          <div className="hero-picture">
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
      <section className="container section">
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
          {services.map((s) => (
            <div className="home-service-card" key={s.id}>
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

      {/* Testimonials */}
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SUCCESS STORIES</p>
            <h2>A fresh start can change everything.</h2>
          </div>
          <p className="section-subtext">
            Inspiring journeys of students who continued their education with ABTECH.
          </p>
        </div>

        <div className="grid three">
          {[
            [
              '“I had a gap after failing 12th standard and thought college was out of reach. ABTECH guided me through NIOS with TOC, and I cleared in the very next cycle.”',
              'Rahul Sen',
              'NIOS 12th Completed · Now in B.Com',
            ],
            [
              '“Getting into IGNOU for my Bachelor’s while working full-time was seamless. Their assignment guidance and counselling made all the difference.”',
              'Priya Mukherjee',
              'IGNOU BCA Learner',
            ],
            [
              '“The career counselling session cleared all my confusion regarding college streams. Highly recommend their admission guidance in Kolkata.”',
              'Suman Das',
              'College Admission Aspirant',
            ],
          ].map(([quote, name, detail], i) => (
            <figure className="testimonial" key={i}>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{quote}</blockquote>
              <figcaption>
                <strong>{name}</strong>
                <span>{detail}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <ContactStrip onOpenInquiry={onOpenInquiry} />
    </>
  );
}
