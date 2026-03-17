import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiHome, FiBookOpen, FiPhone } from 'react-icons/fi';

export default function NotFoundScreen() {
  const { pathname } = useLocation();

  return (
    <>
      <Helmet>
        <title>404 – Page Not Found | Yasir Broast</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Spacer for fixed navbar */}
      <div className="h-16" aria-hidden="true" />

      <main className="min-h-[80vh] flex items-center justify-center bg-lightgray px-4 py-16">
        <div className="text-center max-w-lg mx-auto">

          {/* Big 404 */}
          <div className="relative inline-block mb-6">
            <p
              className="font-montserrat font-extrabold text-[120px] sm:text-[160px] leading-none text-primary/10 select-none"
              aria-hidden="true"
            >
              404
            </p>
            <span
              className="absolute inset-0 flex items-center justify-center text-6xl"
              aria-hidden="true"
            >
              🍗
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-montserrat font-extrabold text-charcoal text-3xl sm:text-4xl mb-3">
            Page Not Found
          </h1>

          {/* Subtext */}
          <p className="font-opensans text-gray-500 text-base mb-2 leading-relaxed">
            Looks like this page went out for delivery and never came back.
          </p>
          <p className="font-opensans text-gray-400 text-sm mb-10">
            <code className="bg-white px-2 py-0.5 rounded text-primary font-mono text-xs border border-gray-200">
              {pathname}
            </code>{' '}
            does not exist.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-montserrat font-bold text-sm py-3 px-7 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              <FiHome size={16} aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-bold text-sm py-3 px-7 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <FiBookOpen size={16} aria-hidden="true" />
              Browse Menu
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary font-opensans text-sm py-3 px-4 transition-colors duration-200"
            >
              <FiPhone size={14} aria-hidden="true" />
              Contact Us
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
