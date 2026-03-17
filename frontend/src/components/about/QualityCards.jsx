import { FiStar, FiShield, FiBookOpen } from 'react-icons/fi';

const CARDS = [
  {
    id: 1,
    Icon: FiStar,
    title: 'Fresh Ingredients',
    description:
      'We receive fresh chicken and locally sourced produce every morning. No frozen shortcuts — only the best raw ingredients make it to your plate.',
  },
  {
    id: 2,
    Icon: FiShield,
    title: 'Hygienic Kitchen',
    description:
      'Our kitchens follow strict food-safety protocols. Regular deep cleans, temperature-controlled storage, and fully trained staff ensure every meal is safe to eat.',
  },
  {
    id: 3,
    Icon: FiBookOpen,
    title: 'Traditional Recipes',
    description:
      'The secret is in the marinade — a family recipe perfected over 25+ years. Same spices, same technique, same unforgettable taste at every single branch.',
  },
];

export default function QualityCards() {
  return (
    <section
      aria-labelledby="quality-heading"
      className="py-16 bg-light-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="quality-heading"
            className="font-montserrat font-extrabold text-charcoal text-3xl sm:text-4xl mb-3"
          >
            Our Commitment to Quality
          </h2>
          <p className="font-opensans text-gray-500 text-base max-w-xl mx-auto">
            Three pillars that have made Yasir Broast Lahore's most trusted name in broast and Pakistani cuisine.
          </p>
          {/* Gold underline accent */}
          <div className="mx-auto mt-4 w-16 h-1 bg-gold rounded-full" aria-hidden="true" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {CARDS.map(({ id, Icon, title, description }) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center transition-shadow duration-300 hover:shadow-xl"
            >
              {/* Icon bubble */}
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <Icon className="text-primary" size={26} aria-hidden="true" />
              </div>
              <h3 className="font-montserrat font-extrabold text-charcoal text-lg mb-3">
                {title}
              </h3>
              <p className="font-opensans text-gray-500 text-sm leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
