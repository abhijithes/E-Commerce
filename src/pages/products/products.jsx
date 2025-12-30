import React, { useEffect, useState, useRef } from "react";
import "./products.css";
import Card from "./card";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const API_URL = "http://localhost:2000/api";

export default function Products() {
    const [page, setPage] = useState(1);
    const [limit] = useState(20);

    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [filters, setFilters] = useState({
        categories: [],
        audience: [],
    });

    const [filterToggle, setFilterToggle] = useState({
        categories: false,
        audience: false,
        price: false,
    });

    const [categories, setCategories] = useState([]);
    const [audience, setAudience] = useState([]);
    const [priceRange, setPriceRange] = useState([]);
    const [search, setSearch] = useState("");

    const searchRef = useRef(null);

    useEffect(() => {
        const fetchFilters = async () => {
            const res = await fetch(`${API_URL}/product/get-filter`);
            const data = await res.json();

            if (data.success) {
                setFilters({
                    categories: data.filters.categories,
                    audience: data.filters.genders,
                });
            }
        };

        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);

            const params = new URLSearchParams({ page, limit });

            if (categories.length) params.append("category", categories[0]);
            if (audience.length) params.append("gender", audience[0]);
            if (search) params.append("q", search);

            if (priceRange.length) {
                const [min, max] = priceRange[0].split("-");
                params.append("minPrice", min);
                params.append("maxPrice", max);
            }

            const res = await fetch(
                `${API_URL}/product/all-products?${params.toString()}`
            );
            const data = await res.json();

            if (data.success) {
                setTotalPages(data.totalPages);

                // ✅ append instead of replace
                setProducts((prev) =>
                    page === 1 ? data.data : [...prev, ...data.data]
                );
            }

            setLoading(false);
        };

        fetchProducts();
    }, [page, categories, audience, priceRange, search]);

    const HandleFilter = (type) => {
        setFilterToggle((prev) => ({ ...prev, [type]: !prev[type] }));
    };

    const HandleFilterItems = (type, value) => {
        if (type === "categories") setCategories([value]);
        if (type === "audience") setAudience([value]);
        if (type === "priceRange") setPriceRange([value]);

        setProducts([]); 
        setPage(1);
    };

    const handleSearch = (value) => {
        clearTimeout(searchRef.current);
        searchRef.current = setTimeout(() => {
            setProducts([]);
            setSearch(value);
            setPage(1);
        }, 400);
    };

    return (
        <main className="product-home">
            {/* FILTER SECTION — UNCHANGED */}
            <div className="filter-section">
                <div className="category-filter">
                    <h1 onClick={() => HandleFilter("categories")}>
                        <span>|</span> Categories
                        <span className={!filterToggle.categories ? "arrow-icon down" : "arrow-icon"}>
                            <ArrowDropDownIcon />
                        </span>
                    </h1>
                    <div className={!filterToggle.categories ? "filter-list show-filter" : "filter-list"}>
                        {filters.categories.map((data, index) => (
                            <h3
                                key={index}
                                onClick={() => HandleFilterItems("categories", data)}
                                className={categories.includes(data) ? "active" : ""}
                            >
                                {data}
                            </h3>
                        ))}
                    </div>
                </div>

                <div className="audience-filter">
                    <h1 onClick={() => HandleFilter("audience")}>
                        <span>|</span> Audience
                        <span className={!filterToggle.audience ? "arrow-icon down" : "arrow-icon"}>
                            <ArrowDropDownIcon />
                        </span>
                    </h1>
                    <div className={!filterToggle.audience ? "filter-list show-filter" : "filter-list"}>
                        {filters.audience.map((data, index) => (
                            <h3
                                key={index}
                                onClick={() => HandleFilterItems("audience", data)}
                                className={audience.includes(data) ? "active" : ""}
                            >
                                {data}
                            </h3>
                        ))}
                    </div>
                </div>

                <div className="price-filter">
                    <h1 onClick={() => HandleFilter("price")}>
                        <span>|</span> Price
                        <span className={!filterToggle.price ? "arrow-icon down" : "arrow-icon"}>
                            <ArrowDropDownIcon />
                        </span>
                    </h1>
                    <div className={!filterToggle.price ? "filter-list show-filter" : "filter-list"}>
                        {["0-100", "100-500","500-1000", "1000-9999"].map((data, index) => (
                            <h3
                                key={index}
                                onClick={() => HandleFilterItems("priceRange", data)}
                                className={priceRange.includes(data) ? "active" : ""}
                            >
                                ₹ {data}
                            </h3>
                        ))}
                    </div>
                </div>
                             </div>

            <div className="show-section">
                <div className="head-section">
                    <h1>Our Collection Of Products</h1>

                    <div className="search-bar">
                        <input type="text" onChange={(e) => handleSearch(e.target.value)} />
                        <div className="search-icon">
                            <img
                                src="https://img.icons8.com/?size=100&id=Y6AAeSVIcpWt&format=png&color=FFFFFF"
                                alt=""
                            />
                        </div>
                    </div>
                </div>

                <div className="product-list">
                    {products.map((data, index) => (
                        <Card card={data} key={index} />
                    ))}
                </div>

                {/* ✅ PAGINATION UI FIX */}
                {page < totalPages && (
                    <div className="load-more">

                    <p>
                        Page {page} of {totalPages}
                    </p>
                        <button disabled={loading} onClick={() => setPage(p => p + 1)}>
                            {loading ? "Loading..." : "Load More"}
                            <span style={{ fontSize: "1.4em" }}> ›</span>
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
