import { Link, NavLink } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="shadow-sm">
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid px-0">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src="https://i.postimg.cc/vTdZCjXq/logo-title.png" alt="The Fullstack Saga" />
            <span className="fw-bold">The Fullstack Saga</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bstoggle="collapse"
            data-bs-target="#nav"
            aria-controls="nav"
            ariaexpanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="nav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/
login"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/
register"
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/
lobby"
                >
                  Lobby
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/
store-main"
                >
                  Tienda
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/
profile"
                >
                  Perfil
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
