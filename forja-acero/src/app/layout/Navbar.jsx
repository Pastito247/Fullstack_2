import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const actualizarUsuario = () => {
      const guardado = JSON.parse(localStorage.getItem("forja_acero_usuario"));
      setUsuario(guardado);
    };

    actualizarUsuario();
    window.addEventListener("storage", actualizarUsuario);
    return () => window.removeEventListener("storage", actualizarUsuario);
  }, []);

  const toggleMenu = () => setMenuAbierto(!menuAbierto);
  const cerrarMenu = () => setMenuAbierto(false);

  // Cerrar sesión con animación y recarga
  const cerrarSesion = () => {
    const btn = document.querySelector(".btn-cerrar-sesion");
    if (btn) {
      btn.classList.add("animar-espada");
      setTimeout(() => {
        localStorage.removeItem("forja_acero_usuario");
        navigate("/");
        window.location.reload();
      }, 900);
    } else {
      localStorage.removeItem("forja_acero_usuario");
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning">
      <div className="container">
        {/* Logo + Nombre */}
        <Link
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
          onClick={cerrarMenu}
        >
          <Logo size={36} />
          <span className="fw-bold text-uppercase" style={{ color: "#c8a54e" }}>
            Forja & Acero
          </span>
        </Link>

        {/* Botón Hamburguesa */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={toggleMenu}
          aria-controls="navbarNav"
          aria-expanded={menuAbierto}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces */}
        <div
          className={`collapse navbar-collapse ${menuAbierto ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={cerrarMenu}>
                Inicio
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/catalogo" onClick={cerrarMenu}>
                Catálogo
              </Link>
            </li>

            {usuario?.rol === "comprador" && (
              <li className="nav-item">
                <Link className="nav-link" to="/carrito" onClick={cerrarMenu}>
                  Carrito
                </Link>
              </li>
            )}

            {usuario?.rol === "admin" && (
              <li className="nav-item">
                <Link className="nav-link" to="/admin" onClick={cerrarMenu}>
                  Administrador
                </Link>
              </li>
            )}

            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={cerrarMenu}>
                Acerca de
              </Link>
            </li>

            {/* Si no hay sesión */}
            {!usuario && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={cerrarMenu}>
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    onClick={cerrarMenu}
                  >
                    Registrarse
                  </Link>
                </li>
              </>
            )}

            {/* Si hay sesión */}
            {usuario && (
              <>
                <li className="nav-item d-flex align-items-center justify-content-center">
                  <span
                    className="fw-semibold text-warning px-2 bienvenida-animada"
                    style={{
                      textShadow: "0 0 6px rgba(200,165,78,0.6)",
                      fontFamily: "Cinzel, serif",
                    }}
                  >
                    ⚒️ Bienvenido,{" "}
                    {usuario.nombre?.split(" ")[0] || "Aventurero"}
                  </span>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/historial"
                    onClick={cerrarMenu}
                  >
                    Historial
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-danger fw-bold btn-cerrar-sesion"
                    onClick={cerrarSesion}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      fontFamily: "Cinzel, serif",
                    }}
                  >
                    🗡️ Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
