/**
 * StorySection
 * Two-column layout: story text on the left, restaurant image on the right.
 * Columns reverse to stack (image on top) on mobile.
 */
export default function StorySection() {
  return (
    <section aria-labelledby="story-heading" className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Text ─────────────────────────────────────────────── */}
          <div className="flex-1 max-w-prose">
            <span className="inline-block font-montserrat font-bold text-sm text-primary uppercase tracking-widest mb-3">
              Est. 1995
            </span>
            <h2
              id="story-heading"
              className="font-montserrat font-extrabold text-charcoal text-3xl sm:text-4xl leading-tight mb-6"
            >
              The Yasir Broast Story
            </h2>

            <div className="space-y-5 font-opensans text-gray-600 text-base leading-relaxed">
              <p>
                What began as a modest broast shop in the heart of Lahore has grown into the city's
                most loved fast-food destination. In 1995, Yasir Mahmood opened the first stall with
                a single vision: serve the crispiest, juiciest broast in town at a price every family
                could afford. Word spread quickly, and within a decade the brand had expanded to
                multiple branches across the city.
              </p>
              <p>
                Our commitment to quality has never wavered. We source fresh chicken daily, use
                locally grown produce, and follow the same time-tested recipes that made us famous —
                no shortcuts, no artificial flavors, no compromises. Every dish is prepared in a
                hygienic kitchen under the supervision of experienced chefs.
              </p>
              <p>
                More than food, Yasir Broast is a place for families and friends to gather. Whether
                you are celebrating a birthday, enjoying a late-night bite, or simply craving
                Lahore's finest broast, our doors are open — from 10 AM right through to 2 AM,
                every single day.
              </p>
            </div>

            {/* Decorative accent underline */}
            <div className="mt-8 w-16 h-1 bg-gold rounded-full" aria-hidden="true" />
          </div>

          {/* ── Image ────────────────────────────────────────────── */}
          <div className="flex-1 w-full lg:max-w-lg">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80&auto=format&fit=crop"
                alt="Inside the Yasir Broast restaurant — a warm, welcoming dining environment"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Gold badge overlay */}
              <div className="absolute bottom-4 left-4 bg-gold text-charcoal font-montserrat font-extrabold text-sm px-4 py-2 rounded-xl shadow-lg">
                Since 1995 🍗
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
