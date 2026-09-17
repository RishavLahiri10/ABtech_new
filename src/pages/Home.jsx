import { Link } from 'react-router-dom';
import { ContactStrip } from '../components';
import { highlights } from '../content';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">
              <span className="short-line" /> A NEW CHAPTER IN LEARNING
            </p>
            <h1>
              Your education.
              <br />
              Your pace.
              <br />
              <em>Your next beginning.</em>
            </h1>
            <p className="lede">
              NIOS Class 10 &amp; Class 12 admission guidance in Kolkata. Find a
              clear path back to learning, with support at every step.
            </p>
            <div className="actions">
              <Link className="button gold" to="/admissions">
                Explore admissions <span aria-hidden="true">↗</span>
              </Link>
              <Link className="text-link" to="/courses">
                Find your course →
              </Link>
            </div>
            <p className="hero-note">
              SECONDARY &amp; SENIOR SECONDARY · OPEN SCHOOLING
            </p>
          </div>
          <div className="hero-picture">
            {/* PLACEHOLDER: Replace with a licensed photo of actual students; update alt text. */}
            <img
              src="/student-placeholder.webp"
              width="720"
              height="800"
              alt="Placeholder reserved for a photograph of students learning together at the Kolkata institute"
              fetchPriority="high"
            />
            <div className="picture-note">
              <span className="note-icon" aria-hidden="true">
                ↗
              </span>
              <div>
                <strong>There’s more than one way forward.</strong>
                <span>Let’s discover yours.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="trust-section">
        <div className="container trust-grid">
          {highlights.map(([number, title, text]) => (
            <article key={number}>
              <span className="number">{number}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LEARNERS & THEIR JOURNEYS</p>
            <h2>A fresh start can change a story.</h2>
          </div>
          <p>
            Space for the voices of your students.
            <br />
            The quotes below are illustrative placeholders.
          </p>
        </div>
        {/* PLACEHOLDER: Publish only genuine testimonials with the student's permission. */}
        <div className="grid three">
          {[
            [
              '“I wanted to continue my studies, but didn’t know where to begin. Having a clear plan made the next step feel possible.”',
              'Student name',
              'Secondary learner',
            ],
            [
              '“Talking through my subject choices helped me understand how to plan for what I wanted to study next.”',
              'Student name',
              'Senior Secondary learner',
            ],
            [
              '“Being able to ask questions about the paperwork made the admission process easier to understand.”',
              'Parent name',
              'Parent of a learner',
            ],
          ].map(([quote, name, detail], i) => (
            <figure className="testimonial" key={i}>
              <span className="quote-mark" aria-hidden="true">
                “
              </span>
              <blockquote>{quote}</blockquote>
              <figcaption>
                <strong>[{name}]</strong>
                <span>{detail} · Sample testimonial</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
