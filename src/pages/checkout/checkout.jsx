import React, { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./checkout.css";
import { useNavigate } from "react-router-dom";

export default function checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("personal");
  const [cartData, setCartData] = useState([]);
  const [subTotal, setsubTotal] = useState(0);
  const [paymentSuccess, setpaymentSuccess] = useState(false);
  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("cartdata"));
    setCartData(temp);
    console.log(temp);
    let temp2 = temp.reduce((total, item) => total + item.total, 0);
    setsubTotal(temp2);
  }, []);
  useEffect(()=>{
    if(paymentSuccess){
      console.log("Payment Successful");
      console.log(cartData);
    }
  },[paymentSuccess])
  return (
    <div className="checkout-main">

       {paymentSuccess && <div className="payment-sucess">
            <CheckCircleIcon />
            <h1>Thankyou</h1>
            <p>Your order has been confirmed & it is on the way. <br /> Check your email for the details</p>
            <div className="buttons">
                <button onClick={()=> { 
                    navigate('/');
                    }}>Go to Homepage</button>
                <button id="right-btn">Check Order Details</button>
            </div>
        </div>}

      <div className="checkout-form">
        <div className="head">
          {currentStep === "personal" && <h1>personal</h1> }
          {currentStep === "billing" && <h1>billing</h1>}
        </div>
        {currentStep === "personal" && (
          <div className="persnoal-details">
            <form action="">
              <div className="input">
                <p>Email address*</p>
                <input type="text" required />
              </div>
              <div className="input">
                <p>Phone Number*</p>
                <input type="text" required />
              </div>
              <div className="input">
                <p>Street Adress*</p>
                <input type="text" required />
              </div>
              <div className="input">
                <p>Town/City*</p>
                <input type="text" required />
              </div>
              <div className="input">
                <p>Country*</p>
                <input type="text" required />
              </div>
              <div className="input">
                <p>Postal Code/zip*</p>
                <input type="text" required />
              </div>
              <div id="submit">
                <input
                  type="submit"
                  name=""
                  value="Continue to Next Step"
                  onClick={() => setCurrentStep("billing")}
                />
              </div>{" "}
            </form>
          </div>
        )}
        {currentStep === "billing" && (
          <div className="billing">
            <form action="">
              <div className="input">
                <p> Card owner name*</p>
                <input type="text" required />
              </div>
              <div className="input">
                <p> Card number*</p>
                <input type="number" required />
              </div>
              <div className="cvv">
                <div className="input">
                  <p> Validity*</p>
                  <input type="date" required />
                </div>
                <div>
                  <p> CVV*</p>
                  <input type="number" maxLength={3} size={3} />
                </div>
              </div>
              <div id="submit">
                <input
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.removeItem('cartdata')
                    setpaymentSuccess(true);
                  }}
                />
              </div>
            </form>
          </div>
        )}
      </div>
      <div className="cart-details">
        <div className="head">
          <h1>Cart Details</h1>
        </div>
        <div className="sub-heading">
          <p>Products</p>
          <div className="products-details">
            <p>Quantity</p>
            <p>Price</p>
          </div>
        </div>
        <div>
          {cartData.map((data, index) => (
            <div className="cart-details-list" key={index}>
              <p>{data.title}</p>
              <div className="products-details">
                <p id="chechout-cartdetails-qty">{data.qty}</p>
                <p>{data.total}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="subtotal">
          <h4>SUBTOTAL</h4>
          <h4>{subTotal}</h4>
        </div>
        <div className="shipping">
          <h4>Shipping</h4>
          <h4>0</h4>
        </div>
        <div className="total-final">
          <h4>TOTAL</h4>
          <h4>{subTotal}</h4>
        </div>
      </div>
    </div>
  );
}
