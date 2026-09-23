import { useState, useEffect, useRef, useCallback } from 'react';
import { bannerSlides as defaultSlides } from './content';

/**
 * ImageDisplayBox Component
 * Displays a clean, pure multi-image banner display box directly below the header.
 * No icons or overlays - pure pictures transitioning one by one.
 * 
 * Props:
 * - slides: Array of slide objects (defaults to bannerSlides from content.js)
 * - autoPlayInterval: Duration per slide in milliseconds (default 4500ms)
 */
export default function ImageDisplayBox({
  slides = defaultSlides,
  autoPlayInterval = 4500,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const totalSlides = slides && slides.length > 0 ? slides.length : 0;
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play timer (pauses on hover)
  useEffect(() => {
    if (totalSlides <= 1) return;
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, autoPlayInterval);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered, autoPlayInterval, nextSlide, totalSlides]);

  // Touch swipe support for mobile
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

  if (totalSlides === 0) return null;

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
      aria-label="Image Banner Showcase"
    >
      <div className="display-box-extended-container">
        <div className="display-box-frame">
          {/* Slides Viewport */}
          <div className="display-box-viewport">
            {slides.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={slide.id || idx}
                  className={`display-box-slide ${isActive ? 'active' : ''}`}
                  aria-hidden={!isActive}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${idx + 1} of ${totalSlides}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt || `ABTECH Showcase Banner ${idx + 1}`}
                    className="slide-image"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
