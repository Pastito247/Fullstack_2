import { Link } from "react-router-dom";
import "../styles/original/global.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo izquierda */}
      <div className="navbar-logo">
        <Link to="/lobby">
          <img src="https://i.postimg.cc/vTdZCjXq/logo-title.png" alt="The Fullstack Saga" />
        </Link>
      </div>

      {/* Links centro */}
      <div className="navbar-center">
        <Link to="/store-main">Tienda</Link>
        <Link to="/missions">Misiones</Link>
        <span className="disabled">Social (Pronto)</span>
        <Link to="/minigames">Minijuegos</Link>
      </div>

      {/* Avatar derecha */}
      <div className="navbar-avatar">
        <img
          src="https://i.postimg.cc/sg5pVjTq/avatar.png"
          alt="Avatar jugador"
        />
      </div>
    </nav>
  );
}
