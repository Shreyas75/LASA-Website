
import { Link } from 'react-router-dom';
import UpcomingEventsGallery from '../components/UpcomingEventsGallery';
import RecentEventsSection from '../components/RecentEventsSection';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex items-start pt-6 md:pt-10 lg:pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 w-full">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="text-center lg:text-left">
              <div className="mx-auto w-fit max-w-full lg:mx-0">
                <h1 className="mt-4 font-display leading-tight text-lasa-700">
                  <span className="block text-2xl font-normal text-lasa-600 sm:text-3xl lg:text-4xl">
                    Welcome to
                  </span>
                  <span className="mt-1 block text-2xl sm:text-4xl lg:text-6xl">
                    LASA Foundation
                  </span>
                </h1>
                <p className="mt-5 text-justify text-sm leading-relaxed text-lasa-600/90 sm:text-base lg:text-lg">
                  We are a charitable organization dedicated to undertaking community
                  service activities based on Five Universal Human Values – Truth,
                  Non-violence, Peace, Love, and Right Conduct. The acronym LASA
                  stands for "Love All, Serve All". Our members come from all walks of life
                  and share a common goal – to empower the community around us through
                  the practice of Love and Service.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 rounded-full bg-lasa-600 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-lasa-700"
                >
                  Explore events
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-lasa-200 bg-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-lasa-600 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-lasa-100"
                >
                  Get involved
                </Link>
              </div>
            </div>

            <div className="mx-auto flex w-full max-w-sm flex-col items-center rounded-3xl border border-lasa-200 bg-white/90 px-10 py-10 shadow-xl sm:max-w-md lg:mx-0 lg:max-w-md lg:justify-self-end lg:px-12 lg:py-12">
              <img
                src="/finallogo.png"
                alt="LASA Foundation Logo"
                className="w-64 h-auto sm:w-72 lg:w-80"
              />

              <img
                src="/write.jpeg"
                alt="Love All Serve All - LASA Foundation Inc."
                className="mt-6 w-full max-w-[22rem] h-auto"
              />

            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Gallery */}
      <UpcomingEventsGallery />

      {/* Recent Events */}
      <RecentEventsSection />
    </>
  );
}
