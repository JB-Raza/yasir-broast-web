import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const LAST_UPDATED = 'March 1, 2026';

/* ─── Policy sections ────────────────────────────────────────────── */
const SECTIONS = [
  {
    id: 'information-we-collect',
    title: '1. Information We Collect',
    content: [
      'When you use our website or place an order, we may collect the following personal information:',
      '• Name and contact details (phone number, email address)',
      '• Delivery address for online orders',
      '• Order history and preferences',
      '• Device information and IP address when browsing our website',
      '• Any messages or feedback you submit through our contact form',
      'We only collect information that is necessary to process your orders and improve our services.',
    ],
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    content: [
      'We use the information we collect to:',
      '• Process and deliver your food orders',
      '• Confirm orders and send order-related notifications via SMS or WhatsApp',
      '• Respond to your inquiries and customer support requests',
      '• Improve our menu, services, and website experience',
      '• Send promotional messages or offers (only with your consent)',
      'We do not sell, rent, or share your personal information with third parties for marketing purposes.',
    ],
  },
  {
    id: 'data-protection',
    title: '3. Data Protection',
    content: [
      'We take the security of your personal information seriously. We implement reasonable technical and organisational measures to protect your data from unauthorised access, loss, or disclosure.',
      'Order data is stored securely and access is restricted to authorised staff only. We retain your data for as long as necessary to fulfil orders and comply with legal obligations.',
    ],
  },
  {
    id: 'cookies',
    title: '4. Cookies',
    content: [
      'Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. We use:',
      '• Essential cookies — required for the website to function (e.g., cart state)',
      '• Analytics cookies — to understand how visitors use the website (anonymised)',
      'You can disable cookies in your browser settings, but this may affect certain features like the shopping cart.',
    ],
  },
  {
    id: 'third-party',
    title: '5. Third-Party Services',
    content: [
      'Our website may use the following third-party services:',
      '• Google Maps — to display branch locations (subject to Google\'s Privacy Policy)',
      '• WhatsApp — for customer communication (subject to Meta\'s Privacy Policy)',
      '• Google Analytics — for anonymised website usage statistics',
      'We are not responsible for the privacy practices of these third-party services.',
    ],
  },
  {
    id: 'your-rights',
    title: '6. Your Rights',
    content: [
      'You have the following rights regarding your personal data:',
      '• Access — you may request a copy of the personal data we hold about you',
      '• Correction — you may ask us to correct inaccurate information',
      '• Deletion — you may request that we delete your personal data',
      '• Opt-out — you may unsubscribe from promotional messages at any time',
      'To exercise any of these rights, contact us at privacy@yasirbroast.com',
    ],
  },
  {
    id: 'contact',
    title: '7. Contact Information',
    content: [
      'If you have any questions or concerns about this Privacy Policy, please contact us:',
      '📧 Email: privacy@yasirbroast.com',
      '📞 Phone: 042-35312350',
      '📍 Address: Main Boulevard, Johar Town, Lahore, Pakistan',
    ],
  },
];

export default function PrivacyPolicyScreen() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Yasir Broast</title>
        <meta name="description" content="Yasir Broast's privacy policy — how we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://yasirbroast.com/privacy" />
      </Helmet>

      {/* Header */}
      <header className="bg-primary text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-52 h-52 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-1.5 text-sm text-white/70">
              <li><Link to="/" className="hover:text-white transition-colors font-opensans">Home</Link></li>
              <li aria-hidden="true"><FiChevronRight size={14} /></li>
              <li><span className="text-white font-opensans font-semibold">Privacy Policy</span></li>
            </ol>
          </nav>
          <h1 className="font-montserrat font-extrabold text-4xl sm:text-5xl mb-2">Privacy Policy</h1>
          <p className="font-opensans text-white/70 text-sm">Last updated: {LAST_UPDATED}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 28H1440V14C1200 0 960 28 720 14C480 0 240 28 0 14V28Z" fill="white" />
          </svg>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Intro */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-10">
          <p className="font-opensans text-gray-700 text-sm leading-relaxed">
            Yasir Broast ("we", "our", "us") is committed to protecting your privacy. This policy
            explains how we collect, use, and safeguard your personal information when you visit our
            website or place an order with us. By using our services, you agree to the practices
            described in this policy.
          </p>
        </div>

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
              <div className="space-y-2">
                {content.map((para, i) => (
                  <p key={i} className="font-opensans text-gray-600 text-sm leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="font-opensans text-gray-400 text-sm">
            Questions about this policy?{' '}
            <Link to="/contact" className="text-primary hover:underline font-semibold">
              Contact Us
            </Link>
          </p>
        </div>

      </main>
    </>
  );
}
