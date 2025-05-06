import { useContext } from "react";
import CartItem from "./CartItem";
import CartContext from "../context/CartContext";
import './CartListView.css';

const CartListView = () => {
  const { cartList } = useContext(CartContext);

  return (
    <div className="cart-list-container">
      <ul className="cart-item-list">
        {cartList.map((eachItem) => (
          <CartItem key={eachItem.id} cartItemDetails={eachItem} />
        ))}
      </ul>  
    </div>
  );
};

export default CartListView;
