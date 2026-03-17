import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiHelpCircle } from 'react-icons/fi';

import ContactInfoCards from '../components/contact/ContactInfoCards';
import ContactForm      from '../components/contact/ContactForm';
import BranchQuickList  from '../components/contact/BranchQuickList';
import WhatsAppButton   from '../components/contact/WhatsAppButton';
import FaqSection       from '../components/contact/FaqSection';

/* ─── Optional map ───────────────────────────────────────────────── */
const MAP_EMBED = 'https://maps.google.com/maps?q=Johar+Town+Lahore+Pakistan&output=embed';
const MAP_OPEN  = 'https://maps.google.com/?q=Yasir+Broast+Johar+Town+Lahore';

export default function ContactScreen() {
  return (
    <>
      {/* ── SEO ─────────────────────────────────────────────────── */}
      <Helmet>
        <title>Contact Us | Yasir Broast – Lahore's Finest Broast</title>
        <meta
          name="description"
          content="Get in touch with Yasir Broast. Call us, email us or use our contact form for inquiries, feedback or complaints. We're here 10 AM – 2 AM daily."
        />
        <link rel="canonical" href="https://yasirbroast.com/contact" />
      </Helmet>

      {/* ── 1. Page Header ──────────────────────────────────────── */}
      <header className="bg-primary text-white relative overflow-hidden">
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
                <span className="text-white font-opensans font-semibold">Contact Us</span>
              </li>
            </ol>
          </nav>

          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-3">
            Contact Us
          </h1>
          <p className="font-opensans text-white/80 text-lg max-w-xl">
            Get in touch with us — we're here to help, 10:00 AM to 2:00 AM every day.
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 28H1440V14C1200 0 960 28 720 14C480 0 240 28 0 14V28Z" fill="white" />
          </svg>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        {/* ── 2. Contact Info Cards ────────────────────────────── */}
        <section aria-labelledby="contact-methods-heading">
          <h2 id="contact-methods-heading" className="sr-only">Contact Methods</h2>
          <ContactInfoCards />
        </section>

        {/* ── 3. Form + Sidebar ────────────────────────────────── */}
        <section aria-labelledby="form-heading">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            {/* Form — takes 2/3 width on desktop */}
            <div className="lg:col-span-2">
              <h2 id="form-heading" className="sr-only">Send us a message</h2>
              <ContactForm />
            </div>

            {/* Sidebar — branch quick list */}
            <aside className="space-y-6" aria-label="Branch quick reference">
              <BranchQuickList />

              {/* FAQ callout */}
              <div className="bg-light-gray rounded-2xl p-6 flex items-start gap-4">
                <FiHelpCircle
                  className="text-primary shrink-0 mt-0.5"
                  size={22}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-montserrat font-bold text-charcoal text-sm mb-1">
                    Have more questions?
                  </p>
                  <p className="font-opensans text-gray-500 text-sm mb-3 leading-relaxed">
                    Browse our frequently asked questions for quick answers.
                  </p>
                  <Link
                    to="/faq"
                    className="font-montserrat font-semibold text-sm text-primary hover:underline transition-colors duration-200"
                  >
                    Visit FAQ Page →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ── 4. Map Preview ───────────────────────────────────── */}
        <section aria-label="Head office location map">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-montserrat font-extrabold text-charcoal text-2xl">
              Head Office Location
            </h2>
            <a
              href={MAP_OPEN}
              target="_blank"
              rel="noreferrer"
              className="font-montserrat font-semibold text-sm text-primary hover:underline flex items-center gap-1"
            >
              Open in Maps ↗
            </a>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
            <iframe
              title="Yasir Broast head office location — Johar Town, Lahore"
              src={MAP_EMBED}
              width="100%"
              height="360"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
            {/* Transparent overlay that opens maps on click */}
            <a
              href={MAP_OPEN}
              target="_blank"
              rel="noreferrer"
              aria-label="Open head office location in Google Maps"
              className="absolute inset-0 bg-transparent"
            />
          </div>
        </section>

      </main>

      {/* ── 5. FAQ Section ───────────────────────────────────────── */}
      <FaqSection />

      {/* ── 6. Floating WhatsApp button ──────────────────────────── */}
      <WhatsAppButton />
    </>
  );
}
