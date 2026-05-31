import {
  FaCarSide,
  FaRegClock,
  FaShieldAlt,
  FaMapMarkedAlt,
} from "react-icons/fa";

// ekhane features section er data gula define kora hoise, jekhane prottek feature er id, icon, title, and description ache. Inspiration was taken from a themeforest car website
const features = [
  {
    id: 1,
    icon: <FaCarSide className="text-2xl text-lime-400" />,
    title: "Wide Range of Cars",
    description:
      "Choose from premium sedans, SUVs, sports cars, and practical daily rides for every type of journey.",
  },
  {
    id: 2,
    icon: <FaRegClock className="text-2xl text-lime-400" />,
    title: "Fast & Easy Booking",
    description:
      "Book your preferred car in just a few steps with a smooth and simple rental experience.",
  },
  {
    id: 3,
    icon: <FaShieldAlt className="text-2xl text-lime-400" />,
    title: "Trusted & Secure",
    description:
      "Enjoy a reliable platform with verified listings, secure access, and dependable service.",
  },
  {
    id: 4,
    icon: <FaMapMarkedAlt className="text-2xl text-lime-400" />,
    title: "Flexible Pickup Locations",
    description:
      "Find cars across multiple locations so you can rent what you need, where you need it.",
  },
];

export default function WhyChooseDrivo() {
  return (
    <section className="bg-[#0f0f0f] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
            Why Choose Drivo
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            A smarter and smoother way to rent cars
          </h2>
          <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
            Drivo is built to make car rental simple, modern, and reliable —
            whether you need a ride for business, travel, or everyday use.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="rounded-2xl border border-white/10 bg-[#111111] p-6 transition hover:-translate-y-1 hover:border-lime-400/30"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="text-sm leading-6 text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
