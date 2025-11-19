import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import "../styles/main.css";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import React from "react";

// Páginas de tienda
import Home from "../modules/shop/pages/Home";
import Category from "../modules/shop/pages/Category";
import ProductDetail from "../modules/shop/pages/ProductDetail";
import Cart from "../modules/shop/pages/Cart";
import Checkout from "../modules/shop/pages/Checkout";
import Success from "../modules/shop/pages/Success";
import Failure from "../modules/shop/pages/Failure";
import Catalogo from "../modules/shop/pages/Catalogo";
import Historial from "../modules/shop/pages/Historial";

// Página de administrador
import Dashboard from "../modules/admin/pages/Dashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categoria/:id" element={<Category />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/perfil" element={<Profile />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/historial" element={<Historial />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
