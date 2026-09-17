import { Link } from 'react-router-dom';
import { useStudent } from './StudentContext';

export default function StudentDashboard({ onLogin }) {
  const { student, logout } = useStudent();
  if (!student) {
    return (
      <section className="container section account-gate">
        <p className="eyebrow">STUDENT DASHBOARD</p>
        <h1>Log in to continue.</h1>
        <p>
          Your profile and application overview appear here after you log in.
        </p>
        <button className="button" onClick={onLogin}>
          Student login
        </button>
      </section>
    );
  }
  return (
    <section className="container section dashboard">
      <div className="section-heading">
        <div>
          <p className="eyebrow">STUDENT DASHBOARD</p>
          <h1>Welcome, {student.fullName}.</h1>
        </div>
        <button className="button" onClick={logout}>
          Log out
        </button>
      </div>
      <p className="notice">
        Demo session only. No real account or admission application has been
        created. Your session ends when you refresh.
      </p>
      <div className="grid two">
        <article className="card">
          <h2>Your profile</h2>
          <dl className="contact-details">
            <dt>Full name</dt>
            <dd>{student.fullName}</dd>
            <dt>Email address</dt>
            <dd>{student.email}</dd>
            <dt>Account</dt>
            <dd>Frontend demo</dd>
          </dl>
        </article>
        <article className="card">
          <p className="eyebrow">APPLICATION OVERVIEW</p>
          <h2>Plan your next step.</h2>
          <span className="tag">{student.applicationStatus}</span>
          <p>
            No application has been submitted. Explore the admission
            requirements before preparing your documents.
          </p>
          <Link className="text-link" to="/admissions">
            View admission guidance →
          </Link>
        </article>
      </div>
    </section>
  );
}
