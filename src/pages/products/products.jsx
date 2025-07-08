import React from "react";
import { useState, useEffect } from "react";
import "./products.css";
import Card from './card'

export default function products() {
  const [prod, setProd] = useState([]);
  const [filteredprod, setfilteredProd] = useState([]);
  const [showProd, setShowProd] = useState([]);
  const [showProdCount, setShowProdCount] = useState(16);
  const [categories, setcategories] = useState([]);
  const [audience, setaudience] = useState([]);
  const [priceRange, setpriceRange] = useState([
    "Under 25",
    "25 - 50",
    "50 - 100",
    "Over 100",
  ]);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    audience: [],
    priceRange: [],
  });

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((res) => {
        setProd(res);
        setfilteredProd(res);
        const array1 = [...new Set(res.map((res) => res.category))];
        const array2 = [...new Set(res.map((res) => res.audience))];
        setcategories(array1);
        setaudience(array2);
        setSelectedFilters({
          categories: array1,
          audience: array2,
          priceRange: ["Under 25", "25 - 50", "50 - 100", "Over 100"],
        });
        console.log(selectedFilters);
      })
      .catch((error) => console.log(error));
  }, []);

  const HandleFilterItems = (type, value) => {
    let currentFilter = [];
    if (type === "categories") currentFilter = [...categories];
    else if (type === "audience") currentFilter = [...audience];
    else if (type === "priceRange") currentFilter = [...priceRange];

    console.log(selectedFilters);
    let updatedCat = [...currentFilter];
    if (updatedCat.length === selectedFilters[type].length) {
      updatedCat = [];
      console.log("hello", updatedCat);
    }
    if (updatedCat.includes(value)) {
      updatedCat = updatedCat.filter((data) => data != value);
      console.log("inc");
    } else {
      updatedCat.push(value);
      console.log("hii", value);
    }
    if (updatedCat.length === 0) {
      updatedCat = [...selectedFilters[type]];
      console.log("hmm");
    }

    if (type === "categories") setcategories(updatedCat);
    else if (type === "audience") setaudience(updatedCat);
    else if (type === "priceRange") setpriceRange(updatedCat);
  };

  const filterProd = () => {
    const temp = prod.filter((data) => categories.includes(data.category));
    const temp2 = temp.filter((data) => audience.includes(data.audience));
    if (priceRange.length != selectedFilters.priceRange.length) {
      console.log("from")
      const priceConditions = priceRange.map((range) => {
        if (range === "Under 25") return (price) => price < 25;
        if (range === "25 - 50") return (price) => price >= 25 && price <= 50;
        if (range === "50 - 100") return (price) => price > 50 && price <= 100;
        if (range === "Over 100") return (price) => price > 100;
        return () => false;
      });

      const temp3 = temp2.filter((product) => {
        const price = parseFloat(product.price);
        return priceConditions.some((condition) => condition(price));
      });
      setfilteredProd(temp3);
    }else setfilteredProd(temp2);
  };
  useEffect(() => {
    filterProd();
  }, [categories, audience, priceRange]);

  const handleSearch = (text) =>{
    const searchText = text.toLowerCase();
    const filtered = prod.filter((item)=> item.title.toLowerCase().includes(searchText) );
    setfilteredProd(filtered);
  }
  useEffect(()=>{
    const visibleProd = filteredprod.slice(0, showProdCount);
    setShowProd(visibleProd);
  },[filteredprod,showProdCount])

  if (!selectedFilters) return <p>Loading product...</p>;
  return (
    <main className="product-home">
      <div className="filter-section">
        <div className="category-filter">
          <h1>
            <span>|</span> Categories
          </h1>
          {selectedFilters.categories.map((data, index) => {
            return (
              <h3
                key={index}
                onClick={() => HandleFilterItems("categories", data)}
                className={categories.includes(data) ? "active" : ""}
              >
                {data}
              </h3>
            );
          })}
        </div>
        <div className="audience-filter">
          <h1>
            <span>|</span> Audience
          </h1>
          {selectedFilters.audience.map((data, index) => (
            <h3
              key={index}
              onClick={() => HandleFilterItems("audience", data)}
              className={audience.includes(data) ? "active" : ""}
            >
              {data}
            </h3>
          ))}
        </div>
        <div className="price-filter">
          <h1>
            <span>|</span> Price
          </h1>
          {selectedFilters.priceRange.map((data, index) => (
            <h3
              key={index}
              onClick={() => HandleFilterItems("priceRange", data)}
              className={priceRange.includes(data) ? "active" : ""}
            >
              {data}
            </h3>
          ))}
        </div>
      </div>
      <div className="show-section">
        <div className="head-section">
          <h1>Our Collection Of Products</h1>
          <div className="search-bar">
            <input type="text" 
            onChange={(event)=>handleSearch(event.target.value)} />
            <div className="search-icon">
              <img
                src="https://img.icons8.com/?size=100&id=Y6AAeSVIcpWt&format=png&color=FFFFFF"
                alt=""
              />
            </div>
          </div>
          <h6>Showing Results</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sit
            ipsucidunt ut qui laborum!
          </p>
        </div>
        <div className="product-list">
          {showProd.map((data,index) => {
           return <Card card={data} key={index}/>
          })}
        </div>
        <div className="load-more">
          <button onClick={()=> setShowProdCount(showProdCount+8)}>Load More<span style={{ fontSize: "1.4em" }}> &rsaquo;</span></button>
        </div>
      </div>
    </main>
  );
}
