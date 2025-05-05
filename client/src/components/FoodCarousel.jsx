// File: components/FoodCarousel.js
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const foodItems = [
  { name: "Biryani", image: "/biryani.jpeg" },
  { name: "Idli", image: "/idli.jpeg" },
  { name: "Cake", image: "/cake.jpeg" },
  { name: "Noodles", image: "/noodles.jpeg" },
  { name: "Shawarma", image: "/shawarma.jpeg" },
  { name: "Pizza", image: "/pizza.jpeg" },
  { name: "Dosa", image: "/dosa.jpeg" },
  { name: "Bonda", image: "/bonda.jpeg" },
  { name: "Poori", image: "/poori.jpeg" },
  { name: "Vada", image: "/vada.jpeg" },
];

export default function FoodCarousel() {
  const scrollRef = useRef();

  const scroll = (direction) => {
    scrollRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full px-6 py-4 relative">
      <h1 className="text-2xl font-semibold mb-4">
        <span className="text-green-600">Sri</span>, what's on your mind?
      </h1>

      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 text-sm"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 scroll-smooth thin-scrollbar"
        >
          {foodItems.map((item, idx) => (
            <div
              key={idx}
              className="min-w-[120px] cursor-pointer flex flex-col items-center text-center hover:scale-105 transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-contain rounded-full"
              />
              <p className="mt-2 text-sm font-medium">{item.name}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 text-sm"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

