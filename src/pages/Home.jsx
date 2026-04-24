
import UpcomingEventsGallery from '../components/UpcomingEventsGallery';
import RecentEventsSection from '../components/RecentEventsSection';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="flex items-start pt-4 md:pt-8 lg:pt-32">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-20">

            {/* Left — Hero Text & Description */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-lasa-600 leading-tight">
                Welcome to{' '}
                <span className="text-lasa-500">LASA Foundation</span>
              </h1>

              <p className="mt-3 lg:mt-6 text-sm lg:text-lg text-lasa-600/80 leading-relaxed max-w-xl mx-auto lg:mx-0 text-justify">
                We are a charitable organization dedicated to undertaking community
                service activities based on Five Universal Human Values – Truth,
                Non-violence, Peace, Love, and Right Conduct. The acronym LASA
                stands for "Love All, Serve All". We are a free, non-denominational,
                and voluntary organization. Our members come from all walks of life
                and share a common goal – to empower the community around us through
                the practice of Love and Service.
              </p>
            </div>

            {/* Right — Logo, Tagline & Org Name */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <img
                src="/logo-hires.png"
                alt="LASA Foundation Logo"
                className="w-32 sm:w-40 lg:w-64 h-auto"
              />

              <h2 className="mt-2 lg:mt-4 text-lg sm:text-xl lg:text-2xl font-bold text-lasa-600 underline underline-offset-4 lg:underline-offset-8 decoration-2 decoration-lasa-500 tracking-wide text-center py-1">
                LOVE ALL SERVE ALL
              </h2>

              <p className="mt-1 lg:mt-2 text-xs lg:text-base font-medium text-lasa-500 tracking-wider text-center">
                LASA Foundation Inc.
              </p>
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
