"use client";

import { useEffect, useState } from "react";
import { useSession, authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";

// Editable fields er initial form — per spec: price, description, status, image, type, location
const initialEditForm = {
  price: "",
  description: "",
  status: "Available",
  image: "",
  type: "",
  location: "",
};

const CAR_TYPES = ["Sports", "Electric", "SUV", "Sedan", "Luxury SUV"];

export default function MyCarsPage() {
  const { data: session } = useSession();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update modal state
  const [editingCar, setEditingCar] = useState(null);
  const [editForm, setEditForm] = useState(initialEditForm);
  const [saving, setSaving] = useState(false);

  // Delete confirmation state
  const [deletingCarId, setDeletingCarId] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
          `${process.env.NEXT_PUBLIC_SERVER_URL}cars/get-cars?addedBy=${session.user.id}`
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

  // Update modal open korchi — form e current car data fill kore
  const handleOpenUpdate = (car) => {
    setEditForm({
      price: car.price,
      description: car.description,
      status: car.status,
      image: car.image,
      type: car.type,
      location: car.location,
    });
    setEditingCar(car);
  };

  // Update handle korchi — PUT request pathai
  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    if (!editingCar) return;

    setSaving(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}cars/update-car/${editingCar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(editForm),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // Local state update korchi — modal na thekeo UI reflect hobe
      setCars((prev) =>
        prev.map((c) => (c.id === editingCar.id ? data.car : c))
      );

      toast.success("Car updated successfully");
      setEditingCar(null);
    } catch (error) {
      toast.error(error?.message || "Failed to update car");
    } finally {
      setSaving(false);
    }
  };

  // Delete confirmation dialog open korchi
  const handleOpenDelete = (carId) => {
    setDeletingCarId(carId);
  };

  // Delete handle korchi — DELETE request pathai
  const handleConfirmDelete = async () => {
    if (!deletingCarId) return;

    setDeleting(true);
    try {
      const { data: tokenData } = await authClient.token();
      const token = tokenData?.token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}cars/delete-car/${deletingCarId}`,
        {
          method: "DELETE",
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // Local theke deleted car remove korchi
      setCars((prev) => prev.filter((c) => c.id !== deletingCarId));

      toast.success("Car deleted successfully");
      setDeletingCarId(null);
    } catch (error) {
      toast.error(error?.message || "Failed to delete car");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
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
                        onClick={() => handleOpenUpdate(car)}
                        className="flex-1 rounded-xl bg-lime-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-lime-300"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleOpenDelete(car.id)}
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

      {/* Update Modal */}
      {editingCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-lime-400">
                  Update Car
                </p>
                <h2 className="mt-1 text-2xl font-bold text-white">
                  {editingCar.name}
                </h2>
              </div>
              <button
                onClick={() => setEditingCar(null)}
                className="rounded-xl border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveUpdate} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Type
                  </label>
                  <select
                    name="type"
                    value={editForm.type}
                    onChange={(e) =>
                      setEditForm({ ...editForm, type: e.target.value })
                    }
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition focus:border-lime-400"
                  >
                    {CAR_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-300">
                    Price per Day ($)
                  </label>
                  <input
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    min="1"
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Location
                </label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) =>
                    setEditForm({ ...editForm, location: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Image URL
                </label>
                <input
                  type="url"
                  value={editForm.image}
                  onChange={(e) =>
                    setEditForm({ ...editForm, image: e.target.value })
                  }
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
                />
              </div>

              {editForm.image && (
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={editForm.image}
                    alt="Preview"
                    className="h-40 w-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  rows={3}
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-lime-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Status
                </label>
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-sm text-white outline-none transition focus:border-lime-400"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 rounded-xl bg-lime-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditingCar(null)}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:border-white/20 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deletingCarId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-5">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#111111] p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-white">Delete Car</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              Are you sure you want to delete this car? This action cannot be
              undone.
            </p>

            <div className="mt-8 flex gap-3">
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 rounded-xl bg-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
              <button
                onClick={() => setDeletingCarId(null)}
                disabled={deleting}
                className="flex-1 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-400 transition hover:border-white/20 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
