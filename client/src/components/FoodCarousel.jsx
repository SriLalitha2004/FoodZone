import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import './FoodCarousel.css';

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
    <div className="food-carousel-container">
      <h1 className="food-carousel-header">
        <span className="food-carousel-highlight">Sri</span>, what's on your mind?
      </h1>

      <div className="carousel-wrapper">
        <button
          onClick={() => scroll("left")}
          className="carousel-button left"
        >
          <ChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="carousel-items"
        >
          {foodItems.map((item, idx) => (
            <div
              key={idx}
              className="carousel-item"
            >
              <img
                src={item.image}
                alt={item.name}
                className="carousel-image"
              />
              <p className="carousel-item-name">{item.name}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="carousel-button right"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
