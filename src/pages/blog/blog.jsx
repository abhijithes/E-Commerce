// src/components/Blog.jsx
import React from "react";
import "./Blog.css";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Must-Have Gadgets in 2025",
    date: "July 8, 2025",
    excerpt:
      "Explore the hottest gadgets of the year and how they're changing the way we live, work, and shop.",
    image: "https://www.pexels.com/photo/smart-home-devices-18485666/",
  },
  {
    id: 2,
    title: "Fashion Trends That Define Modern Luxury",
    date: "June 28, 2025",
    excerpt:
      "From minimalist to maximalist, see how Eluxo brings you the finest trends in premium fashion.",
    image: "https://www.pexels.com/photo/eastern-dresses-2024-shoot-by-dhanno-19487476/",
  },
  {
    id: 3,
    title: "Eco-Friendly Shopping with Eluxo",
    date: "June 10, 2025",
    excerpt:
      "Discover how Eluxo supports sustainability through our eco-conscious products and packaging.",
    image: "https://www.pexels.com/photo/photo-of-a-woman-holding-shopping-bags-974911/",
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
