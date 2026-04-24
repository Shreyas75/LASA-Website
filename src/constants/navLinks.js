export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about-us' },
  {
    label: 'Our Activities',
    path: '/our-activities',
    children: [
      { label: 'Food & Nourishment', path: '/our-activities/food-and-nourishment' },
      { label: 'Health & Wellness', path: '/our-activities/health-and-wellness' },
      { label: 'Medical Clinic', path: '/our-activities/medical-clinic' },
    ],
  },
  {
    label: 'Events',
    path: '/events',
    children: [
      { label: 'Upcoming Events', path: '/events/upcoming' },
      { label: 'Past Events', path: '/events/past' },
    ],
  },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Donate', path: '/donate' },
];
