import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiPhone, FiX, FiRefreshCw, FiShoppingBag, FiMapPin, FiAlertCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

import { useCart } from '../context/CartContext';
import OrderTracker from '../components/order/OrderTracker';
import {
  getOrders,
  cancelOrder,
  getSimulatedStatus,
  buildTimeline,
  STATUS_BADGE,
  formatTime,
  isWithinCancellationWindow,
} from '../utils/orderStorage';
import { confirmDanger } from '../utils/confirm';

/* ─── Tab types ──────────────────────────────────────────────────── */
const TABS = ['active', 'history'];

/* ─── Status message map ─────────────────────────────────────────── */
const STATUS_MSG = {
  confirmed:          "We've received your order and it's confirmed! 🎉",
  preparing:          'Our chefs are preparing your food right now 🍳',
  ready:              'Your order is packed and ready! 📦',
  'out-for-delivery': 'Your rider is on the way 🛵',
  delivered:          'Order delivered! Enjoy your meal 🎉',
  cancelled:          'This order has been cancelled.',
};

/* ─── Issue options ──────────────────────────────────────────────── */
const ISSUE_OPTIONS = [
  'Order is taking too long',
  'Received wrong items',
  'Items are missing',
  'Food quality issue',
  'Other',
];

export default function OrderStatusScreen() {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [orders, setOrders]       = useState([]);
  const [tab, setTab]             = useState('active');
  const [selectedId, setSelectedId] = useState(null);
  const [issueOpen, setIssueOpen] = useState(false);
  const [tick, setTick]           = useState(0); // forces re-render

  /* Load + auto-refresh every 30 s */
  const refresh = useCallback(() => setOrders(getOrders()), []);

  useEffect(() => {
    refresh();
    const id = setInterval(() => {
      refresh();
      setTick((t) => t + 1); // force simulated-status recalc
    }, 30_000);
    return () => clearInterval(id);
  }, [refresh]);

  /* Derive active/history lists */
  const activeOrders  = orders.filter((o) => !['delivered', 'cancelled'].includes(getSimulatedStatus(o)));
  const historyOrders = orders.filter((o) =>  ['delivered', 'cancelled'].includes(getSimulatedStatus(o)));

  /* Select first active order by default */
  useEffect(() => {
    if (activeOrders.length && !selectedId) setSelectedId(activeOrders[0].id);
    else if (!activeOrders.length && historyOrders.length && !selectedId)
      setSelectedId(historyOrders[0].id);
  }, [orders]); // eslint-disable-line

  const selected = orders.find((o) => o.id === selectedId) ?? null;
  const currentStatus = selected ? getSimulatedStatus(selected) : null;
  const badge         = currentStatus ? STATUS_BADGE[currentStatus] : null;
  const timeline      = selected ? buildTimeline(selected) : [];
  const canCancel     = selected ? isWithinCancellationWindow(selected) : false;
  const isDelivered   = currentStatus === 'delivered';
  const isCancelled   = currentStatus === 'cancelled';

  /* ── Handlers ─────────────────────────────────────────────────── */
  async function handleCancel() {
    if (!selected) return;
    if (!canCancel) {
      toast.error('Cancellation window has passed. Please call the branch directly.');
      return;
    }
    const ok = await confirmDanger({
      title:       'Cancel this order?',
      text:        `Order <strong>${selected.id}</strong> will be permanently cancelled. This cannot be undone.`,
      confirmText: 'Yes, cancel order',
      cancelText:  'Keep order',
    });
    if (!ok) return;
    cancelOrder(selected.id);
    refresh();
    toast('Order cancelled.');
  }

  function handleReorder() {
    if (!selected) return;
    selected.items.forEach((item) => addItem(item, item.quantity));
    toast.success('Items added to cart!');
    navigate('/cart');
  }

  function handleShareWA() {
    if (!selected) return;
    const msg = encodeURIComponent(
      `Hi Yasir Broast!\nOrder: ${selected.id}\nStatus: ${STATUS_BADGE[currentStatus]?.label}\nTotal: Rs.${selected.total?.toLocaleString()}`
    );
    window.open(`https://wa.me/923001234567?text=${msg}`, '_blank');
  }

  /* ── Empty state ──────────────────────────────────────────────── */
  if (orders.length === 0) {
    return (
      <>
        <Helmet><title>Order Status | Yasir Broast</title></Helmet>
        <div className="min-h-screen flex flex-col items-center justify-center bg-light-gray px-4 text-center">
          <div className="text-7xl mb-6" aria-hidden="true">📦</div>
          <h1 className="font-montserrat font-extrabold text-charcoal text-2xl mb-2">No orders yet</h1>
          <p className="font-opensans text-gray-400 text-sm mb-8">Your order history will appear here after you place your first order.</p>
          <Link to="/menu"
            className="inline-flex items-center gap-2 bg-primary text-white font-montserrat font-bold text-sm px-8 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all duration-200">
            <FiShoppingBag size={16} aria-hidden="true" /> Start Ordering
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet><title>Order Status | Yasir Broast</title></Helmet>
      <div className="h-16" aria-hidden="true" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page heading */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-montserrat font-extrabold text-charcoal text-3xl">Order Status</h1>
          <button onClick={() => { refresh(); setTick((t) => t + 1); toast('Refreshed'); }}
            className="flex items-center gap-1.5 font-opensans text-sm text-gray-400 hover:text-primary transition-colors duration-200">
            <FiRefreshCw size={14} aria-hidden="true" /> Refresh
          </button>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-light-gray p-1 rounded-xl mb-8 w-fit">
          {TABS.map((t) => (
            <button key={t}
              onClick={() => {
                setTab(t);
                if (t === 'active' && activeOrders.length) setSelectedId(activeOrders[0].id);
                if (t === 'history' && historyOrders.length) setSelectedId(historyOrders[0].id);
              }}
              aria-selected={tab === t}
              className={`px-5 py-2 rounded-lg font-montserrat font-bold text-sm capitalize transition-all duration-200 ${
                tab === t ? 'bg-white text-primary shadow-sm' : 'text-gray-400 hover:text-charcoal'
              }`}
            >
              {t === 'active' ? `Active` : 'History'}
              {t === 'active' && activeOrders.length > 0 && (
                <span className="ml-1.5 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {activeOrders.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── Left: order list (history tab) or tracker (active) ─ */}
          <div className="lg:col-span-2 space-y-6">

            {/* Active tab — full tracker */}
            {tab === 'active' && (
              activeOrders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                  <p className="text-4xl mb-3" aria-hidden="true">✅</p>
                  <p className="font-montserrat font-bold text-charcoal text-lg mb-1">No active orders</p>
                  <p className="font-opensans text-gray-400 text-sm mb-5">All your orders have been completed.</p>
                  <Link to="/menu" className="text-primary font-semibold hover:underline text-sm">Order Again</Link>
                </div>
              ) : selected && (
                <>
                  {/* Order header */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <p className="font-opensans text-gray-400 text-xs mb-0.5">Order Number</p>
                        <h2 className="font-montserrat font-extrabold text-charcoal text-xl">{selected.id}</h2>
                        <p className="font-opensans text-gray-400 text-xs mt-0.5">
                          Placed at {formatTime(selected.placedAt)}
                        </p>
                      </div>
                      {badge && (
                        <span className={`${badge.bg} ${badge.text} font-montserrat font-bold text-xs px-3 py-1.5 rounded-full`}>
                          {badge.label}
                        </span>
                      )}
                    </div>

                    {/* Progress tracker */}
                    <div className="pt-2">
                      <OrderTracker currentStatus={currentStatus} deliveryType={selected.deliveryType} />
                    </div>

                    {/* Status message */}
                    <div className="mt-5 bg-primary/5 border border-primary/20 rounded-xl px-4 py-3">
                      <p className="font-opensans text-charcoal text-sm">{STATUS_MSG[currentStatus]}</p>
                    </div>
                  </div>

                  {/* Live timeline feed */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <h3 className="font-montserrat font-extrabold text-charcoal text-base mb-4">Live Updates</h3>
                    <ol className="space-y-3">
                      {[...timeline].reverse().map(({ status, timestamp }, i) => {
                        const b = STATUS_BADGE[status];
                        const isLatest = i === 0;
                        return (
                          <li key={status} className={`flex items-start gap-3 ${isLatest ? 'opacity-100' : 'opacity-60'}`}>
                            <span className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${isLatest ? 'bg-primary' : 'bg-gray-300'}`} aria-hidden="true" />
                            <div>
                              <p className={`font-opensans text-sm ${isLatest ? 'font-semibold text-charcoal' : 'text-gray-500'}`}>
                                {b?.label ?? status}
                              </p>
                              <p className="font-opensans text-xs text-gray-400">{formatTime(timestamp)}</p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>

                  {/* Delivery / Pickup info */}
                  {selected.deliveryType === 'delivery' && selected.deliveryAddress && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h3 className="font-montserrat font-extrabold text-charcoal text-base mb-3">Delivery Info</h3>
                      <div className="flex items-start gap-3">
                        <FiMapPin className="text-primary mt-0.5 shrink-0" size={16} aria-hidden="true" />
                        <p className="font-opensans text-gray-600 text-sm">{selected.deliveryAddress}</p>
                      </div>
                      <p className="font-opensans text-gray-400 text-xs mt-2">
                        Est. arrival: {formatTime(new Date(selected.placedAt).getTime() + 40 * 60000)}
                      </p>
                    </div>
                  )}

                  {selected.deliveryType === 'pickup' && (
                    <div className="bg-white rounded-2xl shadow-md p-6">
                      <h3 className="font-montserrat font-extrabold text-charcoal text-base mb-3">Pickup Info</h3>
                      <p className="font-opensans text-gray-600 text-sm mb-1">
                        <span className="font-semibold text-charcoal">{selected.branch?.name ?? 'Johar Town'}</span>
                        {' — '}{selected.branch?.address ?? 'Main Boulevard, Johar Town, Lahore'}
                      </p>
                      <p className="font-opensans text-gray-400 text-xs">
                        Show your order number <strong className="text-charcoal">{selected.id}</strong> at the counter.
                      </p>
                    </div>
                  )}

                  {/* Problem section */}
                  <div className="bg-white rounded-2xl shadow-md p-6">
                    <button onClick={() => setIssueOpen((o) => !o)}
                      className="flex items-center gap-2 font-montserrat font-bold text-sm text-gray-500 hover:text-primary transition-colors duration-200">
                      <FiAlertCircle size={16} aria-hidden="true" /> Report an issue
                    </button>
                    {issueOpen && (
                      <div className="mt-4 space-y-2">
                        {ISSUE_OPTIONS.map((issue) => (
                          <button key={issue}
                            onClick={() => {
                              const msg = encodeURIComponent(`Hi Yasir Broast! Issue with order ${selected.id}: ${issue}`);
                              window.open(`https://wa.me/923001234567?text=${msg}`, '_blank');
                            }}
                            className="w-full text-left font-opensans text-sm text-gray-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors duration-200"
                          >
                            {issue}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )
            )}

            {/* History tab — order list */}
            {tab === 'history' && (
              historyOrders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                  <p className="text-4xl mb-3" aria-hidden="true">📋</p>
                  <p className="font-montserrat font-bold text-charcoal text-lg mb-1">No history yet</p>
                  <p className="font-opensans text-gray-400 text-sm">Completed orders will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {historyOrders.map((order) => {
                    const s = getSimulatedStatus(order);
                    const b = STATUS_BADGE[s];
                    const isSelected = order.id === selectedId;
                    return (
                      <button key={order.id}
                        onClick={() => setSelectedId(order.id)}
                        aria-pressed={isSelected}
                        className={`w-full text-left bg-white rounded-2xl p-5 flex flex-wrap gap-4 items-center justify-between transition-all duration-200 border-2 hover:shadow-lg ${
                          isSelected ? 'border-primary shadow-md' : 'border-transparent shadow-sm'
                        }`}
                      >
                        <div>
                          <p className="font-montserrat font-extrabold text-charcoal text-sm">{order.id}</p>
                          <p className="font-opensans text-gray-400 text-xs mt-0.5">
                            {new Date(order.placedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}
                            {' • '}{order.items?.length ?? 0} items
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-montserrat font-bold text-charcoal text-sm">
                            Rs.{order.total?.toLocaleString()}
                          </span>
                          <span className={`${b?.bg} ${b?.text} font-montserrat font-bold text-xs px-2.5 py-1 rounded-full`}>
                            {b?.label}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )
            )}
          </div>

          {/* ── Right sidebar: order summary + actions ─────────── */}
          {selected && (
            <aside className="bg-white rounded-2xl shadow-md p-6 space-y-5 sticky top-24">
              <h3 className="font-montserrat font-extrabold text-charcoal text-lg border-b border-gray-100 pb-4">
                Order Summary
              </h3>

              {/* Items */}
              <ul className="space-y-2.5 max-h-44 overflow-y-auto pr-1">
                {(selected.items ?? []).map((item, i) => (
                  <li key={i} className="flex justify-between gap-2">
                    <span className="font-opensans text-gray-600 text-sm">
                      {item.name}
                      <span className="text-gray-400"> ×{item.quantity}</span>
                    </span>
                    <span className="font-opensans font-semibold text-charcoal text-sm shrink-0">
                      Rs.{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="space-y-1.5 pt-3 border-t border-gray-100">
                {selected.discount > 0 && (
                  <SRow label="Discount" value={`−Rs.${selected.discount?.toLocaleString()}`} cls="text-green-600" />
                )}
                <SRow
                  label={selected.deliveryType === 'delivery' ? 'Delivery Fee' : 'Pickup'}
                  value={selected.deliveryFee > 0 ? `Rs.${selected.deliveryFee}` : 'Free'}
                  cls={selected.deliveryFee === 0 ? 'text-green-600' : ''}
                />
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-montserrat font-extrabold text-charcoal text-sm">Total</span>
                  <span className="font-montserrat font-extrabold text-primary text-base">
                    Rs.{selected.total?.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Branch */}
              {selected.branch && (
                <div className="bg-light-gray rounded-xl px-4 py-3">
                  <p className="font-montserrat font-bold text-charcoal text-xs mb-0.5">{selected.branch.name}</p>
                  <p className="font-opensans text-gray-400 text-xs">{selected.branch.address}</p>
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-2.5 pt-1">
                {/* Call restaurant */}
                <a href={`tel:${(selected.branch?.phone ?? '04235312350').replace(/[^0-9]/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full border-2 border-primary text-primary font-montserrat font-bold text-sm py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-200">
                  <FiPhone size={14} aria-hidden="true" /> Call Restaurant
                </a>

                {/* Share on WhatsApp */}
                <button onClick={handleShareWA}
                  className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-montserrat font-bold text-sm py-2.5 rounded-xl transition-all duration-200">
                  📱 Share on WhatsApp
                </button>

                {/* Reorder (delivered only) */}
                {isDelivered && (
                  <button onClick={handleReorder}
                    className="flex items-center justify-center gap-2 w-full bg-primary text-white font-montserrat font-bold text-sm py-2.5 rounded-xl hover:bg-primary-dark transition-all duration-200">
                    <FiShoppingBag size={14} aria-hidden="true" /> Reorder
                  </button>
                )}

                {/* Cancel (within window) */}
                {canCancel && !isCancelled && (
                  <button onClick={handleCancel}
                    className="flex items-center justify-center gap-2 w-full border border-red-200 text-red-500 font-montserrat font-bold text-sm py-2.5 rounded-xl hover:bg-red-50 transition-all duration-200">
                    <FiX size={14} aria-hidden="true" /> Cancel Order
                  </button>
                )}
              </div>
            </aside>
          )}
        </div>
      </main>
    </>
  );
}

function SRow({ label, value, cls = '' }) {
  return (
    <div className="flex justify-between">
      <span className="font-opensans text-gray-400 text-xs">{label}</span>
      <span className={`font-opensans font-semibold text-xs text-charcoal ${cls}`}>{value}</span>
    </div>
  );
}
