"use client";

import { useEffect, useState } from "react";
import CarCards from "@/components/CarCards";

// Available car types — hardcoded kore dilam cause eita fixed
const CAR_TYPES = ["All", "Sports", "Electric", "SUV", "Sedan", "Luxury SUV"];

export default function ExploreCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // Backend theke car fetch korchi — search/type change hole abar fetch korchi
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchText) params.set("search", searchText);
        if (selectedType !== "All") params.set("type", selectedType);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}cars/get-cars?${params.toString()}`
        );
        const data = await res.json();
        if (res.ok) setCars(data.cars);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [searchText, selectedType]);

  return (
    <section className="min-h-screen bg-[#0b0b0b] py-16 text-white md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
            Explore Cars
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            Find the right car for your next journey
          </h1>
          <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
            Browse all listed cars, search by name, and filter by type to find
            your perfect ride.
          </p>
        </div>

        <div className="mb-10 grid gap-4 rounded-2xl border border-white/10 bg-[#111111] p-5 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Search by car name
            </label>
            <input
              type="text"
              placeholder="Search cars..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Filter by type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition focus:border-lime-400"
            >
              {CAR_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-lime-400 border-t-transparent" />
          </div>
        ) : cars.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {cars.map((car) => (
              <CarCards key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">No cars found</h3>
            <p className="mt-3 text-sm text-gray-400">
              Try changing your search text or selecting a different car type.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
