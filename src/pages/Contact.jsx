import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components';
import { institute } from '../content';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const serviceParam = (searchParams.get('service') || '').toLowerCase();
  const typeParam = (searchParams.get('type') || '').toLowerCase();

  const getInitialCourse = () => {
    if (serviceParam.includes('bosse')) return 'BOSSE — Open Board';
    if (serviceParam.includes('ignou')) return 'IGNOU — Degree & Diploma';
    if (serviceParam.includes('college')) return 'Guidance College Admissions';
    if (serviceParam.includes('career')) return 'Career Counselling';
    return 'NIOS — Class 10 & 12';
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: getInitialCourse(),
    message: '',
    consent: false,
  });

  // Sync course when URL query changes
  useEffect(() => {
    if (serviceParam) {
      setFormData((prev) => ({
        ...prev,
        course: getInitialCourse(),
      }));
    }
  }, [serviceParam]);

  const getFormTitle = (course) => {
    if (course.includes('BOSSE')) {
      return typeParam === 'admission' ? 'BOSSE Admission Form' : 'BOSSE General Inquiry';
    }
    if (course.includes('IGNOU')) {
      return typeParam === 'admission' ? 'IGNOU Admission Form' : 'IGNOU General Inquiry';
    }
    if (course.includes('College')) {
      return 'College Admissions Inquiry';
    }
    if (course.includes('Career')) {
      return 'Career Counselling Inquiry';
    }
    return 'Contact Us';
  };

  const currentFormTitle = getFormTitle(formData.course);

  const [status, setStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setStatus('Submitting your message...');
    setIsSuccess(false);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'cc414274-b95e-4c25-8862-35a72a564591',
          subject: currentFormTitle === 'Contact Us'
            ? `New Contact Message: ${formData.name} (${formData.course})`
            : `New ${currentFormTitle}: ${formData.name} (${formData.course})`,
          from_name: `ABTECH ${currentFormTitle}`,
          recipient: 'abtechlearning@gmail.com',
          form_name: currentFormTitle,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course_interest: formData.course,
          message: formData.message || `Submitted via ${currentFormTitle} on Contact Page.`,
        }),
      });

      const result = await response.json();

      if (result.success || result.status === 'success') {
        setIsSuccess(true);
        setStatus(
          currentFormTitle === 'Contact Us'
            ? 'Thank you! Your message has been submitted successfully. Our team will contact you shortly.'
            : `Thank you! Your ${currentFormTitle.toLowerCase()} has been submitted successfully. Our admission team will contact you shortly.`
        );
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: getInitialCourse(),
          message: '',
          consent: false,
        });
      } else {
        setIsSuccess(false);
        setStatus(`Error: ${result.message || 'Submission failed. Please try again.'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setIsSuccess(false);
      setStatus('Failed to reach the server. Please call or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="CONTACT ABtech learning & educational services"
        title="Questions are a good place to start."
        description="Tell us where you are in your learning journey. Our academic counsellors in Kolkata will help you understand the right next step."
      />

      <section className="container section contact-grid">
        <div className="contact-info-col">
          <p className="eyebrow">LET’S TALK</p>
          <h2>Visit Our Kolkata Office or Reach Out Online</h2>
          <p>
            Have questions about NIOS eligibility, IGNOU distance courses, BOSSE board, college cutoffs, or career direction? Get in touch with us today.
          </p>

          <dl className="contact-details">
            <dt>Office Address</dt>
            <dd>{institute.address}</dd>
            <dt>Phone / Helpline</dt>
            <dd>
              <a href={`tel:${institute.phone}`}>{institute.phone}</a>
            </dd>
            <dt>Email Address</dt>
            <dd>
              <a href={`mailto:${institute.email}`}>{institute.email}</a>
            </dd>
            <dt>Counselling Hours</dt>
            <dd>{institute.hours}</dd>
          </dl>

          <div className="contact-card-highlight">
            <h4>Quick Admission Assistance</h4>
            <p>
              Walk-in counselling is available Monday through Saturday. Book an appointment or submit the inquiry form for prioritized assistance.
            </p>
          </div>
        </div>

        <div className="contact-form-col">
          <form className="inquiry-form" onSubmit={submit}>
            <h2>{currentFormTitle}</h2>
            <p className="small">All fields marked are required.</p>

            <label htmlFor="name">Full Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              maxLength="80"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={handleChange}
            />

            <div className="form-row">
              <div>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  pattern="\+?[0-9 \(\)\-]{10,18}"
                  placeholder="+91 0000000000"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label htmlFor="course">Service of Interest *</label>
            <select
              id="course"
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

            <label htmlFor="message">Your Question or Academic Background</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              maxLength="1500"
              placeholder="Tell us about your previous class, board, stream, or what you would like to study next."
              value={formData.message}
              onChange={handleChange}
            />

            <label className="checkbox">
              <input
                type="checkbox"
                required
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
              />
              <span>I agree to be contacted by ABTECH regarding my admission &amp; course inquiry. *</span>
            </label>

            <button className="button button-maroon button-block" type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? 'Sending message...'
                : currentFormTitle === 'Contact Us'
                  ? 'Send Message ↗'
                  : `Submit ${currentFormTitle} ↗`}
            </button>

            {status && (
              <p
                role="status"
                className={isSuccess ? 'notice notice-success' : 'notice notice-error'}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  );
}