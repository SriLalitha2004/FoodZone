import { Link } from "react-router-dom";

const EmptyCartView = () => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
    <img
      src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
      alt="cart empty"
      className="w-64 h-64 object-contain mb-6"
    />
    <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Cart Is Empty</h1>
    <p className="text-gray-600 mb-6">You can go to home page to view more restaurants</p>
    <Link to="/">
      <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
        Order Now
      </button>
    </Link>
  </div>
);

export default EmptyCartView;
