import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-[#0b0b0b] px-5 text-white">
      <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
        404 Error
      </p>
      <h1 className="text-6xl font-bold md:text-8xl">404</h1>
      <p className="mt-4 max-w-md text-center text-sm leading-6 text-gray-400">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
      >
        Back to Home
      </Link>
    </section>
  );
}
