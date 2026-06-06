"use client";

import { useMemo, useState } from "react";
import CarCards from "@/components/CarCards";
import cars from "@/data/cars";

export default function ExploreCarsPage() {
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const carTypes = ["All", ...new Set(cars.map((car) => car.type))];

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name
        .toLowerCase()
        .includes(searchText.toLowerCase());

      const matchesType = selectedType === "All" || car.type === selectedType;

      return matchesSearch && matchesType;
    });
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
              {carTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredCars.map((car) => (
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
