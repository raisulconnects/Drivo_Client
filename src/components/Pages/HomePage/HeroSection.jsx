import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#0b0b0b] text-white">
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:py-24">
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-lime-400/20 bg-lime-400/10 px-4 py-1 text-sm font-medium text-lime-400">
            Premium Car Rental Experience
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            Rent the perfect car for every road, trip, and moment.
          </h1>

          <p className="max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Drivo helps you explore top-quality cars, book with ease, and manage
            rentals in a smooth modern experience built for speed and
            simplicity.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/explore"
              className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
            >
              Explore Cars
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Featured Ride</p>
                <h3 className="mt-1 text-2xl font-semibold text-white">
                  Lamborghini Huracan
                </h3>
              </div>
              <span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black">
                Available
              </span>
            </div>

            <div className="rounded-2xl">
              <Image
                src="https://res.cloudinary.com/unix-center/image/upload/c_limit,dpr_3.0,f_auto,fl_progressive,g_center,h_580,q_75,w_906/tnt1sdreuccr9iqjyewf.jpg"
                alt="car"
                width={906}
                height={580}
                className="rounded-2xl object-cover"
              />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="rounded-2xl bg-[#161616] p-4 text-center">
                <p className="text-xs text-gray-400">Type</p>
                <h4 className="mt-1 text-sm font-semibold text-white">
                  Sports
                </h4>
              </div>
              <div className="rounded-2xl bg-[#161616] p-4 text-center">
                <p className="text-xs text-gray-400">Seats</p>
                <h4 className="mt-1 text-sm font-semibold text-white">2</h4>
              </div>
              <div className="rounded-2xl bg-[#161616] p-4 text-center">
                <p className="text-xs text-gray-400">Price</p>
                <h4 className="mt-1 text-sm font-semibold text-lime-400">
                  $220/day
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
