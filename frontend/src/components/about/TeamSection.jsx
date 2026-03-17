const TEAM = [
  {
    id: 1,
    name: 'Yasir Mahmood',
    role: 'Founder & CEO',
    bio: 'Started Yasir Broast with a vision to serve quality broast to every family in Lahore.',
    image: 'https://ui-avatars.com/api/?name=Yasir+Mahmood&background=C41E3A&color=fff&size=200',
  },
  {
    id: 2,
    name: 'Chef Rizwan',
    role: 'Head Chef',
    bio: '25 years of mastery in traditional Pakistani cuisine and signature broast preparation.',
    image: 'https://ui-avatars.com/api/?name=Chef+Rizwan&background=2D2D2D&color=FFD700&size=200',
  },
  {
    id: 3,
    name: 'Tariq Butt',
    role: 'Operations Manager',
    bio: 'Ensures consistent quality and seamless operations across all 20+ Lahore branches.',
    image: 'https://ui-avatars.com/api/?name=Tariq+Butt&background=C41E3A&color=fff&size=200',
  },
  {
    id: 4,
    name: 'Saba Noor',
    role: 'Customer Experience Lead',
    bio: 'Dedicated to making every customer visit memorable and every feedback count.',
    image: 'https://ui-avatars.com/api/?name=Saba+Noor&background=2D2D2D&color=FFD700&size=200',
  },
];

/**
 * TeamSection
 * Four team member cards with circular avatar images and center-aligned text.
 */
export default function TeamSection() {
  return (
    <section
      aria-labelledby="team-heading"
      className="py-16 bg-light-gray"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            id="team-heading"
            className="font-montserrat font-extrabold text-charcoal text-3xl sm:text-4xl mb-3"
          >
            Meet Our Team
          </h2>
          <p className="font-opensans text-gray-500 text-base max-w-xl mx-auto">
            The passionate people behind every perfectly fried piece of chicken.
          </p>
          <div className="mx-auto mt-4 w-16 h-1 bg-gold rounded-full" aria-hidden="true" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map(({ id, name, role, bio, image }) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            >
              {/* Circular avatar */}
              <img
                src={image}
                alt={`${name} — ${role} at Yasir Broast`}
                loading="lazy"
                className="w-24 h-24 rounded-full object-cover mb-4 ring-4 ring-primary/20"
              />
              <h3 className="font-montserrat font-extrabold text-charcoal text-base mb-0.5">
                {name}
              </h3>
              <p className="font-montserrat font-semibold text-primary text-xs uppercase tracking-wider mb-3">
                {role}
              </p>
              <p className="font-opensans text-gray-500 text-xs leading-relaxed">
                {bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
