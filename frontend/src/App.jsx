import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import { CartProvider } from './context/CartContext';
import Navbar            from './components/common/Navbar';
import Footer            from './components/common/Footer';
import ScrollToTop       from './components/common/ScrollToTop';
import ErrorBoundary     from './components/common/ErrorBoundary';
import HomeScreen        from './pages/HomeScreen';
import MenuScreen        from './pages/MenuScreen';
import BranchesScreen    from './pages/BranchesScreen';
import AboutScreen       from './pages/AboutScreen';
import ContactScreen     from './pages/ContactScreen';
import CartScreen        from './pages/CartScreen';
import CheckoutScreen    from './pages/CheckoutScreen';
import OrderStatusScreen from './pages/OrderStatusScreen';
import PrivacyPolicyScreen from './pages/PrivacyPolicyScreen';
import TermsScreen       from './pages/TermsScreen';
import NotFoundScreen    from './pages/NotFoundScreen';
import ActiveOrderFloat  from './components/order/ActiveOrderFloat';

/** Placeholder for admin — remove once AdminScreen is built */
function ComingSoon({ page }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-lightgray">
      <h1 className="font-montserrat font-extrabold text-4xl text-primary mb-3">{page}</h1>
      <p className="font-opensans text-gray-500 text-lg">This page is coming soon.</p>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <BrowserRouter>
          {/* ── Scroll to top on every route change ─────────────── */}
          <ScrollToTop />

          {/* ── Global sticky navbar ────────────────────────────── */}
          <Navbar />

          {/* ── Floating order tracker (shows when active order exists) ── */}
          <ActiveOrderFloat />

          {/* ── Routes ─────────────────────────────────────────── */}
          <ErrorBoundary>
            <Routes>
              <Route path="/"             element={<HomeScreen />} />
              <Route path="/menu"         element={<MenuScreen />} />
              <Route path="/branches"     element={<BranchesScreen />} />
              <Route path="/about"        element={<AboutScreen />} />
              <Route path="/contact"      element={<ContactScreen />} />
              <Route path="/cart"         element={<CartScreen />} />
              <Route path="/checkout"     element={<CheckoutScreen />} />
              <Route path="/order-status" element={<OrderStatusScreen />} />
              <Route path="/privacy"      element={<PrivacyPolicyScreen />} />
              <Route path="/terms"        element={<TermsScreen />} />
              <Route path="/admin"        element={<ComingSoon page="Admin" />} />
              {/* 404 — any unmatched path */}
              <Route path="*"             element={<NotFoundScreen />} />
            </Routes>
          </ErrorBoundary>

          {/* ── Global footer ──────────────────────────────────── */}
          <Footer />

          {/* ── Global toast notifications ─────────────────────── */}
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2500,
              style: {
                background:  '#2D2D2D',
                color:       '#ffffff',
                fontFamily:  '"Open Sans", sans-serif',
                fontSize:    '14px',
                borderRadius:'10px',
                padding:     '12px 18px',
              },
              success: {
                iconTheme: { primary: '#FFD700', secondary: '#2D2D2D' },
              },
              error: {
                iconTheme: { primary: '#C41E3A', secondary: '#ffffff' },
              },
            }}
          />
        </BrowserRouter>
      </CartProvider>
    </HelmetProvider>
  );
}
