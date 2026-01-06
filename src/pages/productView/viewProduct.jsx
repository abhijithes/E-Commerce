import React, { useEffect, useState } from "react";
import "./viewProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import SimilarProd from "../../components/SimilarProducts/SimilarProd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from "../../constants";

export default function ViewProduct() {
    const navigate = useNavigate();
    const { id } = useParams(); // ✅ route param fix
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);
    const [isLoggined, setIsLoggined] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_URL}/product/${id}`);
                const data = await res.json();
                console.log(data, data.product);
                
                if (data.message === "success") setProduct(data.product);
            } catch (err) {
                console.error("Fetch product error:", err);
            }
        };

        fetchProduct();
        setIsLoggined(localStorage.getItem("user"));
        setUser(JSON.parse(localStorage.getItem("user")));
    }, [id]);

    const addToCart = async () => {
        if (!isLoggined) {
            toast.error("Please login to continue");
            return;
        }else{

        }

        try {
            const res = await fetch(`${API_URL}/cart/${user.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: qty,
                }),
            });

            if (res.ok) toast.success("Product added to cart!");
            else toast.error("Failed to add product.");
        } catch {
            toast.error("Network error.");
        }
    };

    const buynow = () => {
        if (!isLoggined) {
            toast.error("Please login to continue");
            return;
        }

        localStorage.setItem(
            "cartdata",
            JSON.stringify([
                {
                    product,
                    qty,
                    total: product.price * qty,
                },
            ])
        );

        navigate("/checkout");
    };

    if (!product) return <p>Loading product...</p>;

    const mainImage =
        product.images?.length > 0
            ? product.images[0].url
            : "https://via.placeholder.com/400";

    return (
        <div className="view-product">
            <ToastContainer position="top-center" autoClose={2000} />

            <div className="path-view">
                <p onClick={() => navigate("/")}>Home</p>
                <span>&rsaquo;</span>
                <p onClick={() => navigate("/products")}>Products</p>
                <span>&rsaquo;</span>
                <p id="current">{product.title}</p>
                <span>&rsaquo;</span>
            </div>

            <div className="product-conteiner">
                <div className="product-images">
                    <div className="left-side-images">
                        {product.images?.slice(1, 4).map((img, i) => (
                            <div className="image" key={i}>
                                <img src={img.url} alt={product.title} />
                            </div>
                        ))}
                    </div>

                    <div className="right-side-image">
                        <img src={mainImage} alt={product.title} />
                    </div>
                </div>

                <div className="product-details">
                    <div className="title">
                        <h1>{product.title}</h1>
                        <h2>
                            <span id="og-price">₹{product.originalPrice}</span>
                            <span>₹{product.price}</span>
                        </h2>
                    </div>

                    <div className="features">
                        <p>{product.shortDescription}</p>
                        {product.features?.map((data, index) => (
                            <ul key={index}>
                                <li>{data}</li>
                            </ul>
                        ))}
                    </div>

                    <div className="operations">
                        <div className="addtocart">
                            <div className="select-count">
                                <button onClick={() => qty > 1 && setQty(qty - 1)}>−</button>
                                <p>{qty}</p>
                                <button
                                    onClick={() =>
                                        qty < product.stock && setQty(qty + 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                            <button onClick={addToCart}>Add To Cart</button>
                        </div>

                        <div className="buynow">
                            <button onClick={buynow}>Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-description">
                <h2>Description</h2>
                <p>{product.detailedDescription}</p>
            </div>

            <SimilarProd category={product.category} currentProduct={product._id} />
        </div>
    );
}
