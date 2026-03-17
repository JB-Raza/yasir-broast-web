import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiShoppingBag, FiArrowRight, FiTag, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import { confirmDanger } from '../utils/confirm';

/* ─── Constants ──────────────────────────────────────────────────── */
const DELIVERY_FEE   = 150;          // Rs.
const VALID_PROMO    = 'YASIR10';    // placeholder promo — 10% off
const PROMO_DISCOUNT = 0.10;

export default function CartScreen() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryType, setDeliveryType] = useState('pickup'); // 'pickup' | 'delivery'
  const [promoCode, setPromoCode]       = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError]     = useState('');

  /* ── Derived totals ──────────────────────────────────────────── */
  const discount      = promoApplied ? Math.round(total * PROMO_DISCOUNT) : 0;
  const deliveryCharge = deliveryType === 'delivery' ? DELIVERY_FEE : 0;
  const grandTotal    = total - discount + deliveryCharge;

  /* ── Promo code ──────────────────────────────────────────────── */
  function applyPromo() {
    if (promoCode.trim().toUpperCase() === VALID_PROMO) {
      setPromoApplied(true);
      setPromoError('');
      toast.success('Promo code applied! 10% off 🎉');
    } else {
      setPromoError('Invalid promo code.');
      setPromoApplied(false);
    }
  }
  function removePromo() {
    setPromoApplied(false);
    setPromoCode('');
    setPromoError('');
  }

  /* ── Empty state ─────────────────────────────────────────────── */
  if (cart.length === 0) {
    return (
      <>
        <Helmet>
          <title>Your Cart | Yasir Broast</title>
        </Helmet>
        <div className="min-h-screen flex flex-col items-center justify-center bg-light-gray px-4 text-center">
          <div className="text-7xl mb-6" aria-hidden="true">🛒</div>
          <h1 className="font-montserrat font-extrabold text-charcoal text-3xl mb-2">
            Your cart is empty
          </h1>
          <p className="font-opensans text-gray-400 text-base mb-8 max-w-sm">
            Looks like you haven't added anything yet. Explore our menu and add your favourites!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-primary text-white font-montserrat font-bold text-sm px-8 py-3 rounded-xl hover:bg-primary-dark hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <FiShoppingBag size={16} aria-hidden="true" />
            Browse Menu
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`Your Cart (${cart.length} items) | Yasir Broast`}</title>
      </Helmet>

      {/* Spacer for fixed navbar */}
      <div className="h-16" aria-hidden="true" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page heading */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-montserrat font-extrabold text-charcoal text-3xl">
            Your Cart
          </h1>
          <button
            onClick={async () => {
              const ok = await confirmDanger({
                title:       'Clear your cart?',
                text:        'All items will be removed. This cannot be undone.',
                confirmText: 'Yes, clear it',
                cancelText:  'Keep items',
              });
              if (ok) { clearCart(); toast('Cart cleared.'); }
            }}
            className="font-opensans text-sm text-gray-400 hover:text-red-500 hover:underline transition-colors duration-200"
          >
            Clear all
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Left: cart items ─────────────────────────────────── */}
          <section aria-label="Cart items" className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <ul aria-label="Items in cart">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 mt-5 font-opensans text-sm text-primary hover:underline transition-colors duration-200"
            >
              ← Continue Shopping
            </Link>
          </section>

          {/* ── Right: order summary panel ───────────────────────── */}
          <aside aria-label="Order summary" className="bg-white rounded-2xl shadow-md p-6 space-y-5 sticky top-24">

            <h2 className="font-montserrat font-extrabold text-charcoal text-lg">
              Order Summary
            </h2>

            {/* Delivery / Pickup toggle */}
            <div>
              <p className="font-montserrat font-semibold text-charcoal text-xs uppercase tracking-wider mb-2">
                Order Type
              </p>
              <div className="grid grid-cols-2 gap-2">
                {['pickup', 'delivery'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setDeliveryType(type)}
                    aria-pressed={deliveryType === type}
                    className={`py-2.5 rounded-xl font-montserrat font-bold text-sm capitalize transition-all duration-200 ${
                      deliveryType === type
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-light-gray text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {type === 'pickup' ? '🏪 Pickup' : '🛵 Delivery'}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo code */}
            <div>
              <p className="font-montserrat font-semibold text-charcoal text-xs uppercase tracking-wider mb-2">
                Promo Code
              </p>
              {promoApplied ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
                  <span className="flex items-center gap-2 font-opensans text-green-700 text-sm font-semibold">
                    <FiTag size={14} aria-hidden="true" />
                    {VALID_PROMO} — 10% off
                  </span>
                  <button
                    onClick={removePromo}
                    aria-label="Remove promo code"
                    className="text-green-500 hover:text-red-500 transition-colors duration-200"
                  >
                    <FiX size={16} aria-hidden="true" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }}
                    onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    placeholder="Enter code"
                    aria-label="Promo code"
                    className={`flex-1 border rounded-xl px-3 py-2 font-opensans text-sm text-charcoal outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 ${
                      promoError ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <button
                    onClick={applyPromo}
                    className="bg-primary text-white font-montserrat font-bold text-xs px-4 rounded-xl hover:bg-primary-dark transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && (
                <p role="alert" className="mt-1 text-xs text-red-500 font-opensans">{promoError}</p>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <Row label="Subtotal" value={`Rs.${total.toLocaleString()}`} />
              {promoApplied && (
                <Row label={`Discount (${VALID_PROMO})`} value={`−Rs.${discount.toLocaleString()}`} valueClass="text-green-600" />
              )}
              <Row
                label={deliveryType === 'delivery' ? 'Delivery Fee' : 'Pickup (free)'}
                value={deliveryCharge > 0 ? `Rs.${deliveryCharge.toLocaleString()}` : 'Free'}
                valueClass={deliveryCharge === 0 ? 'text-green-600' : ''}
              />
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="font-montserrat font-extrabold text-charcoal text-base">Total</span>
                <span className="font-montserrat font-extrabold text-primary text-lg">
                  Rs.{grandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout */}
            <button
              onClick={() =>
                navigate('/checkout', { state: { deliveryType, discount, promoApplied, promoCode: promoApplied ? VALID_PROMO : '' } })
              }
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-montserrat font-extrabold text-sm py-3.5 rounded-xl hover:bg-primary-dark hover:scale-[1.02] active:scale-95 transition-all duration-200 shadow-md"
            >
              Proceed to Checkout
              <FiArrowRight size={16} aria-hidden="true" />
            </button>

            <p className="text-center font-opensans text-gray-400 text-xs">
              Secure checkout. No account required.
            </p>
          </aside>
        </div>
      </main>
    </>
  );
}

/* ── Small helper ──────────────────────────────────────────────────── */
function Row({ label, value, valueClass = '' }) {
  return (
    <div className="flex justify-between">
      <span className="font-opensans text-gray-500 text-sm">{label}</span>
      <span className={`font-opensans font-semibold text-sm text-charcoal ${valueClass}`}>{value}</span>
    </div>
  );
}
