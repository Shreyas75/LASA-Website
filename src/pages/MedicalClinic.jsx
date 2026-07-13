const EDUCARE_PROGRAMS = [
  {
    title: 'Youth Tutoring and Academic Assistance',
    cue: 'Academic confidence',
    points: [
      'Integrated directly into our community outreach, we provide supportive tutoring services for children.',
      'This initiative ensures that students from low-income or freshly resettled families receive the specialized academic attention needed to thrive in school.',
    ],
  },
  {
    title: 'Holistic Nutrition and Wellness Education',
    cue: 'Life skills learning',
    points: [
      'True education extends to life skills.',
      'In tandem with our food pantry services, we host educational workshops focused on healthy eating, cooking, and nutritional literacy, teaching families how to maximize resources for long-term health.',
    ],
  },
];

export default function MedicalClinic() {
  return (
    <section className="relative overflow-hidden bg-lasa-50 pb-14 sm:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_12%_10%,rgba(134,160,125,0.24),transparent_48%),radial-gradient(circle_at_84%_12%,rgba(79,122,106,0.24),transparent_50%)]" />

      <div className="relative border-b border-lasa-200 bg-gradient-to-b from-lasa-100/95 to-lasa-50/90">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="reading-kicker text-xs font-semibold uppercase text-lasa-500">
            Educare and Community Learning Services
          </p>
          <h1 className="reading-title mt-3 text-4xl font-display text-lasa-700 sm:text-6xl xl:whitespace-nowrap">
            Education that builds character and resilience
          </h1>
          <ul className="reading-copy mt-5 list-disc space-y-2 pl-5 text-[15px] text-lasa-600 sm:text-[1.03rem]">
            <li>
              At LASA Foundation Inc., our approach to education goes beyond traditional
              academic instruction.
            </li>
            <li>
              We practice Educare, a service-driven educational philosophy that seeks to draw out
              the inherent human values of Truth, Right Conduct, Peace, Love, and Non-Violence
              from within each individual.
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="narrative-panel rounded-3xl p-6 sm:p-8">
          <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-500">
            Educare Mission
          </p>
          <ul className="reading-copy mt-3 list-disc space-y-2 pl-5 text-[15px] text-lasa-600 sm:text-base">
            <li>
              We believe that true learning should foster character development, empower
              families, and build long-term community self-reliance.
            </li>
            <li>
              Our Educare and community learning initiatives serve diverse age groups through
              targeted, high-impact service programs.
            </li>
          </ul>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:[grid-auto-rows:1fr]">
          {EDUCARE_PROGRAMS.map((program, index) => (
            <article
              key={program.title}
              className={`uniform-card narrative-card group rounded-3xl border border-lasa-200 bg-white p-6 shadow-[0_20px_40px_-32px_rgba(30,58,52,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-lasa-300 hover:shadow-lg ${
                index === 0 ? 'lg:order-1' : 'lg:order-2'
              }`}
            >
              <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-500">
                {program.cue}
              </p>
              <h2 className="reading-subtitle mt-2 text-xl font-semibold text-lasa-700">
                {program.title}
              </h2>
              <ul className="reading-copy-tight mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-lasa-600">
                {program.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-lasa-200 bg-gradient-to-r from-lasa-700 to-lasa-600 p-6 text-white shadow-lg sm:p-8">
          <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-100">
            Learning Outcome
          </p>
          <ul className="reading-copy mt-3 list-disc space-y-2 pl-5 text-[15px] text-lasa-100 sm:text-base">
            <li>
              Through these character-centric and practical educational services, we do not just
              teach, we empower individuals to transform their lives and uplift their
              communities.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
