import { useState, useEffect } from "react";
import React from "react";
export default function Checkout() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(data);
  }, []);

  const eliminarProducto = (id) => {
    const actualizado = carrito.filter((item) => item.id !== id);
    setCarrito(actualizado);
    localStorage.setItem("carrito", JSON.stringify(actualizado));
  };

  const vaciarCarrito = () => {
    if (confirm("¿Seguro que deseas vaciar el carrito?")) {
      setCarrito([]);
      localStorage.removeItem("carrito");
    }
  };

  const finalizarCompra = () => {
    if (carrito.length === 0) return alert("Tu carrito está vacío 🪶");
    alert("Compra realizada con éxito 🛍️ ¡Gracias por comerciar en Baldur!");
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  const total = carrito.reduce((sum, item) => sum + item.precio, 0);

  return (
    <div className="container">
      <h2 className="text-gold medieval-title mb-4 text-center">
        🛒 Carrito de Compras
      </h2>

      {carrito.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="row">
            {carrito.map((item) => (
              <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card border-warning h-100 shadow-sm bg-light">
                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-warning fw-bold">
                      {item.nombre}
                    </h5>
                    <p className="text-dark">{item.descripcion}</p>
                    <p className="fw-bold text-dark">💰 {item.precio} monedas</p>
                    <button
                      className="btn btn-outline-danger w-100"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      ❌ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center parchment-box mt-3">
            <h4 className="text-dark fw-bold">Total: {total} monedas</h4>
            <button className="btn btn-warning m-2" onClick={finalizarCompra}>
              Finalizar compra
            </button>
            <button className="btn btn-outline-danger m-2" onClick={vaciarCarrito}>
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}
