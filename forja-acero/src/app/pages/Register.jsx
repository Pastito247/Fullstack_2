import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function Register() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("comprador");
  const [error, setError] = useState("");

  const registrar = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !correo.trim() || !password.trim()) {
      setError("Completa todos los campos.");
      return;
    }

    const usuarios =
      JSON.parse(localStorage.getItem("forja_acero_usuarios")) || [];

    if (usuarios.some((u) => u.correo === correo)) {
      setError("Ya existe una cuenta con este correo.");
      return;
    }

    const nuevoUsuario = { nombre, correo, password, rol };

    localStorage.setItem(
      "forja_acero_usuarios",
      JSON.stringify([...usuarios, nuevoUsuario])
    );

    setNombre("");
    setCorreo("");
    setPassword("");
    setError("");

    navigate("/login");
  };

  return (
    <div className="container py-5 text-center">
      <h1 className="text-warning mb-4">⚒️ Crear Cuenta</h1>
      <p className="text-muted mb-4">Únete a la forja y comienza tu aventura.</p>

      <form
        onSubmit={registrar}
        className="crud-form mx-auto p-4"
        style={{ maxWidth: "500px" }}
      >
        {error && <p className="text-danger mb-3">{error}</p>}

        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
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

        <div className="mb-4">
          <label htmlFor="rol" className="form-label">
            Rol
          </label>
          <select
            id="rol"
            className="form-select"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="comprador">Comprador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button type="submit" className="btn btn-add w-100">
          Registrarse
        </button>

        <p className="mt-3 text-muted">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-warning">
            Inicia sesión aquí
          </a>
        </p>
      </form>
    </div>
  );
}
