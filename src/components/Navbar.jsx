"use client";

import { useEffect, useRef, useState } from "react";
import { authClient, useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";

const publicLinks = [
  { name: "Home", path: "/" },
  { name: "Explore Cars", path: "/explore" },
];

const profileLinks = [
  { name: "Add Car", path: "/add-car" },
  { name: "My Bookings", path: "/my-bookings" },
  { name: "My Added Cars", path: "/my-cars" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data, isPending } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logged out successfully!");
        },
      },
    });
  };

  const initials =
    data?.user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

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
          {publicLinks.map((link) => {
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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#111111] px-3 py-2 text-sm text-white transition hover:border-white/20"
              >
                <img
                  src={
                    data.user.image && !avatarError
                      ? data.user.image
                      : "/avatar_icon.webp"
                  }
                  alt={data.user.name}
                  onError={() => setAvatarError(true)}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`h-4 w-4 text-gray-400 transition ${dropdownOpen ? "rotate-180" : ""}`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-52 rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-2xl">
                  <div className="border-b border-white/10 px-3 py-3">
                    <p className="text-sm font-medium text-white">
                      {data.user.name}
                    </p>
                    <p className="text-xs text-gray-400">{data.user.email}</p>
                  </div>

                  <div className="space-y-1 pt-2">
                    {profileLinks.map((link) => (
                      <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => setDropdownOpen(false)}
                        className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                          pathname === link.path
                            ? "bg-lime-400/10 text-lime-400"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 border-t border-white/10 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M1 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H1.75A.75.75 0 0 1 1 10Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
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
