"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

export default function MyCarsPage() {
  const { data: session } = useSession();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logged in user er added cars fetch korchi
  useEffect(() => {
    const fetchMyCars = async () => {
      if (!session?.user?.id) {
        setCars([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:2531/cars/get-cars?addedBy=${session.user.id}`
        );
        const data = await res.json();
        if (res.ok) setCars(data.cars);
      } catch (error) {
        console.error("Failed to fetch my cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCars();
  }, [session]);

  // Delete button — actual logic pore add korbo
  const handleDelete = (carId) => {
    toast.success("Delete — will implement later");
  };

  // Update button — actual logic pore add korbo
  const handleUpdate = (carId) => {
    toast.success("Update — will implement later");
  };

  return (
    <section className="min-h-screen bg-[#0b0b0b] py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
            My Added Cars
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Cars you have listed
          </h1>
          <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
            Manage your car listings — update details or remove a listing.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-lime-400 border-t-transparent" />
          </div>
        ) : cars.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111] transition hover:-translate-y-1 hover:border-lime-400/30"
              >
                <div className="relative">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="h-56 w-full object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-lime-400 px-3 py-1 text-xs font-semibold text-black">
                    {car.status}
                  </span>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {car.name}
                      </h3>
                      <p className="text-sm text-gray-400">{car.type}</p>
                    </div>
                    <p className="text-lg font-bold text-lime-400">
                      ${car.price}/day
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{car.location}</span>
                    <span>{car.seats} Seats</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleUpdate(car.id)}
                      className="flex-1 rounded-xl bg-lime-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="flex-1 rounded-xl border border-red-500/50 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No cars added yet
            </h3>
            <p className="mt-3 text-sm text-gray-400">
              You haven&apos;t listed any cars. Start by adding one!
            </p>
            <Link
              href="/add-car"
              className="mt-6 inline-flex rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
            >
              Add a Car
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
