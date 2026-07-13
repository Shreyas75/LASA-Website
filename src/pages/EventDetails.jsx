import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchEventById } from '../api/events';
import LoadingState from '../components/common/LoadingState';
import ErrorState from '../components/common/ErrorState';
import { CONTACT } from '../constants/contact';
import { formatEventDate } from '../utils/dateDisplay';
import { shareEvent } from '../utils/shareEvent';
import { EVENT_FLYER_ASPECT_RATIO } from '../constants/eventMedia';

export default function EventDetails() {
  const registerActionClass =
    'inline-flex items-center rounded-lg bg-lasa-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-lasa-700';
  const detailActionClass =
    'inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg border border-lasa-200 bg-white px-3 text-sm font-semibold text-lasa-600 transition-colors hover:bg-lasa-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lasa-300';
  const detailPrimaryActionClass =
    'inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-lasa-600 px-3 text-sm font-semibold text-white transition-colors hover:bg-lasa-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lasa-300';

  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sharing, setSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadEvent() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEventById(eventId);
        if (isMounted) setEvent(data);
      } catch (err) {
        if (isMounted) setError(err?.message || 'Unable to load event details');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (eventId) loadEvent();

    return () => {
      isMounted = false;
    };
  }, [eventId]);

  const gallery = useMemo(() => event?.gallery || [], [event]);
  const eventTitle = event?.title || event?.name || 'LASA Event';
  const eventDateValue = event?.startDate || event?.date;
  const heroImage = event?.coverImageUrl || gallery[0] || event?.image || event?.flyerUrl;

  const handleShare = async () => {
    if (!event) return;

    setSharing(true);
    setShareMessage('');
    try {
      const shareResult = await shareEvent({
        title: eventTitle,
        text: event.description
          ? event.description.slice(0, 180)
          : 'Join this LASA event and be part of community service.',
        url: window.location.href,
      });

      if (shareResult === 'copied') {
        setShareMessage('Event link copied to clipboard.');
      }
    } catch (err) {
      if (err?.name !== 'AbortError') {
        setShareMessage('Unable to share right now. Please copy the URL from your browser.');
      }
    } finally {
      setSharing(false);
    }
  };

  if (loading) {
    return <LoadingState message="Loading event..." />;
  }

  if (error || !event) {
    return (
      <section className="bg-lasa-50 py-16">
        <div className="mx-auto w-full max-w-3xl px-6">
          <ErrorState message={error || 'Event not found.'} />
          <Link
            to="/events"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lasa-600 hover:text-lasa-700"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-lasa-50 py-10 sm:py-12">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-lasa-600 hover:text-lasa-700"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to events
        </Link>

        <div className="mt-6 overflow-hidden rounded-3xl border border-lasa-200 bg-white shadow-lg">
          {heroImage ? (
            <div className="border-b border-lasa-200 bg-lasa-50 p-4 sm:p-6">
              <div
                className="mx-auto max-w-sm overflow-hidden rounded-xl border border-lasa-200 bg-white shadow-sm"
                style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
              >
                <img
                  src={heroImage}
                  alt={eventTitle}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          ) : (
            <div className="flex h-48 items-center justify-center border-b border-lasa-200 bg-lasa-100 text-sm text-lasa-500">
              No image available
            </div>
          )}

          <div className="border-b border-lasa-200 px-4 py-5 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">
              {formatEventDate(eventDateValue, { variant: 'full' })}
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-lasa-700 sm:text-3xl">
              {eventTitle}
            </h1>
            {event.location && (
              <p className="mt-2 text-sm text-lasa-500 sm:text-base">{event.location}</p>
            )}
          </div>

          <div className="grid gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-lasa-600">About this event</h2>
                <p className="mt-3 text-sm leading-relaxed text-lasa-500 whitespace-pre-wrap break-words">
                  {event.description || 'More details will be shared soon.'}
                </p>
              </div>

              {gallery.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-lasa-400">
                    Gallery
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {gallery.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="overflow-hidden rounded-xl border border-lasa-200 bg-lasa-50"
                        style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
                      >
                        <img src={url} alt={`Gallery ${index + 1}`} className="h-full w-full object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-lasa-200 bg-lasa-50 px-4 py-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">Schedule</p>
                  {event.registrationLink && (
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noreferrer"
                      className={registerActionClass}
                    >
                      Register now
                    </a>
                  )}
                </div>
                <p className="mt-2 text-sm font-semibold text-lasa-600">
                  {formatEventDate(eventDateValue, { variant: 'full' })}
                </p>
                {event.location && (
                  <p className="mt-2 text-sm text-lasa-500">{event.location}</p>
                )}
              </div>

              <div className="rounded-2xl border border-lasa-200 bg-lasa-50 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">Contact Us</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <a
                    href={CONTACT.phoneHref}
                    className={detailActionClass}
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call us
                  </a>
                  <a
                    href={CONTACT.emailHref}
                    className={detailActionClass}
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email us
                  </a>
                </div>
                <Link
                  to="/contact"
                  className={`mt-2 ${detailPrimaryActionClass}`}
                >
                  Contact page
                </Link>
              </div>

              <div className="rounded-2xl border border-lasa-200 bg-lasa-50 px-4 py-4">
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={sharing}
                  className={`${detailActionClass} disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C9.886 12.588 11.304 12 12.75 12c2.426 0 4.774 1.328 6.75 3.75m-10.816-2.408C7.41 14.145 6.25 15.436 5.25 17.25M4.5 4.5h15v15h-15v-15z" />
                  </svg>
                  {sharing ? 'Sharing...' : 'Share event'}
                </button>
                {shareMessage && (
                  <p className="mt-2 text-xs text-lasa-500">{shareMessage}</p>
                )}
              </div>

              {event.flyerUrl && (
                <a
                  href={event.flyerUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-lasa-600 px-4 py-3 text-sm font-semibold text-white hover:bg-lasa-700"
                >
                  Download flyer
                </a>
              )}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
