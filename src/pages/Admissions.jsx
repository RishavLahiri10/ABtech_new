import { Link } from 'react-router-dom';
import { ContactStrip, PageHeader } from '../components';

export default function Admissions() {
  return (
    <>
      <PageHeader
        eyebrow="ADMISSIONS"
        title="Your next chapter starts with one step."
        description="Understand the requirements, explore your options and prepare your application."
      />
      <section className="container section">
        <p className="eyebrow">01 / CHECK YOUR STARTING POINT</p>
        <h2>Find the right level for you.</h2>
        <div className="grid two">
          <article className="card">
            <span className="tag">CLASS 10</span>
            <h3>Secondary</h3>
            <p>
              Generally, learners must be at least 14 years old and have
              completed Class 8, or provide the self-certification permitted by
              NIOS.
            </p>
          </article>
          <article className="card">
            <span className="tag">CLASS 12</span>
            <h3>Senior Secondary</h3>
            <p>
              Generally, learners must be at least 15 years old and have passed
              Secondary from a recognised board.
            </p>
          </article>
        </div>
        <p className="notice">
          Age cut-off dates, supporting documents and examination-gap rules
          depend on the applicable admission cycle. Confirm your case using the{' '}
          <a href="https://sdmis.nios.ac.in/home/faqs">
            official NIOS guidance
          </a>
          .
        </p>
        <h3>Class and stream options</h3>
        <p>
          Explore Secondary or Senior Secondary, with subject combinations
          around humanities, commerce or science. These are planning pathways;
          final combinations depend on NIOS rules and local availability.
        </p>
        {/* PLACEHOLDER: Confirm which NIOS admission streams (1–4) the institute supports. */}
        <p>
          [Add supported NIOS admission streams and current application dates.]
        </p>
        <Link className="text-link" to="/courses">
          Explore subject choices →
        </Link>
      </section>
      <section className="soft-section">
        <div className="container section">
          <p className="eyebrow">02 / A CLEAR PROCESS</p>
          <h2>From your first question to enrollment.</h2>
          <ol className="steps">
            {[
              [
                'Talk to a counsellor',
                'Discuss your previous studies, goals and preferred course.',
              ],
              [
                'Check documents',
                'Review age and address proof, photographs and previous academic records as applicable.',
              ],
              [
                'Choose your subjects',
                'Confirm the admission stream, subject combination and itemised fees.',
              ],
              [
                'Complete the official application',
                'Submit through the NIOS portal, retain payment receipts and track confirmation.',
              ],
            ].map(([title, description], i) => (
              <li key={title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">03 / PLAN AHEAD</p>
            <h2>Fees, without the guesswork.</h2>
          </div>
          <p>
            Amounts are awaiting confirmation.
            <br />
            Request a written breakdown before payment.
          </p>
        </div>
        {/* PLACEHOLDER: Replace every fee with a verified amount and specify inclusions, exclusions and refund terms. */}
        <div className="table-wrap">
          <table>
            <caption>Fee schedule — placeholder amounts</caption>
            <thead>
              <tr>
                <th scope="col">Fee component</th>
                <th scope="col">Secondary</th>
                <th scope="col">Senior Secondary</th>
              </tr>
            </thead>
            <tbody>
              {[
                'NIOS registration fee',
                'NIOS examination / practical fees',
                'Institute guidance fee',
                'Optional tuition / materials',
              ].map((item) => (
                <tr key={item}>
                  <th scope="row">{item}</th>
                  <td>To be confirmed</td>
                  <td>To be confirmed</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">
          Board fees and institute charges are separate. [Add payment schedule
          and cancellation / refund policy.]
        </p>
        <div className="download-box">
          <div>
            <h3>Prepare before your visit.</h3>
            <p>
              Download our sample inquiry form. This is not an official NIOS
              application.
            </p>
          </div>
          <a className="button" href="/admission-inquiry-form.txt" download>
            Download form ↓ <span className="small">TXT</span>
          </a>
        </div>
      </section>
      <ContactStrip />
    </>
  );
}
