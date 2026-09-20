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
          <Link to="/services">NIOS Services</Link>
          <Link to="/contact">Contact &amp; Location</Link>
        </div>
        <div>
          <h2>NIOS Services</h2>
          <Link to="/services#nios">NIOS (10th &amp; 12th)</Link>
          <Link to="/services#bosse">BOSSE Open Board</Link>
          <Link to="/services#ignou">IGNOU Degrees</Link>
          <Link to="/services#college-admissions">College Admissions</Link>
          <Link to="/services#career-counselling">Career Counselling</Link>
        </div>
        <div>
          <h2>Contact Barrackpore Office</h2>
          <address>
            <strong>{institute.fullName}</strong>
            <br />
            {institute.address}
            <br />
            <a href={`tel:${institute.phone}`}>{institute.phone}</a>
            <br />
            Mail : info@abtechedu.com
            <br />
            <span> Counselling Hours : Monday-Saturday | 10:00AM - 8:00PM</span>
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
