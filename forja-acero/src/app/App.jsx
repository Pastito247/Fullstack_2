import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import "../styles/main.css";
import React from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Campanas from "./pages/Campanas";
import Personajes from "./pages/Personajes";
import CrearCampana from "./pages/CrearCampana";
import DetallesCampana from "./pages/DetallesCampana";
import MiPersonaje from "./pages/MiPersonaje";
import CrearPersonaje from "./pages/CrearPersonaje";

import ProtectedRoute from "../components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/campanas"
            element={
              <ProtectedRoute>
                <Campanas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campanas/crear"
            element={
              <ProtectedRoute allowedRoles={["DM", "ADMIN"]}>
                <CrearCampana />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personajes"
            element={
              <ProtectedRoute>
                <Personajes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/campanas/:id"
            element={
              <ProtectedRoute>
                <DetallesCampana />
              </ProtectedRoute>
            }
          />
          <Route
            path="/personaje"
            element={
              <ProtectedRoute>
                <MiPersonaje />
              </ProtectedRoute>
            }
          />

          <Route
            path="/personajes/crear"
            element={
              <ProtectedRoute>
                <CrearPersonaje />
              </ProtectedRoute>
            }
          />

          {/* Perfil solo logueado */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Cualquier ruta desconocida → Home */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
