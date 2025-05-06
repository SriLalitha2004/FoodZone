import { Link } from "react-router-dom";
import './EmptyCartView.css';

const EmptyCartView = () => (
  <div className="empty-cart-container">
    <img
      src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
      alt="cart empty"
      className="empty-cart-image"
    />
    <h1 className="empty-cart-title">Your Cart Is Empty</h1>
    <p className="empty-cart-description">You can go to home page to view more restaurants</p>
    <Link to="/">
      <button className="empty-cart-button">Order Now</button>
    </Link>
  </div>
);

export default EmptyCartView;
