import { useState, useEffect, useRef } from "react";
import "./list.css";

export default function list() {
  const [bestProd, setBestProd] = useState([]);
  const scrollDiv = useRef();
  useEffect(() => {
    fetch("http://localhost:3000/products")
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
          <button>
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
            <div className="card" key={data.id}>
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
