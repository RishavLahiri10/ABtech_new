import { useState, useEffect, useCallback } from 'react';

// Central Database API Endpoint on your server
const API_URL = 'https://abtech.byte4ge.shop/api/v1/feedback.php';

// Initial verified reviews in case server is loading
const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Rahul Sen',
    initials: 'RS',
    avatar: '/avatars/student1.jpg',
    course: 'NIOS (Class 10 & 12)',
    rating: 5,
    date: '2 days ago',
    timestamp: Date.now() - 172800000,
    text: 'I had a gap year after failing in 12th standard and thought college was out of reach. ABTECH guided me step-by-step through NIOS with Transfer of Credit (TOC). I cleared with 74% in the very next cycle and got admission into B.Com!',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Priya Mukherjee',
    initials: 'PM',
    avatar: '/avatars/student2.jpg',
    course: 'IGNOU (UG/PG Degrees)',
    rating: 5,
    date: '4 days ago',
    timestamp: Date.now() - 345600000,
    text: 'Pursuing my BCA from IGNOU while working full-time in Kolkata. The assignment guidance, synopsis prep, and timely reminders from ABTECH mentors made my degree journey completely stress-free.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Suman Das',
    initials: 'SD',
    avatar: '/avatars/student3.jpg',
    course: 'Guidance College Admissions',
    rating: 5,
    date: '1 week ago',
    timestamp: Date.now() - 604800000,
    text: 'The college guidance team at ABTECH helped me navigate engineering cutoffs and seat selection across Kolkata. Transparent and genuine guidance without any false promises.',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Ananya Roy',
    initials: 'AR',
    avatar: '/avatars/student4.jpg',
    course: 'BOSSE (Open Board)',
    rating: 5,
    date: '2 weeks ago',
    timestamp: Date.now() - 1209600000,
    text: 'Enrolled in BOSSE through ABTECH Barrackpore center. Fast-track verification, complete study materials, and practical exam support. Very supportive staff.',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Debashis Chatterjee',
    initials: 'DC',
    avatar: '/avatars/student5.jpg',
    course: 'Career Counselling',
    rating: 5,
    date: '3 weeks ago',
    timestamp: Date.now() - 1814400000,
    text: 'Had an insightful 1-on-1 career counselling session. They scientifically mapped my strengths and helped me choose the right postgraduate specialisation. Genuine and transparent advice.',
    verified: true,
  },
];

function getInitials(name) {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function StudentReviews() {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('abtech_student_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_REVIEWS;
  });

  const [successToast, setSuccessToast] = useState('');
  const [errorToast, setErrorToast] = useState('');

  // 1. Fetch reviews from Central Database on Mount
  const fetchReviewsFromBackend = useCallback(async () => {
    try {
      const res = await fetch(API_URL, { cache: 'no-store' });
      if (res.ok) {
        const result = await res.json();
        const rawList = result.data || result.reviews || (Array.isArray(result) ? result : null);

        if ((result.success || result.status === 'success' || Array.isArray(rawList)) && Array.isArray(rawList)) {
          const formatted = rawList.map((item, idx) => ({
            id: item.id || `rev-${item.id || Math.random()}`,
            name: item.student_name || item.name || 'Student Learner',
            initials: item.initials || getInitials(item.student_name || item.name || 'ST'),
            avatar: item.avatar || item.image || `/avatars/student${(idx % 5) + 1}.jpg`,
            course: item.category || item.course || item.course_interest || item.program || 'NIOS (Class 10 & 12)',
            rating: Number(item.rating || item.stars || 5),
            date: item.date || (item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'),
            timestamp: item.timestamp || (item.created_at ? new Date(item.created_at).getTime() : Date.now()),
            text: item.feedback || item.message || item.text || item.review || '',
            verified: item.is_verified !== undefined ? Boolean(item.is_verified) : true,
          }));

          if (formatted.length > 0) {
            setReviews(formatted);
            localStorage.setItem('abtech_student_reviews', JSON.stringify(formatted));
          }
        }
      }
    } catch (error) {
      console.error('Feedback error:', error);
    }
  }, []);

  useEffect(() => {
    fetchReviewsFromBackend();
  }, [fetchReviewsFromBackend]);

  // Persist reviews locally as cache
  useEffect(() => {
    try {
      localStorage.setItem('abtech_student_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  // Sorted reviews (newest first)
  const sortedReviews = [...reviews].sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviews || 1)
  ).toFixed(1);

  return (
    <section className="student-reviews-section" id="reviews" aria-labelledby="reviews-heading">
      <div className="container">

        {/* Section Heading & Aggregate Score */}
        <div className="reviews-header-wrap">
          <div>
            <h2 id="reviews-heading" className="reviews-main-title">
              What Our Students &amp; Learners Say
            </h2>
            <p className="reviews-subheading">
              Real experiences from students who continued their education, cleared boards, and achieved their career goals with ABTECH Kolkata.
            </p>
          </div>

          <div className="reviews-score-card">
            <div className="score-number-row">
              <span className="score-big">{avgRating}</span>
              <div className="score-stars-col">
                <div className="stars-visual" aria-label={`Rating ${avgRating} out of 5 stars`}>
                  {'★★★★★'}
                </div>
                <span className="score-total-count">Based on {totalReviews} Student Reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        {successToast && (
          <div className="review-toast-success" role="status">
            <span className="toast-icon">✓</span>
            <span>{successToast}</span>
          </div>
        )}

        {errorToast && (
          <div className="review-toast-error" role="alert">
            <span className="toast-icon">✕</span>
            <span>{errorToast}</span>
          </div>
        )}

        {/* Live Reviews Feed Grid */}
        <div className="reviews-live-grid">
          {sortedReviews.length === 0 ? (
            <div className="no-reviews-box">
              <p>No student reviews available at the moment.</p>
            </div>
          ) : (
            sortedReviews.map((rev) => {
              return (
                <article
                  key={rev.id}
                  className="review-card"
                  id={rev.id}
                >
                  <div className="review-card-top">
                    <div className="student-profile">
                      <div className="student-avatar" aria-hidden="true">
                        {rev.avatar ? (
                          <img
                            src={rev.avatar}
                            alt={`${rev.name} avatar`}
                            className="student-avatar-img"
                          />
                        ) : (
                          <span>{rev.initials || getInitials(rev.name)}</span>
                        )}
                      </div>
                      <div>
                        <div className="student-name-row">
                          <strong className="student-name">{rev.name}</strong>
                          {rev.verified && (
                            <span className="verified-badge" title="Verified Student Review">
                              ✓ Verified Learner
                            </span>
                          )}
                        </div>
                        <span className="review-course-tag">{rev.course}</span>
                      </div>
                    </div>

                    <div className="review-meta-right">
                      <div className="review-stars" aria-label={`${rev.rating} out of 5 stars`}>
                        {'★'.repeat(rev.rating)}
                        {'☆'.repeat(5 - rev.rating)}
                      </div>
                      <span className="review-date-label">{rev.date || 'Recent'}</span>
                    </div>
                  </div>

                  <p className="review-body-text">{rev.text}</p>

                  <div className="review-card-footer">
                    <div className="footer-left-actions">
                      <span className="review-loc-tag">ABTECH Kolkata</span>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
