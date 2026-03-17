import { PICKUP_STEPS, DELIVERY_STEPS } from '../../utils/orderStorage';

/**
 * OrderTracker
 * Horizontal steps on desktop, vertical timeline on mobile.
 *
 * Props:
 *  currentStatus — e.g. 'preparing'
 *  deliveryType  — 'pickup' | 'delivery'
 */
export default function OrderTracker({ currentStatus, deliveryType }) {
  const steps = deliveryType === 'delivery' ? DELIVERY_STEPS : PICKUP_STEPS;
  const currentIdx = steps.findIndex((s) => s.id === currentStatus);

  return (
    <div aria-label="Order progress" role="list">
      {/* ── Desktop: horizontal ─────────────────────────────── */}
      <div className="hidden sm:flex items-start justify-between relative">
        {/* background connector line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0" aria-hidden="true" />

        {steps.map((step, idx) => {
          const done    = idx < currentIdx;
          const active  = idx === currentIdx;
          const future  = idx > currentIdx;

          return (
            <div
              key={step.id}
              role="listitem"
              className="relative flex flex-col items-center flex-1"
            >
              {/* Connector (left half) — filled if done */}
              {idx > 0 && (
                <div
                  className={`absolute top-5 right-1/2 left-0 h-0.5 -translate-y-px transition-colors duration-500 ${
                    done || active ? 'bg-primary' : 'bg-gray-200'
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Circle */}
              <div
                className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg border-2 transition-all duration-500 ${
                  done
                    ? 'bg-primary border-primary text-white'
                    : active
                    ? 'bg-white border-primary text-primary shadow-lg ring-4 ring-primary/20'
                    : 'bg-white border-gray-200 text-gray-300'
                }`}
                aria-current={active ? 'step' : undefined}
              >
                {done ? '✓' : step.icon}
              </div>

              {/* Label */}
              <p
                className={`mt-2 text-xs font-montserrat font-bold text-center leading-tight max-w-[72px] transition-colors duration-300 ${
                  future ? 'text-gray-300' : active ? 'text-primary' : 'text-charcoal'
                }`}
              >
                {step.label}
              </p>
              {active && (
                <p className="mt-0.5 text-[10px] font-opensans text-gray-400 text-center max-w-[80px] leading-tight">
                  {step.desc}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Mobile: vertical timeline ────────────────────────── */}
      <div className="sm:hidden space-y-0">
        {steps.map((step, idx) => {
          const done   = idx < currentIdx;
          const active = idx === currentIdx;
          const future = idx > currentIdx;
          const isLast = idx === steps.length - 1;

          return (
            <div key={step.id} role="listitem" className="flex gap-4">
              {/* Left: circle + vertical line */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-base border-2 shrink-0 transition-all duration-500 ${
                    done
                      ? 'bg-primary border-primary text-white'
                      : active
                      ? 'bg-white border-primary text-primary shadow-md ring-4 ring-primary/20'
                      : 'bg-white border-gray-200 text-gray-300'
                  }`}
                  aria-current={active ? 'step' : undefined}
                >
                  {done ? '✓' : step.icon}
                </div>
                {!isLast && (
                  <div
                    className={`w-0.5 flex-1 my-1 min-h-[20px] transition-colors duration-500 ${
                      done ? 'bg-primary' : 'bg-gray-200'
                    }`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Right: text */}
              <div className={`pb-5 ${isLast ? '' : ''}`}>
                <p
                  className={`font-montserrat font-bold text-sm leading-tight transition-colors duration-300 ${
                    future ? 'text-gray-300' : active ? 'text-primary' : 'text-charcoal'
                  }`}
                >
                  {step.label}
                </p>
                <p className="font-opensans text-xs text-gray-400 mt-0.5 leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
