import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const API_URL = "http://localhost:2000/api";
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const discount = 0;

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) return;

    setIsLoggedIn(true);

    fetch(`${API_URL}/cart/${user.id}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) setCart(res.data);
      })
      .catch(err => console.error("Fetch cart failed", err));
  }, []);

  useEffect(() => {
    if (!cart) return;

    const total = cart.items.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    setSubTotal(total.toFixed(2));
  }, [cart]);

  /* ---------------- UPDATE QTY ---------------- */
  const updateQty = async (productId, qtyChange) => {
    await fetch(`${API_URL}/cart/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        quantity: qtyChange
      })
    });

    // re-fetch cart (single source of truth)
    const res = await fetch(`${API_URL}/cart/${user.id}`);
    const data = await res.json();
    setCart(data.data);
  };

  /* ---------------- REMOVE ITEM ---------------- */
  const removeItem = async (productId) => {
    await fetch(`${API_URL}/cart/${user.id}/item`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId })
    });

    const res = await fetch(`${API_URL}/cart/${user.id}`);
    const data = await res.json();
    setCart(data.data);
  };

  /* ---------------- GUARD ---------------- */
  if (!isLoggedIn) {
    return <h1>Please login to view cart</h1>;
  }

  if (!cart || cart.items.length === 0) {
    return <h1>No cart items available</h1>;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="cart-main">
      <div className="cart-details">

        <div className="products">
          <h1>Products</h1>

          {cart.items.map(item => (
            <div className="list" key={item.productId._id}>
              <div className="prod">
                <span onClick={() => removeItem(item.productId._id)}>
                  &times;
                </span>

                <img
                  src={item.productId.images?.[0]?.url}
                  alt={item.productId.title}
                />
                <p>{item.productId.title}</p>
              </div>

              <div className="detail">
                <h4>₹{item.productId.price}</h4>

                <div className="select-count">
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => updateQty(item.productId._id, -1)}
                  >
                    −
                  </button>

                  <p>{item.quantity}</p>

                  <button
                    disabled={item.quantity >= item.productId.stock}
                    onClick={() => updateQty(item.productId._id, 1)}
                  >
                    +
                  </button>
                </div>

                <h4>
                  ₹{(item.productId.price * item.quantity).toFixed(2)}
                </h4>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-total">
          <h1>Cart Total</h1>

          <div>
            <p>Subtotal: ₹{subTotal}</p>
            <p>Discount: ₹{discount}</p>
            <p>Total: ₹{subTotal}</p>

            <button onClick={() => navigate("/checkout")} className="proceed-btn">
              Proceed to Checkout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
