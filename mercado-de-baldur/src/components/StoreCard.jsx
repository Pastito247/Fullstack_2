import React from "react";
import { Link } from "react-router-dom";

export default function StoreCard({ tienda }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-sm border-warning h-100 bg-light">
        <img
          src={tienda.imagen}
          className="card-img-top"
          alt={tienda.nombre}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title text-warning fw-bold">{tienda.nombre}</h5>
          <p className="card-text text-dark">{tienda.descripcion}</p>
          <Link
            to={`/store/${tienda.id}`}
            className="btn btn-sm btn-outline-warning"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </div>
  );
}
