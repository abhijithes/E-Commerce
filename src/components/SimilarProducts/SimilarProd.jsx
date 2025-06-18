import React, { useEffect, useState } from 'react'
import Card from '../../pages/products/card';
import './SimilarProd.css'

export default function bestProd({category}) {

  const [similarProd, setSimilarProd] = useState([]);
  useEffect(()=>{
    fetch(`http://localhost:3001/products?category=${category}`)
    .then((res)=> res.json())
    .then((res)=> setSimilarProd(res.slice(1,10)))
    .catch((err)=> console.err('error',err))
  },[category])
  return (
    <section className='similar-prod'>
      <p id='heading'>Similar Products</p>
      <div className='list'>
      { similarProd.map((data)=>{
        return <Card card={data}/>
      })}
      </div>
    </section>
  )
}
