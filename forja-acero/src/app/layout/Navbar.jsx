import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => setMenuAbierto((prev) => !prev);
  const cerrarMenu = () => setMenuAbierto(false);

  const handleLogout = () => {
    logout();
    cerrarMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Logo / Inicio */}
        <Link
          className="navbar-brand d-flex align-items-center"
          to="/"
          onClick={cerrarMenu}
        >
          <Logo />
          <span className="ms-2 fw-bold">Forja y Acero</span>
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
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
            {/* Inicio */}
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={cerrarMenu}>
                Inicio
              </Link>
            </li>

            {/* Campañas */}
            <li className="nav-item">
              <Link className="nav-link" to="/campanas" onClick={cerrarMenu}>
                Campañas
              </Link>
            </li>

            {/* Personajes */}
            {user && user.role === "PLAYER" && (
            <li className="nav-item">
              <Link className="nav-link" to="/personajes" onClick={cerrarMenu}>
                Personajes
              </Link>
            </li>
            )}
            {/* Perfil / Auth */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={cerrarMenu}>
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register" onClick={cerrarMenu}>
                    Registrarse
                  </Link>
                </li>
              </>
            )}

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/perfil" onClick={cerrarMenu}>
                    Perfil
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-danger"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
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
