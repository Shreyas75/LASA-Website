import { useState, useEffect, useCallback } from 'react';

const FLYERS = [
  '/flyers/3bf8c34d-40cc-4d6c-a1b6-17fe075b58da.jpeg',
  '/flyers/b4c55ae2-a060-400d-a8bc-841727d71d5e.jpeg',
  '/flyers/f983cf4c-7e6c-49c3-826d-222fcfa29641.jpeg',
];

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-[101]"
        onClick={onClose}
        aria-label="Close"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <img
        src={src}
        alt="Flyer full view"
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export default function UpcomingEventsGallery() {
  const [currentPage, setCurrentPage] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState(null);

  // Calculate items per page based on breakpoint
  const getItemsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      const newPerPage = getItemsPerPage();
      setItemsPerPage(newPerPage);
      setCurrentPage(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerPage]);

  const totalPages = Math.ceil(FLYERS.length / itemsPerPage);
  const showCarousel = FLYERS.length > itemsPerPage;
  const visibleFlyers = FLYERS.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const [paused, setPaused] = useState(false);

  // Auto-rotate every 2.5 seconds
  useEffect(() => {
    if (!showCarousel || paused || lightboxSrc) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 2500);
    return () => clearInterval(timer);
  }, [showCarousel, paused, lightboxSrc, totalPages]);

  const goTo = (page) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  return (
    <>
      <section className="w-full py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-lasa-600">
              Upcoming Events
            </h2>
            <p className="text-base sm:text-lg text-lasa-500 mt-3 max-w-2xl mx-auto">
              Stay updated with our upcoming community service events and activities.
            </p>
          </div>

          {/* Gallery */}
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex items-stretch gap-6 justify-center">
              {visibleFlyers.map((src, idx) => (
                <div
                  key={`${currentPage}-${idx}`}
                  className="group relative flex-shrink-0 w-full sm:w-auto rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer border border-lasa-200"
                  style={{ aspectRatio: '4 / 5', maxWidth: '320px', flex: '1 1 0' }}
                  onClick={() => setLightboxSrc(src)}
                >
                  <img
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    src={src}
                    alt={`Event flyer ${currentPage * itemsPerPage + idx + 1}`}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-lasa-600/0 group-hover:bg-lasa-600/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-lasa-600/70 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium">
                      Click to view
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            {showCarousel && (
              <div className="flex items-center justify-center gap-4 mt-8">
                {/* Previous */}
                <button
                  onClick={() => goTo(currentPage - 1)}
                  disabled={currentPage === 0}
                  className="p-2 rounded-full border border-lasa-300 text-lasa-500 hover:bg-lasa-200 hover:text-lasa-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${i === currentPage
                        ? 'bg-lasa-600 w-6'
                        : 'bg-lasa-300 hover:bg-lasa-400'
                        }`}
                      aria-label={`Go to page ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Next */}
                <button
                  onClick={() => goTo(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 rounded-full border border-lasa-300 text-lasa-500 hover:bg-lasa-200 hover:text-lasa-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
    </>
  );
}
