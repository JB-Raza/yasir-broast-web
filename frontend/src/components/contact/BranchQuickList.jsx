import { Link } from 'react-router-dom';
import { FiPhone, FiExternalLink } from 'react-icons/fi';

const QUICK_BRANCHES = [
  { id: 1, name: 'Johar Town',       phone: '042-35312350' },
  { id: 2, name: 'Thokar Niaz Baig', phone: '042-35316605' },
  { id: 3, name: 'Allama Iqbal Town',phone: '042-37890123' },
  { id: 4, name: 'DHA Phase 5',      phone: '042-35691234' },
  { id: 5, name: 'Gulberg',          phone: '042-35778901' },
];

/**
 * BranchQuickList
 * A compact table of branch names with tap-to-call phone links.
 */
export default function BranchQuickList() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="font-montserrat font-extrabold text-charcoal text-lg mb-5">
        Quick Branch Reference
      </h3>

      <ul className="divide-y divide-gray-100">
        {QUICK_BRANCHES.map(({ id, name, phone }) => (
          <li
            key={id}
            className="flex items-center justify-between py-3 group"
          >
            <span className="font-opensans text-gray-700 text-sm group-hover:text-charcoal transition-colors duration-200">
              {name}
            </span>
            <a
              href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
              aria-label={`Call ${name} at ${phone}`}
              className="flex items-center gap-1.5 font-opensans text-primary font-semibold text-sm hover:underline transition-colors duration-200"
            >
              <FiPhone size={13} aria-hidden="true" />
              {phone}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-5 pt-4 border-t border-gray-100">
        <Link
          to="/branches"
          className="inline-flex items-center gap-1.5 font-montserrat font-semibold text-sm text-primary hover:underline transition-colors duration-200"
        >
          View All Branches
          <FiExternalLink size={13} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
