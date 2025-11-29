import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("PLAYER"); // PLAYER por defecto
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const registrar = async (e) => {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setError("⚠️ Todos los campos son obligatorios");
      return;
    }

    try {
      setLoading(true);
      // Llamamos al backend usando AuthContext
      const { role } = await register(nombre, correo, password, rol);

      // Redirigir según rol
      if (role === "DM" || role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4 text-center">Crear cuenta</h1>

      <form onSubmit={registrar} className="col-md-6 mx-auto card p-4">
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre de usuario
          </label>
          <input
            id="nombre"
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo
          </label>
          <input
            id="correo"
            type="email"
            className="form-control"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rol" className="form-label">
            Rol
          </label>
          <select
            id="rol"
            className="form-select"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="PLAYER">Player</option>
            <option value="DM">Dungeon Master</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-add w-100"
          disabled={loading}
        >
          {loading ? "Creando cuenta..." : "Registrarse"}
        </button>

        <p className="mt-3 text-muted text-center">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-warning">
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </div>
  );
}
