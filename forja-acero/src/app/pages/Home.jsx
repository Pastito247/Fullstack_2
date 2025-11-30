import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6 mb-4 mb-md-0">
          <h1 className="mb-3">Forja y Acero</h1>
          <p className="lead">
            Gestiona tus campañas de rol, personajes y tiendas como un verdadero
            Dungeon Master.
          </p>
          <p>
            Regístrate como <strong>Dungeon Master</strong> para crear campañas,
            tiendas y personajes, o entra como <strong>Player</strong> para
            ver tu ficha, tu inventario y comprar objetos en las tiendas de la
            campaña.
          </p>

          <div className="mt-4 d-flex gap-2">
            <Link to="/register" className="btn btn-add">
              Crear cuenta
            </Link>
            <Link to="/login" className="btn btn-outline-light">
              Iniciar sesión
            </Link>
          </div>
        </div>

        <div className="col-md-6 text-center">
          <div className="card bg-dark border-0">
            <div className="card-body">
              <h5 className="card-title mb-3">Características principales</h5>
              <ul className="list-unstyled mb-0 text-start">
                <li>⚔️ Campañas con código de invitación</li>
                <li>🛡️ Personajes con clases, razas y niveles</li>
                <li>💰 Economía DnD (pp, gp, ep, sp, cp)</li>
                <li>🏪 Tiendas con ítems propios o importados de D&D 5e</li>
                <li>📦 Inventario y compras/ventas por personaje</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
