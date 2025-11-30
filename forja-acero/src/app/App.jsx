// src/app/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import "../styles/main.css";

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
import DetallePersonaje from "./pages/DetallePersonaje";
import TiendaDetalle from "./pages/TiendaDetalle";
import CrearTienda from "./pages/CrearTienda";

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

          {/* Campañas */}
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
            path="/campanas/:id"
            element={
              <ProtectedRoute>
                <DetallesCampana />
              </ProtectedRoute>
            }
          />

          {/* Personajes */}
          {/* Listado de personajes: SOLO PLAYER puede ver esta página */}
          <Route
            path="/personajes"
            element={
              <ProtectedRoute allowedRoles={["PLAYER"]}>
                <Personajes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tiendas/crear"
            element={
              <ProtectedRoute allowedRoles={["DM", "ADMIN"]}>
                <CrearTienda />
              </ProtectedRoute>
            }
          />

          {/* Detalle personaje (DM puede entrar para asignar / editar dinero, etc.) */}
          <Route
            path="/personajes/:id"
            element={
              <ProtectedRoute>
                <DetallePersonaje />
              </ProtectedRoute>
            }
          />

          {/* Mi personaje (también tiene sentido dejarlo solo para PLAYER) */}
          <Route
            path="/personaje"
            element={
              <ProtectedRoute allowedRoles={["PLAYER"]}>
                <MiPersonaje />
              </ProtectedRoute>
            }
          />

          {/* Crear personaje: solo DM/ADMIN */}
          <Route
            path="/personajes/crear"
            element={
              <ProtectedRoute allowedRoles={["DM", "ADMIN"]}>
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

          {/* Tiendas */}
          <Route
            path="/tiendas/:id"
            element={
              <ProtectedRoute>
                <TiendaDetalle />
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
