import { useContext } from "react";
import CartItem from "./CartItem";
import CartContext from "../context/CartContext";

const CartListView = () => {
  const { cartList } = useContext(CartContext);

  return (
    <div className="p-4">
      <ul className="space-y-4">
        {cartList.map((eachItem) => (
          <CartItem key={eachItem.id} cartItemDetails={eachItem} />
        ))}
      </ul>  
    </div>
  );
};

export default CartListView;
