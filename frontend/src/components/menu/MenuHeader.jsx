import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

export default function MenuHeader() {
  return (
    <header className="bg-primary text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-14 -left-14 w-72 h-72 rounded-full bg-black/10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 sm:pb-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Text content */}
          <div>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex items-center gap-1.5 text-sm text-white/70">
                <li>
                  <Link to="/" className="hover:text-white transition-colors duration-200 font-opensans">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <FiChevronRight size={14} />
                </li>
                <li>
                  <span className="text-white font-opensans font-semibold">Menu</span>
                </li>
              </ol>
            </nav>

            {/* Title */}
            <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-3">
              Our Menu
            </h1>
            <p className="font-opensans text-white/80 text-base sm:text-lg max-w-lg leading-relaxed">
              Discover Lahore&apos;s finest broast and traditional Pakistani cuisine — 36 dishes
              across 9 categories, made fresh daily.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 mt-6">
              {[
                { value: '9',   label: 'Categories'     },
                { value: '36+', label: 'Dishes'          },
                { value: '20+', label: 'Lahore Branches' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-montserrat font-extrabold text-gold text-2xl leading-none">{value}</p>
                  <p className="font-opensans text-white/70 text-xs mt-0.5 uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero food image — desktop only */}
          <div className="hidden md:block shrink-0">
            <img
              src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=360&h=280&q=80"
              alt="Signature Yasir Broast dishes"
              loading="eager"
              className="w-72 h-52 lg:w-80 lg:h-60 object-cover rounded-2xl shadow-2xl ring-4 ring-white/20"
            />
          </div>
        </div>
      </div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 28H1440V14C1200 0 960 28 720 14C480 0 240 28 0 14V28Z" fill="white" />
        </svg>
      </div>
    </header>
  );
}
