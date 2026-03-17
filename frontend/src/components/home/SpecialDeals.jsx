import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

/* ─── Deals data ────────────────────────────────────────────────────── */
const DEALS = [
  {
    id: 'd-1',
    name: 'Family Iftar Package',
    description: 'Broast + Karahi + 4 Naan + 2 Cold Drinks + Raita + 2 Gulab Jamun',
    originalPrice: 3800,
    discountedPrice: 2800,
    savings: 1000,
    tag: '🌙 Ramadan Special',
    endDate: new Date('2026-04-02'),
  },
  {
    id: 'd-2',
    name: 'Family Platter Deal',
    description: 'Full Broast + Chicken Biryani + 4 Naan + Raita + 2 Cold Drinks',
    originalPrice: 3800,
    discountedPrice: 3000,
    savings: 800,
    tag: '🍗 Best Value',
    endDate: new Date('2026-04-15'),
  },
];

/* ─── Countdown timer component ─────────────────────────────────────── */
function CountdownTimer({ endDate }) {
  const calcTimeLeft = () => {
    const diff = endDate - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0 };
    return {
      days:  Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      mins:  Math.floor((diff % 3600000)  / 60000),
      secs:  Math.floor((diff % 60000)    / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endDate]);

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.mins === 0 && timeLeft.secs === 0) {
    return (
      <p className="font-montserrat font-bold text-primary text-sm mt-3">Deal Expired</p>
    );
  }

  const units = [
    { label: 'Days',  value: timeLeft.days  },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Mins',  value: timeLeft.mins  },
    { label: 'Secs',  value: timeLeft.secs  },
  ];

  return (
    <div className="flex items-center gap-2 mt-3" aria-label="Time remaining for deal">
      <FiClock className="text-charcoal shrink-0" size={14} />
      <div className="flex items-center gap-1.5">
        {units.map(({ label, value }, idx) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="bg-charcoal text-white text-center rounded-md px-2 py-1 min-w-[40px]">
              <span className="font-montserrat font-bold text-sm leading-none block">
                {String(value).padStart(2, '0')}
              </span>
              <span className="font-opensans text-[9px] text-white/70 uppercase tracking-wider">
                {label}
              </span>
            </div>
            {idx < units.length - 1 && (
              <span className="font-montserrat font-bold text-charcoal text-sm">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Single deal card ───────────────────────────────────────────────── */
function DealCard({ deal }) {
  const discountPct = Math.round((deal.savings / deal.originalPrice) * 100);

  return (
    <article className="bg-white rounded-2xl p-6 shadow-lg flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300 border border-gold/30">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-block bg-gold/20 text-charcoal font-montserrat font-semibold text-xs px-3 py-1 rounded-full mb-2">
            {deal.tag}
          </span>
          <h3 className="font-montserrat font-extrabold text-charcoal text-xl leading-snug">
            {deal.name}
          </h3>
        </div>
        {/* Discount badge */}
        <div className="bg-primary text-white font-montserrat font-extrabold text-lg px-3 py-2 rounded-xl text-center shrink-0">
          {discountPct}%<br />
          <span className="text-xs font-semibold">OFF</span>
        </div>
      </div>

      {/* Description */}
      <p className="font-opensans text-gray-600 text-sm leading-relaxed">{deal.description}</p>

      {/* Pricing */}
      <div className="flex items-end gap-4">
        <div>
          <p className="font-opensans text-gray-400 text-sm line-through">
            PKR {deal.originalPrice.toLocaleString()}
          </p>
          <p className="font-montserrat font-extrabold text-primary text-3xl leading-tight">
            PKR {deal.discountedPrice.toLocaleString()}
          </p>
        </div>
        <span className="bg-success/10 text-success font-montserrat font-bold text-sm px-3 py-1.5 rounded-lg mb-1">
          You Save PKR {deal.savings.toLocaleString()}
        </span>
      </div>

      {/* Countdown */}
      <CountdownTimer endDate={deal.endDate} />

      {/* CTA */}
      <Link
        to="/menu"
        className="mt-auto block text-center bg-primary hover:bg-primary-dark text-white font-montserrat font-bold py-3 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
      >
        Order Now
      </Link>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function SpecialDeals() {
  return (
    <section className="py-12 md:py-16 bg-gold/10">
      {/* Decorative top border */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-gold to-primary mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10">
          <span className="inline-block bg-gold text-charcoal font-montserrat font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
            Limited Time
          </span>
          <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-charcoal mb-2">
            <span className="section-title-underline">Special Deals</span>
          </h2>
          <p className="font-opensans text-gray-500 mt-5 text-base max-w-xl mx-auto">
            Grab our time-limited offers before they&apos;re gone. Great food at unbeatable prices.
          </p>
        </div>

        {/* Deal cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {DEALS.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      {/* Decorative bottom border */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-gold to-primary mt-8" />
    </section>
  );
}
