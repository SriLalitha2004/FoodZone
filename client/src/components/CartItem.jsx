import React, { useContext } from "react";
import { BsPlusSquare, BsDashSquare } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import CartContext from "../context/CartContext";
import './CartItem.css';

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
    <div className="cart-item-container">
      <img src={foodImage} alt={foodName} className="cart-item-image" />
      
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h1 className="cart-item-name">{foodName}</h1>
          <span className={`cart-item-category ${category === "Veg" ? "veg" : "non-veg"}`}>
            {category}
          </span>
        </div>

        <div className="cart-item-quantity">
          <button onClick={onClickDecreaseQuantity} className="quantity-button">
            <BsDashSquare className="quantity-icon" size={20} />
          </button>
          <span className="quantity-text">{quantity}</span>
          <button onClick={onClickIncreaseQuantity} className="quantity-button">
            <BsPlusSquare className="quantity-icon" size={20} />
          </button>
        </div>

        <div className="cart-item-footer">
          <p className="cart-item-price">Rs {price * quantity}/-</p>
          <button onClick={onClickDeleteButton} className="remove-item-button">
            Remove
          </button>
        </div>
      </div>

      <button onClick={onClickDeleteButton} className="close-button">
        <AiFillCloseCircle className="close-icon" size={24} />
      </button>
    </div>
  );
};

export default CartItem;
