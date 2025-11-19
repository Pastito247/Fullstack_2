import { Link } from 'react-router-dom'
import React from "react";

export default function ProductCard({ producto }) {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div className="card h-100 border-secondary shadow-sm">
        <img
          src={producto.imagen}
          className="card-img-top"
          alt={producto.nombre}
          style={{ objectFit: 'cover', height: '180px' }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title">{producto.nombre}</h5>
            <p className="card-text small text-muted">{producto.descripcion}</p>
          </div>
          <div>
            <p className="fw-bold mb-1">${producto.precio}</p>
            <Link to={`/producto/${producto.id}`} className="btn btn-dark w-100">
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}