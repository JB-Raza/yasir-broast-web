import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { FiCheckCircle } from 'react-icons/fi';

import StorySection  from '../components/about/StorySection';
import QualityCards  from '../components/about/QualityCards';
import StatsSection  from '../components/about/StatsSection';
import TeamSection   from '../components/about/TeamSection';

/* ─── Core values ────────────────────────────────────────────────── */
const VALUES = [
  { id: 1, text: 'Quality First — no shortcuts, ever'                },
  { id: 2, text: 'Customer Satisfaction — your smile is our success' },
  { id: 3, text: 'Consistent Taste — same recipe at every branch'    },
  { id: 4, text: 'Affordable Prices — great food for every budget'   },
];

export default function AboutScreen() {
  return (
    <>
      {/* ── SEO ─────────────────────────────────────────────────── */}
      <Helmet>
        <title>About Us | Yasir Broast – Lahore's Favourite Broast Since 1995</title>
        <meta
          name="description"
          content="Learn the story of Yasir Broast — Lahore's most beloved broast restaurant since 1995. Fresh ingredients, traditional recipes, and 20+ branches across the city."
        />
        <link rel="canonical" href="https://yasirbroast.com/about" />
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
                <span className="text-white font-opensans font-semibold">About Us</span>
              </li>
            </ol>
          </nav>

          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-3">
            About Us
          </h1>
          <p className="font-opensans text-white/80 text-lg max-w-xl">
            Lahore's favourite broast since 1995 — crafted with love, served with pride.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 28H1440V14C1200 0 960 28 720 14C480 0 240 28 0 14V28Z" fill="white" />
          </svg>
        </div>
      </header>

      {/* ── 2. Our Story ────────────────────────────────────────── */}
      <StorySection />

      {/* ── 3. Quality Commitment Cards ─────────────────────────── */}
      <QualityCards />

      {/* ── 4. Stats Counter ────────────────────────────────────── */}
      <StatsSection />

      {/* ── 5. Core Values ──────────────────────────────────────── */}
      <section
        aria-labelledby="values-heading"
        className="py-16 bg-charcoal text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-20">

            {/* Heading */}
            <div className="lg:w-1/3">
              <span className="inline-block font-montserrat font-bold text-sm text-gold uppercase tracking-widest mb-3">
                What We Stand For
              </span>
              <h2
                id="values-heading"
                className="font-montserrat font-extrabold text-white text-3xl sm:text-4xl leading-tight"
              >
                Our Core Values
              </h2>
              <div className="mt-4 w-16 h-1 bg-gold rounded-full" aria-hidden="true" />
            </div>

            {/* Values list */}
            <ul className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {VALUES.map(({ id, text }) => (
                <li key={id} className="flex items-start gap-3">
                  <FiCheckCircle
                    className="text-gold shrink-0 mt-0.5"
                    size={20}
                    aria-hidden="true"
                  />
                  <span className="font-opensans text-white/80 text-base leading-snug">
                    {text}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      {/* ── 6. Team Section ─────────────────────────────────────── */}
      <TeamSection />

      {/* ── 7. CTA strip ────────────────────────────────────────── */}
      <section className="py-14 bg-primary text-white text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="font-montserrat font-extrabold text-3xl mb-3">
            Ready to Taste the Difference?
          </h2>
          <p className="font-opensans text-white/80 mb-8">
            Order online or walk into any of our 20+ branches today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/menu"
              className="inline-block bg-gold text-charcoal font-montserrat font-extrabold text-sm px-8 py-3 rounded-xl hover:brightness-105 active:scale-95 transition-all duration-200"
            >
              View Menu
            </Link>
            <Link
              to="/branches"
              className="inline-block border-2 border-white text-white font-montserrat font-semibold text-sm px-8 py-3 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              Find a Branch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
