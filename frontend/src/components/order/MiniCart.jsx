import { Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatters';

/**
 * MiniCart  (mobile / tablet only — hidden on xl+)
 *
 * A fixed bottom bar that slides up from the bottom when the cart
 * has at least one item, and disappears when it's empty.
 * Provides quick access to cart count, subtotal, and View Cart.
 */
export default function MiniCart() {
  const { itemCount, total } = useCart();

  return (
    <div
      role="region"
      aria-label="Cart summary"
      aria-live="polite"
      className={`xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl transition-transform duration-300 ease-out ${
        itemCount > 0 ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">

        {/* Cart icon + count */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center">
            <FiShoppingCart className="text-white" size={20} aria-hidden="true" />
          </div>
          <span className="absolute -top-1.5 -right-1.5 bg-gold text-charcoal font-montserrat font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        </div>

        {/* Item count + subtotal */}
        <div className="flex-1 min-w-0">
          <p className="font-montserrat font-bold text-charcoal text-sm">
            {itemCount} item{itemCount !== 1 ? 's' : ''} in cart
          </p>
          <p className="font-montserrat font-extrabold text-primary text-base leading-tight">
            {formatPrice(total)}
          </p>
        </div>

        {/* View Cart CTA */}
        <Link
          to="/cart"
          aria-label={`View cart — ${itemCount} items, ${formatPrice(total)}`}
          className="shrink-0 flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white font-montserrat font-bold text-sm py-2.5 px-5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
        >
          View Cart <FiArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
