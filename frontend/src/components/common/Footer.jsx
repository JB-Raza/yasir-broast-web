import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiHeart,
} from 'react-icons/fi';

/* ─── Data ─────────────────────────────────────────────────────────── */
const WHATSAPP_NUMBER = '923001234567';
const WHATSAPP_MESSAGE = encodeURIComponent("Hi! I'd like to place an order. 🍗");

const quickLinks = [
  { label: 'Home',      to: '/'         },
  { label: 'Menu',      to: '/menu'     },
  { label: 'Branches',  to: '/branches' },
  { label: 'About Us',  to: '/about'    },
  { label: 'Contact',   to: '/contact'  },
];

const menuHighlights = [
  { label: 'Chicken Broast',   to: '/menu?category=broast'  },
  { label: 'Karahi',           to: '/menu?category=karahi'  },
  { label: 'BBQ & Tikka',      to: '/menu?category=bbq'     },
  { label: 'Family Platters',  to: '/menu?category=platters'},
  { label: 'Special Deals',    to: '/menu?category=deals'   },
  { label: 'Drinks & Desserts',to: '/menu?category=drinks'  },
];

const legalLinks = [
  { label: 'Privacy Policy',    to: '/privacy' },
  { label: 'Terms & Conditions',to: '/terms'   },
  { label: 'FAQ',               to: '/faq'     },
];

const branches = [
  {
    name:   'Johar Town',
    address:'Main Boulevard, Block C, Lahore',
    phone:  '042-35312350',
  },
  {
    name:   'Thokar Niaz Baig',
    address:'Multan Road, Near Thokar, Lahore',
    phone:  '042-35316605',
  },
  {
    name:   'Allama Iqbal Town',
    address:'Karim Block Market, Lahore',
    phone:  '042-37890123',
  },
];

const socials = [
  {
    href:  'https://facebook.com/yasirbroast',
    label: 'Facebook',
    icon:  <FaFacebookF size={16} />,
  },
  {
    href:  'https://instagram.com/yasirbroast',
    label: 'Instagram',
    icon:  <FaInstagram size={16} />,
  },
  {
    href:  `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`,
    label: 'WhatsApp',
    icon:  <FaWhatsapp size={16} />,
  },
];

/* ─── Component ────────────────────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white" aria-label="Site footer">

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="font-montserrat font-extrabold text-2xl tracking-wide hover:text-gold transition-colors duration-200"
            >
              Yasir <span className="text-gold">Broast</span>
            </Link>
            <p className="font-opensans text-white/55 text-sm mt-1">
              Lahore's Finest Broast Since 1995 🍗
            </p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:scale-110 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main grid ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Quick links */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest text-gold mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-opensans text-white/70 hover:text-gold text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2 — Menu */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest text-gold mb-5">
              Our Menu
            </h3>
            <ul className="space-y-3">
              {menuHighlights.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="font-opensans text-white/70 hover:text-gold text-sm transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Branches */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest text-gold mb-5">
              Main Branches
            </h3>
            <ul className="space-y-5">
              {branches.map(({ name, address, phone }) => (
                <li key={name} className="space-y-1">
                  <p className="font-montserrat font-semibold text-white text-sm">
                    {name}
                  </p>
                  <p className="font-opensans text-white/55 text-xs flex items-start gap-1.5">
                    <FiMapPin size={12} className="mt-0.5 flex-shrink-0 text-gold" />
                    {address}
                  </p>
                  <a
                    href={`tel:${phone.replace(/-/g, '')}`}
                    className="font-opensans text-white/70 hover:text-gold text-xs flex items-center gap-1.5 transition-colors duration-200"
                  >
                    <FiPhone size={12} className="flex-shrink-0 text-gold" />
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  to="/branches"
                  className="font-opensans text-primary hover:text-gold text-sm font-semibold transition-colors duration-200"
                >
                  View all 20+ branches →
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 — Contact & Hours */}
          <div>
            <h3 className="font-montserrat font-bold text-sm uppercase tracking-widest text-gold mb-5">
              Get In Touch
            </h3>
            <ul className="space-y-4 font-opensans text-sm text-white/70">
              <li className="flex items-start gap-3">
                <FiClock size={16} className="flex-shrink-0 text-gold mt-0.5" />
                <span>Open Daily<br />10:00 AM – 2:00 AM</span>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone size={16} className="flex-shrink-0 text-gold mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:04235312350" className="block hover:text-gold transition-colors duration-200">
                    042-35312350
                  </a>
                  <a href="tel:04235316605" className="block hover:text-gold transition-colors duration-200">
                    042-35316605
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMail size={16} className="flex-shrink-0 text-gold mt-0.5" />
                <a
                  href="mailto:info@yasirbroast.com"
                  className="hover:text-gold transition-colors duration-200 break-all"
                >
                  info@yasirbroast.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp size={16} className="flex-shrink-0 text-gold mt-0.5" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-gold transition-colors duration-200"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>

            {/* Place order CTA */}
            <Link
              to="/menu"
              className="mt-6 inline-block bg-primary hover:bg-primary-dark text-white font-montserrat font-bold text-sm py-2.5 px-5 rounded-lg transition-all duration-200 hover:scale-105"
            >
              Order Now 🍗
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* Copyright */}
          <p className="font-opensans text-white/45 text-xs text-center sm:text-left">
            © {year} Yasir Broast. All rights reserved.
          </p>

          {/* Legal links */}
          <div className="flex items-center gap-5 flex-wrap justify-center">
            {legalLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-opensans text-white/45 hover:text-white/80 text-xs transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Made with love */}
          <p className="font-opensans text-white/30 text-xs flex items-center gap-1">
            Made with <FiHeart size={11} className="text-primary" /> in Lahore
          </p>
        </div>
      </div>

    </footer>
  );
}
