import { Link } from 'react-router-dom';
import { FiPhone, FiMapPin, FiMail, FiExternalLink } from 'react-icons/fi';

const METHODS = [
  {
    id: 'phone',
    Icon: FiPhone,
    title: 'Call Us',
    colorClass: 'bg-primary/10 text-primary',
    content: (
      <ul className="space-y-1.5 font-opensans text-gray-600 text-sm">
        <li>
          <a
            href="tel:04235312350"
            className="hover:text-primary hover:underline transition-colors duration-200"
          >
            Main: 042-35312350
          </a>
        </li>
        <li>
          <a
            href="tel:04235316605"
            className="hover:text-primary hover:underline transition-colors duration-200"
          >
            Support: 042-35316605
          </a>
        </li>
        <li className="text-gray-400 text-xs mt-2">Hours: 10:00 AM – 2:00 AM daily</li>
      </ul>
    ),
  },
  {
    id: 'location',
    Icon: FiMapPin,
    title: 'Visit Us',
    colorClass: 'bg-primary/10 text-primary',
    content: (
      <div className="space-y-2 font-opensans text-gray-600 text-sm">
        <p>Main Boulevard, Johar Town, Lahore</p>
        <p className="text-gray-400 text-xs">Head Office (20+ branches across Lahore)</p>
        <Link
          to="/branches"
          className="inline-flex items-center gap-1 text-primary font-semibold text-sm hover:underline mt-1"
        >
          View All Branches <FiExternalLink size={12} aria-hidden="true" />
        </Link>
      </div>
    ),
  },
  {
    id: 'email',
    Icon: FiMail,
    title: 'Email Us',
    colorClass: 'bg-primary/10 text-primary',
    content: (
      <ul className="space-y-1.5 font-opensans text-gray-600 text-sm">
        <li>
          <a
            href="mailto:info@yasirbroast.com"
            className="hover:text-primary hover:underline transition-colors duration-200"
          >
            info@yasirbroast.com
          </a>
        </li>
        <li>
          <a
            href="mailto:feedback@yasirbroast.com"
            className="hover:text-primary hover:underline transition-colors duration-200"
          >
            feedback@yasirbroast.com
          </a>
        </li>
        <li className="text-gray-400 text-xs mt-2">Response within 24 hours</li>
      </ul>
    ),
  },
];

/**
 * ContactInfoCards
 * Three info cards displayed in a responsive 1→3 column grid.
 */
export default function ContactInfoCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {METHODS.map(({ id, Icon, title, colorClass, content }) => (
        <div
          key={id}
          className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-300"
        >
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
            <Icon size={22} aria-hidden="true" />
          </div>

          {/* Title */}
          <h3 className="font-montserrat font-extrabold text-charcoal text-lg">
            {title}
          </h3>

          {/* Details */}
          {content}
        </div>
      ))}
    </div>
  );
}
