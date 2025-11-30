import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import apiClient from "../../api/apiClient";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [charLoading, setCharLoading] = useState(true);
  const [charError, setCharError] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    const loadCharacter = async () => {
      if (!user || user.role !== "PLAYER") {
        setCharLoading(false);
        return;
      }
      try {
        const res = await apiClient.get("/api/characters/me");
        setCharacter(res.data);
      } catch (err) {
        console.error(err);
        setCharError("No se pudo cargar tu personaje");
      } finally {
        setCharLoading(false);
      }
    };

    loadCharacter();
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return <div className="container py-5">Cargando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Perfil de usuario</h1>

      {/* Datos del usuario */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Datos de la cuenta</h5>
          <p className="mb-1">
            <strong>Usuario:</strong> {user.username}
          </p>
          <p className="mb-1">
            <strong>Correo:</strong> {user.email}
          </p>
          <p className="mb-1">
            <strong>Rol:</strong> {user.role}
          </p>

          <button
            className="btn btn-outline-danger mt-3"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      </div>
)}
