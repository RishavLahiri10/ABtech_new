import { PageHeader, ContactStrip } from '../components';
import { services } from '../content';

export default function Services({ onOpenInquiry }) {
  return (
    <>
      <PageHeader
        eyebrow="ACCREDITED &amp; RECOGNIZED PROGRAM GUIDANCE"
        title="Our Educational Services"
        description="Comprehensive academic pathways, board admissions, university degrees, and career counselling designed to help you succeed."
      />

      <section className="container section">
        <div className="services-intro-banner">
          <div>
            <h2>Empowering Every Learner in Kolkata &amp; Pan-India</h2>
            <p>
              Whether you are looking to complete your 10th or 12th through recognized open schooling, pursue distance university degrees, secure top regular college seats, or need clarity on your future career, ABTECH provides step-by-step guidance.
            </p>
          </div>
          <button
            className="button button-maroon"
            type="button"
            onClick={onOpenInquiry}
          >
            Speak to a Counsellor ↗
          </button>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article className="service-card" id={service.id} key={service.id}>
              <div className="service-card-header">
                <div className="service-tags">
                  <span className="badge badge-white">{service.category}</span>
                  <span className="badge badge-accent">{service.badge}</span>
                </div>
                <h2 className="service-title">{service.shortName}</h2>
                <h3 className="service-subtitle">{service.title}</h3>
              </div>

              <div className="service-card-body">
                <p className="service-desc">{service.description}</p>

                <h4 className="service-features-title">Key Highlights &amp; Support:</h4>
                <ul className="service-features-list">
                  {service.features.map((feature, idx) => (
                    <li key={idx}>
                      <span className="bullet-icon">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="service-card-action">
                  <button
                    className="button button-maroon button-block"
                    type="button"
                    onClick={onOpenInquiry}
                  >
                    Inquire for {service.shortName} ↗
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container section why-choose-wrapper">
        <div className="section-heading-center">
          <p className="eyebrow">WHY CHOOSE ABTECH</p>
          <h2>Guiding Students to Academic &amp; Career Milestones</h2>
          <p className="lede-center">
            Reliable advice, transparent fee structures, and end-to-end documentation assistance at every step.
          </p>
        </div>

        <div className="grid three">
          <div className="feature-box">
            <div className="feature-icon">01</div>
            <h3>100% Genuine Guidance</h3>
            <p>
              Direct guidance for Govt. recognized boards (NIOS, BOSSE) and UGC-DEB approved universities (IGNOU &amp; premier colleges).
            </p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">02</div>
            <h3>Assignment &amp; Exam Support</h3>
            <p>
              Comprehensive help with Tutor Marked Assignments (TMA), practical projects, exam registration, and study material assistance.
            </p>
          </div>
          <div className="feature-box">
            <div className="feature-icon">03</div>
            <h3>Career Mentorship</h3>
            <p>
              Strategic advice to help bridge academic gaps and unlock admission opportunities in competitive exams and colleges.
            </p>
          </div>
        </div>
      </section>

      <ContactStrip onOpenInquiry={onOpenInquiry} />
    </>
  );
}
