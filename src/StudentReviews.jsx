import { useState, useEffect, useRef, useCallback } from 'react';

// Verified student reviews with diverse categories & photos
export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Rahul Sharma',
    initials: 'RS',
    avatar: '/avatars/student1.jpg',
    course: 'NIOS (Class 10 & 12)',
    rating: 5,
    date: 'September 2026',
    text: 'The admission counselling was very helpful and the entire process was explained clearly. I had a gap year after 12th standard and thought college was out of reach. ABTECH guided me step-by-step through NIOS with Transfer of Credit (TOC). I cleared with 76% in the very next cycle and secured my college seat!',
    verified: true,
  },
  {
    id: 'rev-2',
    name: 'Priya Mukherjee',
    initials: 'PM',
    avatar: '/avatars/student2.jpg',
    course: 'IGNOU (UG/PG Degrees)',
    rating: 5,
    date: 'September 2026',
    text: 'Pursuing my BCA from IGNOU while working full-time in Kolkata. The assignment guidance, synopsis prep, and timely reminders from ABTECH mentors made my degree journey completely stress-free. Always responsive and reliable.',
    verified: true,
  },
  {
    id: 'rev-3',
    name: 'Suman Das',
    initials: 'SD',
    avatar: '/avatars/student3.jpg',
    course: 'Guidance College Admissions',
    rating: 5,
    date: 'August 2026',
    text: 'The college guidance team at ABTECH helped me navigate engineering cutoffs and seat selection across premier Kolkata universities. Transparent and genuine guidance without any false promises. Truly grateful for their mentorship.',
    verified: true,
  },
  {
    id: 'rev-4',
    name: 'Ananya Roy',
    initials: 'AR',
    avatar: '/avatars/student4.jpg',
    course: 'BOSSE (Open Board)',
    rating: 5,
    date: 'August 2026',
    text: 'Enrolled in BOSSE through ABTECH Barrackpore center. Fast-track verification, complete study materials, and practical exam support. The staff is extremely polite, patient, and knowledgeable throughout the process.',
    verified: true,
  },
  {
    id: 'rev-5',
    name: 'Debashis Chatterjee',
    initials: 'DC',
    avatar: '/avatars/student5.jpg',
    course: 'Career Counselling',
    rating: 5,
    date: 'July 2026',
    text: 'Had an insightful 1-on-1 career counselling session with senior mentors. They scientifically mapped my strengths and helped me choose the right postgraduate specialisation aligned with industry opportunities.',
    verified: true,
  },
  {
    id: 'rev-6',
    name: 'Vikramaditya Bose',
    initials: 'VB',
    avatar: '/avatars/student6.jpg',
    course: 'Guidance College Admissions',
    rating: 5,
    date: 'July 2026',
    text: 'ABTECH made my college admission process seamless. From documentation verification to selecting the best accredited college in Kolkata, their counsellors were with me at every stage. Highly recommended!',
    verified: true,
  },
  {
    id: 'rev-7',
    name: 'Sneha Ganguly',
    initials: 'SG',
    avatar: '/avatars/student7.jpg',
    course: 'NIOS (Class 10 & 12)',
    rating: 5,
    date: 'June 2026',
    text: 'I was very anxious about completing my 12th standard after changing streams. The faculty at ABTECH Barrackpore provided personalized study roadmaps and solved practical files that helped me score 81%.',
    verified: true,
  },
];

