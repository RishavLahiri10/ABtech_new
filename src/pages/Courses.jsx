import { Link } from 'react-router-dom';
import { ContactStrip, PageHeader } from '../components';
import { courses } from '../content';

export default function Courses() {
  return (
    <>
      <PageHeader
        eyebrow="OUR COURSES"
        title="Choose subjects. Create possibilities."
        description="Explore Class 10 and Class 12 pathways with your future goals in mind."
      />
      <section className="container section">
        <p className="notice">
          Illustrative subject lists: availability, codes, practical
          requirements and valid combinations must be confirmed against the
          current NIOS prospectus. [Replace with the institute’s verified
          offerings.]
        </p>
        <div className="grid two">
          {courses.map((course) => (
            <article className="course-card" key={course.level}>
              <div className="course-top">
                <span className="tag">{course.level}</span>
                <h2>{course.title}</h2>
                <p>{course.intro}</p>
              </div>
              <div className="course-body">
                <h3>Languages</h3>
                <ul className="subject-list">
                  {course.languages.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <h3>Other subjects</h3>
                <ul className="subject-list">
                  {course.subjects.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <Link className="text-link" to="/contact">
                  Discuss my subject choices →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="notice">
          A subject combination should also meet the entry requirements of your
          intended college or career pathway. Ask before you apply.
        </p>
      </section>
      <ContactStrip />
    </>
  );
}
