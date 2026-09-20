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
          <Link to="/services">Services</Link>
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
        <div className="footer-contact-col">
          <h2>Contact Barrackpore Office</h2>
          <address className="footer-address">
            <strong className="footer-org-name">{institute.fullName}</strong>
            
            <div className="footer-contact-item footer-address-item">
              <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{institute.address}</span>
            </div>

            <div className="footer-contact-item">
              <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <a href={`tel:${institute.phone}`} className="footer-contact-link">{institute.phone}</a>
            </div>

            <div className="footer-contact-item">
              <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
              <a href={`mailto:${institute.email}`} className="footer-contact-link">{institute.email}</a>
            </div>

            <div className="footer-contact-item footer-hours-item">
              <svg className="footer-contact-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              <span>Counselling Hours: {institute.hours}</span>
            </div>
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
          <span className="credit-label"> Designed &amp; Maintained By</span>
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

export function AdmissionInquiryModal({ isOpen, onClose, config }) {
  const formName = config?.formName || 'Admission Inquiry';
  const modalTitle = config?.title || (config?.formName ? config.formName.toUpperCase() : 'ADMISSION INQUIRY');
  const modalEyebrow = config?.eyebrow || 'ABTECH LEARNING SERVICES';
  const modalSubtitle =
    config?.subtitle ||
    'Get instant counselling, eligibility checks, and fee details for 2026–2027 admissions.';
  const defaultCourse = config?.course || 'NIOS — Class 10 & 12';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: defaultCourse,
    message: '',
    consent: true,
  });

  const [status, setStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = useRef(null);

  // Sync course if config changes
  useEffect(() => {
    if (isOpen && config?.course) {
      setFormData((prev) => ({
        ...prev,
        course: config.course,
      }));
    }
  }, [isOpen, config]);

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
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'e6072117-2805-49ea-b544-8f319e50a0a4',
          subject: `New ${formName}: ${formData.name} (${formData.course})`,
          from_name: `ABTECH ${formName}`,
          recipient: 'bizelevate.ez@gmail.com',
          form_name: formName,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course_interest: formData.course,
          message: formData.message || `Submitted via ${formName} Form.`,
        }),
      });

      const result = await response.json();

      if (result.success || result.status === 'success') {
        setIsSuccess(true);
        setStatus(`Thank you! Your ${formName.toLowerCase()} has been received. Our expert counsellor will reach out shortly.`);
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: defaultCourse,
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
          <p className="modal-eyebrow">{modalEyebrow}</p>
          <h2 className="modal-title">{modalTitle}</h2>
          <p className="modal-subtitle">{modalSubtitle}</p>
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
              {isSubmitting ? 'Submitting...' : `Submit ${formName} ↗`}
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

export function FloatingContactButtons() {
  const whatsappNumber = '917980874530';
  const callNumber = '+917980874530';
  const defaultMessage = encodeURIComponent('Hello ABTECH, I would like to inquire about admissions and courses.');

  return (
    <div className="floating-contact-wrap" role="region" aria-label="Quick WhatsApp and Phone Contact">
      {/* Direct Call Button */}
      <a
        href={`tel:${callNumber}`}
        className="floating-btn floating-btn-call"
        aria-label="Call ABTECH Counsellor (+91 7980874530)"
        title="Call Us Now (+91 7980874530)"
      >
        <span className="floating-tooltip">Call Us: +91 7980874530</span>
        <svg
          className="floating-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn floating-btn-whatsapp"
        aria-label="Chat with ABTECH on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="floating-tooltip">Chat on WhatsApp</span>
        <span className="floating-pulse-ring" aria-hidden="true"></span>
        <svg
          className="floating-icon"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2ZM12.04 20.13C10.53 20.13 9.07 19.72 7.8 18.96L7.49 18.78L4.38 19.6L5.21 16.57L5.01 16.25C4.19 14.93 3.75 13.44 3.75 11.91C3.75 7.34 7.47 3.62 12.04 3.62C16.61 3.62 20.33 7.34 20.33 11.91C20.33 16.48 16.61 20.13 12.04 20.13ZM16.61 14.39C16.36 14.26 15.13 13.66 14.9 13.58C14.67 13.49 14.51 13.45 14.34 13.7C14.18 13.95 13.7 14.51 13.55 14.68C13.41 14.85 13.26 14.87 13.01 14.74C12.76 14.62 11.97 14.36 11.02 13.52C10.29 12.87 9.8 12.07 9.65 11.82C9.5 11.57 9.63 11.44 9.76 11.31C9.87 11.2 10.01 11.02 10.13 10.88C10.26 10.73 10.3 10.63 10.38 10.46C10.46 10.3 10.42 10.15 10.36 10.03C10.3 9.9 9.81 8.7 9.61 8.2C9.41 7.72 9.21 7.78 9.06 7.77C8.92 7.77 8.75 7.76 8.59 7.76C8.42 7.76 8.16 7.82 7.93 8.07C7.71 8.32 7.07 8.91 7.07 10.13C7.07 11.35 7.95 12.52 8.08 12.69C8.2 12.86 9.83 15.36 12.31 16.43C12.9 16.69 13.36 16.84 13.72 16.95C14.32 17.14 14.86 17.11 15.29 17.05C15.77 16.98 16.77 16.44 16.98 15.86C17.18 15.27 17.18 14.77 17.12 14.67C17.06 14.57 16.86 14.51 16.61 14.39Z" />
        </svg>
      </a>
    </div>
  );
}
