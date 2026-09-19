import { PageHeader, ContactStrip } from '../components';
import { services } from '../content';

export default function Services({ onOpenInquiry }) {
  return (
    <>
      <PageHeader
        eyebrow="ACCREDITED &amp; RECOGNIZED PROGRAM GUIDANCE"
        title="NIOS Services &amp; Educational Guidance"
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

                {service.id === 'nios' && (
                  <div className="service-doc-link-wrap">
                    <a
                      href="https://sdmis.nios.ac.in/static/dist/images/pdf/subjects-available/subjects-available.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="service-doc-link"
                    >
                      📄 Download Official NIOS Available Subject List (PDF) ↗
                    </a>
                  </div>
                )}

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

      {/* Syllabus Section (Class X & Class XII) */}
      <section className="container section syllabus-section" id="syllabus">
        <div className="section-heading-center">
          <p className="eyebrow">ACADEMIC CURRICULUM &amp; SYLLABUS</p>
          <h2>NIOS Class X &amp; Class XII Syllabus</h2>
          <p className="lede-center">
            Comprehensive subject lists, curriculum structure, and official course study material for Secondary and Senior Secondary open schooling.
          </p>
        </div>

        <div className="syllabus-grid">
          {/* Class X Syllabus */}
          <div className="syllabus-card" id="syllabus-class-10">
            <div className="syllabus-card-header">
              <span className="badge badge-accent">SECONDARY LEVEL</span>
              <h3>Class X Syllabus</h3>
              <p>NIOS 10th Standard Academic &amp; Vocational Curriculum</p>
            </div>

            <div className="syllabus-card-body">
              <div className="syllabus-group">
                <h4 className="syllabus-group-title">Languages (Group A):</h4>
                <div className="syllabus-tags">
                  <span className="syllabus-tag">Hindi (201)</span>
                  <span className="syllabus-tag">English (202)</span>
                  <span className="syllabus-tag">Bengali (203)</span>
                  <span className="syllabus-tag">Urdu (206)</span>
                  <span className="syllabus-tag">Sanskrit (209)</span>
                </div>
              </div>

              <div className="syllabus-group">
                <h4 className="syllabus-group-title">Core &amp; Skill Subjects (Group B):</h4>
                <ul className="syllabus-subject-list">
                  <li>
                    <strong>Mathematics (211)</strong>
                    <span>Algebra, Geometry, Trigonometry, Statistics &amp; Mensuration</span>
                  </li>
                  <li>
                    <strong>Science &amp; Technology (212)</strong>
                    <span>Physics, Chemistry, Biology &amp; Practical Experiments</span>
                  </li>
                  <li>
                    <strong>Social Science (213)</strong>
                    <span>History, Geography, Political Science &amp; Economics</span>
                  </li>
                  <li>
                    <strong>Economics (214) &amp; Business Studies (215)</strong>
                    <span>Basic Commerce, Financial Awareness &amp; Trade</span>
                  </li>
                  <li>
                    <strong>Data Entry Operations (229)</strong>
                    <span>Basics of Computers, MS Office, Spreadsheets &amp; IT Skills</span>
                  </li>
                  <li>
                    <strong>Home Science (216) &amp; Painting (225)</strong>
                    <span>Resource Management, Nutrition, Theory &amp; Art Practical</span>
                  </li>
                  <li>
                    <strong>Indian Culture &amp; Heritage (223) / Psychology (222)</strong>
                    <span>Cultural Diversity, Ethics &amp; Behavioral Science</span>
                  </li>
                </ul>
              </div>

              <div className="syllabus-action-wrap">
                <a
                  href="https://rcpune.nios.ac.in/secondary-courses-materials"
                  target="_blank"
                  rel="noreferrer"
                  className="button button-outline-maroon button-block"
                >
                  Download Class X Official Syllabus &amp; Books (PDF) ↗
                </a>
              </div>
            </div>
          </div>

          {/* Class XII Syllabus */}
          <div className="syllabus-card" id="syllabus-class-12">
            <div className="syllabus-card-header">
              <span className="badge badge-accent">SR. SECONDARY LEVEL</span>
              <h3>Class XII Syllabus</h3>
              <p>NIOS 12th Standard Science, Commerce &amp; Humanities Streams</p>
            </div>

            <div className="syllabus-card-body">
              <div className="syllabus-group">
                <h4 className="syllabus-group-title">Science Stream:</h4>
                <ul className="syllabus-subject-list">
                  <li>
                    <strong>Physics (312) &amp; Chemistry (313)</strong>
                    <span>Mechanics, Thermodynamics, Optics, Organic &amp; Inorganic Chemistry</span>
                  </li>
                  <li>
                    <strong>Biology (314) &amp; Mathematics (311)</strong>
                    <span>Genetics, Physiology, Calculus, Vectors &amp; Probability</span>
                  </li>
                  <li>
                    <strong>Computer Science (330) &amp; Env. Science (333)</strong>
                    <span>C++/Python Basics, Data Structures &amp; Ecology</span>
                  </li>
                </ul>
              </div>

              <div className="syllabus-group">
                <h4 className="syllabus-group-title">Commerce Stream:</h4>
                <ul className="syllabus-subject-list">
                  <li>
                    <strong>Accountancy (320) &amp; Business Studies (319)</strong>
                    <span>Financial Accounting, Partnership, Company Accounts &amp; Marketing</span>
                  </li>
                  <li>
                    <strong>Economics (318)</strong>
                    <span>Micro &amp; Macro Economics, Indian Economic Development</span>
                  </li>
                </ul>
              </div>

              <div className="syllabus-group">
                <h4 className="syllabus-group-title">Humanities &amp; Languages:</h4>
                <ul className="syllabus-subject-list">
                  <li>
                    <strong>History (315), Geography (316) &amp; Pol. Science (317)</strong>
                    <span>World History, Physical Geography, Constitution &amp; Governance</span>
                  </li>
                  <li>
                    <strong>Sociology (331), Psychology (328) &amp; Mass Comm (335)</strong>
                    <span>Social Institutions, Human Development &amp; Media Studies</span>
                  </li>
                  <li>
                    <strong>Languages:</strong>
                    <span>English (302), Hindi (301), Bengali (303), Sanskrit (309)</span>
                  </li>
                </ul>
              </div>

              <div className="syllabus-action-wrap">
                <a
                  href="https://rcpune.nios.ac.in/senior-secondary-courses-material"
                  target="_blank"
                  rel="noreferrer"
                  className="button button-outline-maroon button-block"
                >
                  Download Class XII Official Syllabus &amp; Books (PDF) ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container section why-choose-wrapper">
        <div className="section-heading-center">
          <p className="eyebrow">WHY CHOOSE ABTECH ?</p>
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
