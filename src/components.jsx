import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { institute, services } from './content';
export { default as StudentReviews } from './StudentReviews';

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label={`${institute.fullName} home`}>
      <img
        src="/logo.png"
        alt="ABTECH Educational & Learning Services"
        className="brand-logo-img"
      />
      <div className="brand-text">
        <span className="brand-title">ABTECH</span>
        <span className="brand-subtitle">EDUCATIONAL &amp; LEARNING SERVICES</span>
      </div>
    </Link>
  );
}

export function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-header">
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {description && <p className="lede">{description}</p>}
      </div>
    </section>
  );
}

export function ContactStrip({ onOpenInquiry }) {
  return (
    <section className="contact-strip">
      <div className="container strip-inner">
        <div>
          <p className="eyebrow strip-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>Let’s find your way forward.</h2>
          <p>
            Get personalized guidance on NIOS, BOSSE, IGNOU, College Admissions, or Career Counselling.
          </p>
        </div>
        <div className="strip-actions">
          {onOpenInquiry ? (
            <button className="button button-white" onClick={onOpenInquiry} type="button">
              Inquire Now <span aria-hidden="true">↗</span>
            </button>
          ) : (
            <Link className="button button-white" to="/contact">
              Inquire Now <span aria-hidden="true">↗</span>
            </Link>
          )}
          <Link className="button button-outline-white" to="/contact">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-brand-col">
          <Brand />
          <p className="footer-tagline">
            Empowering students with accessible, accredited, and career-focused education pathways in Kolkata and across India.
          </p>
          <p className="small footer-note">
            Educational consultancy and guidance services.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/contact">Contact &amp; Location</Link>
        </div>
        <div>
          <h2>Services</h2>
          <Link to="/services#nios">NIOS (10th &amp; 12th)</Link>
          <Link to="/services#bosse">BOSSE Open Board</Link>
          <Link to="/services#ignou">IGNOU Degrees</Link>
          <Link to="/services#college-admissions">College Admissions</Link>
          <Link to="/services#career-counselling">Career Counselling</Link>
        </div>
        <div>
          <h2>Contact Kolkata Office</h2>
          <address>
            <strong>{institute.fullName}</strong>
            <br />
            {institute.address}
            <br />
            <a href={`tel:${institute.phone}`}>{institute.phone}</a>
            <br />
            <a href={`mailto:${institute.email}`}>{institute.email}</a>
            <br />
            <span className="small">{institute.hours}</span>
          </address>
        </div>
      </div>
      <div className="container footer-bottom">
        <div className="footer-bottom-left">
          <span>
            © {new Date().getFullYear()} {institute.fullName}. All rights reserved.
          </span>
          <span className="footer-subtext">
            NIOS · BOSSE · IGNOU · College Admissions · Career Counselling Guidance
          </span>
        </div>
        <div className="footer-developer-credit">
          <span className="credit-label">Website Designed &amp; Maintained By</span>
          <div className="credit-brand">
            <img
              src="/bizelevate-logo.png"
              alt="BizElevate Logo"
              className="developer-logo"
            />
            <span className="credit-name">BizElevate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function TestimonialSlider() {
  const testimonials = [
    {
      id: 1,
      name: 'Rahul Sen',
      course: 'NIOS Class 12 (TOC) · Passed with 78%',
      avatar: '/avatars/student1.jpg',
      quote:
        '“I had a 2-year gap after failing Class 12 and thought college was out of reach. ABTECH guided me through NIOS with TOC, and I cleared in the very next cycle. Today I am pursuing B.Com Honours!”',
      location: 'Kolkata, WB',
      rating: 5,
    },
    {
      id: 2,
      name: 'Priya Mukherjee',
      course: 'IGNOU BCA Degree Learner',
      avatar: '/avatars/student2.jpg',
      quote:
        '“Getting into IGNOU for my Bachelor’s while working full-time was seamless. Their assignment guidance, project synopsis support, and exam updates made distance learning completely stress-free.”',
      location: 'Barrackpore, WB',
      rating: 5,
    },
    {
      id: 3,
      name: 'Suman Das',
      course: 'B.Tech College Admission Guidance',
      avatar: '/avatars/student3.jpg',
      quote:
        '“The career counselling session cleared all my confusion regarding college streams and quotas. Highly recommend their admission guidance for engineering and management colleges in Kolkata.”',
      location: 'Kolkata, WB',
      rating: 5,
    },
    {
      id: 4,
      name: 'Ananya Roy',
      course: 'BOSSE Sr. Secondary & Skill Certification',
      avatar: '/avatars/student4.jpg',
      quote:
        '“BOSSE open schooling was the best decision for my flexible skill education. ABTECH handled all my registration, syllabus mapping, and practicals with extreme dedication.”',
      location: 'North 24 Parganas, WB',
      rating: 5,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div
      className="testimonial-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Student Success Testimonials"
    >
      <div className="testimonial-slider-track">
        {testimonials.map((item, idx) => {
          let slideClass = 'slide-next';
          if (idx === currentIndex) {
            slideClass = 'slide-active';
          } else if (
            idx === currentIndex - 1 ||
            (currentIndex === 0 && idx === testimonials.length - 1)
          ) {
            slideClass = 'slide-prev';
          }

          return (
            <article
              key={item.id}
              className={`testimonial-slide-item ${slideClass}`}
              aria-hidden={idx !== currentIndex}
            >
              <div className="testimonial-card-inner">
                <div className="testimonial-top-row">
                  <div className="testimonial-user-profile">
                    <div className="testimonial-avatar-frame">
                      <img
                        src={item.avatar}
                        alt={`${item.name} profile`}
                        className="testimonial-avatar-photo"
                      />
                      <span className="verified-badge-icon" title="Verified Learner">
                        ✓
                      </span>
                    </div>
                    <div className="testimonial-user-info">
                      <h3 className="testimonial-user-name">{item.name}</h3>
                      <p className="testimonial-user-course">{item.course}</p>
                      <div className="testimonial-rating-stars">
                        {'★'.repeat(item.rating)}
                        <span className="rating-label">5.0 Verified Student</span>
                      </div>
                    </div>
                  </div>
                  <span className="testimonial-quote-symbol" aria-hidden="true">
                    “
                  </span>
                </div>

                <blockquote className="testimonial-quote-text">
                  {item.quote}
                </blockquote>

                <div className="testimonial-bottom-row">
                  <span className="testimonial-loc-tag">📍 {item.location}</span>
                  <span className="testimonial-status-badge">Admission Verified</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="testimonial-slider-nav">
        <button
          type="button"
          className="slider-arrow-btn prev-arrow"
          onClick={prevSlide}
          aria-label="Previous testimonial"
        >
          ‹
        </button>

        <div className="slider-dot-indicators">
          {testimonials.map((t, dotIdx) => (
            <button
              key={t.id}
              type="button"
              className={`slider-dot-pill ${dotIdx === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
            >
              <span className="sr-only">Slide {dotIdx + 1}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="slider-arrow-btn next-arrow"
          onClick={nextSlide}
          aria-label="Next testimonial"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export function AdmissionInquiryModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: 'NIOS — Class 10 & 12',
    message: '',
    consent: true,
  });

  const [status, setStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  async function submit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting your inquiry...');
    setIsSuccess(false);

    try {
      const response = await fetch('https://abtech.byte4ge.shop/api/V1/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course_interest: formData.course,
          message: formData.message || 'Submitted via Admission Inquiry Popup.',
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setIsSuccess(true);
        setStatus('Thank you! Your admission inquiry has been received. Our expert counsellor will reach out shortly.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: 'NIOS — Class 10 & 12',
          message: '',
          consent: true,
        });
        setTimeout(() => {
          onClose();
        }, 3500);
      } else {
        setIsSuccess(false);
        setStatus(`Error: ${result.message || 'Submission failed. Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setIsSuccess(false);
      setStatus('Unable to connect to the server. Please call us directly or try again later.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="inquiry-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="inquiry-modal-content"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-btn"
          type="button"
          onClick={onClose}
          aria-label="Close inquiry dialog"
        >
          ✕
        </button>

        <div className="modal-header">
          <p className="modal-eyebrow">ABTECH LEARNING SERVICES</p>
          <h2 className="modal-title">ADMISSION INQUIRY</h2>
          <p className="modal-subtitle">
            Get instant counselling, eligibility checks, and fee details for 2026-2027 admissions.
          </p>
        </div>

        {isSuccess ? (
          <div className="modal-success-box">
            <div className="success-icon">✓</div>
            <h3>Inquiry Submitted Successfully!</h3>
            <p>{status}</p>
            <button className="button button-maroon" onClick={onClose} type="button">
              Close
            </button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={submit}>
            <div className="form-group">
              <label htmlFor="modal-name">Full Name *</label>
              <input
                id="modal-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength="80"
                placeholder="Enter your student or guardian name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="modal-phone">Phone Number *</label>
                <input
                  id="modal-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="\+?[0-9 \(\)\-]{10,18}"
                  required
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-email">Email Address *</label>
                <input
                  id="modal-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="modal-course">Service / Course of Interest *</label>
              <select
                id="modal-course"
                name="course"
                required
                value={formData.course}
                onChange={handleChange}
              >
                <option value="NIOS — Class 10 & 12">NIOS (Class 10 &amp; Class 12)</option>
                <option value="BOSSE — Open Board">BOSSE (Board of Open Schooling)</option>
                <option value="IGNOU — Degree & Diploma">IGNOU (UG/PG Degrees &amp; Diplomas)</option>
                <option value="Guidance College Admissions">GUIDANCE COLLEGE ADMISSIONS</option>
                <option value="Career Counselling">CAREER COUNSELLING</option>
                <option value="General Admission Guidance">General Admission Guidance</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="modal-message">Questions or Specific Requirements</label>
              <textarea
                id="modal-message"
                name="message"
                rows="3"
                maxLength="1000"
                placeholder="Share your current qualification or query (e.g. Failed in 12th, Distance BCA, etc.)"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <label className="checkbox-label">
              <input
                type="checkbox"
                required
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <span>I agree to receive admission details and counseling calls from ABTECH. *</span>
            </label>

            <button
              className="button button-maroon button-block"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Admission Inquiry ↗'}
            </button>

            {status && !isSuccess && (
              <p className="modal-status-error" role="alert">
                {status}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
