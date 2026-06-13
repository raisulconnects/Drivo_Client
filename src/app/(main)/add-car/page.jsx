"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useSession, authClient } from "@/lib/auth-client";

// Form er initial state — ekhane shob field define kora hoise
const initialForm = {
  name: "",
  type: "",
  location: "",
  seats: "",
  price: "",
  image: "",
  description: "",
  status: "Available",
};

export default function AddCarPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  // Logged-in user er session — Better Auth theke directly paisi
  const { data: session } = useSession();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Backend e POST request pathano — car add korar jonno
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch("http://localhost:2531/cars/add-car", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ...form,
          seats: Number(form.seats),
          price: Number(form.price),
          addedBy: session?.user?.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Car added successfully!");
      setForm(initialForm);
    } catch (error) {
      toast.error(error?.message || "Failed to add car.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#0b0b0b] py-16 text-white md:py-24">
      <div className="mx-auto max-w-2xl px-5">
        {/* page header — same pattern as explore & auth pages */}
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
            Add Car
          </p>
          <h1 className="text-4xl font-bold md:text-5xl">
            List your car on Drivo
          </h1>
          <p className="mt-4 text-sm leading-6 text-gray-400 md:text-base">
            Fill in the details below to add a new car to your listing. You can
            manage and update it later from your dashboard.
          </p>
        </div>

        {/* form card — same elevated card style as login/register */}
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Car Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Car Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. BMW M4 Coupe"
                required
                className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
              />
            </div>

            {/* 2-column grid: Type + Seats */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Car Type
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition focus:border-lime-400"
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="Sports">Sports</option>
                  <option value="Electric">Electric</option>
                  <option value="SUV">SUV</option>
                  <option value="Sedan">Sedan</option>
                  <option value="Luxury SUV">Luxury SUV</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Seats
                </label>
                <input
                  type="number"
                  name="seats"
                  value={form.seats}
                  onChange={handleChange}
                  placeholder="e.g. 5"
                  min="1"
                  max="9"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
                />
              </div>
            </div>

            {/* 2-column grid: Location + Price */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Price per Day ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="e.g. 120"
                  min="1"
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
                />
              </div>
            </div>

            {/* Image URL with live preview */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Car Image URL
              </label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                required
                className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
              />
            </div>

            {form.image && (
              <div className="overflow-hidden rounded-xl border border-white/10">
                <img
                  src={form.image}
                  alt="Car preview"
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your car — condition, features, driving experience..."
                rows={4}
                required
                className="w-full resize-none rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition focus:border-lime-400"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Adding Car..." : "Add Car"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
