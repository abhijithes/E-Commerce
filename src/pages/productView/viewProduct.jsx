import React from "react";
import "./viewProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SimilarProd from "../../components/SimilarProducts/SimilarProd";
import Cart from "../cart/cart";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { use } from "react";

export default function ViewProduct() {
    const API_URL = "https://my-ecomm-json-server.onrender.com";

    const navigate = useNavigate();
    const { ProductId } = useParams();
    const [product, setProduct] = useState();
    const [qty, setQty] = useState(1);
    const [isLoggined, setIsLoggined] = useState(false);
    // const [cartDetails, setcartDetails] = useState({
    //   userId: '',
    //   productId: '',
    //   quantity: ''
    // });

    useEffect(() => {
        const func = () => {
            console.log("hii");
            fetch(`${API_URL}/products/${ProductId}`)
                .then((res) => res.json())
                .then((data) => setProduct(data))
                .catch((err) => console.error("error", err));
        };
        func();
        if (localStorage.getItem("user")) setIsLoggined(true);
        else setIsLoggined(false);
    }, []);
    const addToCart = () => {
        if (!isLoggined) {
            toast.error("Please login to continue");
            return;
        }
        let user = JSON.parse(localStorage.getItem("user"));
        const cartDetails = {
            userId: user.id,
            productId: ProductId,
            quantity: qty,
        };

        fetch(`${API_URL}/cartItems`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(cartDetails),
        })
            .then((res) => {
                if (res.ok) toast.success("Product added to cart!");
                else toast.error("Failed to add product.");
            })
            .catch(() => toast.error("Network error."));
    };

    const buynow = () => {
        if (!isLoggined) {
            toast.error("Please login to continue");
            return;
        }
        const cartProd = [
            {
                ...product,
                qty: 1,
                total: product.price,
            },
        ];
        localStorage.setItem("cartdata", JSON.stringify(cartProd));
        navigate("/checkout");
    };

    if (!product) return <p>Loading product...</p>;

    return (
        <div className="view-product">
            <ToastContainer position="top-center" autoClose={2000} />
            <div className="path-view">
                <p onClick={() => navigate("/")}>Home </p>
                <span>&rsaquo;</span>
                <p onClick={() => navigate("/products")}>Products</p>
                <span>&rsaquo;</span>
                <p id="current">{product.title}</p>
                <span>&rsaquo;</span>
            </div>
            <div className="product-conteiner">
                <div className="product-images">
                    <div className="left-side-images">
                        <div className="image" id="img1">
                            <img src={product.image} alt="image" />
                        </div>
                        <div className="image" id="img2">
                            <img src={product.image} alt="image" />
                        </div>
                        <div className="image" id="img3">
                            <img src={product.image} alt="image" />
                        </div>
                    </div>
                    <div className="right-side-image">
                        <img src={product.image} alt="image" />
                    </div>
                </div>
                <div className="product-details">
                    <div className="title">
                        <h1>
                            {product.title} | {product.description}
                        </h1>
                        <h2>
                            <span id="og-price">${product.originalPrice}</span>
                            <span>${product.price}</span>
                        </h2>
                    </div>
                    <div className="features">
                        <p>{product.detailedDescription}</p>
                        {product.features.map((data, index) => (
                            <ul key={index}>
                                <li>{data}</li>
                            </ul>
                        ))}
                    </div>
                    <div className="operations">
                        <div className="addtocart">
                            <div className="select-count">
                                <button
                                    onClick={() => {
                                        if (qty === 1) return;
                                        else setQty(qty - 1);
                                    }}
                                >
                                    −
                                </button>
                                <p>{qty}</p>
                                <button
                                    onClick={() => {
                                        if (qty === product.stock) return;
                                        else setQty(qty + 1);
                                    }}
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
                <p>
                    {product.detailedDescription} Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam totam
                    impedit ipsa cupiditate officiis dicta! Nihil facilis velit similique accusantium iure provident
                    quis? Quae molestiae fugit earum laudantium odio dolorem. Lorem ipsum dolor, sit amet consectetur
                    adipisicing elit. Temporibus vero quisquam, aperiam optio deserunt corporis magni delectus
                    reprehenderit enim eum quidem cupiditate vitae officia? A ipsa excepturi accusamus molestiae quod.
                </p>
                <ul>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In perspiciatis, quam animi quibusdam
                        impedit dolor quasi eveniet voluptatibus facere, placeat asperiores obcaecati at quia assumenda
                        architecto dolorum nostrum ipsam cum.
                    </li>
                    <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In perspiciatis, quam animi quibusdam
                        impedit dolor quasi eveniet voluptatibus facere.
                    </li>
                    <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. In perspiciatis.</li>
                    <li>
                        Lorem ipsum dolor sit elit, In perspiciatis, quam animi quibusdam impedit dolor quasi eveniet
                        voluptatibus facere, placeat asperiores obcaecati.
                    </li>
                </ul>
            </div>
            <SimilarProd category={product.category} />
        </div>
    );
}
