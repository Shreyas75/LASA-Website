import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCurrentEvents } from '../api/events';
import LoadingState from './common/LoadingState';
import ErrorState from './common/ErrorState';
import EmptyState from './common/EmptyState';
import EventModal from './events/EventModal';
import { formatEventDate } from '../utils/dateDisplay';
import { EVENT_FLYER_ASPECT_RATIO } from '../constants/eventMedia';

export default function UpcomingEventsGallery() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const getItemsPerPage = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCurrentEvents();
      setEvents(data || []);
    } catch (err) {
      setError(err?.message || 'Unable to load events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentPage(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerPage]);

  const displayEvents = useMemo(() => {
    const sorted = [...events].sort((a, b) => {
      const aDateRaw = a?.startDate || a?.date;
      const bDateRaw = b?.startDate || b?.date;
      const aDate = aDateRaw ? new Date(aDateRaw).getTime() : null;
      const bDate = bDateRaw ? new Date(bDateRaw).getTime() : null;

      const aValid = Number.isFinite(aDate);
      const bValid = Number.isFinite(bDate);

      if (!aValid && !bValid) return 0;
      if (!aValid) return 1;
      if (!bValid) return -1;

      return bDate - aDate;
    });

    return sorted;
  }, [events]);

  const totalPages = Math.ceil(displayEvents.length / itemsPerPage);
  const showCarousel = displayEvents.length > itemsPerPage;
  const visibleEvents = displayEvents.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  useEffect(() => {
    if (!totalPages) {
      setCurrentPage(0);
      return;
    }

    if (currentPage > totalPages - 1) {
      setCurrentPage(totalPages - 1);
    }
  }, [currentPage, totalPages]);

  const goToPage = (page) => {
    if (!totalPages) return;
    const bounded = ((page % totalPages) + totalPages) % totalPages;
    setCurrentPage(bounded);
  };

  return (
    <>
      <section className="w-full py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16">
          <div className="flex flex-col gap-6 text-center">
            <div>
              <h2 className="text-2xl font-display text-lasa-700 sm:text-3xl md:text-4xl">
                Upcoming Events
              </h2>
              <p className="text-sm text-lasa-600/80 mt-3 max-w-2xl mx-auto sm:text-base md:text-lg">
                Stay updated with our upcoming community service events and activities.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/events"
                className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-widest text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
              >
                Explore all events
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="mt-10">
            {loading && <LoadingState message="Loading events..." />}
            {!loading && error && <ErrorState message={error} onRetry={loadEvents} />}
            {!loading && !error && !events.length && (
              <EmptyState
                title="No upcoming events"
                description="Check back soon for new LASA events."
              />
            )}
            {!loading && !error && displayEvents.length > 0 && (
              <div className="space-y-6">
                <div
                  className="grid gap-8 justify-items-center"
                  style={{ gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }}
                >
                {visibleEvents.map((event) => {
                  const eventImage = event.coverImageUrl || event.flyerUrl || event.gallery?.[0];
                  const eventTitle = event.title || event.name || 'LASA Event';
                  const eventDate = event.startDate || event.date;
                  const titleWords = eventTitle.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
                  const titlePreview = titleWords.length > 5
                    ? `${titleWords.slice(0, 5).join(' ')} . . .`
                    : titleWords.join(' ');

                  return (
                    <button
                      type="button"
                      key={event._id || event.id}
                      className="group flex w-full max-w-sm flex-col items-center rounded-xl bg-white p-3 text-left shadow-xl transition-transform duration-200 hover:scale-105"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div
                        className="relative mb-3 w-full overflow-hidden rounded-lg border border-lasa-200 bg-lasa-50"
                        style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
                      >
                        {eventImage ? (
                          <img
                            src={eventImage}
                            alt={eventTitle}
                            className="h-full w-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-lasa-400">No image available</div>
                        )}
                        <div className="absolute inset-0 bg-lasa-700/0 transition-colors duration-300 group-hover:bg-lasa-700/20" />
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-lasa-600 to-lasa-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
                            Learn more
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m9 5 7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>

                      <div className="flex min-h-[4.25rem] w-full flex-col justify-between">
                        <h3
                          className="text-center text-lg font-semibold leading-6 text-lasa-700"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {titlePreview}
                        </h3>
                        <p className="mt-1 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-lasa-500">
                          <svg className="h-4 w-4 text-lasa-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                          </svg>
                          {formatEventDate(eventDate, { variant: 'short' })}
                        </p>
                      </div>
                    </button>
                  );
                })}
                </div>

                {showCarousel && (
                  <div className="flex items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      className="rounded-full border border-lasa-300 bg-white p-2 text-lasa-600 hover:bg-lasa-100"
                      aria-label="Previous events"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }).map((_, page) => (
                        <button
                          type="button"
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`h-2.5 rounded-full transition-all ${
                            page === currentPage ? 'w-6 bg-lasa-600' : 'w-2.5 bg-lasa-300 hover:bg-lasa-400'
                          }`}
                          aria-label={`Go to events page ${page + 1}`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => goToPage(currentPage + 1)}
                      className="rounded-full border border-lasa-300 bg-white p-2 text-lasa-600 hover:bg-lasa-100"
                      aria-label="Next events"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <EventModal
        key={selectedEvent?._id || selectedEvent?.id || 'event-modal'}
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </>
  );
}
