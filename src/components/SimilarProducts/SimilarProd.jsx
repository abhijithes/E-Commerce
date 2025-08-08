import React, { useEffect, useState } from 'react'
import Card from '../../pages/products/card';
import './SimilarProd.css'

export default function bestProd({category}) {
  const API_URL = "https://my-ecomm-json-server.onrender.com";

  const [similarProd, setSimilarProd] = useState([]);
  useEffect(()=>{
    fetch(`${API_URL}/products?category=${category}`)
    .then((res)=> res.json())
    .then((res)=> setSimilarProd(res.slice(1,10)))
    .catch((err)=> console.err('error',err))
  },[category])
  return (
    <section className='similar-prod'>
      <p id='heading'>Similar Products</p>
      <div className='list'>
      { similarProd.map((data,index)=>{
        return <Card card={data} key={index}/>
      })}
      </div>
    </section>
  )
}
