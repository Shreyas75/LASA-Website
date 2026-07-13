const HEALTHCARE_PILLARS = [
  {
    title: 'Barrier-Free Medical Clinics',
    cue: 'Accessible care',
    points: [
      'We host comprehensive, biannual free medical clinics staffed entirely by licensed healthcare professionals who volunteer their time and expertise.',
      'These clinics offer specialized consultations in cardiology, oncology, and neurology, alongside routine physicals and screenings, ensuring that financial hardship never dictates health outcomes.',
    ],
  },
  {
    title: 'Public Health and Immunization',
    cue: 'Community resilience',
    points: [
      'In partnership with public health authorities, our facilities serve as trusted community clinics.',
      'By facilitating thousands of critical vaccinations and preventative screenings, we actively protect public health and build long-term community resilience.',
    ],
  },
  {
    title: 'Compassionate Patient Support',
    cue: 'Family-centered support',
    points: [
      'True healthcare extends beyond the exam room.',
      'Our Caregiver Support Program provides vital grocery supplies and resources to the immediate families of cancer patients, alleviating the peripheral burdens of illness so families can focus entirely on healing.',
    ],
  },
];

export default function HealthAndWellness() {
  return (
    <section className="relative overflow-hidden bg-lasa-50 pb-14 sm:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_12%_8%,rgba(79,122,106,0.22),transparent_46%),radial-gradient(circle_at_86%_12%,rgba(134,160,125,0.24),transparent_52%)]" />

      <div className="relative border-b border-lasa-200 bg-gradient-to-b from-lasa-100/95 to-lasa-50/90">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="reading-kicker text-xs font-semibold uppercase text-lasa-500">
            Holistic Healthcare as a Service
          </p>
          <h1 className="reading-title mt-3 text-4xl font-display text-lasa-700 sm:text-6xl xl:whitespace-nowrap">
            Healthcare that honors dignity and access
          </h1>
          <ul className="reading-copy mt-5 list-disc space-y-2 pl-5 text-[15px] text-lasa-600 sm:text-[1.03rem]">
            <li>
              At LASA Foundation Inc., we view healthcare not merely as a medical necessity, but
              as a vital, compassionate community service.
            </li>
            <li>
              Operating under our core mandate to "Love All, Serve All," our healthcare
              initiatives bridge critical gaps for low-income, uninsured, and vulnerable
              individuals who face systemic barriers to quality medical care.
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="narrative-panel rounded-3xl p-6 sm:p-8">
          <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-500">
            Healthcare Model
          </p>
          <ul className="reading-copy mt-3 list-disc space-y-2 pl-5 text-[15px] text-lasa-600 sm:text-base">
            <li>
              Our service-driven healthcare model focuses on dignity, accessibility, and
              preventive wellness through three major pillars.
            </li>
          </ul>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-3 lg:[grid-auto-rows:1fr]">
          {HEALTHCARE_PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="uniform-card narrative-card group rounded-3xl border border-lasa-200 bg-white p-6 shadow-[0_20px_40px_-32px_rgba(30,58,52,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-lasa-300 hover:shadow-lg"
            >
              <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-500">
                {pillar.cue}
              </p>
              <h2 className="reading-subtitle mt-2 text-xl font-semibold text-lasa-700">
                {pillar.title}
              </h2>
              <ul className="reading-copy-tight mt-3 list-disc space-y-1.5 pl-5 text-[15px] text-lasa-600">
                {pillar.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-lasa-200 bg-gradient-to-r from-lasa-700 to-lasa-600 p-6 text-white shadow-lg sm:p-8">
          <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-100">
            Service Outcome
          </p>
          <ul className="reading-copy mt-3 list-disc space-y-2 pl-5 text-[15px] text-lasa-100 sm:text-base">
            <li>
              Through these volunteer-driven services, we translate our five universal values
              into tangible, life-saving care, ensuring every patient is treated as an
              individual worthy of compassion and respect.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
