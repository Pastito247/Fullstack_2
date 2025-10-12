import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning">
      <div className="container">
        <Link className="navbar-brand text-gold fw-bold" to="/">
          🏰 Mercado de Baldur
        </Link>
        <div>
          <Link className="btn btn-outline-warning me-2" to="/store">
            Tiendas
          </Link>
          <Link className="btn btn-outline-warning me-2" to="/checkout">
            🛒 Carrito
          </Link>
          <Link className="btn btn-outline-light" to="/login">
            Iniciar sesión
          </Link>
          <Link className="btn btn-outline-light" to="/profile">
            ⚔️ Perfil
          </Link>
          <Link className="btn btn-outline-warning me-2" to="/mystore">
            🏪 Mi Tienda
          </Link>
        </div>
      </div>
    </nav>
  );
}
