import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./list.css";

export default function list() {
  const navigate = useNavigate();
  const API_URL = "https://my-ecomm-json-server.onrender.com";
  const [bestProd, setBestProd] = useState([]);
  const scrollDiv = useRef();
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((response) => response.json())
      .then((data) =>{const sorted = data.sort((a, b) => b.sold - a.sold);
        setBestProd(sorted.slice(0,7))
      }) 
      .catch((error) => console.error("Error:", error));
  }, []);
 

  return (
    <main className="home-list-section">
      <div className="text-area">
        <div id="best-selling-text">
          <h2>Best Selling</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
            modi nemo mollitia magni reprehenderit.
          </p>
        </div>
        <div id="view-blogs-button">
          <button  onClick={()=>{
              navigate('/blog')
            }}>
            View Our Blogs
            <span>
              &rsaquo;
            </span>
          </button>
        </div>
      </div>
      <div className="list-area" ref={scrollDiv}>
        {bestProd.map((data) => {
          return (
            <div className="card" key={data.id} onClick={() => {window.location.href = `/products/viewproduct/${data.id}`}}>
              <div className="images">
                <img src={data.image} alt="image" />
              </div>
              <div className="title">
                <h4>{data.title}</h4>
                {/* <h6>{data.brand}<span> </span> {data.sold} Sales</h6> */}
                <p>{data.description}</p>
              </div>
            </div>
          );
        })}
        <button
          id="scroll-btn"
          onClick={() => {
            scrollDiv.current.scrollBy({ left: 400, behavior: "smooth" });
          }}
        >
          {" "}
          <span style={{ fontSize: "3.4em", marginLeft: "16px" }}>
            &rsaquo;
          </span>
        </button>
      </div>
    </main>
  );
}
