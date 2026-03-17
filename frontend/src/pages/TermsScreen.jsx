import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const LAST_UPDATED = 'March 1, 2026';

/* ─── Terms sections ─────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By accessing our website or placing an order through any Yasir Broast channel (website, phone, or in-person), you agree to be bound by these Terms of Service.',
      'If you do not agree to these terms, please do not use our services. We reserve the right to update these terms at any time; continued use of our services constitutes acceptance of any changes.',
    ],
  },
  {
    id: 'eligibility',
    title: '2. User Eligibility',
    content: [
      'You must be at least 13 years of age to use our website. By placing an order, you confirm that the information you provide is accurate and that you are authorised to use the payment method provided.',
    ],
  },
  {
    id: 'orders',
    title: '3. Order Placement & Cancellation',
    content: [
      'All orders are subject to availability. We reserve the right to refuse or cancel any order at our discretion, including if there is an error in pricing or item availability.',
      'Once an order is confirmed, it can only be cancelled within 5 minutes of placement by contacting the branch directly. Orders that have entered preparation cannot be cancelled.',
      'Yasir Broast is not responsible for delays caused by incorrect delivery information provided by the customer.',
    ],
  },
  {
    id: 'pricing',
    title: '4. Pricing & Payments',
    content: [
      'All prices are listed in Pakistani Rupees (PKR) and are inclusive of applicable taxes. Prices may vary slightly between branches based on location.',
      'We reserve the right to change prices at any time without prior notice. The price displayed at the time of ordering is the price you will be charged.',
      'Currently, Cash on Delivery (COD) is the primary payment method. Card payments are available at select branches. We are not responsible for any bank charges that may apply to your payment.',
    ],
  },
  {
    id: 'delivery',
    title: '5. Delivery Policy',
    content: [
      'Delivery is available within designated areas around each branch. Delivery charges are Rs. 150 per order and are non-refundable.',
      'Estimated delivery times are provided as a guide only and may vary depending on traffic, weather, and order volume. We are not liable for delays beyond our reasonable control.',
      'Orders are delivered to the address provided at checkout. If the delivery cannot be completed due to an incorrect address or unavailability of the customer, the order may be cancelled without refund.',
    ],
  },
  {
    id: 'refunds',
    title: '6. Refund Policy',
    content: [
      'If you receive an incorrect or unsatisfactory order, please contact the branch within 30 minutes of delivery. We will arrange a replacement or issue a credit note for your next order.',
      'Refunds to original payment methods are only applicable in cases where the order was not delivered or was delivered in an unusable condition. Refund requests must be submitted within 24 hours.',
      'We do not provide refunds for change of mind after an order has been prepared.',
    ],
  },
  {
    id: 'intellectual-property',
    title: '7. Intellectual Property',
    content: [
      'All content on this website, including logos, images, text, and design, is the property of Yasir Broast and is protected by applicable copyright and trademark laws.',
      'You may not reproduce, distribute, or use any content from this website without prior written permission from Yasir Broast.',
    ],
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    content: [
      'To the fullest extent permitted by law, Yasir Broast shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services or website.',
      'Our liability for any direct damages shall be limited to the amount paid for the specific order giving rise to the claim.',
    ],
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    content: [
      'These Terms of Service are governed by the laws of the Islamic Republic of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lahore, Pakistan.',
    ],
  },
  {
    id: 'contact',
    title: '10. Contact Us',
    content: [
      'If you have any questions about these Terms of Service, please reach out:',
      '📧 Email: legal@yasirbroast.com',
      '📞 Phone: 042-35312350',
      '📍 Address: Main Boulevard, Johar Town, Lahore, Pakistan',
    ],
  },
];

export default function TermsScreen() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Yasir Broast</title>
        <meta name="description" content="Yasir Broast's terms of service — order placement, delivery policy, refunds, and your rights as a customer." />
        <link rel="canonical" href="https://yasirbroast.com/terms" />
      </Helmet>

      {/* Header */}
      <header className="bg-primary text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white transition-colors font-opensans">Home</Link></li>
              <li aria-hidden="true"><FiChevronRight size={14} /></li>
              <li><span className="text-white font-opensans font-semibold">Terms of Service</span></li>
            </ol>
          </nav>
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-2">Terms of Service</h1>
          <p className="font-opensans text-white/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 28H1440V14C1200 0 960 28 720 14C480 0 240 28 0 14V28Z" fill="white" />
          </svg>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Quick navigation */}
        <nav aria-label="Terms sections" className="bg-light-gray rounded-2xl p-5 mb-10">
          <p className="font-montserrat font-bold text-charcoal text-sm mb-3">Quick Navigation</p>
          <ol className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {SECTIONS.map(({ id, title }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="font-opensans text-primary text-xs hover:underline transition-colors duration-200 leading-snug block"
                >
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-10">
          {SECTIONS.map(({ id, title, content }) => (
            <section key={id} id={id} aria-labelledby={`${id}-heading`}>
              <h2
                id={`${id}-heading`}
                className="font-montserrat font-extrabold text-charcoal text-xl mb-4 pb-2 border-b border-gray-100"
              >
                {title}
              </h2>
              <div className="space-y-3">
                {content.map((para, i) => (
                  <p key={i} className="font-opensans text-gray-600 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Acceptance note */}
        <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-6">
          <p className="font-opensans text-gray-600 text-sm leading-relaxed">
            By placing an order with Yasir Broast, you acknowledge that you have read, understood,
            and agree to be bound by these Terms of Service and our{' '}
            <Link to="/privacy" className="text-primary font-semibold hover:underline">Privacy Policy</Link>.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="font-opensans text-gray-400 text-sm">
            Questions?{' '}
            <Link to="/contact" className="text-primary hover:underline font-semibold">Contact Us</Link>
          </p>
        </div>

      </main>
    </>
  );
}
