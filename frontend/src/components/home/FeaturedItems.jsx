import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiShoppingCart } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import SkeletonLoader from '../common/SkeletonLoader';

/* ─── Static menu data (replace with API call in future) ────────────── */
const FEATURED_ITEMS = [
  {
    id: 'fi-1',
    name: 'Chicken Broast (Full)',
    description: 'Golden-crispy broasted chicken marinated in our secret 12-spice blend.',
    price: 1450,
    image:
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
    popular: true,
    spicy: false,
    category: 'Broast',
  },
  {
    id: 'fi-2',
    name: 'Chicken Karahi',
    description: 'Tender chicken slow-cooked in rich tomato-based karahi gravy with fresh spices.',
    price: 1200,
    image:
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80',
    popular: true,
    spicy: true,
    category: 'Karahi',
  },
  {
    id: 'fi-3',
    name: 'Family Platter',
    description: 'Full broast + biryani + 4 naan + 2 drinks + raita — perfect for 4–5 people.',
    price: 3000,
    image:
      'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=400&q=80',
    popular: true,
    spicy: false,
    category: 'Platters',
  },
  {
    id: 'fi-4',
    name: 'Chicken Malai Boti',
    description: 'Succulent chicken cubes marinated in cream and mild spices, grilled to perfection.',
    price: 950,
    image:
      'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=400&q=80',
    popular: false,
    spicy: false,
    category: 'BBQ',
  },
  {
    id: 'fi-5',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with spiced chicken and caramelised onions.',
    price: 450,
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=400&q=80',
    popular: false,
    spicy: true,
    category: 'Rice',
  },
  {
    id: 'fi-6',
    name: 'Seekh Kabab (6 pcs)',
    description: 'Juicy minced-beef seekh kababs seasoned with herbs and char-grilled on skewers.',
    price: 700,
    image:
      'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=80',
    popular: false,
    spicy: true,
    category: 'BBQ',
  },
];

/* ─── Single menu card ───────────────────────────────────────────────── */
function MenuCard({ item }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    toast.success(
      <span className="font-opensans text-sm">
        <strong>{item.name}</strong> added to cart!
      </span>,
      { duration: 2500, icon: '🛒' }
    );
  };

  return (
    <article className="menu-card bg-white rounded-2xl overflow-hidden shadow-md flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.popular && (
            <span className="bg-primary text-white text-xs font-montserrat font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <FaFire size={10} /> Popular
            </span>
          )}
          {item.spicy && (
            <span className="bg-warning text-white text-xs font-montserrat font-semibold px-2.5 py-1 rounded-full">
              🌶 Spicy
            </span>
          )}
        </div>

        {/* Category tag */}
        <span className="absolute top-3 right-3 bg-black/50 text-white text-xs font-opensans px-2.5 py-1 rounded-full">
          {item.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-montserrat font-bold text-charcoal text-base mb-1 line-clamp-1">
          {item.name}
        </h3>
        <p className="font-opensans text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
          {item.description}
        </p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-montserrat font-extrabold text-primary text-lg">
            PKR {item.price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${item.name} to cart`}
            className="flex items-center gap-2 bg-primary hover:bg-primary-dark active:scale-95 text-white font-montserrat font-semibold text-sm py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-lg"
          >
            <FiShoppingCart size={14} />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────── */
export default function FeaturedItems() {
  // Simulate a brief API loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10">
          <h2 className="font-montserrat font-extrabold text-3xl sm:text-4xl text-charcoal mb-2">
            <span className="section-title-underline">Our Bestsellers</span>
          </h2>
          <p className="font-opensans text-gray-500 mt-5 text-base max-w-xl mx-auto">
            Hand-picked favourites loved by thousands of customers across all our Lahore branches.
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <SkeletonLoader
            type="card"
            count={6}
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {FEATURED_ITEMS.map((item) => <MenuCard key={item.id} item={item} />)}
          </div>
        )}

        {/* View full menu link */}
        {!loading && (
          <div className="text-center mt-10">
            <Link
              to="/menu"
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105"
            >
              View Full Menu →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
