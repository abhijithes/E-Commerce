import { useNavigate } from "react-router-dom";
import React from "react";
import "./card.css";

export default function Card({ card }) {
    const navigate = useNavigate();

    const imageUrl =
        card?.images?.length > 0
            ? card.images[0].url
            : "https://via.placeholder.com/300";

    return (
        <div
            className="card"
            onClick={() => navigate(`/products/viewproduct/${card._id}`)}
        >
            <div className="img">
                <img src={imageUrl} alt={card.title} />
            </div>

            <div className="title">
                <h1>{card.title}</h1>
            </div>

            <div className="price">
                <p>₹{card.price}</p>
            </div>
        </div>
    );
}
