"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function CarDetailsPage() {
  const { id } = useParams();
  const { data: session } = useSession();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Backend theke specific car fetch korchi ID diye
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:2531/cars/get-car/${id}`);
        const data = await res.json();
        if (res.ok) setCar(data.car);
      } catch (error) {
        console.error("Failed to fetch car:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  // Booking submit — POST request pathai backend e
  const handleBookNow = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error("Please log in to book a car");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:2531/bookings/add-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: id,
          userId: session.user.id,
          driverNeeded,
          specialNote,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Car booked successfully!");
      setShowBookingModal(false);
      setDriverNeeded(false);
      setSpecialNote("");
    } catch (error) {
      toast.error(error?.message || "Failed to book car");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#0b0b0b]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-lime-400 border-t-transparent" />
      </section>
    );
  }

  if (!car) {
    return (
      <section className="min-h-screen bg-[#0b0b0b] py-20 text-white">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-4xl font-bold">Car not found</h1>
          <p className="mt-4 text-gray-400">
            The car you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/explore"
            className="mt-8 inline-flex rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
          >
            Back to Explore Cars
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="min-h-screen bg-[#0b0b0b] py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
                <img
                  src={car.image}
                  alt={car.name}
                  className="h-[420px] w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-lime-400 px-4 py-1 text-xs font-semibold text-black">
                  {car.status}
                </span>
                <span className="rounded-full border border-white/10 px-4 py-1 text-xs font-medium text-gray-300">
                  {car.type}
                </span>
              </div>

              <h1 className="text-4xl font-bold md:text-5xl">{car.name}</h1>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Price
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-lime-400">
                    ${car.price}/day
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Seats
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {car.seats} Seats
                  </h3>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#111111] p-4">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Location
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {car.location}
                  </h3>
                </div>
              </div>

              {car.description && (
                <div className="mt-8 rounded-2xl border border-white/10 bg-[#111111] p-6">
                  <h2 className="text-xl font-semibold text-white">
                    Description
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-gray-400">
                    {car.description}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <button
                  onClick={() => {
                    if (!session?.user?.id) {
                      toast.error("Please log in to book a car");
                      return;
                    }
                    setShowBookingModal(true);
                  }}
                  className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
                >
                  Book Now
                </button>

                <Link
                  href="/explore"
                  className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/5"
                >
                  Back to Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
                  Book This Car
                </p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  {car.name}
                </h2>
              </div>
              <button
                onClick={() => setShowBookingModal(false)}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="mb-6 rounded-2xl border border-white/10 bg-[#0b0b0b] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Daily Rate</span>
                <span className="text-lg font-bold text-lime-400">
                  ${car.price}/day
                </span>
              </div>
            </div>

            <form onSubmit={handleBookNow} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Driver Needed
                </label>
                <div className="flex gap-4">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
                    <input
                      type="radio"
                      name="driverNeeded"
                      checked={driverNeeded === true}
                      onChange={() => setDriverNeeded(true)}
                      className="accent-lime-400"
                    />
                    Yes
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
                    <input
                      type="radio"
                      name="driverNeeded"
                      checked={driverNeeded === false}
                      onChange={() => setDriverNeeded(false)}
                      className="accent-lime-400"
                    />
                    No
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Special Note
                </label>
                <textarea
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder="Any special requests..."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
