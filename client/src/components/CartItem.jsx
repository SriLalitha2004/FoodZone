import React, { useContext } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import CartContext from "../context/CartContext";

const CartItem = ({ cartItemDetails }) => {
  const { foodName, foodImage, category, price, quantity, id } = cartItemDetails;
  const { deleteCartItem, increaseQuantity, decreaseQuantity } = useContext(CartContext);

  const onClickDeleteButton = () => {
    deleteCartItem(id);
    console.log(`Product Deleted ${id}`);
  };

  const onClickDecreaseQuantity = () => {
    if (quantity > 1) {
      decreaseQuantity(id);
    } else {
      deleteCartItem(id); // If quantity = 1, removing means deleting item
    }
  };

  const onClickIncreaseQuantity = () => {
    if (quantity < 10) {
      increaseQuantity(id);
    }
  };

  return (
    <div className="flex items-center border-b py-4 px-2 relative">
      <img src={foodImage} alt={foodName} className="w-24 h-24 object-cover rounded-md" />
      
      <div className="flex flex-col flex-grow ml-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">{foodName}</h1>
          <span className={`text-sm px-2 py-1 rounded-full ${category === "Veg" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {category}
          </span>
        </div>

        <div className="flex items-center mt-2">
          <button onClick={onClickDecreaseQuantity} className="p-1">
            <BsDashSquare className="text-gray-600 hover:text-red-600 transition" size={20} />
          </button>
          <span className="mx-2 font-semibold">{quantity}</span>
          <button onClick={onClickIncreaseQuantity} className="p-1">
            <BsPlusSquare className="text-gray-600 hover:text-green-600 transition" size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-800 font-medium">Rs {price * quantity}/-</p>
          <button onClick={onClickDeleteButton} className="text-red-500 text-sm underline hover:text-red-700 transition">
            Remove
          </button>
        </div>
      </div>

      <button onClick={onClickDeleteButton} className="absolute top-2 right-2">
        <AiFillCloseCircle className="text-gray-500 hover:text-red-600 transition" size={24} />
      </button>
    </div>
  );
};

export default CartItem;
