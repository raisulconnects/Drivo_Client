"use client";

import { authClient, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Explore Cars", path: "/explore" },
  { name: "Add Car", path: "/add-car" },
  { name: "My Bookings", path: "/my-bookings" },
  { name: "My Added Cars", path: "/my-cars" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data, isPending } = useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0b0b]/90 backdrop-blur supports-[backdrop-filter]:bg-[#0b0b0b]/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white transition hover:text-lime-400"
        >
          Drivo
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm font-medium transition ${
                  isActive ? "text-lime-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="rounded-lg border border-white/10 px-4 py-2 text-sm text-white">
              Loading...
            </div>
          ) : data?.user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-gray-300 md:block">
                Welcome,{" "}
                <span className="font-medium text-white">{data.user.name}</span>
              </span>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-200 transition hover:border-white/20 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-lg bg-lime-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-lime-300"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
