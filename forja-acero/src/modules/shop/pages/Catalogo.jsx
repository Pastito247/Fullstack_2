import { useState } from "react"
import { Link } from "react-router-dom"
import { repo } from "../../../data/repo"
import React from "react";

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState("")
  const [categoria, setCategoria] = useState("todos")

const productos = repo.listProductos() || []

  const categorias = [
    "todos",
    ...new Set(productos.map((p) => p.categoria).filter(Boolean)),
  ]

  const filtrados = productos.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoria === "todos" || p.categoria === categoria
    return coincideNombre && coincideCategoria
  })

  return (
    <div className="catalogo container py-5">
      <h2 className="text-center text-warning mb-4">⚔️ Catálogo de la Forja</h2>

      {/* Controles de búsqueda y filtro */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-4 col-10 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="col-md-3 col-10">
          <select
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Productos */}
      <div className="row g-4 justify-content-center">
        {filtrados.length > 0 ? (
          filtrados.map((p) => (
            <div key={p.id} className="col-sm-6 col-md-4 col-lg-3">
              <div className="card h-100 text-center border-dark">
                <img
                  src={p.imagen}
                  alt={p.nombre}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderBottom: "1px solid #b87333",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.nombre}</h5>
                  <p className="text-warning mb-1">${p.precio}</p>
                  <p className="small text-muted">{p.categoria}</p>
                  <Link to={`/producto/${p.id}`} className="btn btn-add btn-sm">
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted mt-4">
            No se encontraron productos que coincidan con tu búsqueda.
          </p>
        )}
      </div>
    </div>
  )
}