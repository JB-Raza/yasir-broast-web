import { Link } from 'react-router-dom';
import { FiMapPin, FiPhone, FiClock, FiArrowRight, FiNavigation } from 'react-icons/fi';

/* ─── Branch data ────────────────────────────────────────────────────── */
const BRANCHES = [
  {
    id: 'b-1',
    name: 'Johar Town',
    address: 'Main Boulevard, Johar Town, Lahore',
    phone: '042-35312350-54',
    hours: '10:00 AM – 2:00 AM',
    highlight: 'Family Section Available',
    mapUrl: 'https://maps.google.com/?q=Yasir+Broast+Johar+Town+Lahore',
  },
  {
    id: 'b-2',
    name: 'Thokar Niaz Baig',
    address: 'Multan Road, Thokar Niaz Baig, Lahore',
    phone: '042-35316605',
    hours: '10:00 AM – 2:00 AM',
    highlight: 'Drive-Through Available',
    mapUrl: 'https://maps.google.com/?q=Yasir+Broast+Thokar+Niaz+Baig+Lahore',
  },
  {
    id: 'b-3',
    name: 'Allama Iqbal Town',
    address: 'Near Firdous Market, Allama Iqbal Town, Lahore',
    phone: '042-35316606',
    hours: '10:00 AM – 2:00 AM',
    highlight: 'Rooftop Dining Available',
    mapUrl: 'https://maps.google.com/?q=Yasir+Broast+Allama+Iqbal+Town+Lahore',
  },
];

/* ─── Single branch card ─────────────────────────────────────────────── */
function BranchCard({ branch }) {
  return (
    <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100 hover:border-primary/30">

      {/* Coloured top strip */}
      <div className="h-2 bg-gradient-to-r from-primary to-gold" />

      <div className="p-6 flex flex-col flex-1 gap-4">

        {/* Branch name + highlight tag */}
        <div>
          <h3 className="font-montserrat font-extrabold text-charcoal text-xl mb-2 group-hover:text-primary transition-colors duration-200">
            {branch.name}
          </h3>
          <span className="inline-block bg-gold/15 text-charcoal font-opensans font-semibold text-xs px-3 py-1 rounded-full">
            ✨ {branch.highlight}
          </span>
        </div>

        {/* Details list */}
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <FiMapPin className="text-primary mt-0.5 shrink-0" size={16} />
            <span className="font-opensans text-gray-600 text-sm leading-snug line-clamp-2">
              {branch.address}
            </span>
          </li>
          <li className="flex items-center gap-3">
            <FiPhone className="text-primary shrink-0" size={16} />
            <a
              href={`tel:${branch.phone.replace(/[-\s]/g, '')}`}
              className="font-opensans text-gray-600 text-sm hover:text-primary transition-colors duration-200"
            >
              {branch.phone}
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FiClock className="text-primary shrink-0" size={16} />
            <span className="font-opensans text-gray-600 text-sm">{branch.hours}</span>
          </li>
        </ul>

        {/* Action buttons */}
        <div className="flex gap-3 mt-auto pt-2">
          <a
            href={branch.mapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Get directions to ${branch.name}`}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-montserrat font-semibold text-sm py-2.5 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FiNavigation size={14} />
            Get Directions
          </a>
          <a
            href={`tel:${branch.phone.replace(/[-\s]/g, '')}`}
            aria-label={`Call ${branch.name}`}
            className="flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-semibold text-sm py-2.5 px-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FiPhone size={14} />
            Call
          </a>
        </div>
      </div>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function BranchesPreview() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-charcoal mb-2">
              <span className="section-title-underline">Our Locations</span>
            </h2>
            <p className="font-opensans text-gray-500 mt-5 text-base max-w-lg">
              20+ branches across Lahore — there&apos;s always a Yasir Broast near you.
            </p>
          </div>
          <Link
            to="/branches"
            className="flex items-center gap-2 text-primary font-montserrat font-bold text-sm hover:text-primary-dark transition-colors duration-200 shrink-0 whitespace-nowrap"
          >
            View All Branches <FiArrowRight size={16} />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            to="/branches"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105"
          >
            View All 20+ Branches <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
