const INFO_ITEMS = [
  {
    icon: '✅',
    label: 'Halal Certified',
    detail: 'All our meat is sourced from certified Halal suppliers.',
  },
  {
    icon: '🌿',
    label: 'Fresh Ingredients',
    detail: 'We source produce daily to ensure maximum freshness.',
  },
  {
    icon: '🎨',
    label: 'No Artificial Colors',
    detail: 'Natural spices and herbs — nothing artificial, ever.',
  },
  {
    icon: '🔥',
    label: 'Made to Order',
    detail: 'Every dish is freshly prepared when you place your order.',
  },
];

export default function DietaryInfo() {
  return (
    <section
      aria-label="Dietary information"
      className="mt-14 mb-4 bg-lightgray rounded-2xl px-6 py-8"
    >
      <h2 className="font-montserrat font-extrabold text-charcoal text-xl text-center mb-6">
        Our Promise to You
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {INFO_ITEMS.map(({ icon, label, detail }) => (
          <div
            key={label}
            className="flex flex-col items-center text-center gap-2 bg-white rounded-xl px-4 py-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <span className="text-3xl" aria-hidden="true">{icon}</span>
            <p className="font-montserrat font-bold text-charcoal text-sm">{label}</p>
            <p className="font-opensans text-gray-400 text-xs leading-snug">{detail}</p>
          </div>
        ))}
      </div>

      <p className="font-opensans text-gray-400 text-xs text-center mt-5">
        For full nutritional information, please ask at your nearest branch or contact us at{' '}
        <a href="/contact" className="text-primary hover:underline font-semibold">
          our contact page
        </a>
        .
      </p>
    </section>
  );
}
