const STATS = [
  { id: 1, number: '20+',   label: 'Branches across Lahore' },
  { id: 2, number: '25+',   label: 'Years Serving Lahore'   },
  { id: 3, number: '50k+',  label: 'Happy Customers Monthly'},
  { id: 4, number: '4.5★',  label: 'Rating on Google'       },
];

/**
 * StatsSection
 * Four large-number stats on a light-gray background.
 */
export default function StatsSection() {
  return (
    <section
      aria-labelledby="stats-heading"
      className="py-16 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="stats-heading"
          className="sr-only"
        >
          Yasir Broast by the numbers
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ id, number, label }) => (
            <div key={id} className="flex flex-col items-center text-center">
              <span
                className="font-montserrat font-extrabold text-primary text-5xl leading-none mb-2"
                aria-label={`${number} ${label}`}
              >
                {number}
              </span>
              <span className="font-opensans text-gray-500 text-sm uppercase tracking-wider">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
