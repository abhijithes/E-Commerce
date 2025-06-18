import React from "react";
import {useNavigate} from 'react-router-dom'
import "./home.css";
import  List  from "./list";

export default function home() {

  const navigate = useNavigate();
  return (
    <div>
      <div className="main-home">
        <section className="banner">
          <div className="heading">
            <h1>Get To Know Who We Are And What We Do - About Us</h1>
          </div>
          <div className="para">
            <p>
              At Eluxo, we blend modern style with everyday comfort to bring you
              clothing that fits your life. Our collections are designed to be
              effortlessly wearable and always on trend. We’re here to make
              fashion simple, inspiring, and just a click away.
            </p>
          </div>
        </section>
        <section className="banner-2">
          <div className="banner2-left">
            <h2>Learn About Us And What Sets Us Apart</h2>
            <p>
              At Eluxo, we believe fashion should feel as good as it looks.
              That’s why every piece we create blends comfort, quality, and
              style you can live in. Our collections are made to move with you —
              effortless, timeless, and modern. From design to doorstep, we
              obsess over the details that elevate everyday wear.
            </p>
            <button id="readMore">
              Read Our Blogs{" "}
              <span style={{ fontSize: "1.4em" }}> &rsaquo;</span>
            </button>
          </div>
          <div className="banner2-right">
            <div className="image-left">
              <div className="image" id="img-1"></div>
              <div className="image" id="img-2"></div>
            </div>
            <div className="image-right">
              <div className="image" id="img-1"></div>
              <div className="image" id="img-2"></div>
            </div>
          </div>
        </section>
        <section className="about">
          <div className="left">
            <h2>Have a Look at Our Unique Selling Proportions</h2>
            <button id="seeProducts" onClick={()=>{
              navigate('/products')
            }}>
              See Our Product
              <span style={{ fontSize: "1.4em", marginLeft: "8px"}}> &rsaquo;</span>
            </button>
          </div>
          <div className="right">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <div className="left-sub">
              <div className="left-sub1">
                <h1>99%</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros.
                </p>
              </div>
              <div className="left-sub2">
                <h1>100%</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros.
                </p>
              </div>
            </div>
          </div>
        </section>
        <List />
      </div>
    </div>
  );
}
