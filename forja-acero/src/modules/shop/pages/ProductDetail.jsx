import { useParams, useNavigate } from "react-router-dom";
import { repo } from "../../../data/repo";
import { useState } from "react";
import React from "react";


export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const producto = repo.getProducto(id);
  const [added, setAdded] = useState(false);

  const agregarAlCarrito = () => {
    const carrito =
      JSON.parse(localStorage.getItem("forja_acero_carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("forja_acero_carrito", JSON.stringify(carrito));
    setAdded(true);
  };

  if (!producto) {
    return <p className="text-center mt-5">Producto no encontrado.</p>;
  }

  return (
    <div className="product-detail container-fluid py-5">
      <div className="row g-5 align-items-center justify-content-center">
        {/* Imagen */}
        <div className="col-md-5 text-center">
          <div className="product-image border border-warning rounded p-2">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="img-fluid rounded"
            />
          </div>
        </div>

        {/* Información */}
        <div className="col-md-6">
          <h1 className="product-title mb-3">{producto.nombre}</h1>
          <p className="product-description">{producto.descripcion}</p>
          <h4 className="product-price">${producto.precio}</h4>
          <p className="product-stock">
            <strong>Stock:</strong> {producto.stock}
          </p>

          <div className="d-flex gap-3 mt-4">
            {!added ? (
              <button className="btn btn-add" onClick={agregarAlCarrito}>
                Agregar al carrito
              </button>
            ) : (
              <button className="btn btn-success" disabled>
                ✅ Agregado
              </button>
            )}

            {/* Botón de volver atrás */}
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate(-1)}
            >
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
