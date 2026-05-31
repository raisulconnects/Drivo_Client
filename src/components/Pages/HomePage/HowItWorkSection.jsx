import { FaSearch, FaCarSide, FaCalendarCheck } from "react-icons/fa";

// Object e rakhsi jate map kore show kora jabe
const steps = [
  {
    id: 1,
    icon: <FaSearch className="text-2xl text-lime-400" />,
    title: "Explore Cars",
    description:
      "Browse available vehicles by type, location, price, and features to find the right match for your trip.",
  },
  {
    id: 2,
    icon: <FaCarSide className="text-2xl text-lime-400" />,
    title: "View Details",
    description:
      "Check car specs, daily rent, availability, seating, and pickup information before making a booking.",
  },
  {
    id: 3,
    icon: <FaCalendarCheck className="text-2xl text-lime-400" />,
    title: "Book Instantly",
    description:
      "Submit your booking request in a few clicks and manage everything from your bookings dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#0b0b0b] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
            How It Works
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Rent your next car in three simple steps
          </h2>
          <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
            Drivo keeps the process quick and smooth so you can go from browsing
            to booking without any friction.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-2xl border border-white/10 bg-[#111111] p-6 transition hover:-translate-y-1 hover:border-lime-400/30"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10">
                {step.icon}
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-black">
                  {step.id}
                </span>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
              </div>

              <p className="text-sm leading-6 text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}