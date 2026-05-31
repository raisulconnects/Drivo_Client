import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-5 py-16 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
            Create Account
          </p>
          <h1 className="text-3xl font-bold md:text-4xl">Join Drivo Today</h1>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            Create your account to explore cars, book rides, and manage your
            listings easily.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Photo URL
            </label>
            <input
              type="text"
              placeholder="Enter your photo URL"
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
            />
            <p className="mt-2 text-xs leading-5 text-gray-500">
              Password must contain at least one uppercase letter, one lowercase
              letter, and be at least 6 characters long.
            </p>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
          >
            Register
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Or
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <button
          type="button"
          className="w-full rounded-xl border border-white/10 bg-transparent px-5 py-3 text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/5"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-lime-400 hover:text-lime-300"
          >
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
