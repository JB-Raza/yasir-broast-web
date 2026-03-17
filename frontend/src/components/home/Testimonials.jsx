import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaGoogle, FaStar, FaRegStar } from 'react-icons/fa';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/pagination';

/* ─── Review data ───────────────────────────────────────────────────── */
const REVIEWS = [
  {
    id: 'r-1',
    name: 'Ahmed Khan',
    rating: 5,
    text: 'Best broasted chicken in Lahore hands down! The crispy coating stays crunchy even after 30 minutes. The family platter is unbeatable value. Will definitely be back!',
    date: 'February 2026',
    source: 'Google',
    initials: 'AK',
    color: 'bg-primary',
  },
  {
    id: 'r-2',
    name: 'Sana Malik',
    rating: 5,
    text: 'Ordered the Iftar package for our family of 5 and everyone loved it. Generous portions, fresh food and super fast delivery. The karahi was absolutely spot on!',
    date: 'March 2026',
    source: 'Google',
    initials: 'SM',
    color: 'bg-gold',
  },
  {
    id: 'r-3',
    name: 'Bilal Hussain',
    rating: 4,
    text: 'Great food and consistent quality. The Johar Town branch staff are very friendly. Slightly busy during peak hours but totally worth the wait. Seekh kabab is a must-try!',
    date: 'January 2026',
    source: 'Google',
    initials: 'BH',
    color: 'bg-success',
  },
  {
    id: 'r-4',
    name: 'Fatima Zahra',
    rating: 5,
    text: 'Yasir Broast never disappoints! We order every weekend for family gatherings. The Chicken Changezi Handi is absolutely phenomenal. Highly recommend to everyone.',
    date: 'March 2026',
    source: 'Google',
    initials: 'FZ',
    color: 'bg-warning',
  },
  {
    id: 'r-5',
    name: 'Usman Tariq',
    rating: 5,
    text: 'My go-to place for late-night cravings. Open till 2 AM and the food quality is consistently excellent. The biryani and broast combo is something else — pure bliss!',
    date: 'February 2026',
    source: 'Google',
    initials: 'UT',
    color: 'bg-primary',
  },
];

/* ─── Star rating display ────────────────────────────────────────────── */
function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) =>
        i < rating ? (
          <FaStar key={i} className="text-gold" size={16} />
        ) : (
          <FaRegStar key={i} className="text-gray-300" size={16} />
        )
      )}
    </div>
  );
}

/* ─── Single review card ─────────────────────────────────────────────── */
function ReviewCard({ review }) {
  return (
    <article className="bg-white rounded-2xl shadow-md p-6 sm:p-8 mx-2 sm:mx-4 flex flex-col gap-5">

      {/* Reviewer meta */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className={`${review.color} w-11 h-11 rounded-full flex items-center justify-center text-white font-montserrat font-bold text-sm shrink-0`}
          >
            {review.initials}
          </div>
          <div>
            <p className="font-montserrat font-bold text-charcoal text-base">{review.name}</p>
            <p className="font-opensans text-gray-400 text-xs">{review.date}</p>
          </div>
        </div>

        {/* Google badge */}
        <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-3 py-1.5 border border-gray-100">
          <FaGoogle className="text-[#4285F4]" size={13} />
          <span className="font-opensans text-gray-500 text-xs font-semibold">{review.source}</span>
        </div>
      </div>

      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Review text */}
      <blockquote className="font-playfair italic text-gray-600 text-base leading-relaxed border-l-4 border-gold pl-4">
        &ldquo;{review.text}&rdquo;
      </blockquote>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function Testimonials() {
  return (
    <section className="py-12 md:py-16 bg-lightgray overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-charcoal mb-2">
            <span className="section-title-underline">What Our Customers Say</span>
          </h2>
          <p className="font-opensans text-gray-500 mt-5 text-base max-w-xl mx-auto">
            Real reviews from real customers who love Yasir Broast.
          </p>

          {/* Average rating pill */}
          <div className="inline-flex items-center gap-2 bg-white border border-gold/40 rounded-full px-5 py-2 mt-5 shadow-sm">
            <FaGoogle className="text-[#4285F4]" size={16} />
            <span className="font-montserrat font-bold text-charcoal text-sm">4.8</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar key={i} className="text-gold" size={12} />
              ))}
            </div>
            <span className="font-opensans text-gray-500 text-xs">Based on 400+ reviews</span>
          </div>
        </div>

        {/* Swiper carousel */}
        <Swiper
          className="testimonials-swiper"
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true }}
          loop
          grabCursor
          slidesPerView={1}
          spaceBetween={0}
          breakpoints={{
            640:  { slidesPerView: 1.2, spaceBetween: 16 },
            768:  { slidesPerView: 2,   spaceBetween: 20 },
            1024: { slidesPerView: 2.5, spaceBetween: 24 },
          }}
        >
          {REVIEWS.map((review) => (
            <SwiperSlide key={review.id} className="h-auto pb-2">
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
