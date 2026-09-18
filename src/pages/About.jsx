import { ContactStrip, PageHeader } from '../components';
import { highlights, institute } from '../content';

export default function About({ onOpenInquiry }) {
  return (
    <>
      <PageHeader
        eyebrow="ABOUT ABTECH"
        title="A different path. The same ambition."
        description="Education can continue even when life takes an unexpected turn. We provide the mentorship, documentation, and pathways to help you move forward."
      />

      <section className="container section grid two">
        <div>
          <p className="eyebrow">ROOTED IN KOLKATA</p>
          <h2>Dedicated to Empowering Learners of All Backgrounds</h2>
          <p>
            <strong>{institute.fullName}</strong> is a specialized educational consultancy and learning support center based in Kolkata. We bridge the gap between aspiring students and recognized educational institutions across India.
          </p>
          <p>
            Whether you are a student looking for a second chance in 10th or 12th through <strong>NIOS</strong> or <strong>BOSSE</strong>, a working professional seeking degree qualifications from <strong>IGNOU</strong>, or a high-school graduate aiming for top <strong>College Admissions</strong>, our team provides trusted, ethical, and personal guidance.
          </p>
          <h3>Our Mission</h3>
          <p>
            To make education accessible, flexible, and career-oriented for every student, eliminating hesitation and building confidence through personalized counselling and transparent guidance.
          </p>
        </div>

        <div className="about-visual-card">
          <div className="about-card-inner">
            <img
              src="/logo.png"
              alt="ABTECH Logo"
              className="about-brand-logo"
            />
            <h3>ABTECH Learning Services</h3>
            <p>Your Trusted Educational Partner in Kolkata</p>
            <ul className="about-bullets">
              <li>✓ NIOS Class 10 &amp; 12 Open Schooling</li>
              <li>✓ BOSSE Board Admission Support</li>
              <li>✓ IGNOU UG/PG Degree Guidance</li>
              <li>✓ College Admission &amp; Seat Counselling</li>
              <li>✓ Professional 1-on-1 Career Mentorship</li>
            </ul>
            <button
              type="button"
              className="button button-maroon button-block"
              onClick={onOpenInquiry}
            >
              Get Free Counselling ↗
            </button>
          </div>
        </div>
      </section>

      <section className="soft-section">
        <div className="container section">
          <p className="eyebrow">RECOGNITION &amp; TRANSPARENCY</p>
          <h2>Know the Boards &amp; Universities. Verify the Process.</h2>
          <div className="grid two">
            <article className="card">
              <h3>National Institute of Open Schooling (NIOS)</h3>
              <p>
                Established by the Ministry of Education, Govt. of India. Secondary &amp; Senior Secondary certificates are recognized on par with CBSE &amp; ICSE for NEET, JEE, UPSC, and all central/state university admissions.
              </p>
              <a
                className="text-link"
                href="https://www.nios.ac.in/"
                target="_blank"
                rel="noreferrer"
              >
                Visit official NIOS portal (nios.ac.in) ↗
              </a>
            </article>

            <article className="card">
              <h3>IGNOU &amp; University Admissions</h3>
              <p>
                IGNOU degrees are approved by UGC-DEB and AICTE. For regular college admissions, we guide students through verified eligibility criteria, fee structures, and application timelines for recognized institutes.
              </p>
              <a
                className="text-link"
                href="https://ignou.ac.in/"
                target="_blank"
                rel="noreferrer"
              >
                Visit official IGNOU portal (ignou.ac.in) ↗
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="container section">
        <p className="eyebrow">WHY CHOOSE US</p>
        <h2>Guidance that keeps you informed.</h2>
        <div className="grid two">
          {highlights.map(([id, title, text]) => (
            <article className="reason" key={id}>
              <span className="number">{id}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactStrip onOpenInquiry={onOpenInquiry} />
    </>
  );
}
