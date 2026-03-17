import { FiMapPin, FiPhone, FiClock, FiNavigation } from 'react-icons/fi';

/**
 * BranchCard
 *
 * Displays name, address, phones, hours and two action buttons.
 * Main branches get a gold accent border + badge.
 */
export default function BranchCard({ branch }) {
  const { name, address, phones, hours, coordinates, isMainBranch } = branch;

  // Build Google Maps directions URL
  const mapsUrl = coordinates
    ? `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`
    : `https://maps.google.com/?q=${encodeURIComponent(`Yasir Broast ${name} Lahore`)}`;

  // Primary phone for "Call Now"
  const primaryPhone = phones?.[0] ?? '';
  const dialHref = `tel:${primaryPhone.replace(/[^0-9+]/g, '')}`;

  return (
    <article
      className={`bg-white rounded-2xl shadow-md flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl ${
        isMainBranch ? 'ring-2 ring-gold' : ''
      }`}
      aria-label={`${name} branch`}
    >
      {/* Coloured top strip */}
      <div className={`h-1.5 ${isMainBranch ? 'bg-gold' : 'bg-primary'}`} />

      <div className="p-6 flex flex-col gap-4 flex-1">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-montserrat font-extrabold text-charcoal text-xl leading-tight">
            {name}
          </h3>
          {isMainBranch && (
            <span className="shrink-0 bg-gold/15 text-charcoal font-montserrat font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold/40">
              Main Branch
            </span>
          )}
        </div>

        {/* ── Details list ────────────────────────────────────────── */}
        <ul className="space-y-2.5 flex-1">

          {/* Address */}
          <li className="flex items-start gap-3">
            <FiMapPin
              className="text-primary mt-0.5 shrink-0"
              size={15}
              aria-hidden="true"
            />
            <span className="font-opensans text-gray-600 text-sm leading-snug">
              {address}
            </span>
          </li>

          {/* Phone numbers */}
          <li className="flex items-start gap-3">
            <FiPhone
              className="text-primary mt-0.5 shrink-0"
              size={15}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-0.5">
              {phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  aria-label={`Call ${name} at ${phone}`}
                  className="font-opensans text-sm text-primary hover:text-primary-dark hover:underline transition-colors duration-200"
                >
                  {phone}
                </a>
              ))}
            </div>
          </li>

          {/* Hours */}
          <li className="flex items-center gap-3">
            <FiClock
              className="text-primary shrink-0"
              size={15}
              aria-hidden="true"
            />
            <span className="font-opensans text-gray-600 text-sm">{hours}</span>
          </li>
        </ul>

        {/* ── Action buttons ───────────────────────────────────────── */}
        <div className="flex gap-3 pt-2">
          {/* Get Directions */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Get directions to ${name}`}
            className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-montserrat font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FiNavigation size={13} aria-hidden="true" />
            Directions
          </a>

          {/* Call Now */}
          <a
            href={dialHref}
            aria-label={`Call ${name}`}
            className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white font-montserrat font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <FiPhone size={13} aria-hidden="true" />
            Call Now
          </a>
        </div>
      </div>
    </article>
  );
}
