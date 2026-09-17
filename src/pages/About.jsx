import { ContactStrip, PageHeader } from '../components';
import { highlights, institute } from '../content';

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow={`ABOUT ${institute.fullName}`}
        title="A different path. The same ambition."
        description="Education can continue even when life takes an unexpected turn."
      />
      <section className="container section grid two">
        <div>
          <p className="eyebrow">ROOTED IN KOLKATA</p>
          <h2>Helping you take the next step with confidence.</h2>
          <p>
            {institute.fullName} is a placeholder identity for an institute
            supporting learners exploring open schooling.
          </p>
          {/* PLACEHOLDER: Add founding year, team background, local history and verified services. */}
          <p>
            [Add the institute’s founding story, experience and approach to
            student support here.]
          </p>
          <h3>Our mission</h3>
          <p>
            Make the route back to education easier to understand, with
            practical guidance, thoughtful subject planning and respect for each
            learner’s circumstances.
          </p>
        </div>
        <div>
          <img
            className="about-image"
            src="/campus-placeholder.webp"
            width="720"
            height="480"
            loading="lazy"
            alt="Placeholder reserved for a photograph of the institute’s Kolkata classroom and counselling space"
          />
          <p className="small">[Add an authentic institute photograph]</p>
        </div>
      </section>
      <section className="soft-section">
        <div className="container section">
          <p className="eyebrow">RECOGNITION & TRANSPARENCY</p>
          <h2>Know the board. Verify the institute.</h2>
          <div className="grid two">
            <article className="card">
              <h3>About NIOS</h3>
              <p>
                The National Institute of Open Schooling provides Secondary and
                Senior Secondary education. Check official information directly
                before making an admission decision.
              </p>
              <a className="text-link" href="https://www.nios.ac.in/">
                Visit the official NIOS website ↗
              </a>
            </article>
            <article className="card">
              <h3>Institute recognition</h3>
              {/* PLACEHOLDER: Insert a valid accreditation number and official verification link only if applicable. */}
              <p>
                [Add verified accreditation or study-centre status, code,
                validity and supporting link.]
              </p>
              <p className="small">
                No NIOS affiliation or accreditation is claimed by this
                demonstration website.
              </p>
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
      <ContactStrip />
    </>
  );
}
