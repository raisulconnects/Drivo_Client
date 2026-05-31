import CarCard from "@/components/CarCards";
import Link from "next/link";

// Using mock data for now, later will use api when the backend is made
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
    status: "Available",
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
];

export default function AvailableCarsSection() {
  return (
    <section className="bg-[#0b0b0b] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
              Available Cars
            </p>
            <h2 className="max-w-2xl text-3xl font-bold text-white md:text-4xl">
              Explore top picks ready for your next ride
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400 md:text-base">
              Browse a selection of premium, comfortable, and high-performance
              vehicles available for booking right now.
            </p>
          </div>

          <Link
            href="/explore"
            className="inline-flex w-fit items-center rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white transition hover:border-lime-400 hover:text-lime-400"
          >
            See All Cars
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
