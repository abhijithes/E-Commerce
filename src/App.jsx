// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
// import { HashRouter as Router , Routes,Route} from 'react-router-dom';

import Navbar from './components/Navbar/navbar'
import Footer from './components/footer/footer'
import Products from './pages/products/products'
import Home  from './pages/home/home'
import ProductView from './pages/productView/viewProduct'
import Auth from './pages/auth/auth'

function App() {

  return (
   <Router>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/viewproduct/:ProductId' element={ <ProductView /> } />
    </Routes>
      <Footer />
   </Router>
  )
}

export default App;
