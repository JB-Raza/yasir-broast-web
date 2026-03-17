import { Component } from 'react';
import { FiRefreshCw, FiHome } from 'react-icons/fi';

/**
 * ErrorBoundary
 * Catches uncaught JS errors in any child component tree and renders a
 * branded fallback UI instead of a blank screen.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <Routes>…</Routes>
 *   </ErrorBoundary>
 *
 * Or around a specific section:
 *   <ErrorBoundary fallbackMessage="Menu failed to load.">
 *     <MenuGrid … />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
    this.reset  = this.reset.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production swap this for a real error-reporting service (e.g. Sentry)
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
    }
  }

  reset() {
    this.setState({ hasError: false, error: null });
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    const { fallbackMessage } = this.props;

    return (
      <div
        role="alert"
        className="min-h-[60vh] flex items-center justify-center bg-lightgray px-4 py-16"
      >
        <div className="text-center max-w-md mx-auto">

          {/* Icon */}
          <div className="text-6xl mb-5" aria-hidden="true">⚠️</div>

          {/* Heading */}
          <h2 className="font-montserrat font-extrabold text-charcoal text-2xl mb-2">
            Something went wrong
          </h2>

          {/* Message */}
          <p className="font-opensans text-gray-500 text-sm mb-6 leading-relaxed">
            {fallbackMessage ||
              "An unexpected error occurred. You can try refreshing the page or go back to the home page."}
          </p>

          {/* Dev-only error detail */}
          {import.meta.env.DEV && this.state.error && (
            <pre className="mb-6 text-left bg-red-50 border border-red-200 rounded-xl p-4 text-xs text-red-700 overflow-auto max-h-32">
              {this.state.error.toString()}
            </pre>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={this.reset}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-montserrat font-bold text-sm py-2.5 px-6 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <FiRefreshCw size={15} aria-hidden="true" />
              Try Again
            </button>
            <a
              href="/"
              className="inline-flex items-center gap-2 border-2 border-gray-300 hover:border-primary text-gray-500 hover:text-primary font-montserrat font-bold text-sm py-2.5 px-6 rounded-xl transition-all duration-200"
            >
              <FiHome size={15} aria-hidden="true" />
              Go Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
