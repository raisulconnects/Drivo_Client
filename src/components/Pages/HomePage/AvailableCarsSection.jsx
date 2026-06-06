import CarCard from "@/components/CarCards";
import Link from "next/link";
import cars from "@/data/cars";

export default function AvailableCarsSection() {
  return (
    <section className="bg-[#0b0b0b] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
              Available Cars
            </p>
            <h2 className="max-w-2xl text-3xl font-bold text-white md:text-4xl">
              Explore top picks ready for your next ride
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
              Browse a selection of premium, comfortable, and high-performance
              vehicles available for booking right now.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex w-fit items-center rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-lime-400 hover:text-lime-400"
          >
            See All Cars
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car, i) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
