import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

import Navbar from './components/Navbar/navbar'
import Footer from './components/footer/footer'
import Products from './pages/products/products'
import Home  from './pages/home/home'
import ProductView from './pages/productView/viewProduct'
import Auth from './pages/auth/auth'
import Cart from './pages/cart/cart'
import Checkout from './pages/checkout/checkout'
import About from './pages/about/about'
import Blog from './pages/blog/blog'  

function App() {

  return (
   <Router>
      <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/products' element={<Products />} />
      <Route path='/products/viewproduct/:ProductId' element={ <ProductView /> } />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={<Checkout />} />
      <Route path='/about' element={<About />} />
      <Route path='/blog' element={<Blog />} />
    </Routes>
      <Footer />
   </Router>
  )
}

export default App;
