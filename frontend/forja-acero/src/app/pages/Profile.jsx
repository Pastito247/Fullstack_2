import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [mensaje, setMensaje] = useState(null);

  const navigate = useNavigate();

  // Cargar usuario activo
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("forja_acero_usuario"));
    if (!u) {
      navigate("/login");
      return;
    }
    setUsuario(u);
    setNombre(u.nombre || "");
    setPassword(u.password || "");
    setRol(u.rol || "comprador");
  }, [navigate]);

  // Guardar cambios
  const guardarCambios = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !password.trim()) {
      setMensaje("⚠️ Todos los campos son obligatorios");
      setTimeout(() => setMensaje(null), 2000);
      return;
    }

    // Actualizar usuario actual
    const actualizado = { ...usuario, nombre, password };

    // Reemplazar en lista de usuarios
    const usuarios =
      JSON.parse(localStorage.getItem("forja_acero_usuarios")) || [];
    const nuevos = usuarios.map((u) =>
      u.correo === usuario.correo ? actualizado : u
    );
    localStorage.setItem("forja_acero_usuarios", JSON.stringify(nuevos));

    // Actualizar sesión activa
    localStorage.setItem("forja_acero_usuario", JSON.stringify(actualizado));
    setUsuario(actualizado);

    // Mostrar mensaje y recargar
    setMensaje("✅ Perfil actualizado correctamente");
    setTimeout(() => {
      setMensaje(null);
      window.location.reload(); // 🔥 recarga la página después del mensaje
    }, 2500);
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("forja_acero_usuario");
    setMensaje("👋 Sesión cerrada");
    setTimeout(() => {
      navigate("/login");
      window.location.reload();
    }, 1000);
  };

  if (!usuario) return null;

  return (
    <div className="container py-5 text-center">
      <h1 className="text-warning mb-4">⚙️ Perfil de Usuario</h1>
      <p className="text-muted mb-4">
        Aquí puedes modificar tus datos o cerrar sesión.
      </p>

      {mensaje && (
        <div className="mensaje-actualizacion" role="alert">
          {mensaje}
        </div>
      )}

      <form
        onSubmit={guardarCambios}
        className="crud-form mx-auto p-4 border border-warning rounded-4 shadow"
        style={{ maxWidth: "500px", backgroundColor: "#1a1a1a" }}
      >
        <div className="mb-3 text-start">
          <label htmlFor="correo" className="form-label text-warning fw-bold">
            Correo electrónico
          </label>
          <input
            id="correo"
            type="email"
            className="form-control"
            value={usuario.correo}
            disabled
          />
        </div>

        <div className="mb-3 text-start">
          <label htmlFor="nombre" className="form-label text-warning fw-bold">
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

        <div className="mb-3 text-start">
          <label htmlFor="password" className="form-label text-warning fw-bold">
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

        <div className="mb-4 text-start">
          <label className="form-label text-warning fw-bold">Rol</label>
          <input
            className="form-control"
            type="text"
            value={rol === "admin" ? "Administrador" : "Comprador"}
            disabled
          />
        </div>

        <div className="d-flex flex-column gap-3">
          <button type="submit" className="btn btn-add w-100">
            💾 Guardar cambios
          </button>
          <button
            type="button"
            className="btn btn-outline-danger w-100"
            onClick={cerrarSesion}
          >
            🚪 Cerrar sesión
          </button>
        </div>
      </form>
    </div>
  );
}
