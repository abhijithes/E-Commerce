import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>Welcome to Eluxo</h1>
        <p>Your destination for luxury, elegance, and exclusive deals.</p>
      </section>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          Eluxo is a premium e-commerce platform committed to delivering
          high-quality fashion, tech, and lifestyle products to customers around
          the world. Our goal is to blend luxury with affordability, and bring
          excellence to your shopping experience.
        </p>

        <h2>Our Vision</h2>
        <p>
          To become a global hub for luxurious yet accessible products,
          empowering customers to feel elite in their everyday life.
        </p>

        <h2>Why Eluxo?</h2>
        <ul>
          <li> Secure & seamless shopping experience</li>
          <li> Fast and reliable delivery</li>
          <li> Hand-picked premium collections</li>
          <li> 24/7 customer support</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
