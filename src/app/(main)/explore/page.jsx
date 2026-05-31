"use client";

import { useMemo, useState } from "react";
import CarCards from "@/components/CarCards";

// Apadoto using mock data, after BE gets ready we use api and also make search server sided
const cars = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    name: "BMW M4 Coupe",
    type: "Sports",
    location: "Dhaka",
    seats: 4,
    price: 120,
    status: "Available",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
    name: "Tesla Model 3",
    type: "Electric",
    location: "Chattogram",
    seats: 5,
    price: 95,
    status: "Available",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1200&auto=format&fit=crop",
    name: "Toyota Prado",
    type: "SUV",
    location: "Sylhet",
    seats: 7,
    price: 110,
    status: "Available",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1200&auto=format&fit=crop",
    name: "Mercedes C-Class",
    type: "Sedan",
    location: "Dhaka",
    seats: 5,
    price: 105,
    status: "Unavailable",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop",
    name: "Audi Q7",
    type: "Luxury SUV",
    location: "Rajshahi",
    seats: 7,
    price: 140,
    status: "Available",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop",
    name: "Honda Civic",
    type: "Sedan",
    location: "Khulna",
    seats: 5,
    price: 75,
    status: "Available",
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1200&auto=format&fit=crop",
    name: "Ford Mustang",
    type: "Sports",
    location: "Dhaka",
    seats: 4,
    price: 130,
    status: "Available",
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=1200&auto=format&fit=crop",
    name: "Nissan X-Trail",
    type: "SUV",
    location: "Barishal",
    seats: 7,
    price: 90,
    status: "Unavailable",
  },
];

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
      </div>
    </section>
  );
}
