import { useState, useEffect, useCallback } from 'react';

const EVENTS = [
  {
    videoId: 'MisXjNVtbcs',
    heading: 'Medical Screening & Counseling Event',
    description:
      'On October 22nd, 2022 we hosted our inaugural free medical screening and counseling event with support from the City of Lowell, Lowell General Hospital, and the Greater Lowell Health Alliance.',
  },
  {
    videoId: 'qVodePluw1g',
    heading: 'Yoga & Nutrition Workshop',
    description:
      'Dr. Sunder Iyer has been practicing the science of Yoga for more than 30 years. During his youth, Dr. Iyer spent over 15 years at the ashram of Sri Sathya Sai Baba.',
  },
  {
    videoId: null,
    heading: 'Community Vaccination',
    description:
      'Our Lowell MA facility is being used by the Commonwealth of Massachusetts and the City of Lowell to host a COVID-19 vaccination clinic.',
  },
];

export default function RecentEventsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [paused, setPaused] = useState(false);

  const getItemsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(0);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerPage]);

  const totalPages = Math.ceil(EVENTS.length / itemsPerPage);
  const showCarousel = EVENTS.length > itemsPerPage;
  const visibleEvents = EVENTS.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Auto-rotate every 2.5 seconds
  useEffect(() => {
    if (!showCarousel || paused) return;
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);
    return () => clearInterval(timer);
  }, [showCarousel, paused, totalPages]);

  const goTo = (page) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  return (
    <section className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-lasa-600">
            Recent Events
          </h2>
          <p className="text-base sm:text-lg text-lasa-500 mt-3 max-w-2xl mx-auto">
            Highlights from our past community service events and activities.
          </p>
        </div>

        {/* Cards */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex items-stretch gap-6 justify-center">
            {visibleEvents.map((event, idx) => (
              <div
                key={`${currentPage}-${idx}`}
                className="flex flex-col flex-shrink-0 w-full sm:w-auto rounded-2xl overflow-hidden shadow-lg border border-lasa-200 bg-white transition-shadow duration-300 hover:shadow-xl"
                style={{ maxWidth: '400px', flex: '1 1 0' }}
              >
                {/* Video or Placeholder */}
                <div className="w-full" style={{ aspectRatio: '16 / 9' }}>
                  {event.videoId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${event.videoId}`}
                      title={event.heading}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full bg-lasa-200 flex items-center justify-center">
                      <div className="text-center">
                        <svg className="w-12 h-12 text-lasa-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                        <span className="text-sm text-lasa-500 font-medium">Video coming soon</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-lasa-600 leading-snug">
                    {event.heading}
                  </h3>
                  <p className="mt-2 text-sm text-lasa-500/90 leading-relaxed flex-1">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          {showCarousel && (
            <div className="flex items-center justify-center gap-4 mt-8">
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
  );
}
