const SOCIOCARE_PROGRAMS = [
  {
    title: 'Nutritional Security and Food Pantry Services',
    cue: 'Food dignity',
    points: [
      'We run robust food security projects designed to alleviate hunger and malnutrition.',
      'By distributing fresh groceries and hot meals to low-income families and individuals, we ensure that the most fundamental human need for nourishment is met with dignity and care.',
    ],
  },
  {
    title: 'Humanitarian Resettlement and Integration',
    cue: 'New beginnings',
    points: [
      'In partnership with local agencies, we provide essential support to newly arrived refugees and displaced populations, such as families from Afghanistan.',
      'Our services extend beyond initial shelter to include furniture distribution, transportation assistance, and long-term community integration.',
    ],
  },
  {
    title: 'Shelter and Crisis Outreach',
    cue: 'Rapid support',
    points: [
      'We actively partner with and support local shelters, providing necessary life supplies, seasonal clothing, and immediate resources to individuals experiencing homelessness or housing instability.',
    ],
  },
  {
    title: 'Environmental and Community Bonding',
    cue: 'Neighborhood unity',
    points: [
      'Sociocare recognizes that a healthy community requires a harmonious environment.',
      'We foster civic pride and community unity through localized volunteer service projects, encouraging individuals from all backgrounds to work together for the collective good.',
    ],
  },
];

export default function FoodAndNourishment() {
  return (
    <section className="relative overflow-hidden bg-lasa-50 pb-14 sm:pb-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_10%_16%,rgba(134,160,125,0.24),transparent_48%),radial-gradient(circle_at_84%_12%,rgba(79,122,106,0.24),transparent_50%)]" />

      <div className="relative border-b border-lasa-200 bg-gradient-to-b from-lasa-100/95 to-lasa-50/90">
        <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="reading-kicker text-xs font-semibold uppercase text-lasa-500">
            Sociocare: Community Welfare and Social Upliftment
          </p>
          <h1 className="reading-title mt-3 text-4xl font-display text-lasa-700 sm:text-6xl">
            Strengthening the social fabric
          </h1>
          <ul className="reading-copy mt-5 list-disc space-y-2 pl-5 text-[15px] text-lasa-600 sm:text-[1.03rem]">
            <li>
              Sociocare represents the practical expression of our motto, "Love All, Serve
              All," at the societal level.
            </li>
            <li>
              It is our comprehensive commitment to improving the social fabric, environmental
              well-being, and overall quality of life for the larger community.
            </li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div className="narrative-panel rounded-3xl p-6 sm:p-8">
          <p className="reading-kicker text-[11px] font-semibold uppercase text-lasa-500">
            Sociocare Scope
          </p>
          <ul className="reading-copy mt-3 list-disc space-y-2 pl-5 text-[15px] text-lasa-600 sm:text-base">
            <li>
              While our medical and educational programs heal the body and empower the mind, our
              Sociocare initiatives focus on restoring dignity, ensuring food security, and
              creating a supportive ecosystem for vulnerable populations.
            </li>
            <li>
              Our Sociocare framework addresses systemic social challenges through dedicated,
              volunteer-driven programs.
            </li>
          </ul>
        </div>

        <p className="reading-kicker mt-8 text-xs font-semibold uppercase text-lasa-500">
          Programs in Action
        </p>

        <div className="mt-4 grid gap-5 lg:grid-cols-2 lg:[grid-auto-rows:1fr]">
          {SOCIOCARE_PROGRAMS.map((program) => (
            <article
              key={program.title}
              className="uniform-card narrative-card group rounded-3xl border border-lasa-200 bg-white p-6 shadow-[0_20px_40px_-32px_rgba(30,58,52,0.55)] transition-all duration-500 hover:-translate-y-1 hover:border-lasa-300 hover:shadow-lg"
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
            Long-Term Commitment
          </p>
          <ul className="reading-copy mt-3 list-disc space-y-2 pl-5 text-[15px] text-lasa-100 sm:text-base">
            <li>
              Through Sociocare, LASA Foundation Inc. treats society as one extended family,
              ensuring that no individual is left behind and that every community member feels
              valued, protected, and supported.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
