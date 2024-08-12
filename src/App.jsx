import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Basket from './pages/Basket';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import AddProduct from './pages/AddProduct';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetails from './components/ProductDetails';
import Protected from './router/Protected';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/my-basket" element={<Basket />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Route>
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}
export default App