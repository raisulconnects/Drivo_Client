"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function MyBookingsPage() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logged in user er bookings fetch korchi
  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.user?.id) {
        setBookings([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:2531/bookings/get-my-bookings?userId=${session.user.id}`
        );
        const data = await res.json();
        if (res.ok) setBookings(data.bookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [session]);

  return (
    <section className="min-h-screen bg-[#0b0b0b] py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
            My Bookings
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Your rental bookings
          </h1>
          <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
            View all your booked cars and rental details.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-lime-400 border-t-transparent" />
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-lime-400/30"
              >
                <div className="relative">
                  <img
                    src={booking.carImage}
                    alt={booking.carName}
                    className="h-48 w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black">
                    {booking.status}
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  <h3 className="text-xl font-semibold text-white">
                    {booking.carName}
                  </h3>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Total Price</span>
                    <span className="text-lg font-bold text-lime-400">
                      ${booking.dailyPrice}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Booking Date</span>
                    <span className="text-white">
                      {new Date(booking.bookingDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Driver</span>
                    <span className="text-white">
                      {booking.driverNeeded ? "Yes" : "No"}
                    </span>
                  </div>

                  {booking.specialNote && (
                    <p className="text-sm italic text-gray-500">
                      &ldquo;{booking.specialNote}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No bookings yet
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              You haven&apos;t booked any cars yet. Start exploring!
            </p>
            <Link
              href="/explore"
              className="mt-6 inline-flex rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
            >
              Explore Cars
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
