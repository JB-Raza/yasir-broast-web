import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFire } from 'react-icons/fa';
import { FiShoppingCart, FiChevronDown } from 'react-icons/fi';

import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';
import QuantitySelector from './QuantitySelector';

/**
 * MenuItemCard
 *
 * Displays a single menu item with:
 *  - 16:9 image with badge overlays (Popular / Spicy / New / In-Cart)
 *  - Name, description, price, serving size
 *  - Buffered QuantitySelector (local state, confirmed on "Add to Cart")
 *  - Optional special-instructions textarea
 */
export default function MenuItemCard({ item }) {
  const { addItem, cart } = useCart();

  /* Local state */
  const [qty, setQty]                       = useState(1);
  const [showInstructions, setShowInstructions] = useState(false);
  const [instructions, setInstructions]     = useState('');

  /* Is this item already in the cart? */
  const inCartItem = cart.find((i) => i.id === item.id);
  const inCartQty  = inCartItem?.quantity ?? 0;

  /* Add to cart handler */
  const handleAddToCart = () => {
    addItem({
      id:    item.id,
      name:  item.name,
      price: item.price,
      image: item.image,
      quantity: qty,
    });

    toast.success(
      <span className="font-opensans text-sm">
        {qty > 1 && <strong>{qty}× </strong>}
        <strong>{item.name}</strong> added to cart!
      </span>,
      { icon: '🛒', duration: 2500 }
    );

    /* Reset local state */
    setQty(1);
    setInstructions('');
    setShowInstructions(false);
  };

  return (
    <article
      className="menu-card bg-white rounded-2xl overflow-hidden shadow-md flex flex-col focus-within:ring-2 focus-within:ring-primary/30"
      aria-label={item.name}
    >
      {/* ── Image ─────────────────────────────────────────────────── */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Left badges: Popular / Spicy / New */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {item.popular && (
            <span className="flex items-center gap-1 bg-gold text-charcoal font-montserrat font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
              <FaFire size={9} aria-hidden="true" /> Popular
            </span>
          )}
          {item.spicy && (
            <span className="bg-primary text-white font-montserrat font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
              🌶 Spicy
            </span>
          )}
          {item.isNew && (
            <span className="bg-success text-white font-montserrat font-bold text-[10px] px-2.5 py-1 rounded-full shadow">
              ✦ New
            </span>
          )}
        </div>

        {/* Right badge: In-Cart indicator */}
        {inCartQty > 0 && (
          <div
            aria-label={`${inCartQty} in cart`}
            className="absolute top-2.5 right-2.5 bg-success text-white font-montserrat font-bold text-[10px] px-2.5 py-1 rounded-full shadow"
          >
            🛒 {inCartQty} in cart
          </div>
        )}
      </div>

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="p-4 flex flex-col flex-1 gap-3">

        {/* Name + serving size */}
        <div>
          <h3 className="font-montserrat font-bold text-charcoal text-base leading-snug mb-0.5">
            {item.name}
          </h3>
          {item.servingSize && (
            <span className="inline-block font-opensans text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              {item.servingSize}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="font-opensans text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Price */}
        <p className="font-montserrat font-extrabold text-primary text-xl leading-none">
          {formatPrice(item.price)}
        </p>

        {/* Quantity + Add to Cart */}
        <div className="flex items-center gap-2 mt-auto">
          <QuantitySelector
            value={qty}
            onChange={setQty}
            ariaLabel={`Quantity for ${item.name}`}
          />
          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${qty} ${item.name} to cart`}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark active:scale-95 text-white font-montserrat font-semibold text-sm py-2.5 px-3 rounded-lg transition-all duration-200 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <FiShoppingCart size={14} aria-hidden="true" />
            {inCartQty > 0 ? 'Add More' : 'Add to Cart'}
          </button>
        </div>

        {/* Special instructions toggle */}
        <button
          type="button"
          onClick={() => setShowInstructions((s) => !s)}
          aria-expanded={showInstructions}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-primary transition-colors duration-200 font-opensans self-start focus:outline-none focus-visible:underline"
        >
          <FiChevronDown
            aria-hidden="true"
            size={13}
            className={`transition-transform duration-200 ${showInstructions ? 'rotate-180' : ''}`}
          />
          Special instructions
        </button>

        {showInstructions && (
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="E.g. extra spicy, no onions, extra sauce…"
            aria-label={`Special instructions for ${item.name}`}
            rows={2}
            maxLength={150}
            className="w-full font-opensans text-sm border border-gray-200 rounded-lg px-3 py-2 text-charcoal placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 resize-none transition-all duration-200"
          />
        )}
      </div>
    </article>
  );
}
