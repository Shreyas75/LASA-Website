import { useEffect, useState } from 'react';
import { CONTACT } from '../../constants/contact';
import { formatEventDate } from '../../utils/dateDisplay';
import { shareEvent } from '../../utils/shareEvent';
import { EVENT_FLYER_ASPECT_RATIO } from '../../constants/eventMedia';

export default function EventModal({ event, onClose }) {
  const [sharing, setSharing] = useState(false);
  const [shareMessage, setShareMessage] = useState('');

  useEffect(() => {
    if (!event) return undefined;
    const handleKey = (evt) => {
      if (evt.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [event, onClose]);

  if (!event) return null;

  const eventTitle = event.title || event.name || 'LASA Event';
  const eventDate = event.startDate || event.date;
  const image = event.coverImageUrl || event.gallery?.[0] || event.image || event.flyerUrl;

  const handleShare = async () => {
    const eventId = event._id || event.id;
    const eventUrl = eventId
      ? `${window.location.origin}/events/${eventId}`
      : window.location.href;

    setSharing(true);
    setShareMessage('');
    try {
      const shareResult = await shareEvent({
        title: eventTitle,
        text: event.description
          ? event.description.slice(0, 180)
          : 'Join this LASA event and be part of community service.',
        url: eventUrl,
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
        onClick={(evt) => evt.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-lasa-200 bg-white px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">
              {formatEventDate(eventDate, { variant: 'long' })}
            </p>
            <h2 className="mt-1 text-xl font-semibold text-lasa-600">{eventTitle}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-lasa-200 p-2 text-lasa-500 hover:bg-lasa-100"
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {image && (
          <div className="border-b border-lasa-200 bg-lasa-50 p-3 sm:p-4">
            <div
              className="mx-auto max-w-sm overflow-hidden rounded-xl border border-lasa-200 bg-white"
              style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
            >
              <img
                src={image}
                alt={eventTitle}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        )}

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-xl border border-lasa-200 bg-lasa-50 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">Schedule</p>
              {event.registrationLink && (
                <a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-lg bg-lasa-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-lasa-700"
                >
                  Register now
                </a>
              )}
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-lasa-600">
              <svg className="h-4 w-4 text-lasa-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
              </svg>
              {formatEventDate(eventDate, { variant: 'long' })}
            </p>
            {event.location && (
              <p className="mt-1 flex items-center gap-1.5 text-sm text-lasa-500">
                <svg className="h-4 w-4 text-lasa-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657 13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </p>
            )}

            <div className="mt-3 flex items-center justify-end gap-2">
              <a
                href={CONTACT.phoneHref}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm transition-colors hover:bg-emerald-600"
                aria-label="Call us"
                title="Call us"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <button
                type="button"
                onClick={handleShare}
                disabled={sharing}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Share event"
                title="Share event"
              >
                {sharing ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12a8 8 0 018-8" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C9.886 12.588 11.304 12 12.75 12c2.426 0 4.774 1.328 6.75 3.75m-10.816-2.408C7.41 14.145 6.25 15.436 5.25 17.25M4.5 4.5h15v15h-15v-15z" />
                  </svg>
                )}
              </button>
              <a
                href={CONTACT.emailHref}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm transition-colors hover:bg-rose-600"
                aria-label="Email us"
                title="Email us"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {shareMessage && (
            <p className="text-xs text-lasa-500">{shareMessage}</p>
          )}

          {event.description ? (
            <p className="text-sm leading-relaxed text-lasa-500 whitespace-pre-wrap break-words">{event.description}</p>
          ) : (
            <p className="text-sm text-lasa-500">No description provided yet.</p>
          )}

          {event.gallery?.length ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-lasa-400">Gallery</p>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                {event.gallery.map((url, index) => (
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
          ) : null}

          {event.flyerUrl && (
            <a
              href={event.flyerUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-lasa-600 px-4 py-2 text-sm font-semibold text-white hover:bg-lasa-700"
            >
              Download flyer
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
