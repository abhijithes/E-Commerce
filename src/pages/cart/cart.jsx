import React, { useEffect, useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {

  const API_URL = "https://my-ecomm-json-server.onrender.com";

  const navigate = useNavigate();
  const [isLoggined, setIsLoggined] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartProd, setCartProd] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [discount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    setIsLoggined(true);

    fetch(`${API_URL}/cartItems?userId=${user.id}`)
      .then((res) => res.json())
      .then((res) => {
        setCartItems(res);
      })
      .catch((err) => console.log("Failed fetching cart items", err));
  }, []);

  const getCartProd = async () => {
    const res = await fetch(`${API_URL}/products`);
    const products = await res.json();

    const cart = cartItems.map((item) => {
      const prod = products.find((p) => p.id === item.productId);
      return {
        ...prod,
        qty: item.quantity,
        total: parseFloat((item.quantity * prod.price).toFixed(2)),
        cartID: item.id,
      };
    });

    setCartProd(cart);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      getCartProd();
    }
  }, [cartItems]);

  const setQty = async (n, productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + n }
        : item
    );

    setCartItems(updatedCartItems);

    const updatedItem = updatedCartItems.find(
      (item) => item.productId === productId
    );

    try {
      await fetch(`${API_URL}/cartItems/${updatedItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: updatedItem.quantity }),
      });
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const deleteCartItem = (id) => {
    const filtered = cartItems.filter((item) => item.id !== id);
    setCartItems(filtered);

    fetch(`${API_URL}/cartItems/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete cart item", err));
  };

  useEffect(() => {
    const calculateTotal = () => {
      const sum = cartProd.reduce((acc, curr) => acc + curr.total, 0);
      const finalSum = parseFloat(sum.toFixed(2));
      setSubTotal(finalSum);
      setTotal((finalSum - finalSum * (discount / 100)).toFixed(2));
    };

    calculateTotal();
  }, [cartProd]);

  if (!isLoggined) {
    return (
      <div className="not-loggined">
        <h1>Please login to add products to cart</h1>
      </div>
    );
  }

  return (
    <div className="cart-main">
      <div className="cart-details">
        <div className="products">
          <div className="head">
            <h1>Product</h1>
            <div className="details">
              <h1 className="head-text">Price</h1>
              <h1 className="head-text">Quantity</h1>
              <h1 className="head-text">Total</h1>
            </div>
          </div>

          {cartProd.length === 0 ? (
            <p id="noCartItemsAvailable">No cart items available.</p>
          ) : (
            cartProd.map((data, index) => (
              <div className="list" key={index}>
                <div className="prod">
                  <h1 id="cross-symbol" onClick={() => deleteCartItem(data.cartID)}>
                    &times;
                  </h1>
                  <img src={data.image || ""} alt={data.title} />
                  <p>{data.title}</p>
                </div>

                <div className="detail">
                  <h4>{data.price}</h4>
                  <div className="select-count">
                    <button
                      onClick={() => {
                        if (data.qty > 1) setQty(-1, data.id);
                      }}
                    >
                      −
                    </button>
                    <p>{data.qty}</p>
                    <button
                      onClick={() => {
                        if (data.qty < data.stock) setQty(1, data.id);
                      }}
                    >
                      +
                    </button>
                  </div>
                  <h4>{data.total}</h4>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          <div className="head">
            <h1>Cart Total</h1>
          </div>
          <div className="cart-total-body">
            <div className="subtotal">
              <h4>SUBTOTAL</h4>
              <h4>{subTotal}</h4>
            </div>
            <div className="discount">
              <h4>DISCOUNT</h4>
              <h4>{discount}</h4>
            </div>
            <div className="total">
              <h4>TOTAL</h4>
              <h4>{total}</h4>
            </div>
            <button
              onClick={() => {
                localStorage.setItem("cartdata", JSON.stringify(cartProd));
                navigate("/checkout");
              }}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
