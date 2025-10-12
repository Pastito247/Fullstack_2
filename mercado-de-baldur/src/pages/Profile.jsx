import { useEffect, useState } from "react";
import { clasesDisponibles } from "../data/users";
import React from "react";

export default function Profile() {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuarioActivo"))
  );

  const [nombrePJ, setNombrePJ] = useState("");
  const [clase, setClase] = useState("");
  const [nivel, setNivel] = useState(1);

  const crearPersonaje = (e) => {
    e.preventDefault();
    const nuevoPJ = { nombrePJ, clase, nivel, inventario: [] };
    const actualizado = { ...usuario, personaje: nuevoPJ };
    setUsuario(actualizado);
    localStorage.setItem("usuarioActivo", JSON.stringify(actualizado));

    // Actualizar lista general de usuarios
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const nuevos = usuarios.map((u) =>
      u.nombre === usuario.nombre ? actualizado : u
    );
    localStorage.setItem("usuarios", JSON.stringify(nuevos));

    alert("Personaje creado con éxito 🧙‍♂️");
  };

  if (!usuario) return <h3>Debes iniciar sesión primero.</h3>;

  return (
    <div className="container text-center parchment-box">
      <h2 className="text-gold medieval-title">👤 Perfil de Aventurero</h2>
      <p>Bienvenido, {usuario.nombre}</p>

      {usuario.personaje ? (
        <div className="mt-4">
          <h4>{usuario.personaje.nombrePJ}</h4>
          <p>Clase: {usuario.personaje.clase}</p>
          <p>Nivel: {usuario.personaje.nivel}</p>
        </div>
      ) : (
        <form onSubmit={crearPersonaje} className="mt-4">
          <h5 className="text-dark mb-3">Crear Personaje</h5>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Nombre del personaje"
            value={nombrePJ}
            onChange={(e) => setNombrePJ(e.target.value)}
            required
          />

          <select
            className="form-select mb-2"
            value={clase}
            onChange={(e) => setClase(e.target.value)}
            required
          >
            <option value="">Selecciona una clase</option>
            {clasesDisponibles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="number"
            className="form-control mb-3"
            min="1"
            max="20"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
          />

          <button className="btn btn-warning w-100">Crear Personaje</button>
        </form>
      )}
    </div>
  );
}
