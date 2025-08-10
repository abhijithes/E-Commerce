import React from "react";
import "./blog.css";

const blogPosts = [
    {
        id: 1,
        title: "Top 10 Must-Have Gadgets in 2025",
        date: "July 8, 2025",
        excerpt: "Explore the hottest gadgets of the year and how they're changing the way we live, work, and shop.",
        image: "https://images.unsplash.com/photo-1635167727782-be17e947648d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFzaGlvbiUyMGdhZGdldHN8ZW58MHx8MHx8fDA%3D"
    },
    {
        id: 2,
        title: "Fashion Trends That Define Modern Luxury",
        date: "June 28, 2025",
        excerpt: "From minimalist to maximalist, see how Eluxo brings you the finest trends in premium fashion.",
        image: "https://images.unsplash.com/photo-1589363358751-ab05797e5629?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bHV4dXJ5JTIwZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        id: 3,
        title: "Eco-Friendly Shopping with Eluxo",
        date: "June 10, 2025",
        excerpt: "Discover how Eluxo supports sustainability through our eco-conscious products and packaging.",
        image: "https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vbmV5JTIwc2F2aW5nfGVufDB8fDB8fHww",
    },
];

const Blog = () => {
    return (
        <div className="blog-container">
            <h1 className="blog-title">Eluxo Blog</h1>
            <p className="blog-subtitle">Insights, trends & stories from the world of luxury e-commerce</p>

            <div className="blog-grid">
                {blogPosts.map((post) => (
                    <div className="blog-card" key={post.id}>
                        <img src={post.image} alt={post.title} className="blog-image" />
                        <div className="blog-content">
                            <h2>{post.title}</h2>
                            <p className="blog-date">{post.date}</p>
                            <p>{post.excerpt}</p>
                            <button className="read-more">Read More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
