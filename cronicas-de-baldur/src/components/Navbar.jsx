import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ⚔️ Crónicas de Baldur
        </Link>
      </div>
      <Link className="nav-link d-inline text-light me-3" to="/characters">
        Personajes
      </Link>
      <Link className="nav-link d-inline text-light me-3" to="/campaigns">
        Campañas
      </Link>
    </nav>
  );
}
