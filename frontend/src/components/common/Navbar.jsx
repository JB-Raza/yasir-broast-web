import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const navLinks = [
  { label: 'Home',     to: '/'         },
  { label: 'Menu',     to: '/menu'     },
  { label: 'Branches', to: '/branches' },
  { label: 'About',    to: '/about'    },
  { label: 'Contact',  to: '/contact'  },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  /* Transparent → solid on scroll */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Close mobile menu on route change */
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* ── Logo ───────────────────────────────────────────────── */}
        <Link
          to="/"
          className="font-montserrat font-extrabold text-2xl text-white tracking-wide hover:text-gold transition-colors duration-200"
          onClick={closeMenu}
        >
          Yasir <span className="text-gold">Broast</span>
        </Link>

        {/* ── Desktop Nav ─────────────────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `font-opensans font-semibold text-sm transition-colors duration-200 ${
                  isActive
                    ? 'text-gold border-b-2 border-gold pb-0.5'
                    : 'text-white hover:text-gold'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Actions ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-4">

          {/* Cart icon */}
          <Link
            to="/cart"
            aria-label={`Cart – ${itemCount} item${itemCount !== 1 ? 's' : ''}`}
            className="relative text-white hover:text-gold transition-colors duration-200"
          >
            <FiShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center font-montserrat">
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>

          {/* Order Now CTA (desktop only) — links to menu page */}
          <Link
            to="/menu"
            className="hidden md:inline-block bg-primary hover:bg-primary-dark text-white font-montserrat font-bold text-sm py-2 px-5 rounded-lg transition-all duration-200 hover:scale-105"
          >
            Order Now
          </Link>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden text-white hover:text-gold transition-colors duration-200"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ──────────────────────────────────────────── */}
      <div
        className={`md:hidden bg-charcoal overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-4 pb-5 pt-2 gap-3">
          {navLinks.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `font-opensans font-semibold py-2 border-b border-white/10 transition-colors duration-200 ${
                  isActive ? 'text-gold' : 'text-white hover:text-gold'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/menu"
            onClick={closeMenu}
            className="mt-2 bg-primary text-white text-center font-montserrat font-bold py-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            Order Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