function getInitials(name) {
  if (!name) return 'ST';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * ReviewDisplayBox Component
 * Matches the header section display box with fixed dimensions and frame styling.
 * 30% person's photo / 70% review content, automatic 2-second slide transition,
 * responsive mobile layout, and a Read More modal for detailed reviews.
 */
export default function ReviewDisplayBox({ onOpenInquiry }) {
  const reviews = INITIAL_REVIEWS;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [activeModalReview, setActiveModalReview] = useState(null);

  // Touch swipe support for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timerRef = useRef(null);

  const totalReviews = reviews.length;

  const nextSlide = useCallback(() => {
    if (totalReviews === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prevSlide = useCallback(() => {
    if (totalReviews === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  // Auto-play timer: 2 seconds, pauses when user hovers
  useEffect(() => {
    if (totalReviews <= 1) return;
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 2000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, nextSlide, totalReviews]);

  // Touch swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div
      className="display-box-wrapper extended"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Student Reviews & Testimonials Showcase"
    >
      <div className="display-box-extended-container">

        {/* Top Control Bar Above/In Header Box */}
        <div className="header-review-top-bar">
          <div className="header-review-eyebrow">
            <span className="live-pulse" aria-hidden="true"></span>
            <span>VERIFIED STUDENT SUCCESS STORIES &amp; REVIEWS · ABTECH KOLKATA</span>
          </div>
        </div>

        {/* MAIN DISPLAY BOX FRAME — EXACT SAME DIMENSIONS AS HEADER DISPLAY BOX */}
        <div className="display-box-frame header-review-display-frame">
          <div className="display-box-viewport header-review-display-viewport">
            {reviews.map((rev, idx) => {
              const isActive = idx === currentIndex;
              const rating = Number(rev.rating) || 5;

              return (
                <div
                  key={rev.id || idx}
                  className={`header-review-slide ${isActive ? 'active' : ''}`}
                  aria-hidden={!isActive}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Review ${idx + 1} of ${totalReviews}`}
                >
                  {/* ---------------- 30% IMAGE SECTION ---------------- */}
                  <div className="header-review-media-30">
                    {rev.avatar ? (
                      <img
                        src={rev.avatar}
                        alt={`${rev.name} portrait`}
                        className="header-reviewer-img"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    ) : (
                      <div className="header-reviewer-fallback">
                        {rev.initials || getInitials(rev.name)}
                      </div>
                    )}
                    <div className="header-reviewer-badge-bottom">
                      <span className="star-rating-pill">★ {rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* ---------------- 70% REVIEW CONTENT SECTION ---------------- */}
                  <div className="header-review-content-70">
                    {/* Top Row: Stars, Name, Course, Verified Badge */}
                    <div className="header-rev-top-row">
                      <div className="header-rev-author-meta">
                        <div className="header-rev-stars" aria-label={`${rating} out of 5 stars`}>
                          {'★'.repeat(rating)}
                          {'☆'.repeat(5 - rating)}
                        </div>
                        <h3 className="header-rev-name">{rev.name}</h3>
                        <div className="header-rev-tags-row">
                          <span className="header-rev-course">{rev.course}</span>
                          {rev.verified && (
                            <span className="verified-badge-pill">✓ Verified Learner</span>
                          )}
                        </div>
                      </div>

                      <div className="header-rev-date-meta">
                        <span className="header-rev-date">
                          📅 {rev.date || 'September 2026'}
                        </span>
                      </div>
                    </div>

                    {/* Middle: Fixed-Height Review Comment */}
                    <div className="header-rev-text-block">
                      <span className="quote-mark-icon" aria-hidden="true">“</span>
                      <p className="header-rev-text-body">
                        {rev.text}
                      </p>
                      {rev.text && rev.text.length > 130 && (
                        <button
                          type="button"
                          className="btn-read-more-inline"
                          onClick={() => setActiveModalReview(rev)}
                        >
                          Read More →
                        </button>
                      )}
                    </div>

                    {/* Bottom Controls Bar */}
                    <div className="header-rev-bottom-bar">
                      <div className="header-rev-slide-nav">
                        <button
                          type="button"
                          className="slide-arrow-btn arrow-left"
                          onClick={prevSlide}
                          aria-label="Previous Review"
                          disabled={totalReviews <= 1}
                        >
                          ‹
                        </button>

                        <div className="slide-dots-indicator" role="tablist">
                          {reviews.map((_, dotIdx) => (
                            <button
                              key={dotIdx}
                              type="button"
                              className={`slide-dot-pill ${dotIdx === currentIndex ? 'active' : ''}`}
                              onClick={() => setCurrentIndex(dotIdx)}
                              aria-label={`Go to review ${dotIdx + 1}`}
                            />
                          ))}
                        </div>

                        <button
                          type="button"
                          className="slide-arrow-btn arrow-right"
                          onClick={nextSlide}
                          aria-label="Next Review"
                          disabled={totalReviews <= 1}
                        >
                          ›
                        </button>

                        <span className="slide-counter-label">
                          {currentIndex + 1} / {totalReviews}
                        </span>
                      </div>

                      {onOpenInquiry && (
                        <button
                          type="button"
                          className="button button-maroon button-header-review-inquire"
                          onClick={() =>
                            onOpenInquiry({
                              formName: `${rev.course} Inquiry`,
                              title: `INQUIRY: ${rev.course.toUpperCase()}`,
                              eyebrow: 'ABTECH COUNSELLING',
                              subtitle: `Connect with our expert mentors for ${rev.course}.`,
                              course: rev.course,
                            })
                          }
                        >
                          Inquire About Course <span aria-hidden="true">↗</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* READ MORE FULL TESTIMONIAL MODAL */}
      {/* ------------------------------------------------------------- */}
      {activeModalReview && (
        <div
          className="review-modal-backdrop"
          onClick={() => setActiveModalReview(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="read-more-title"
        >
          <div
            className="review-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setActiveModalReview(null)}
              aria-label="Close testimonial dialog"
            >
              ✕
            </button>

            <div className="read-more-split">
              {/* 30% Person Image */}
              <div className="read-more-media-30">
                {activeModalReview.avatar ? (
                  <img
                    src={activeModalReview.avatar}
                    alt={activeModalReview.name}
                    className="read-more-photo"
                  />
                ) : (
                  <div className="read-more-avatar-fallback">
                    {activeModalReview.initials || getInitials(activeModalReview.name)}
                  </div>
                )}
                <div className="read-more-media-badge">
                  <span className="star-badge-solid">★ {Number(activeModalReview.rating || 5).toFixed(1)}</span>
                </div>
              </div>

              {/* 70% Person Review Content */}
              <div className="read-more-content-70">
                <div className="read-more-header">
                  <div>
                    <h3 id="read-more-title" className="read-more-student-name">
                      {activeModalReview.name}
                    </h3>
                    <div className="read-more-meta-row">
                      <span className="read-more-course-tag">{activeModalReview.course}</span>
                      {activeModalReview.verified && (
                        <span className="verified-badge">✓ Verified Student</span>
                      )}
                    </div>
                  </div>
                  <div className="read-more-stars" aria-label={`${activeModalReview.rating} out of 5 stars`}>
                    {'★'.repeat(Number(activeModalReview.rating || 5))}
                    {'☆'.repeat(5 - Number(activeModalReview.rating || 5))}
                  </div>
                </div>

                <div className="read-more-quote-body">
                  <span className="quote-mark-large">“</span>
                  <p className="read-more-full-text">{activeModalReview.text}</p>
                </div>

                <div className="read-more-footer">
                  <span className="read-more-date">
                    📅 Date of Review: <strong>{activeModalReview.date || 'Recent'}</strong>
                  </span>
                  {onOpenInquiry && (
                    <button
                      type="button"
                      className="button button-maroon button-sm"
                      onClick={() => {
                        setActiveModalReview(null);
                        onOpenInquiry({
                          formName: `${activeModalReview.course} Inquiry`,
                          title: `INQUIRE ABOUT ${activeModalReview.course.toUpperCase()}`,
                          eyebrow: 'ABTECH COUNSELLING',
                          subtitle: `Connect with our experts regarding ${activeModalReview.course}.`,
                          course: activeModalReview.course,
                        });
                      }}
                    >
                      Inquire About This Course ↗
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export { ReviewDisplayBox as StudentReviews };
