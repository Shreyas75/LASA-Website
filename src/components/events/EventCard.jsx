import { Link } from 'react-router-dom';
import { formatEventDate } from '../../utils/dateDisplay';
import { EVENT_FLYER_ASPECT_RATIO } from '../../constants/eventMedia';

export default function EventCard({ event, actions, onClick, to }) {
  const cover = event.coverImageUrl || event.flyerUrl || event.gallery?.[0];
  const isClickable = Boolean(onClick || to);
  const isButton = Boolean(onClick) && !to;
  const descriptionText = event.description || '';

  const handleKeyDown = (evt) => {
    if (!isClickable) return;
    if (evt.key === 'Enter' || evt.key === ' ') {
      evt.preventDefault();
      onClick();
    }
  };

  const lineClampTwo = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const lineClampOne = {
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };

  const content = (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-2xl border border-lasa-200 bg-white shadow-sm transition-shadow hover:shadow-lg ${
        isClickable ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
      onClick={to ? undefined : onClick}
      onKeyDown={to ? undefined : handleKeyDown}
      role={isButton ? 'button' : undefined}
      tabIndex={isButton ? 0 : undefined}
    >
      <div
        className="relative w-full bg-lasa-50"
        style={{ aspectRatio: EVENT_FLYER_ASPECT_RATIO }}
      >
        {cover ? (
          <img
            src={cover}
            alt={event.title}
            className="h-full w-full object-contain"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-lasa-400">
            No image available
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="min-h-[6.5rem]">
          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-lasa-400">
            <svg className="h-3.5 w-3.5 text-lasa-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />
            </svg>
            {formatEventDate(event.startDate, { variant: 'short' })}
          </p>
          <h3 className="mt-2 break-words text-base font-semibold text-lasa-600 sm:text-lg" style={lineClampTwo}>
            {event.title}
          </h3>
          {event.location && (
            <p className="mt-1 inline-flex items-start gap-1.5 break-words text-sm text-lasa-500">
              <svg className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-lasa-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span style={lineClampTwo}>{event.location}</span>
            </p>
          )}
        </div>
        <div className="mt-2 min-h-[1.5rem]">
          {descriptionText ? (
            <p className="text-sm text-lasa-500 leading-relaxed whitespace-pre-line" style={lineClampOne}>
              {descriptionText}
            </p>
          ) : null}
        </div>
        {actions && (
          <div
            className="mt-auto border-t border-lasa-100 pt-3"
            onClick={(evt) => evt.stopPropagation()}
          >
            {actions}
          </div>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block" aria-label={`View ${event.title}`}>
        {content}
      </Link>
    );
  }

  return content;
}
