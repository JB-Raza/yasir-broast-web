import { Helmet } from 'react-helmet-async';

// ── Section components ──────────────────────────────────────────────
import HeroBanner      from '../components/home/HeroBanner';
import FeaturedItems   from '../components/home/FeaturedItems';
import SpecialDeals    from '../components/home/SpecialDeals';
import BranchesPreview from '../components/home/BranchesPreview';
import Testimonials    from '../components/home/Testimonials';
import CTASection      from '../components/home/CTASection';

/**
 * HomeScreen
 *
 * Composes every section of the home page in order:
 *   1. Hero Banner (Swiper slider)
 *   2. Featured / Bestseller Items
 *   3. Special Deals (with countdown)
 *   4. Branches Preview
 *   5. Testimonials (Swiper carousel)
 *   6. CTA Section + WhatsApp float button
 */
export default function HomeScreen() {
  return (
    <>
      {/* ── SEO Meta tags ─────────────────────────────────────────── */}
      <Helmet>
        <title>Yasir Broast – Lahore's Finest Broast Since 1995</title>
        <meta
          name="description"
          content="Order the best broasted chicken, karahi, BBQ and family platters online from Yasir Broast. 20+ branches across Lahore. Open till 2 AM every day."
        />
        <meta property="og:title"       content="Yasir Broast – Lahore's Finest Broast" />
        <meta
          property="og:description"
          content="Crispy, juicy broasted chicken and more. Order online or visit one of our 20+ Lahore branches."
        />
        <meta property="og:type"        content="restaurant.restaurant" />
        <link rel="canonical"           href="https://yasirbroast.com/" />

        {/* JSON-LD – LocalBusiness schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context':   'https://schema.org',
            '@type':      'Restaurant',
            name:         'Yasir Broast',
            description:  "Lahore's finest broasted chicken since 1995",
            url:          'https://yasirbroast.com',
            telephone:    '+92-42-35312350',
            servesCuisine: ['Pakistani', 'Broast', 'BBQ'],
            priceRange:   '$$',
            address: {
              '@type':           'PostalAddress',
              streetAddress:     'Main Boulevard, Johar Town',
              addressLocality:   'Lahore',
              addressRegion:     'Punjab',
              addressCountry:    'PK',
            },
            openingHours: 'Mo-Su 10:00-02:00',
            aggregateRating: {
              '@type':       'AggregateRating',
              ratingValue:   '4.8',
              reviewCount:   '400',
            },
          })}
        </script>
      </Helmet>

      {/* ── Page sections ──────────────────────────────────────────── */}
      <main>
        {/* 1. Full-width hero slider */}
        <HeroBanner />

        {/* 2. Bestseller menu items with skeleton loader */}
        <FeaturedItems />

        {/* 3. Limited-time deals with live countdown */}
        <SpecialDeals />

        {/* 4. Three branch preview cards */}
        <BranchesPreview />

        {/* 5. Customer testimonials carousel */}
        <Testimonials />

        {/* 6. "Order Now" CTA + floating WhatsApp button */}
        <CTASection />
      </main>
    </>
  );
}
