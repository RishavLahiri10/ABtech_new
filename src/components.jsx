import { Link } from 'react-router-dom';
import { institute } from './content';

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label={`${institute.fullName} home`}>
      <span className="brand-mark" aria-hidden="true">
        AB
      </span>
      <span className="brand-name">{institute.fullName}</span>
    </Link>
  );
}
export function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-header">
      <div className="container">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{description}</p>
      </div>
    </section>
  );
}
export function ContactStrip() {
  return (
    <section className="contact-strip">
      <div className="container strip-inner">
        <div>
          <p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>Let’s find your way forward.</h2>
          <p>
            Ask about eligibility, subject choices or the admission process.
          </p>
        </div>
        <Link className="button gold" to="/contact">
          Talk to our team <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Brand />
          <p>Every learner deserves a way forward.</p>
          <p className="small">
            Demonstration website · Institute details pending verification.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <Link to="/about">About the institute</Link>
          <Link to="/admissions">Admissions</Link>
          <Link to="/courses">Our courses</Link>
        </div>
        <div>
          <h2>Find us in Kolkata</h2>
          <address>
            {institute.address}
            <br />
            {institute.phone}
            <br />
            {institute.email}
          </address>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {institute.fullName}
        </span>
        <span>
          Independent institute template · Not the official NIOS website
        </span>
      </div>
    </footer>
  );
}
