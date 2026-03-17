import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';

// Update this number to the actual WhatsApp Business number
const WHATSAPP_NUMBER = '923001234567';
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi! I'd like to place an order from Yasir Broast. 🍗"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/* ─── Section ────────────────────────────────────────────────────────── */
export default function CTASection() {
  return (
    <>
      {/* ── Full-width CTA banner ────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20 bg-charcoal relative overflow-hidden"
        aria-label="Call to action"
      >
        {/* Decorative background circles */}
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/10 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-gold/8 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-6 text-3xl">
            🍗
          </div>

          {/* Headline */}
          <h2 className="font-montserrat font-extrabold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
            Hungry?{' '}
            <span className="text-gold">Order Online</span> Now!
          </h2>

          {/* Subtext */}
          <p className="font-opensans text-white/75 text-base sm:text-lg max-w-lg mx-auto mb-3">
            Fresh, crispy and delivered hot to your doorstep. No queues, no waiting — just great
            food.
          </p>

          {/* USPs row */}
          <div className="flex flex-wrap justify-center gap-4 text-sm font-opensans text-white/60 mb-10">
            {['✔ Fresh Ingredients', '✔ 20+ Branches', '✔ Open Till 2 AM', '✔ Fast Delivery'].map(
              (item) => (
                <span key={item}>{item}</span>
              )
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/menu"
              className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-montserrat font-extrabold text-lg py-4 px-10 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-2xl"
            >
              Order Now <FiArrowRight size={20} />
            </Link>
            <Link
              to="/menu"
              className="flex items-center gap-2 border-2 border-white/40 hover:border-white text-white font-montserrat font-bold text-base py-4 px-8 rounded-xl transition-all duration-300 hover:bg-white/10 hover:scale-105 active:scale-95"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── WhatsApp floating button ──────────────────────────────────── */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp to place an order"
        className="whatsapp-btn fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
}
