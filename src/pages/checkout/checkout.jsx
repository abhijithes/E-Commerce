import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./checkout.css";
import { API_URL } from "../../constants";

export default function Checkout() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [currentStep, setCurrentStep] = useState("personal");
  const [cart, setCart] = useState(null);
  const [subTotal, setSubTotal] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  /* ---------------- FETCH CART ---------------- */
  useEffect(() => {
    if (!user) return;

    fetch(`${API_URL}/cart/${user.id}`)
      .then(res => res.json())
      .then(res => {
        if (res.success) setCart(res.data);
      })
      .catch(err => console.error("Fetch cart failed", err));
  }, []);

  /* ---------------- CALCULATE TOTAL ---------------- */
  useEffect(() => {
    if (!cart) return;

    const total = cart.items.reduce(
      (acc, item) => acc + item.productId.price * item.quantity,
      0
    );

    setSubTotal(total.toFixed(2));
  }, [cart]);

  /* ---------------- GUARDS ---------------- */
  if (!user) {
    return <h1>Please login to continue checkout</h1>;
  }

  if (!cart || cart.items.length === 0) {
    return <h1>No items in cart</h1>;
  }

  /* ---------------- PAYMENT ---------------- */
  const handlePayment = async (e) => {
    e.preventDefault();

    // 🔥 Here you’d normally call payment API
    // await fetch(`${API_URL}/orders`, {...})

    // Optional: clear cart after order
    // await fetch(`${API_URL}/cart/${user.id}`, { method: "DELETE" });

    setPaymentSuccess(true);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="checkout-main">

      {paymentSuccess && (
        <div className="payment-sucess">
          <CheckCircleIcon />
          <h1>Thank you</h1>
          <p>
            Your order has been confirmed & is on the way. <br />
            Check your email for details.
          </p>

          <div className="buttons">
            <button onClick={() => navigate("/")}>Go to Homepage</button>
            <button id="right-btn">Check Order Details</button>
          </div>
        </div>
      )}

      {/* ---------------- LEFT FORM ---------------- */}
      {!paymentSuccess && (
        <div className="checkout-form">

          <div className="head">
            <h1>{currentStep === "personal" ? "Personal Details" : "Billing"}</h1>
          </div>

          {currentStep === "personal" && (
            <form
              className="personal-details"
              onSubmit={(e) => {
                e.preventDefault();
                setCurrentStep("billing");
              }}
            >
              <div className="input">
                <p>Email*</p>
                <input type="email" required />
              </div>

              <div className="input">
                <p>Phone*</p>
                <input type="text" required />
              </div>

              <div className="input">
                <p>Street Address*</p>
                <input type="text" required />
              </div>

              <div className="input">
                <p>City*</p>
                <input type="text" required />
              </div>

              <div className="input">
                <p>Country*</p>
                <input type="text" required />
              </div>

              <div className="input">
                <p>Postal Code*</p>
                <input type="text" required />
              </div>

              <div id="submit">
                <button type="submit">Continue to Billing</button>
              </div>
            </form>
          )}

          {currentStep === "billing" && (
            <form className="billing" onSubmit={handlePayment}>
              <div className="input">
                <p>Card Holder Name*</p>
                <input type="text" required />
              </div>

              <div className="input">
                <p>Card Number*</p>
                <input type="number" required />
              </div>

              <div className="cvv">
                <div className="input">
                  <p>Expiry*</p>
                  <input type="month" required />
                </div>

                <div className="input">
                  <p>CVV*</p>
                  <input type="number" required />
                </div>
              </div>

              <div id="submit">
                <button type="submit">Pay ₹{subTotal}</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ---------------- RIGHT CART SUMMARY ---------------- */}
      {!paymentSuccess && (
        <div className="cart-details">
          <div className="head">
            <h1>Cart Details</h1>
          </div>

          <div className="sub-heading">
            <p>Product</p>
            <div className="products-details">
              <p>Qty</p>
              <p>Price</p>
            </div>
          </div>

          {cart.items.map(item => (
            <div className="cart-details-list" key={item.productId._id}>
              <p>{item.productId.title}</p>
              <div className="products-details">
                <p>{item.quantity}</p>
                <p>₹{(item.productId.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}

          <div className="subtotal">
            <h4>SUBTOTAL</h4>
            <h4>₹{subTotal}</h4>
          </div>

          <div className="shipping">
            <h4>Shipping</h4>
            <h4>₹0</h4>
          </div>

          <div className="total-final">
            <h4>TOTAL</h4>
            <h4>₹{subTotal}</h4>
          </div>
        </div>
      )}

    </div>
  );
}
