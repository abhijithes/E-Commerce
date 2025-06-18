import { useNavigate } from "react-router-dom";
import React from "react";
import './card.css'

export default function Card({ card }) {
  const navigate = useNavigate();
  return (
    <div
      className="card"
      onClick={()=>{
              navigate(`/products/viewproduct/${card.id}`)
              window.location.reload()
            }}
    >
      <div className="img">
        <img src={card.image} alt="" />
      </div>
      <div className="title">
        <h1>{card.title}</h1>
      </div>
      <div className="price">
        <p>${card.price}</p>
      </div>
    </div>
  );
}
