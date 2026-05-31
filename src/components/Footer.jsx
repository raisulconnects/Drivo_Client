import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Drivo
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
            A modern car rental platform to explore, book, and manage vehicles
            with ease.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Useful Links
          </h3>
          <div className="flex flex-col gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/explore" className="hover:text-white">
              Explore Cars
            </Link>
            <Link href="/add-car" className="hover:text-white">
              Add Car
            </Link>
            <Link href="/my-bookings" className="hover:text-white">
              My Bookings
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">
            Contact
          </h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>Email: support@drivo.com</p>
            <p>Phone: +880 1234-567890</p>
            <p>Location: Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-500">
        © 2026 Drivo. All rights reserved.
      </div>
    </footer>
  );
}
