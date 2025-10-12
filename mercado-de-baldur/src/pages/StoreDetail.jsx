import { useParams } from "react-router-dom";
import { tiendasBase } from "../data/data";
import { useState } from "react";
import React from "react";

export default function StoreDetail() {
  const { id } = useParams();
  const tienda = tiendasBase.find((t) => t.id === parseInt(id));
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito, producto];
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    alert(`${producto.nombre} ha sido agregado al carrito 🛒`);
  };

  if (!tienda) return <h3>Tienda no encontrada</h3>;

  return (
    <div className="container">
      <h2 className="text-gold medieval-title mb-4 text-center">
        {tienda.nombre}
      </h2>
      <p className="text-center text-dark mb-4">{tienda.descripcion}</p>

      <div className="row">
        {tienda.productos.map((producto) => (
          <div key={producto.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card border-warning shadow-sm h-100 bg-light">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title text-warning fw-bold">
                  {producto.nombre}
                </h5>
                <p className="text-dark">{producto.descripcion}</p>
                <p className="fw-bold text-dark">💰 {producto.precio} monedas</p>
                <button
                  className="btn btn-warning w-100"
                  onClick={() => agregarAlCarrito(producto)}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
