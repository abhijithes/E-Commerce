import React, { useEffect, useState } from "react";
import "./cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const [isLoggined, setisloggined] = useState();
  const [cartItems, setCartItems] = useState([]);
  const [cartProd, setCartProd] = useState([]);
  const [subTotal, setsubTotal] = useState();
  const [total, settotal] = useState();
  const [discount, setdiscount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("user")) setisloggined(true);
    const user = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:3000/cartItems?userId=${user.id}`)
      .then((res) => res.json())
      .then((res) => {
        setCartItems(res);
        console.log(res);
      })
      .catch((err) => console.log(err, "failed fetching"));
  }, []);

  const getCartprod = async () => {
    let res = await fetch(`http://localhost:3000/products`)
    let temp = await res.json()

    const cart = cartItems.map((item) => {
      const prod = temp.find((prodd) => prodd.id === item.productId);
      return {
        ...prod,
        qty: item.quantity,
        total: parseFloat((item.quantity * prod.price).toFixed(2)),
        cartID: item.id
      };
    });
    setCartProd(cart);
    console.log(cart, 'cart')

  };
  const setQty = (n,index)=>{
    console.log(n,index);
    let updated = cartItems.map((item)=>{
      console.log(item.productId,'a')
     return item.productId === index ? { ...item, quantity: item.quantity + n } : item
    })
    setCartItems(updated)
    console.log(updated,'b')
  }


  useEffect(() => {
    getCartprod();
    console.log(cartItems,'items')
    cartItems.forEach((item)=>{
      console.log("PATCHING item ID:", item.qty);
    fetch(`http://localhost:3000/cartItems/${item.id}`,{
      method: "PATCH",
      headers: {
    "Content-Type": "application/json",
  },
      body: JSON.stringify({
        quantity: item.quantity
      }),
    })
        .then((res) => {
      if (!res.ok) throw new Error(`Failed to patch ID: ${item.id}`);
      return res.json();
    })
    .then((data) => console.log("Updated:", data))
    .catch((err) => console.error("Error patching item:", err));
    })
  }, [cartItems]);

  const deleteCartItem = (id) =>{
    console.log(id)
    const temp = cartItems.filter((item)=> item.id !== id);
    setCartItems(temp);
    fetch(`http://localhost:3000/cartItems/${id}`,{
      method: "DELETE"
    })
  }
  useEffect(()=>{
    const calculateTotal =()=>{
      let sum = cartProd.reduce((sum, current)=>{
        return sum + current.total
      }, 0)
      sum = sum.toFixed(2);
      settotal(sum - (sum* (discount/100))) 
      setsubTotal(sum)

    }
    calculateTotal()
  },[cartProd])

  if (isLoggined)
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
            {cartProd.length === 0 ? (<p id="noCartItemsAvailable">No cart items available.</p>) : ( cartProd.map((data, index) => (
              <div className="list" key={index}>
                <div className="prod">
                  <h1 id="cross-symbol" onClick={()=>deleteCartItem(data.cartID)}>&times;</h1>
                  <img src={data.image} alt="" />
                  <p>{data.title}</p>
                </div>
                <div className="detail">
                  <h4>{data.price}</h4>
                  <div className="select-count">
                <button
                  onClick={() => {
                    if (data.qty === 1) return;
                    else setQty(-1,data.id);
                  }}
                >
                  −
                </button>
                <p>{data.qty}</p>
                <button
                  onClick={() => {
                    if (data.qty === data.stock) return;
                    else setQty(1,data.id);
                  }}
                >
                  +
                </button>
              </div>
                  <h4>{data.total}</h4>
                </div>
              </div>
            )))}
          </div>
          <div className="cart-total">
            <div className="head"><h1>Cart Total</h1></div>
            <div className="cart-total-body">
            <div className="subtotal"><h4>SUBTOTAL</h4><h4>{subTotal}</h4></div>
            <div className="discount"><h4>DISCOUNT</h4><h4>0</h4></div>
            <div className="total"><h4>TOTAL</h4><h4>{total}</h4></div>
            <button onClick={()=>{
              localStorage.setItem('cartdata',JSON.stringify(cartProd));
              navigate('/checkout')
            }}>Proceed To Checkout</button>
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="not-loggined">
        <h1>Please login to add products to cart</h1>
      </div>
    );
}
