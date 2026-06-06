import Link from "next/link";
import cars from "@/data/cars";

export default async function CarDetailsPage({ params }) {
  const { id } = await params;

  //  apdpotto mock data, later we do actual api call to fetch car details by id
  const car = cars.find((item) => item.id === id);

  if (!car) {
    return (
      <section className="min-h-screen bg-[#0b0b0b] py-20 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-4xl font-bold">Car not found</h1>
          <p className="mt-4 text-gray-400">
            The car you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/explore"
            className="mt-8 inline-flex rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
          >
            Back to Explore Cars
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#0b0b0b] py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
              <img
                src={car.image}
                alt={car.name}
                className="h-[420px] w-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-lime-400 px-4 py-1 text-xs font-semibold text-black">
                {car.status}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-1 text-xs font-medium text-gray-300">
                {car.type}
              </span>
            </div>

            <h1 className="text-4xl font-bold md:text-5xl">{car.name}</h1>

              <p className="mt-4 text-lg leading-relaxed text-gray-400">
                {car.description}
              </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Price
                </p>
                <h3 className="mt-2 text-lg font-semibold text-lime-400">
                  ${car.price}/day
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Seats
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {car.seats} Seats
                </h3>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Location
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  {car.location}
                </h3>
              </div>
            </div>

            {car.description && (
              <div className="mt-8 rounded-2xl border border-white/10 bg-[#111111] p-6">
                <h2 className="text-xl font-semibold text-white">Description</h2>
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {car.description}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300">
                Book Now
              </button>

              <Link
                href="/explore"
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/5"
              >
                Back to Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
