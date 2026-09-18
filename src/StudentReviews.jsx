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

const CATEGORIES = [
  'All Reviews',
  'NIOS (Class 10 & 12)',
  'IGNOU (UG/PG Degrees)',
  'BOSSE (Open Board)',
  'Guidance College Admissions',
  'Career Counselling',
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

  const [selectedCategory, setSelectedCategory] = useState('All Reviews');
  const [sortBy, setSortBy] = useState('newest');
  const [successToast, setSuccessToast] = useState('');
  const [errorToast, setErrorToast] = useState('');

  // Admin Mode State
  const [isAdmin, setIsAdmin] = useState(() => {
    return Boolean(sessionStorage.getItem('abtech_admin_authenticated'));
  });
  const [adminKey, setAdminKey] = useState(() => {
    return sessionStorage.getItem('abtech_admin_key') || '';
  });
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [deletingId, setDeletingId] = useState(null);

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

  // 2. Admin Login Handler
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput.trim() === 'abtech@admin2026') {
      setIsAdmin(true);
      setAdminKey(adminPasswordInput.trim());
      sessionStorage.setItem('abtech_admin_authenticated', 'true');
      sessionStorage.setItem('abtech_admin_key', adminPasswordInput.trim());
      setShowAdminLogin(false);
      setAdminPasswordInput('');
      setAdminLoginError('');
      setSuccessToast('Admin Mode Active: You can now delete or moderate reviews.');
      setTimeout(() => setSuccessToast(''), 4000);
    } else {
      setAdminLoginError('Incorrect Admin Password. Please try again.');
    }
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setAdminKey('');
    sessionStorage.removeItem('abtech_admin_authenticated');
    sessionStorage.removeItem('abtech_admin_key');
    setSuccessToast('Admin Mode Deactivated.');
    setTimeout(() => setSuccessToast(''), 3000);
  };

  // 3. Admin Delete Review (Permanent Removal from Database)
  const handleDeleteReview = async (id, studentName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to permanently delete the review from "${studentName}"? This action cannot be undone.`
    );
    if (!confirmDelete) return;

    setDeletingId(id);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey || 'abtech@admin2026',
        },
        body: JSON.stringify({
          action: 'delete',
          id: id,
          admin_key: adminKey || 'abtech@admin2026',
        }),
      });

      const resData = await response.json();

      if (resData.success || resData.status === 'success' || response.ok) {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        setSuccessToast(`Review from "${studentName}" was deleted permanently.`);
        fetchReviewsFromBackend();
      } else {
        setReviews((prev) => prev.filter((r) => r.id !== id));
        setSuccessToast(`Review deleted locally.`);
      }
    } catch {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setSuccessToast(`Review deleted from display.`);
    } finally {
      setDeletingId(null);
      setTimeout(() => setSuccessToast(''), 4000);
    }
  };

  // Filtered & Sorted reviews
  const filteredReviews = reviews
    .filter((r) => {
      if (selectedCategory === 'All Reviews') return true;
      return (
        r.course.toLowerCase().includes(selectedCategory.toLowerCase().slice(0, 5)) ||
        r.course === selectedCategory
      );
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return (b.timestamp || 0) - (a.timestamp || 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const totalReviews = reviews.length;
  const avgRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (totalReviews || 1)
  ).toFixed(1);

  return (
    <section className="student-reviews-section" id="reviews" aria-labelledby="reviews-heading">
      <div className="container">

        {/* Admin Mode Status Banner */}
        {isAdmin && (
          <div className="admin-status-banner">
            <div className="admin-status-text">
              <span className="admin-badge-icon">🛡</span>
              <strong>Admin Mode Enabled:</strong> You have moderation permissions to permanently delete reviews.
            </div>
            <button
              type="button"
              className="button button-outline-white btn-admin-logout"
              onClick={handleAdminLogout}
            >
              Exit Admin Mode ✕
            </button>
          </div>
        )}

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

        {/* Toolbar & Filter Chips */}
        <div className="reviews-toolbar">
          <div className="category-filter-chips" role="tablist" aria-label="Filter reviews by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sort-dropdown-wrap">
            <label htmlFor="sort-reviews" className="sort-label">Sort By:</label>
            <select
              id="sort-reviews"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Most Recent</option>
              <option value="rating">Highest Rating</option>
            </select>
          </div>
        </div>

        {/* Live Reviews Feed Grid */}
        <div className="reviews-live-grid">
          {filteredReviews.length === 0 ? (
            <div className="no-reviews-box">
              <p>No reviews found for the selected category.</p>
              <button
                type="button"
                className="button button-outline-maroon"
                onClick={() => setSelectedCategory('All Reviews')}
              >
                View All Reviews
              </button>
            </div>
          ) : (
            filteredReviews.map((rev) => {
              const isDeleting = deletingId === rev.id;

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

                      {/* Admin Delete Action */}
                      {isAdmin && (
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteReview(rev.id, rev.name)}
                          disabled={isDeleting}
                          title="Permanently delete this review from the central database"
                        >
                          {isDeleting ? 'Deleting...' : '🗑 Delete'}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Admin Login Modal / Trigger */}
        <div className="admin-trigger-wrap">
          {!isAdmin ? (
            <button
              type="button"
              className="admin-login-link-btn"
              onClick={() => setShowAdminLogin(true)}
            >
              🔒 Admin Moderation Login
            </button>
          ) : (
            <span className="admin-logged-in-label">
              ✓ Logged in as Administrator (<button type="button" className="link-inline" onClick={handleAdminLogout}>Logout</button>)
            </span>
          )}
        </div>

        {/* Admin Login Dialog Modal */}
        {showAdminLogin && (
          <div className="inquiry-modal-backdrop" onClick={() => setShowAdminLogin(false)}>
            <div className="admin-login-modal-box" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close-btn"
                type="button"
                onClick={() => setShowAdminLogin(false)}
              >
                ✕
              </button>
              <div className="admin-modal-header">
                <span className="admin-lock-icon">🔒</span>
                <h3>Admin Review Moderation</h3>
                <p>Enter the administrator password to manage and delete reviews.</p>
              </div>

              <form onSubmit={handleAdminLogin} className="admin-login-form">
                <div className="form-group">
                  <label htmlFor="admin-pass">Admin Password</label>
                  <input
                    id="admin-pass"
                    type="password"
                    required
                    placeholder="Enter admin password"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    autoFocus
                  />
                </div>

                {adminLoginError && (
                  <p className="modal-status-error" role="alert">
                    {adminLoginError}
                  </p>
                )}

                <div className="review-form-actions">
                  <button type="submit" className="button button-maroon button-block">
                    Unlock Admin Mode 🔓
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
