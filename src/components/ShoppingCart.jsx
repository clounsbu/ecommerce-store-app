import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, checkout } from "../features/cartSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function ShoppingCart() {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalProducts = cart.reduce((total, item) => total + item.count, 0);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0,
  );

  const handleCheckout = () => {
    dispatch(checkout());
    sessionStorage.removeItem("cart");
    alert("Checkout Successful! Your cart is empty.");
  };

  return (
    <div className="text-center">
      <h1>Shopping Cart</h1>
      <Link to="/">
        <button>Continue Shopping</button>
      </Link>

      {cart.map((item) => (
        <div
          key={item.id}
          className="p-4 d-flex align-items-center justify-content-center shadow w-50 mx-auto gap-4"
        >
        <div>
          <img
            src={item.image}
            alt={item.title}
            width="50"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/100";
            }}
          />

          <p>Price: ${item.price}</p>

          <p>Quantity: {item.count}</p>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
          </div>
          <div>
            <p>{item.title}</p>
          </div>
        </div>
      ))}

      <h2>Total Products: {totalProducts}</h2>

      <h2>Total Price: ${totalPrice.toFixed(2)} </h2>
      <button onClick={() => dispatch(handleCheckout())}>Checkout</button>
    </div>
  );
}

export default ShoppingCart;
