import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiExternalLink } from 'react-icons/fi';
import BranchCard from '../components/branches/BranchCard';

/* ─── Branch data ────────────────────────────────────────────────────
   Based on publicly available information about Yasir Broast, Lahore.
   Update phones / addresses as confirmed with the restaurant.
─────────────────────────────────────────────────────────────────── */
const BRANCHES = [
  {
    id: 1,
    name: 'Johar Town',
    address: 'Main Boulevard, Block C, Johar Town, Lahore',
    phones: ['042-35312350', '042-35312354'],
    hours: '10:00 AM – 2:00 AM',
    coordinates: { lat: 31.4711, lng: 74.2581 },
    isMainBranch: true,
  },
  {
    id: 2,
    name: 'Thokar Niaz Baig',
    address: 'Multan Road, Thokar Niaz Baig, Lahore',
    phones: ['042-35316605', '042-35316606'],
    hours: '10:00 AM – 2:00 AM',
    coordinates: { lat: 31.4081, lng: 74.2419 },
    isMainBranch: false,
  },
  {
    id: 3,
    name: 'Allama Iqbal Town',
    address: 'Near Firdous Market, Allama Iqbal Town, Lahore',
    phones: ['042-35316607'],
    hours: '10:00 AM – 2:00 AM',
    coordinates: { lat: 31.5193, lng: 74.3058 },
    isMainBranch: false,
  },
  {
    id: 4,
    name: 'DHA Phase 5',
    address: 'Commercial Area, Phase 5, Defence Housing Authority, Lahore',
    phones: ['042-35316608'],
    hours: '10:00 AM – 2:00 AM',
    coordinates: { lat: 31.4697, lng: 74.3836 },
    isMainBranch: false,
  },
  {
    id: 5,
    name: 'Gulberg',
    address: 'Main Boulevard Gulberg, Near Liberty Market, Lahore',
    phones: ['042-35316609'],
    hours: '10:00 AM – 2:00 AM',
    coordinates: { lat: 31.5178, lng: 74.3432 },
    isMainBranch: false,
  },
  {
    id: 6,
    name: 'Model Town',
    address: 'Main Boulevard, Model Town, Lahore',
    phones: ['042-35316610'],
    hours: '10:00 AM – 2:00 AM',
    coordinates: { lat: 31.5048, lng: 74.3133 },
    isMainBranch: false,
  },
];

/* ─── Map preview ────────────────────────────────────────────────────
   Uses Google Maps embed (no API key required for this basic URL).
   Opens full Google Maps when clicked.
─────────────────────────────────────────────────────────────────── */
const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Yasir+Broast+Lahore&output=embed';
const MAP_OPEN_URL =
  'https://maps.google.com/?q=Yasir+Broast+Lahore';

/* ─── Page ───────────────────────────────────────────────────────── */
export default function BranchesScreen() {
  return (
    <>
      {/* ── SEO ─────────────────────────────────────────────────── */}
      <Helmet>
        <title>Our Locations | Yasir Broast – 20+ Branches in Lahore</title>
        <meta
          name="description"
          content="Find your nearest Yasir Broast branch in Lahore. 20+ locations including Johar Town, Thokar Niaz Baig, DHA, Gulberg and more. Open 10 AM – 2 AM daily."
        />
        <link rel="canonical" href="https://yasirbroast.com/branches" />
      </Helmet>

      {/* ── 1. Page Header ──────────────────────────────────────── */}
      <header className="bg-primary text-white relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-black/10 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-white/70">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200 font-opensans">
                  Home
                </Link>
              </li>
              <li aria-hidden="true"><FiChevronRight size={14} /></li>
              <li>
                <span className="text-white font-opensans font-semibold">Branches</span>
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-3">
            Our Locations
          </h1>
          <p className="font-opensans text-white/80 text-lg max-w-xl">
            20+ branches across Lahore — open daily from 10:00 AM to 2:00 AM.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-6">
            {[
              { value: '20+', label: 'Branches'     },
              { value: '10 AM – 2 AM', label: 'Daily Hours' },
              { value: 'Lahore',       label: 'City'        },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-montserrat font-extrabold text-gold text-2xl leading-none">{value}</p>
                <p className="font-opensans text-white/60 text-xs uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 28H1440V14C1200 0 960 28 720 14C480 0 240 28 0 14V28Z" fill="white" />
          </svg>
        </div>
      </header>

      {/* ── 2. Branch Cards Grid ────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        {/* More branches note */}
        <p className="text-center font-opensans text-gray-400 text-sm mt-8">
          Showing 6 of 20+ branches.{' '}
          <a
            href={MAP_OPEN_URL}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-semibold inline-flex items-center gap-1"
          >
            View all on Google Maps <FiExternalLink size={12} aria-hidden="true" />
          </a>
        </p>

        {/* ── 3. Map Preview ────────────────────────────────────── */}
        <section aria-label="Branch locations map" className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-montserrat font-extrabold text-charcoal text-2xl">
              Find Us on the Map
            </h2>
            <a
              href={MAP_OPEN_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 font-montserrat font-semibold text-sm text-primary hover:text-primary-dark transition-colors duration-200"
              aria-label="Open full Google Maps"
            >
              Open Full Map <FiExternalLink size={14} aria-hidden="true" />
            </a>
          </div>

          {/* Iframe embed — clicking opens Google Maps */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              title="Yasir Broast branch locations in Lahore"
              src={MAP_EMBED_URL}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
            {/* Clickable overlay that opens full map */}
            <a
              href={MAP_OPEN_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Yasir Broast locations in Google Maps"
              className="absolute inset-0 bg-transparent"
            />
          </div>
        </section>

      </main>
    </>
  );
}
