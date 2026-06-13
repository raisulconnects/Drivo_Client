# 🚗 Drivo — Car Rental Platform

A full-stack car rental platform where users can explore available cars, view details, rent vehicles, manage bookings, and add/update/delete their own car listings. Built with Next.js, Tailwind CSS, Express, MongoDB, and Better Auth.

## 🌐 Live Site

[Add your live site URL here]

## ✨ Features

- **Explore & Search Cars** — Browse all listed cars, search by name using MongoDB `$regex`, and filter by car type
- **Book a Car** — Logged-in users can book cars with driver preference and special notes; booking count incremented via `$inc`
- **Add & Manage Listings** — Users can add their own cars, update details (price, description, status, etc.), and delete listings with confirmation
- **Secure Authentication** — Email/password and Google login powered by Better Auth with JWT stored in HTTPOnly cookies
- **My Bookings Dashboard** — View all bookings with car name, price snapshot, booking date, and driver status
- **Responsive Dark UI** — Modern dark-themed interface built with Tailwind CSS, fully responsive across mobile, tablet, and desktop

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS, react-hot-toast
- **Backend:** Express.js, MongoDB (native driver)
- **Authentication:** Better Auth (email/password + Google OAuth)
- **Styling:** Tailwind CSS with custom dark theme

## 🚀 Run Locally

```bash
# Client
cd drivo-client
npm install
npm run dev

# Server
cd drivo-backend
npm install
npm start
```

Make sure MongoDB is running locally on `mongodb://localhost:27017`.
