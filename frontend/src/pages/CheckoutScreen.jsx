import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiChevronRight, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

import { useCart } from '../context/CartContext';
import OrderSummary from '../components/checkout/OrderSummary';
import { saveOrder } from '../utils/orderStorage';

/* ─── Constants ──────────────────────────────────────────────────── */
const DELIVERY_FEE = 150;

/* ─── Validation ─────────────────────────────────────────────────── */
const PHONE_RE = /^(03[0-9]{2}-?[0-9]{7}|0[0-9]{2,3}-?[0-9]{6,8})$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(fields, deliveryType) {
  const errors = {};
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = 'Name must be at least 2 characters.';
  if (!PHONE_RE.test(fields.phone.replace(/\s/g, '')))
    errors.phone = 'Enter a valid Pakistani phone number (e.g. 0300-1234567).';
  if (fields.email && !EMAIL_RE.test(fields.email))
    errors.email = 'Enter a valid email address.';
  if (deliveryType === 'delivery' && !fields.address.trim())
    errors.address = 'Delivery address is required.';
  if (!fields.terms)
    errors.terms = 'Please agree to the terms before placing your order.';
  return errors;
}

/* ─── Generate order number ──────────────────────────────────────── */
function generateOrderNumber() {
  return `YB-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

/* ─── Payment methods ────────────────────────────────────────────── */
const PAYMENT_METHODS = [
  { id: 'cod',  label: 'Cash on Delivery', emoji: '💵', available: true  },
  { id: 'card', label: 'Card Payment',     emoji: '💳', available: false },
];

const INITIAL_FIELDS = { name: '', phone: '', email: '', address: '', terms: false };

export default function CheckoutScreen() {
  const { cart, total, clearCart } = useCart();
  const location = useLocation();
  const navigate  = useNavigate();

  /* Read data passed from CartScreen */
  const {
    deliveryType   = 'pickup',
    discount       = 0,
    promoApplied   = false,
  } = location.state ?? {};

  const deliveryCharge = deliveryType === 'delivery' ? DELIVERY_FEE : 0;
  const grandTotal     = total - discount + deliveryCharge;

  /* ── Form state ─────────────────────────────────────────────── */
  const [fields,      setFields]      = useState(INITIAL_FIELDS);
  const [errors,      setErrors]      = useState({});
  const [payment,     setPayment]     = useState('cod');
  const [submitting,  setSubmitting]  = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  /* ── Redirect to menu if cart empty ─────────────────────────── */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light-gray px-4 text-center">
        <div className="text-7xl mb-6" aria-hidden="true">🛒</div>
        <h1 className="font-montserrat font-extrabold text-charcoal text-2xl mb-4">Nothing to checkout</h1>
        <Link to="/menu" className="text-primary font-semibold hover:underline">Browse Menu</Link>
      </div>
    );
  }

  /* ── Submit ──────────────────────────────────────────────────── */
  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate(fields, deliveryType);
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      toast.error('Please fix the errors before placing your order.');
      return;
    }

    setSubmitting(true);
    try {
      /* Placeholder — replace with real API call */
      await new Promise((res) => setTimeout(res, 1000));
      const orderNumber = generateOrderNumber();

      /* Save to localStorage for order tracking */
      saveOrder({
        id:              orderNumber,
        placedAt:        new Date().toISOString(),
        status:          'confirmed',
        items:           cart.map(({ id, name, price, quantity, image }) => ({ id, name, price, quantity, image })),
        subtotal:        total,
        discount:        discount,
        deliveryFee:     deliveryCharge,
        total:           grandTotal,
        deliveryType:    deliveryType,
        deliveryAddress: fields.address || '',
        customerName:    fields.name,
        customerPhone:   fields.phone,
        branch: { name: 'Johar Town', address: 'Main Boulevard, Johar Town, Lahore', phone: '042-35312350' },
      });

      /* Notify ActiveOrderFloat to refresh */
      window.dispatchEvent(new Event('yasir-order-placed'));

      /* TODO: replace setTimeout mock with real POST /api/orders */
      clearCart();

      /* ── SweetAlert2 success modal ─────────────────────────── */
      const prepTime = deliveryType === 'delivery' ? '45–60 minutes' : '20–30 minutes';
      const waText   = encodeURIComponent(
        `Hi Yasir Broast! 🎉 Order ${orderNumber} placed.\nTotal: Rs.${grandTotal.toLocaleString()}\nType: ${deliveryType === 'delivery' ? 'Home Delivery' : 'Pickup'}`
      );
      const waUrl = `https://wa.me/923001234567?text=${waText}`;
      const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://yasirbroast.com')}`;

      const result = await Swal.fire({
        html: `
          <div style="font-family:'Montserrat',sans-serif; padding: 8px 0;">
            <div style="font-size:56px; margin-bottom:12px;">🎉</div>
            <h2 style="font-size:22px; font-weight:800; color:#2D2D2D; margin:0 0 6px;">Order Confirmed!</h2>
            <p style="font-size:14px; color:#888; margin:0 0 20px;">
              Thank you, <strong style="color:#2D2D2D;">${fields.name}</strong>!
            </p>

            <div style="background:#fff5f7; border:1.5px solid #f5c0ca; border-radius:14px; padding:14px 20px; margin-bottom:14px;">
              <p style="font-size:11px; color:#999; text-transform:uppercase; letter-spacing:.08em; margin:0 0 4px;">Order Number</p>
              <p style="font-size:24px; font-weight:800; color:#C41E3A; letter-spacing:.1em; margin:0;">${orderNumber}</p>
            </div>

            <div style="display:flex; justify-content:space-between; background:#f9f9f9; border-radius:12px; padding:12px 18px; margin-bottom:14px;">
              <span style="font-size:13px; color:#888;">Grand Total</span>
              <span style="font-size:15px; font-weight:700; color:#2D2D2D;">Rs.${grandTotal.toLocaleString()}</span>
            </div>

            <div style="display:flex; justify-content:space-between; background:#f9f9f9; border-radius:12px; padding:12px 18px; margin-bottom:18px;">
              <span style="font-size:13px; color:#888;">⏱ Est. Time</span>
              <span style="font-size:13px; font-weight:700; color:#2D2D2D;">${prepTime}</span>
            </div>

            <div style="display:flex; gap:10px; justify-content:center; flex-wrap:wrap;">
              <a href="${waUrl}" target="_blank"
                style="display:inline-flex; align-items:center; gap:6px; background:#25D366; color:#fff;
                       font-weight:700; font-size:13px; padding:10px 18px; border-radius:10px;
                       text-decoration:none;">
                📱 WhatsApp
              </a>
              <a href="${fbUrl}" target="_blank"
                style="display:inline-flex; align-items:center; gap:6px; background:#1877F2; color:#fff;
                       font-weight:700; font-size:13px; padding:10px 18px; border-radius:10px;
                       text-decoration:none;">
                👍 Facebook
              </a>
            </div>
          </div>
        `,
        confirmButtonText: '🏠 Continue Shopping',
        confirmButtonColor: '#C41E3A',
        denyButtonText: '📦 Track Order',
        denyButtonColor: '#2D2D2D',
        showDenyButton: true,
        showCloseButton: true,
        allowOutsideClick: false,
        customClass: {
          popup:         'swal-popup-rounded',
          confirmButton: 'swal-confirm-btn',
          denyButton:    'swal-confirm-btn',
        },
      });

      if (result.isDenied) navigate('/order-status');
      else navigate('/menu');
    } catch {
      toast.error('Failed to place order. Please try again or call us.');
    } finally {
      setSubmitting(false);
    }
  }

  /* ── Shared input class ──────────────────────────────────────── */
  const inputCls = (field) =>
    `w-full border rounded-xl px-4 py-3 font-opensans text-sm text-charcoal placeholder-gray-400 outline-none transition-all duration-200 focus:ring-2 ${
      errors[field]
        ? 'border-red-400 focus:ring-red-300 bg-red-50'
        : 'border-gray-300 focus:ring-primary/30 focus:border-primary bg-white'
    }`;

  return (
    <>
      <Helmet>
        <title>Checkout | Yasir Broast</title>
      </Helmet>

      {/* Spacer for fixed navbar */}
      <div className="h-16" aria-hidden="true" />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-gray-400">
            <li><Link to="/menu" className="hover:text-primary transition-colors font-opensans">Menu</Link></li>
            <li aria-hidden="true"><FiChevronRight size={13} /></li>
            <li><Link to="/cart" className="hover:text-primary transition-colors font-opensans">Cart</Link></li>
            <li aria-hidden="true"><FiChevronRight size={13} /></li>
            <li><span className="text-charcoal font-opensans font-semibold">Checkout</span></li>
          </ol>
        </nav>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h1 className="font-montserrat font-extrabold text-charcoal text-3xl mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Left: customer form ──────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Checkout form"
            className="lg:col-span-2 space-y-6"
          >

            {/* Customer information */}
            <section className="bg-white rounded-2xl shadow-md p-6 space-y-5">
              <h2 className="font-montserrat font-extrabold text-charcoal text-lg">
                Customer Information
              </h2>

              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="co-name" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
                    Full Name <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="co-name" name="name" type="text"
                    value={fields.name} onChange={handleChange}
                    placeholder="Your name"
                    required
                    aria-describedby={errors.name ? 'co-name-err' : undefined}
                    className={inputCls('name')}
                  />
                  {errors.name && <p id="co-name-err" role="alert" className="mt-1 text-xs text-red-500 font-opensans">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="co-phone" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
                    Phone <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="co-phone" name="phone" type="tel"
                    value={fields.phone} onChange={handleChange}
                    placeholder="0300-1234567"
                    required
                    aria-describedby={errors.phone ? 'co-phone-err' : undefined}
                    className={inputCls('phone')}
                  />
                  {errors.phone && <p id="co-phone-err" role="alert" className="mt-1 text-xs text-red-500 font-opensans">{errors.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="co-email" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="co-email" name="email" type="email"
                  value={fields.email} onChange={handleChange}
                  placeholder="you@email.com"
                  aria-describedby={errors.email ? 'co-email-err' : undefined}
                  className={inputCls('email')}
                />
                {errors.email && <p id="co-email-err" role="alert" className="mt-1 text-xs text-red-500 font-opensans">{errors.email}</p>}
              </div>

              {/* Delivery address — conditional */}
              {deliveryType === 'delivery' && (
                <div>
                  <label htmlFor="co-address" className="block font-montserrat font-semibold text-charcoal text-sm mb-1.5">
                    Delivery Address <span className="text-primary" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="co-address" name="address" rows={3}
                    value={fields.address} onChange={handleChange}
                    placeholder="House no., street, area, Lahore"
                    required
                    aria-describedby={errors.address ? 'co-address-err' : undefined}
                    className={`${inputCls('address')} resize-none`}
                  />
                  {errors.address && <p id="co-address-err" role="alert" className="mt-1 text-xs text-red-500 font-opensans">{errors.address}</p>}
                </div>
              )}

              {/* Pickup info badge */}
              {deliveryType === 'pickup' && (
                <div className="bg-gold/10 border border-gold/30 rounded-xl px-4 py-3">
                  <p className="font-opensans text-charcoal text-sm">
                    🏪 <strong>Pickup order</strong> — show this confirmation at any Yasir Broast branch.
                    Preparation time: <strong>20–30 mins</strong>.
                  </p>
                </div>
              )}
            </section>

            {/* Payment method */}
            <section className="bg-white rounded-2xl shadow-md p-6 space-y-4">
              <h2 className="font-montserrat font-extrabold text-charcoal text-lg">
                Payment Method
              </h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map(({ id, label, emoji, available }) => (
                  <label
                    key={id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      !available
                        ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                        : payment === id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={id}
                      checked={payment === id}
                      disabled={!available}
                      onChange={() => setPayment(id)}
                      className="accent-primary"
                    />
                    <span className="text-xl" aria-hidden="true">{emoji}</span>
                    <div>
                      <span className="font-montserrat font-bold text-charcoal text-sm">{label}</span>
                      {!available && (
                        <span className="ml-2 font-opensans text-xs text-gray-400">(coming soon)</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* Terms + submit */}
            <section className="bg-white rounded-2xl shadow-md p-6 space-y-5">
              {/* Terms checkbox */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={fields.terms}
                  onChange={handleChange}
                  aria-describedby={errors.terms ? 'co-terms-err' : undefined}
                  className="mt-0.5 w-4 h-4 accent-primary shrink-0"
                />
                <span className="font-opensans text-gray-600 text-sm leading-relaxed">
                  I agree to the{' '}
                  <Link to="/terms" target="_blank" className="text-primary hover:underline font-semibold">Terms & Conditions</Link>
                  {' '}and understand that orders cannot be cancelled once confirmed.
                </span>
              </label>
              {errors.terms && <p id="co-terms-err" role="alert" className="text-xs text-red-500 font-opensans -mt-2">{errors.terms}</p>}

              {/* Place order button */}
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white font-montserrat font-extrabold text-base py-4 rounded-xl hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.01] active:scale-95 shadow-md"
              >
                {submitting ? (
                  <>
                    <FiLoader size={18} className="animate-spin" aria-hidden="true" />
                    Placing Order…
                  </>
                ) : (
                  `Place Order · Rs.${grandTotal.toLocaleString()}`
                )}
              </button>
            </section>
          </form>

          {/* ── Right: order summary ─────────────────────────────── */}
          <OrderSummary
            cart={cart}
            subtotal={total}
            discount={discount}
            deliveryCharge={deliveryCharge}
            grandTotal={grandTotal}
            deliveryType={deliveryType}
          />

        </div>
      </main>
    </>
  );
}
