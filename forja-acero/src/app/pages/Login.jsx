import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Login() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = (e) => {
    e.preventDefault();

    if (!correo.trim() || !password.trim()) {
      setError("Completa todos los campos.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("forja_acero_usuarios")) || [];
    const usuario = usuarios.find((u) => u.correo === correo && u.password === password);

    if (!usuario) {
      setError("Credenciales inválidas.");
      return;
    }

    localStorage.setItem("forja_acero_usuario", JSON.stringify(usuario));
    navigate("/"); // o redirige donde corresponda
    window.location.reload()
  };

  return (
    <div className="container py-5 text-center">
      <h1 className="text-warning mb-4">⚒️ Iniciar Sesión</h1>
      <p className="text-muted mb-4">Accede a tu cuenta de la forja.</p>

      <form
        onSubmit={iniciarSesion}
        className="crud-form mx-auto p-4"
        style={{ maxWidth: "500px" }}
      >
        {error && <p className="text-danger mb-3">{error}</p>}

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

        <div className="mb-4">
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

        <button type="submit" className="btn btn-add w-100">
          Iniciar sesión
        </button>

        <p className="mt-3 text-muted">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-warning">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
}
