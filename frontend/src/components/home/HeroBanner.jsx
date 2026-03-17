import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

// Swiper core + module CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* ─── Slide data ────────────────────────────────────────────────────── */
const slides = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1920&q=80',
    badge: null,
    title: "Lahore's Finest Broast Since 1995",
    subtitle:
      'Crispy, juicy and perfectly seasoned — taste a tradition that spans generations.',
    primary:   { label: 'Order Now',  to: '/order' },
    secondary: { label: 'View Menu',  to: '/menu'  },
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1920&q=80',
    badge: '🌙 Ramadan Special',
    title: 'Exclusive Iftar Deals',
    subtitle:
      'Celebrate the holy month with handpicked family iftar packages — broast, karahi, naan & more.',
    primary:   { label: 'View Iftar Menu',     to: '/menu'     },
    secondary: { label: 'Find Nearest Branch', to: '/branches' },
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1920&q=80',
    badge: '🍗 Save PKR 800',
    title: 'Family Platter — Just PKR 3,000',
    subtitle:
      'Full broast + biryani + 4 naan + 2 drinks + raita. Feed the whole family without breaking the bank.',
    primary:   { label: 'Order Family Platter', to: '/order' },
    secondary: { label: 'See All Deals',        to: '/menu'  },
  },
];

export default function HeroBanner() {
  return (
    <section aria-label="Featured promotions">
      <Swiper
        className="hero-swiper w-full"
        style={{ height: 'min(85vh, 800px)', minHeight: '520px' }}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        pagination={{ clickable: true }}
        loop
        grabCursor
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Background image – first slide eager, rest lazy */}
              <img
                src={slide.image}
                alt={slide.title}
                loading={slide.id === 1 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70" />

              {/* Slide content */}
              <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-8">
                <div className="text-center text-white max-w-4xl mx-auto">

                  {/* Badge */}
                  {slide.badge && (
                    <span className="inline-block bg-gold text-charcoal font-montserrat font-semibold text-sm px-5 py-1.5 rounded-full mb-5 shadow-md">
                      {slide.badge}
                    </span>
                  )}

                  {/* Heading */}
                  <h1 className="font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>

                  {/* Subtitle */}
                  <p className="font-opensans text-base sm:text-lg md:text-xl text-white/88 max-w-2xl mx-auto mb-8 leading-relaxed">
                    {slide.subtitle}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to={slide.primary.to}
                      className="bg-primary hover:bg-primary-dark text-white font-montserrat font-bold text-base sm:text-lg py-3 px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      {slide.primary.label}
                    </Link>
                    <Link
                      to={slide.secondary.to}
                      className="border-2 border-gold text-gold hover:bg-gold hover:text-charcoal font-montserrat font-bold text-base sm:text-lg py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
