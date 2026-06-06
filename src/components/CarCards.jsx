import Link from "next/link";

export default function CarCard({ car }) {
  const { id, image, name, type, location, seats, price, status, description } = car;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-lime-400/30">
      <div className="relative">
        <img src={image} alt={name} className="h-56 w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black">
          {status}
        </span>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-sm text-gray-400">{type}</p>
          </div>
          <p className="text-lg font-bold text-lime-400">${price}/day</p>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-gray-400">
          {description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{location}</span>
          <span>{seats} Seats</span>
        </div>

        <Link
          href={`/cars/${id}`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-lime-400 hover:text-black"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
