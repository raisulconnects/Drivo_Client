"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase)
      return "Password must contain at least one uppercase letter.";
    if (!hasLowercase)
      return "Password must contain at least one lowercase letter.";
    if (!hasMinLength) return "Password must be at least 6 characters long.";

    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const passwordError = validatePassword(user.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    setLoading(true);
    // console.log("[register] Attempting registration for:", user.email);

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.photoURL,
    });

    if (error) {
      toast.error(error.message || "Registration failed.");
      setLoading(false);
      return;
    }

    if (data) {
      toast.success("Registration successful!");
      router.push("/");
    }
  };

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

        <form className="space-y-5" onSubmit={handleRegister}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Photo URL
            </label>
            <input
              type="text"
              name="photoURL"
              value={user.photoURL}
              onChange={handleChange}
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
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
            />
            <p className="mt-2 text-xs leading-5 text-center text-white">
              Password must contain at least one uppercase letter, one lowercase
              letter, and be at least 6 characters long.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Registering..." : "Register"}
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
          onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}
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
