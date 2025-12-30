import React, { useEffect, useState } from "react";
import Card from "../../pages/products/card";
import "./SimilarProd.css";

const API_URL = "http://localhost:2000/api";

export default function SimilarProd({ category }) {
    const [similarProd, setSimilarProd] = useState([]);

    useEffect(() => {
        if (!category) return;

        const fetchSimilar = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/product/all-products?category=${category}&limit=8`
                );
                const data = await res.json();

                if (data.success) {
                    setSimilarProd(data.data);
                }
            } catch (err) {
                console.error("Fetch similar products error:", err);
            }
        };

        fetchSimilar();
    }, [category]);

    return (
        <section className="similar-prod">
            <p id="heading">Similar Products</p>
            <div className="list">
                {similarProd.map((data, index) => (
                    <Card card={data} key={index} />
                ))}
            </div>
        </section>
    );
}
