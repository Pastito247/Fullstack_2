import { useState } from "react";
import React from "react";
import { guardarUsuarios } from "../data/users";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();

    // siempre leemos usuarios actualizados desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (isRegister) {
      const existe = usuarios.find((u) => u.nombre === nombre);
      if (existe) return alert("Ese nombre ya está en uso ⚠️");

      const nuevoUsuario = { nombre, password, personaje: null };
      const nuevosUsuarios = [...usuarios, nuevoUsuario];
      guardarUsuarios(nuevosUsuarios);

      alert("Usuario registrado con éxito 🧙‍♀️");
      setIsRegister(false);
    } else {
      const usuario = usuarios.find(
        (u) => u.nombre === nombre && u.password === password
      );
      if (!usuario) return alert("Usuario o contraseña incorrectos ⚠️");

      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      alert(`¡Bienvenido, ${nombre}! ⚔️`);
      navigate("/profile");
    }
  };

  return (
    <div className="col-md-6 mx-auto parchment-box">
      <h3 className="text-gold medieval-title text-center mb-3">
        {isRegister ? "Registro de Aventurero" : "Iniciar Sesión"}
      </h3>

      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">
          {isRegister ? "Registrar" : "Entrar"}
        </button>
      </form>

      <div className="text-center mt-3">
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿Nuevo? Regístrate"}
        </button>
      </div>
    </div>
  );
}
