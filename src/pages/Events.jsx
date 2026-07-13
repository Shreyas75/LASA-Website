import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchCurrentEvents } from '../api/events';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import EmptyState from '../components/common/EmptyState';
import { formatEventDate } from '../utils/dateDisplay';
import { EVENT_FLYER_ASPECT_RATIO } from '../constants/eventMedia';

export default function Events() {
  const sortOptions = [
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'title_asc', label: 'A-Z' },
    { value: 'title_desc', label: 'Z-A' },
  ];

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');
  const [showFilters, setShowFilters] = useState(false);

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

  const normalizeDate = (event) => event?.startDate || event?.date || '';
  const getEventTitle = (event) => event?.title || event?.name || 'LASA Event';
  const getEventImage = (event) => event?.coverImageUrl || event?.gallery?.[0] || event?.image || event?.flyerUrl || '';
  const getEventTimestamp = (event) => {
    const rawDate = normalizeDate(event);
    if (!rawDate) return null;
    const parsed = new Date(rawDate).getTime();
    return Number.isFinite(parsed) ? parsed : null;
  };

  const availableYears = useMemo(() => {
    const yearMap = new Map();
    for (const event of events) {
      const rawDate = normalizeDate(event);
      if (!rawDate) continue;
      const year = new Date(rawDate).getFullYear();
      if (!Number.isFinite(year)) continue;
      yearMap.set(year, (yearMap.get(year) || 0) + 1);
    }

    return [...yearMap.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, count]) => ({ year, count }));
  }, [events]);

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const next = events.filter((event) => {
      const title = getEventTitle(event).toLowerCase();
      const description = (event?.description || '').toLowerCase();
      const location = (event?.location || '').toLowerCase();

      if (query && !title.includes(query) && !description.includes(query) && !location.includes(query)) {
        return false;
      }

      if (!selectedYear) return true;
      const rawDate = normalizeDate(event);
      if (!rawDate) return false;
      return String(new Date(rawDate).getFullYear()) === selectedYear;
    });

    next.sort((a, b) => {
      if (sortBy === 'title_asc') {
        return getEventTitle(a).localeCompare(getEventTitle(b));
      }
      if (sortBy === 'title_desc') {
        return getEventTitle(b).localeCompare(getEventTitle(a));
      }

      const aDate = getEventTimestamp(a);
      const bDate = getEventTimestamp(b);
      if (aDate === null && bDate === null) return 0;
      if (aDate === null) return 1;
      if (bDate === null) return -1;
      if (sortBy === 'date_asc') return aDate - bDate;
      return bDate - aDate;
    });

    return next;
  }, [events, searchQuery, selectedYear, sortBy]);

  const resultsText = useMemo(() => {
    const totalEvents = filteredEvents.length;
    let filterText = '';

    if (selectedYear) {
      filterText += `from ${selectedYear}`;
    }
    if (searchQuery.trim()) {
      filterText += `${filterText ? ' ' : ''}matching "${searchQuery.trim()}"`;
    }

    if (filterText) {
      return `Found ${totalEvents} event${totalEvents === 1 ? '' : 's'} ${filterText}`;
    }

    return `Showing ${totalEvents} event${totalEvents === 1 ? '' : 's'}`;
  }, [filteredEvents.length, searchQuery, selectedYear]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('');
    setSortBy('date_desc');
  };

  return (
    <section className="min-h-screen bg-lasa-50 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <div className="rounded-2xl bg-white px-6 py-10 text-center shadow-sm sm:px-10">
          <h1 className="text-3xl font-semibold text-lasa-600 sm:text-4xl">Events</h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-lasa-500 sm:text-base">
            Discover LASA community events and service activities rooted in service and compassion.
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lasa-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx="11" cy="11" r="8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by title, description, or location..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-xl border border-lasa-200 bg-white py-3 pl-10 pr-3 text-sm text-lasa-600 outline-none transition focus:border-lasa-300 focus:ring-2 focus:ring-lasa-200"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-lasa-200 px-4 py-3 text-sm font-semibold text-lasa-600 hover:bg-lasa-100 md:hidden"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 12h12M10 20h4" />
              </svg>
              Filters
            </button>
          </div>

          <div className={`${showFilters ? 'flex' : 'hidden'} flex-col gap-4 md:flex md:flex-row md:items-end`}>
            <div className="flex-1">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-lasa-500">
                Filter by Year
              </label>
              <select
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
                className="w-full rounded-xl border border-lasa-200 bg-white px-3 py-2.5 text-sm text-lasa-600 outline-none transition focus:border-lasa-300 focus:ring-2 focus:ring-lasa-200"
              >
                <option value="">All Years</option>
                {availableYears.map((yearData) => (
                  <option key={yearData.year} value={String(yearData.year)}>
                    {yearData.year} ({yearData.count} event{yearData.count === 1 ? '' : 's'})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-[2]">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lasa-500">Sort by</p>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSortBy(option.value)}
                    className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${sortBy === option.value
                      ? 'bg-lasa-600 text-white'
                      : 'border border-lasa-200 bg-white text-lasa-600 hover:bg-lasa-100'
                      }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {(searchQuery || selectedYear || sortBy !== 'date_desc') && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold uppercase tracking-wide text-lasa-500 underline hover:text-lasa-700"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-lasa-500">{resultsText}</div>

        <div className="mt-8">
          {loading && <LoadingState message="Loading events..." />}
          {!loading && error && <ErrorState message={error} onRetry={loadEvents} />}
          {!loading && !error && !events.length && (
            <EmptyState
              title="No upcoming events"
              description="Check back soon for new LASA events."
            />
          )}
          {!loading && !error && events.length > 0 && filteredEvents.length === 0 && (
            <EmptyState
              title="No events found"
              description="Try adjusting your search, year filter, or sort order."
            />
          )}
          {!loading && !error && filteredEvents.length > 0 && (
            <div
              className={`grid gap-8 ${filteredEvents.length === 1
                ? 'mx-auto max-w-md grid-cols-1'
                : filteredEvents.length === 2
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                }`}
            >
              {filteredEvents.map((event) => {
                const eventId = event._id || event.id;
                const title = getEventTitle(event);
                const eventDate = normalizeDate(event);
                const image = getEventImage(event);
                const titleWords = title.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
                const titlePreview = titleWords.length > 7
                  ? `${titleWords.slice(0, 7).join(' ')} . . .`
                  : titleWords.join(' ');
                const eventYear = eventDate ? new Date(eventDate).getFullYear() : null;

                return (
                  <article
                    key={eventId}
                    className="flex flex-col overflow-hidden rounded-2xl border border-lasa-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div
                      className="relative w-full overflow-hidden bg-lasa-50"
                      style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          className="h-full w-full object-contain"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gray-100 text-sm text-gray-400">No image available</div>
                      )}
                      {eventYear && (
                        <div className="absolute right-4 top-4 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white">
                          {eventYear}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col p-3.5 md:p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-h-[1.5rem] items-center text-sm font-extrabold text-lasa-600">
                          <svg className="mr-2 h-4 w-4 text-lasa-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
                          </svg>
                          {formatEventDate(eventDate, { variant: 'short' })}
                        </div>
                        <Link
                          to={`/events/${eventId}`}
                          className="inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-lasa-600 px-3 text-xs font-semibold text-white transition-colors duration-300 hover:bg-lasa-700 focus:outline-none focus:ring-2 focus:ring-lasa-500 focus:ring-offset-2"
                          aria-label={`View details for ${title}`}
                        >
                          View Details
                        </Link>
                      </div>

                      <p
                        className="mt-2 min-h-[2.5rem] text-sm font-extrabold leading-5 text-lasa-600"
                      >
                        {titlePreview}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {!loading && !error && (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
              >
                Back to home
              </Link>
              <Link
                to="/archived-events"
                className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
              >
                View archived events
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
