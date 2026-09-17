import { useState } from 'react';
import { PageHeader } from '../components';
import { institute } from '../content';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    course: '',
    message: '',
    consent: false,
  });

  const [status, setStatus] = useState('');
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
    setStatus('Submitting your inquiry...');

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
          message: formData.message || 'No additional message provided.',
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setStatus('Thank you! Your inquiry has been submitted successfully.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          course: '',
          message: '',
          consent: false,
        });
      } else {
        setStatus(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('Failed to reach the server. Please check that Apache/MySQL is running.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="CONTACT US"
        title="Questions are a good place to start."
        description="Tell us where you are in your learning journey. We’ll help you understand the next step."
      />
      <section className="container section contact-grid">
        <div>
          <p className="eyebrow">LET’S TALK</p>
          <h2>Find your way to us.</h2>
          <dl className="contact-details">
            <dt>Visit</dt>
            <dd>{institute.address}</dd>
            <dt>Call</dt>
            <dd>{institute.phone}</dd>
            <dt>Email</dt>
            <dd>{institute.email}</dd>
            <dt>Counselling hours</dt>
            <dd>{institute.hours}</dd>
          </dl>
          <iframe
            className="map"
            title="Institute location map placeholder"
            loading="lazy"
            sandbox=""
            srcDoc={
              '<!doctype html><html lang="en"><body style="margin:0;background:#edf2f4;color:#112b46;font:16px Arial;display:grid;place-content:center;height:100vh;text-align:center"><strong>Institute location</strong><p>Kolkata, West Bengal</p><small>[Add verified map embed]</small></body></html>'
            }
          />
        </div>
        <form className="inquiry-form" onSubmit={submit}>
          <p className="eyebrow">ADMISSION INQUIRY</p>
          <h2>Tell us a little about yourself.</h2>
          <p className="small">All fields marked * are required.</p>
          
          <label htmlFor="name">Full name *</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength="80"
            pattern=".*\S.*"
            value={formData.name}
            onChange={handleChange}
          />
          
          <div className="form-row">
            <div>
              <label htmlFor="phone">Phone number *</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                pattern="\+?[0-9 \(\)\-]{10,18}"
                title="Use 10 to 18 characters: digits, spaces, + at the start, brackets or hyphens."
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <label htmlFor="course">Interested in *</label>
          <select
            id="course"
            name="course"
            required
            value={formData.course}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a course
            </option>
            <option value="Secondary — Class 10">Secondary — Class 10</option>
            <option value="Senior Secondary — Class 12">Senior Secondary — Class 12</option>
            <option value="I need guidance">I need guidance</option>
          </select>
          
          <label htmlFor="message">Your question</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            maxLength="1500"
            placeholder="Tell us about your previous studies or what you’d like to know."
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
            <span>I agree to be contacted regarding my admission inquiry. *</span>
          </label>
          
          <button className="button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit inquiry'}{' '}
            <span aria-hidden="true">↗</span>
          </button>
          
          <p role="status" className={status ? 'notice' : ''}>
            {status}
          </p>
        </form>
      </section>
    </>
  );
}