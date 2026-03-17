import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

/* ─── FAQ data by category ───────────────────────────────────────── */
const FAQ_CATEGORIES = [
  {
    id: 'orders',
    title: 'Orders & Delivery',
    items: [
      {
        q: 'Do you offer home delivery?',
        a: 'Yes! We offer home delivery across Lahore. You can place your order online or call your nearest branch directly. Delivery charges are Rs. 150.',
      },
      {
        q: 'What are your delivery hours?',
        a: 'We deliver from 10:00 AM to 1:30 AM daily. Last orders for delivery are accepted 30 minutes before closing.',
      },
      {
        q: 'How can I cancel my order?',
        a: 'Orders can be cancelled within 5 minutes of placement by calling your branch directly. Once preparation has begun, cancellations are not possible.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Delivery typically takes 45–60 minutes depending on your location and branch traffic. Pickup orders are ready in 20–30 minutes.',
      },
    ],
  },
  {
    id: 'food',
    title: 'Food & Menu',
    items: [
      {
        q: 'Is your food halal?',
        a: 'Absolutely. All our chicken and meat is 100% halal certified from trusted suppliers. We maintain strict halal standards across all branches.',
      },
      {
        q: 'Do you use fresh chicken or frozen?',
        a: 'We receive fresh chicken daily. We never use frozen or pre-cooked chicken — every piece is marinated and fried fresh to order.',
      },
      {
        q: 'Do you cater to large groups or events?',
        a: 'Yes! We offer bulk and catering orders for events, weddings, and corporate gatherings. Contact us at least 24 hours in advance. Call 042-35312350 for details.',
      },
      {
        q: 'Are there vegetarian options?',
        a: 'Our menu is primarily meat-based (broast, karahi, BBQ). We do offer Fries, certain rice dishes, and soups that are vegetarian-friendly.',
      },
    ],
  },
  {
    id: 'branches',
    title: 'Branches & Hours',
    items: [
      {
        q: 'What are your opening hours?',
        a: 'All branches are open daily from 10:00 AM to 2:00 AM, including weekends and public holidays.',
      },
      {
        q: 'Do you have family seating?',
        a: 'Yes, most of our branches have dedicated family sections with comfortable seating for groups. Our Johar Town and DHA branches are especially spacious.',
      },
      {
        q: 'How many branches do you have in Lahore?',
        a: 'We have 20+ branches across Lahore including Johar Town, Thokar Niaz Baig, DHA, Gulberg, Model Town, and more.',
      },
    ],
  },
  {
    id: 'payments',
    title: 'Payments & Refunds',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'Currently we accept Cash on Delivery (COD) for all orders. Card payment at branches is available at select locations. Online card payment is coming soon.',
      },
      {
        q: 'What is your refund policy?',
        a: 'If you receive an incorrect or unsatisfactory order, contact the branch within 30 minutes. We will replace the item or issue a credit for your next order.',
      },
    ],
  },
  {
    id: 'general',
    title: 'General',
    items: [
      {
        q: 'How do I give feedback about my order?',
        a: 'You can email us at feedback@yasirbroast.com, leave a Google review, or use the contact form on this page. We read every piece of feedback.',
      },
      {
        q: 'Do you have a loyalty or rewards programme?',
        a: 'A loyalty programme is currently in development and will launch soon. Stay tuned on our WhatsApp and social channels for the announcement.',
      },
    ],
  },
];

/* ─── Component ──────────────────────────────────────────────────── */
export default function FaqSection() {
  // Track open item as "categoryId-itemIndex" or null
  const [openKey, setOpenKey] = useState(null);

  function toggle(key) {
    setOpenKey((prev) => (prev === key ? null : key));
  }

  return (
    <section aria-labelledby="faq-heading" className="py-16 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="faq-heading"
            className="font-montserrat font-extrabold text-charcoal text-3xl sm:text-4xl mb-3"
          >
            Frequently Asked Questions
          </h2>
          <p className="font-opensans text-gray-500 text-base max-w-xl mx-auto">
            Can't find an answer? Use the contact form above or call us directly.
          </p>
          <div className="mx-auto mt-4 w-16 h-1 bg-gold rounded-full" aria-hidden="true" />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <h3 className="font-montserrat font-extrabold text-primary text-sm uppercase tracking-widest mb-4">
                {cat.title}
              </h3>

              <div className="space-y-2">
                {cat.items.map((item, idx) => {
                  const key = `${cat.id}-${idx}`;
                  const isOpen = openKey === key;

                  return (
                    <div
                      key={key}
                      className={`bg-white rounded-xl border overflow-hidden transition-all duration-200 ${
                        isOpen ? 'border-primary/30 shadow-md' : 'border-gray-100 shadow-sm'
                      }`}
                    >
                      {/* Question row — button */}
                      <button
                        onClick={() => toggle(key)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${key}`}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="font-montserrat font-semibold text-charcoal text-sm leading-snug">
                          {item.q}
                        </span>
                        {isOpen
                          ? <FiChevronUp  className="text-primary shrink-0" size={17} aria-hidden="true" />
                          : <FiChevronDown className="text-gray-400 shrink-0" size={17} aria-hidden="true" />
                        }
                      </button>

                      {/* Answer */}
                      {isOpen && (
                        <div
                          id={`faq-answer-${key}`}
                          role="region"
                          className="px-5 pb-4 border-t border-gray-100"
                        >
                          <p className="font-opensans text-gray-500 text-sm leading-relaxed pt-3">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom contact prompt */}
        <div className="mt-12 text-center">
          <p className="font-opensans text-gray-500 text-sm">
            Still have questions?{' '}
            <Link
              to="/contact"
              className="text-primary font-semibold hover:underline"
            >
              Send us a message
            </Link>
            {' '}or call{' '}
            <a href="tel:04235312350" className="text-primary font-semibold hover:underline">
              042-35312350
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
