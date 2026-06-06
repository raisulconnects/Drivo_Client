// eita use kortesi as I started with Frontend Dev first, BE ready hole actual api use korbo but i'll still keep the mock data here

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
    description:
      "A powerful sports coupe with a twin-turbo inline-six engine, delivering 473 horsepower and a thrilling driving experience. Perfect for enthusiasts who crave performance.",
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
    description:
      "An all-electric sedan with minimalist design, impressive range, and autopilot capabilities. Ideal for eco-conscious drivers who don't want to compromise on technology.",
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
    description:
      "A rugged full-size SUV with off-road capability and spacious 7-seater interior. Built for families who love adventure and need reliability on any terrain.",
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
    description:
      "A refined luxury sedan with a plush interior, smooth ride, and advanced safety features. Great for business professionals and executive travel.",
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
    description:
      "A premium luxury SUV combining opulent comfort with powerful performance. Features a stunning interior, advanced infotainment, and commanding road presence.",
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
    description:
      "A reliable and fuel-efficient sedan, perfect for daily commutes and city driving. Known for its durability, low maintenance, and comfortable cabin.",
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
    description:
      "An iconic American muscle car with a roaring V8 engine and bold styling. Built for those who want raw power, head-turning looks, and an unforgettable drive.",
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
    description:
      "A versatile compact SUV offering ample cargo space, comfortable seating for seven, and excellent fuel economy. Ideal for weekend getaways and family trips.",
  },
];

export default cars;
